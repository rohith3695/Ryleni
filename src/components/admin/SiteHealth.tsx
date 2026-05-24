import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Activity, AlertTriangle, CheckCircle, ArrowRight, Trash2, Plus } from 'lucide-react';

const PAGES = [
    { id: 'home', name: 'Home' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'service', name: 'Service' },
    { id: 'apply', name: 'Apply' },
    { id: 'founder', name: 'Founder' },
    { id: 'careers', name: 'Careers' },
];

const SiteHealth = () => {
    const [score, setScore] = useState(100);
    const [issues, setIssues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [redirects, setRedirects] = useState<any[]>([]);
    const [newRedirect, setNewRedirect] = useState({ source: '', destination: '', type: '301' });

    useEffect(() => {
        analyzeSite();
        fetchRedirects();
    }, []);

    const analyzeSite = async () => {
        setLoading(true);
        let newIssues: any[] = [];
        let totalChecks = 0;
        let passedChecks = 0;

        for (const page of PAGES) {
            const docRef = doc(db, 'seo_settings', page.id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.exists() ? docSnap.data() : {};

            // Check Title
            totalChecks++;
            if (!data.title) {
                newIssues.push({ type: 'error', message: `Missing Title on ${page.name}` });
            } else if (data.title.length > 60) {
                newIssues.push({ type: 'warning', message: `Title too long on ${page.name}` });
            } else {
                passedChecks++;
            }

            // Check Description
            totalChecks++;
            if (!data.description) {
                newIssues.push({ type: 'error', message: `Missing Meta Description on ${page.name}` });
            } else {
                passedChecks++;
            }

            // Check OG Image
            totalChecks++;
            if (!data.ogImage) {
                newIssues.push({ type: 'warning', message: `Missing Social Image on ${page.name}` });
            } else {
                passedChecks++;
            }
        }

        setIssues(newIssues);
        setScore(Math.round((passedChecks / totalChecks) * 100) || 0);
        setLoading(false);
    };

    const fetchRedirects = async () => {
        try {
            const docRef = doc(db, 'seo_settings', 'redirects');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setRedirects(docSnap.data().list || []);
            }
        } catch (error) {
            console.error("Error fetching redirects:", error);
        }
    };

    const saveRedirects = async (updatedList: any[]) => {
        try {
            await setDoc(doc(db, 'seo_settings', 'redirects'), { list: updatedList }, { merge: true });
            setRedirects(updatedList);
        } catch (error) {
            console.error("Error saving redirects:", error);
            alert("Failed to save redirects.");
        }
    };

    const addRedirect = () => {
        if (!newRedirect.source || !newRedirect.destination) return;
        const updatedList = [...redirects, { ...newRedirect, id: Date.now() }];
        saveRedirects(updatedList);
        setNewRedirect({ source: '', destination: '', type: '301' });
    };

    const removeRedirect = (id: number) => {
        const updatedList = redirects.filter(r => r.id !== id);
        saveRedirects(updatedList);
    };

    return (
        <div className="space-y-6">
            {/* Health Score Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" /> Site Health Score
                    </h2>
                    <button onClick={analyzeSite} className="text-sm text-primary hover:underline">Refresh Analysis</button>
                </div>

                <div className="flex items-center gap-8">
                    {loading ? (
                        <div className="w-full flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#eee"
                                        strokeWidth="3"
                                    />
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke={score > 80 ? "#22c55e" : score > 50 ? "#eab308" : "#ef4444"}
                                        strokeWidth="3"
                                        strokeDasharray={`${score}, 100`}
                                        className="animate-[spin_1s_ease-out_reverse]"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-bold text-gray-900">{score}</span>
                                    <span className="text-xs text-gray-500">/ 100</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-2">Issues Found ({issues.length})</h3>
                                <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                                    {issues.length === 0 ? (
                                        <p className="text-green-600 flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4" /> No critical issues found!</p>
                                    ) : (
                                        issues.map((issue, idx) => (
                                            <div key={idx} className={`p-2 rounded border text-sm flex items-start gap-2 ${issue.type === 'error' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-yellow-50 border-yellow-100 text-yellow-700'}`}>
                                                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                <span>{issue.message}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Redirect Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary" /> Redirect Manager
                </h2>

                <div className="flex gap-4 mb-6 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Source URL (Old)</label>
                        <input
                            type="text"
                            value={newRedirect.source}
                            onChange={(e) => setNewRedirect({ ...newRedirect, source: e.target.value })}
                            placeholder="/old-page"
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Destination URL (New)</label>
                        <input
                            type="text"
                            value={newRedirect.destination}
                            onChange={(e) => setNewRedirect({ ...newRedirect, destination: e.target.value })}
                            placeholder="/new-page"
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary"
                        />
                    </div>
                    <div className="w-24">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                        <select
                            value={newRedirect.type}
                            onChange={(e) => setNewRedirect({ ...newRedirect, type: e.target.value })}
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white"
                        >
                            <option value="301">301 (Permanent)</option>
                            <option value="302">302 (Temporary)</option>
                        </select>
                    </div>
                    <button
                        onClick={addRedirect}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3">Source</th>
                                <th className="px-4 py-3">Destination</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {redirects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-400">No redirects configured.</td>
                                </tr>
                            ) : (
                                redirects.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-600 font-mono">{r.source}</td>
                                        <td className="px-4 py-3 text-gray-600 font-mono">{r.destination}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded ${r.type === '301' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {r.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => removeRedirect(r.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SiteHealth;
