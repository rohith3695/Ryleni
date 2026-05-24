import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, FileText, CheckCircle, Download, Bot } from 'lucide-react';

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Sitemap: https://rylenivesture.com/sitemap.xml`;

const RobotsEditor = () => {
    const [content, setContent] = useState(DEFAULT_ROBOTS);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [testUrl, setTestUrl] = useState('');
    const [testResult, setTestResult] = useState<null | { allowed: boolean; rule: string }>(null);

    useEffect(() => {
        fetchRobots();
    }, []);

    const fetchRobots = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'seo_settings', 'robots');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().content) {
                setContent(docSnap.data().content);
            }
        } catch (error) {
            console.error("Error fetching robots.txt:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'seo_settings', 'robots'), { content }, { merge: true });
            alert('Robots.txt settings saved!');
        } catch (error) {
            console.error("Error saving robots.txt:", error);
            alert('Failed to save.');
        } finally {
            setSaving(false);
        }
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "robots.txt";
        document.body.appendChild(element);
        element.click();
    };

    const runTest = () => {
        // Very basic simulation
        const isDisallowed = content.split('\n').some(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('Disallow:')) {
                const path = trimmed.split('Disallow:')[1].trim();
                return path && testUrl.includes(path);
            }
            return false;
        });

        setTestResult({
            allowed: !isDisallowed,
            rule: isDisallowed ? 'Blocked by Disallow rule' : 'Allowed'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Robots.txt Editor
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
                    >
                        <Download className="w-4 h-4" /> Download
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Editor</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm bg-gray-50"
                        spellCheck={false}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test URL Access</label>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <input
                            type="text"
                            value={testUrl}
                            onChange={(e) => setTestUrl(e.target.value)}
                            placeholder="/admin"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-primary"
                        />
                        <button
                            onClick={runTest}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
                        >
                            Check Access
                        </button>

                        {testResult && (
                            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm ${testResult.allowed ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {testResult.allowed ? <CheckCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                <span>{testResult.allowed ? 'Allowed' : 'Blocked'}</span>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-4">
                            Note: This is a basic simulation. Always test in Google Search Console.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RobotsEditor;
