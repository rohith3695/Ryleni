import { useState, useEffect } from 'react';
import { Search, FileText, Trash2, Download, Loader2, FileDown, Calendar, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { downloadFileFromFirestore, getFileBase64FromFirestore } from '../../lib/fileStorage';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import JSZip from 'jszip';
import { useGoogleDrive } from '../../hooks/useGoogleDrive';

interface Application {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    website: string;
    pitch: string;
    stage: string;
    teamSize: string;
    submissionType: 'link' | 'file';
    deckUrl: string | null;
    deckFileUrl: string | null;
    hasFile?: boolean;
    fileName?: string;
    createdAt: Timestamp;
}

const ApplicationsTable = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const { initializeGoogleDrive, handleAuthClick, createFolder, uploadFile, isInitialized } = useGoogleDrive();

    useEffect(() => {
        initializeGoogleDrive();
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const apps: Application[] = [];
            querySnapshot.forEach((doc) => {
                apps.push({ id: doc.id, ...doc.data() } as Application);
            });
            setApplications(apps);
        } catch (error) {
            console.error("Error fetching applications: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const password = window.prompt("Enter admin password to delete this application:");

        if (password === "reldel987") {
            if (window.confirm("Are you sure you want to delete this application? This cannot be undone.")) {
                try {
                    await deleteDoc(doc(db, "applications", id));
                    setApplications(applications.filter(app => app.id !== id));
                    alert("Application deleted successfully.");
                } catch (error) {
                    console.error("Error deleting document: ", error);
                    alert("Failed to delete application.");
                }
            }
        } else if (password !== null) {
            alert("Incorrect password. Deletion cancelled.");
        }
    };

    const handleDownload = async (app: Application) => {
        if (!app.id) return;
        setDownloadingId(app.id);
        try {
            await downloadFileFromFirestore(app.id, app.fileName || `pitch-deck-${app.companyName}.pdf`);
        } catch (error) {
            alert("Error downloading file. Please try again.");
            console.error(error);
        } finally {
            setDownloadingId(null);
        }
    };

    const handleExportZip = async () => {
        const zip = new JSZip();

        // 1. Generate PDF Report (Landscape)
        const doc = new jsPDF('l', 'mm', 'a4');
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("Ryleni Venture Studio", 148, 15, { align: "center" });
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Applications Report - ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`, 148, 22, { align: "center" });

        const tableColumn = ["Company", "Founder", "Email", "Phone", "Stage", "Team", "Pitch", "Date", "Deck File"];
        const tableRows: any[] = [];

        filteredApps.forEach(app => {
            const hasDeckFile = app.hasFile || (app.submissionType === 'file' && app.deckFileUrl);
            const date = app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

            const appData = [
                app.companyName,
                `${app.firstName} ${app.lastName}`,
                app.email,
                app.phone,
                app.stage,
                app.teamSize,
                app.pitch.length > 50 ? app.pitch.substring(0, 50) + "..." : app.pitch,
                date,
                hasDeckFile ? "Yes (Included)" : (app.deckUrl ? "Link Only" : "No"),
            ];
            tableRows.push(appData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            styles: { fontSize: 8, cellPadding: 2 },
            columnStyles: { 6: { cellWidth: 50 }, 0: { cellWidth: 30 } },
        });

        const pdfBlob = doc.output('blob');
        zip.file("Applications_Report.pdf", pdfBlob);

        const deckFolder = zip.folder("pitch_decks");

        setDownloadingId('EXPORTING_ZIP');

        try {
            const promises = filteredApps.map(async (app) => {
                if (app.hasFile) {
                    try {
                        const base64Data = await getFileBase64FromFirestore(app.id);
                        const cleanBase64 = base64Data.split(',')[1] || base64Data;
                        const safeCompany = app.companyName.replace(/[^a-z0-9]/gi, '_');
                        const safeName = `${safeCompany}_PitchDeck.pdf`;

                        deckFolder?.file(safeName, cleanBase64, { base64: true });
                    } catch (err) {
                        console.error(`Failed to fetch file for ${app.companyName}`, err);
                        deckFolder?.file(`ERROR_${app.companyName}.txt`, `Failed to retrieve upload: ${err}`);
                    }
                }
            });

            await Promise.all(promises);

            const content = await zip.generateAsync({ type: "blob" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `Ryeni_Export_${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. See console for details.");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleExportToDrive = async () => {
        try {
            setDownloadingId('UPLOADING_DRIVE');
            await handleAuthClick();

            const folderName = `Ryleni Exports ${new Date().toISOString().split('T')[0]}`;
            const folderId = await createFolder(folderName);

            const doc = new jsPDF('l', 'mm', 'a4');
            doc.setFontSize(20);
            doc.setTextColor(40, 40, 40);
            doc.text("Ryleni Venture Studio", 148, 15, { align: "center" });
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text(`Applications Report - ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`, 148, 22, { align: "center" });

            const tableColumn = ["Company", "Founder", "Email", "Phone", "Stage", "Team", "Pitch", "Date", "Deck File"];
            const tableRows: any[] = [];

            filteredApps.forEach(app => {
                const hasDeckFile = app.hasFile || (app.submissionType === 'file' && app.deckFileUrl);
                const date = app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

                const appData = [
                    app.companyName,
                    `${app.firstName} ${app.lastName}`,
                    app.email,
                    app.phone,
                    app.stage,
                    app.teamSize,
                    app.pitch.length > 50 ? app.pitch.substring(0, 50) + "..." : app.pitch,
                    date,
                    hasDeckFile ? "Yes (Included)" : (app.deckUrl ? "Link Only" : "No"),
                ];
                tableRows.push(appData);
            });

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
                theme: 'grid',
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                styles: { fontSize: 8, cellPadding: 2 },
                columnStyles: { 6: { cellWidth: 50 }, 0: { cellWidth: 30 } },
            });

            const pdfBlob = doc.output('blob');
            await uploadFile("Applications_Report.pdf", pdfBlob, 'application/pdf', folderId);

            const deckFolderId = await createFolder("pitch_decks", folderId);

            const promises = filteredApps.map(async (app) => {
                if (app.hasFile) {
                    try {
                        const base64Data = await getFileBase64FromFirestore(app.id);
                        const byteCharacters = atob(base64Data.split(',')[1] || base64Data);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: 'application/pdf' });

                        const safeCompany = app.companyName.replace(/[^a-z0-9]/gi, '_');
                        const safeName = `${safeCompany}_PitchDeck.pdf`;

                        await uploadFile(safeName, blob, 'application/pdf', deckFolderId);
                    } catch (err) {
                        console.error(`Failed to upload file for ${app.companyName}`, err);
                    }
                }
            });

            await Promise.all(promises);
            alert("Successfully uploaded to Google Drive! Check your 'My Drive'.");
        } catch (error) {
            console.error("Drive upload failed:", error);
            alert("Upload failed. See console.");
        } finally {
            setDownloadingId(null);
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredApps = applications.filter(app =>
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Applications</h2>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded w-fit inline-flex items-center gap-1.5">
                        Total Responses: <span className="text-gray-900 font-bold">{applications.length}</span>
                    </span>
                </div>

                <div className="flex w-full md:w-auto flex-col sm:flex-row justify-between md:justify-end items-stretch sm:items-center gap-3">
                    <div className="relative w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
                        />
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleExportZip}
                            disabled={filteredApps.length === 0 || downloadingId !== null}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {downloadingId === 'EXPORTING_ZIP' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <FileDown className="w-4 h-4" />
                            )}
                            {downloadingId === 'EXPORTING_ZIP' ? 'Zipping...' : 'Export ZIP'}
                        </button>

                        <button
                            onClick={handleExportToDrive}
                            disabled={filteredApps.length === 0 || downloadingId !== null || !isInitialized}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {downloadingId === 'UPLOADING_DRIVE' ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-4 h-4" />
                            )}
                            {downloadingId === 'UPLOADING_DRIVE' ? 'Uploading...' : 'Upload to Drive'}
                        </button>

                        <button
                            onClick={fetchApplications}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredApps.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">No applications found</h3>
                    <p className="text-gray-500 text-sm">
                        {searchTerm ? "Try adjusting your search terms." : "Waiting for new submissions."}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Company / Founder</th>
                                    <th className="px-6 py-4">Stage / Team</th>
                                    <th className="px-6 py-4">Pitch</th>
                                    <th className="px-6 py-4">Deck</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900 text-sm">{app.companyName}</span>
                                                <span className="text-gray-500 text-xs">{app.firstName} {app.lastName}</span>
                                                <a href={`mailto:${app.email}`} className="text-primary text-xs hover:underline mt-0.5">{app.email}</a>
                                                <span className="text-gray-400 text-xs">{app.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                                                    {app.stage}
                                                </span>
                                                <span className="text-gray-500 text-xs">Team: {app.teamSize}</span>
                                                {app.website && (
                                                    <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1">
                                                        Website <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 min-w-[250px] whitespace-pre-wrap">{app.pitch}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {app.hasFile ? (
                                                <button
                                                    onClick={() => handleDownload(app)}
                                                    disabled={downloadingId === app.id}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                                                >
                                                    {downloadingId === app.id ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Download className="w-3.5 h-3.5" />
                                                    )}
                                                    {downloadingId === app.id ? 'Downloading...' : 'Download Deck'}
                                                </button>
                                            ) : app.submissionType === 'file' && app.deckFileUrl ? (
                                                <a
                                                    href={app.deckFileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                                                >
                                                    <FileText className="w-3.5 h-3.5" />
                                                    View File
                                                </a>
                                            ) : app.deckUrl ? (
                                                <a
                                                    href={app.deckUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-primary rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                                >
                                                    <LinkIcon className="w-3.5 h-3.5" />
                                                    Open Link
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">No deck</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(app.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete application"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationsTable;
