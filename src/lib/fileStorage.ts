
import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';

const CHUNK_SIZE = 500 * 1024; // 500KB chunks (safe for Firestore)

/**
 * Uploads a file to Firestore by splitting it into Base64 chunks.
 * Storage path: {collectionPrefix}/{applicationId}/fileChunks/{chunkDocId}
 */
export const uploadFileToFirestore = async (file: File, applicationId: string, collectionPrefix: string = "applications") => {
    return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const base64Data = e.target?.result as string;
            // Remove data URL prefix (e.g., "data:application/pdf;base64,") to store raw data
            // We'll reconstruct it on download
            // Actually, keeping it makes reconstruction easier for now

            const totalChunks = Math.ceil(base64Data.length / CHUNK_SIZE);
            const batchPromises = [];

            // Identify MIME type for reconstruction
            const mimeType = file.type;
            const fileName = file.name;

            // 1. Create chunks
            for (let i = 0; i < totalChunks; i++) {
                const chunk = base64Data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

                // Add to subcollection
                const chunkPromise = addDoc(collection(db, `${collectionPrefix}/${applicationId}/fileChunks`), {
                    index: i,
                    data: chunk,
                    totalChunks: totalChunks
                });
                batchPromises.push(chunkPromise);
            }

            try {
                // 2. Upload all chunks
                await Promise.all(batchPromises);

                // 3. Update main application document with metadata
                const appRef = doc(db, collectionPrefix, applicationId);
                await updateDoc(appRef, {
                    hasFile: true,
                    fileName: fileName,
                    fileType: mimeType,
                    fileSize: file.size
                });

                resolve();
            } catch (error) {
                console.error("Error uploading file chunks:", error);
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Converts to Base64
    });
};

/**
 * Downloads a file from Firestore by reconstructing its chunks.
 */
export const downloadFileFromFirestore = async (applicationId: string, fileName: string, collectionPrefix: string = "applications") => {
    try {
        const base64Data = await getFileBase64FromFirestore(applicationId, collectionPrefix);

        // specific workaround: creating a download link
        const link = document.createElement("a");
        link.href = base64Data;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};

/**
 * Retrieves the complete Base64 string of a file from Firestore chunks.
 */
export const getFileBase64FromFirestore = async (applicationId: string, collectionPrefix: string = "applications"): Promise<string> => {
    const chunksRef = collection(db, `${collectionPrefix}/${applicationId}/fileChunks`);
    const q = query(chunksRef, orderBy("index", "asc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        throw new Error("No file chunks found");
    }

    // Combine chunks
    let completeBase64 = "";
    snapshot.forEach(doc => {
        completeBase64 += doc.data().data;
    });

    return completeBase64;
};
