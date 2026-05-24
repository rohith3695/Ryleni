import { useState } from 'react';

// Using 'any' for window.gapi and window.google to avoid complex type definitions for now
declare global {
    interface Window {
        gapi: any;
        google: any;
    }
}

// CLIENT_ID and API_KEY need to be replaced by the user
const CLIENT_ID = '266053791777-l60qua9668b5hnrr77ht0nnn993sbe54.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDjAbAlGu0eQfpeyZ_88xZJqGPhT35qie0';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export const useGoogleDrive = () => {
    const [potentialError, setPotentialError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [tokenClient, setTokenClient] = useState<any>(null);

    const initializeGoogleDrive = async () => {
        try {
            await new Promise<void>((resolve, reject) => {
                window.gapi.load('client', {
                    callback: resolve,
                    onerror: reject,
                });
            });

            await window.gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });

            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });

            setTokenClient(client);
            setIsInitialized(true);
        } catch (error: any) {
            console.error("Error initializing Google Drive:", error);
            setPotentialError(error.message || "Failed to initialize Google Drive");
        }
    };

    const handleAuthClick = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!tokenClient) {
                reject(new Error("Token client not initialized"));
                return;
            }

            tokenClient.callback = async (resp: any) => {
                if (resp.error !== undefined) {
                    reject(resp);
                }
                resolve();
            };

            if (window.gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                tokenClient.requestAccessToken({ prompt: '' });
            }
        });
    };

    const createFolder = async (folderName: string, parentId?: string): Promise<string> => {
        const fileMetadata: any = {
            'name': folderName,
            'mimeType': 'application/vnd.google-apps.folder',
        };
        if (parentId) {
            fileMetadata['parents'] = [parentId];
        }

        const response = await window.gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });
        return response.result.id;
    };

    const uploadFile = async (fileName: string, blob: Blob, mimeType: string, parentId?: string): Promise<string> => {
        const metadata: any = {
            name: fileName,
            mimeType: mimeType,
        };
        if (parentId) {
            metadata.parents = [parentId];
        }

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', blob);

        const accessToken = window.gapi.client.getToken().access_token;

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
            body: form,
        });

        const data = await response.json();
        return data.id;
    };

    return {
        isInitialized,
        initializeGoogleDrive,
        handleAuthClick,
        createFolder,
        uploadFile,
        error: potentialError
    };
};
