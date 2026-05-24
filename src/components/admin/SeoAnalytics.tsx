import { useState, useEffect } from 'react';
import { BarChart3, LogOut, Loader2 } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

const SeoAnalytics = () => {
    const [user, setUser] = useState<any>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [sites, setSites] = useState<any[]>([]);
    const [selectedSite, setSelectedSite] = useState<string>('');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            setError(null);
            const result = await signInWithPopup(auth, googleProvider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;

            if (token) {
                setAccessToken(token);
                setUser(result.user);
                fetchSites(token);
            }
        } catch (err: any) {
            console.error("Login failed", err);
            if (err.code === 'auth/unauthorized-domain') {
                setError(`Domain Not Authorized: Please add '${window.location.hostname}' to Firebase Console > Authentication > Settings > Authorized domains.`);
            } else {
                setError(err.message || 'Login failed');
            }
        }
    };

    const handleLogout = () => {
        signOut(auth);
        setUser(null);
        setAccessToken(null);
        setSites([]);
        setData(null);
    };

    const fetchSites = async (token: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();

            if (!response.ok) {
                const apiError = result.error?.message || "Unknown error";
                setSites([]);
                setError(`Google API Error: ${apiError}. Please ensure the Search Console API is enabled in your Google Cloud Project.`);
                return;
            }

            if (result.siteEntry && result.siteEntry.length > 0) {
                const verifiedSites = result.siteEntry;
                setSites(verifiedSites);
                setSelectedSite(verifiedSites[0].siteUrl);
                fetchAnalytics(token, verifiedSites[0].siteUrl);
            } else {
                setSites([]);
                setError("No sites found. Make sure you've verified your site in Google Search Console.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch sites.");
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async (token: string, siteUrl: string) => {
        setLoading(true);
        try {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startDate,
                    endDate,
                    dimensions: ['date'],
                    rowLimit: 30
                })
            });
            const result = await response.json();

            if (result.rows) {
                const totalClicks = result.rows.reduce((acc: number, row: any) => acc + row.clicks, 0);
                const totalImpressions = result.rows.reduce((acc: number, row: any) => acc + row.impressions, 0);
                const avgCtr = (totalClicks / totalImpressions) * 100;

                // Sort rows by date
                const sortedRows = result.rows.sort((a: any, b: any) => a.keys[0].localeCompare(b.keys[0]));

                setData({
                    clicks: totalClicks,
                    impressions: totalImpressions,
                    ctr: avgCtr.toFixed(2),
                    chartData: sortedRows.map((row: any) => row.clicks)
                });
            } else {
                setData({ clicks: 0, impressions: 0, ctr: 0, chartData: [] });
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch analytics data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken && selectedSite) {
            fetchAnalytics(accessToken, selectedSite);
        }
    }, [selectedSite]);

    if (!user) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Google Search Console</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    View your site's search performance, clicks, impressions, and CTR directly from your dashboard.
                </p>
                <button
                    onClick={handleLogin}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Connect Google Account
                </button>
                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        {user.photoURL && <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="User" />}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                Search Performance
                            </h2>
                            <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={selectedSite}
                            onChange={(e) => setSelectedSite(e.target.value)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                        >
                            {sites.map(site => (
                                <option key={site.siteUrl} value={site.siteUrl}>{site.siteUrl}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Disconnect"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {loading && !data ? (
                    <div className="py-20 flex justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
                    </div>
                ) : data ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <p className="text-sm text-blue-600 font-medium mb-1">Total Clicks</p>
                                <h3 className="text-2xl font-bold text-blue-900">{data.clicks.toLocaleString()}</h3>
                                <p className="text-xs text-blue-500 flex items-center gap-1 mt-1">Last 30 Days</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <p className="text-sm text-purple-600 font-medium mb-1">Total Impressions</p>
                                <h3 className="text-2xl font-bold text-purple-900">{data.impressions.toLocaleString()}</h3>
                                <p className="text-xs text-purple-500 flex items-center gap-1 mt-1">Last 30 Days</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                <p className="text-sm text-orange-600 font-medium mb-1">Average CTR</p>
                                <h3 className="text-2xl font-bold text-orange-900">{data.ctr}%</h3>
                                <p className="text-xs text-orange-500 flex items-center gap-1 mt-1">Last 30 Days</p>
                            </div>
                        </div>

                        {/* Simple Chart Visualization */}
                        <div className="h-64 flex items-end justify-between gap-1 px-4 border-b border-gray-200 pb-2">
                            {data.chartData && data.chartData.length > 0 ? (
                                data.chartData.map((clicks: number, i: number) => {
                                    const max = Math.max(...data.chartData);
                                    const height = max > 0 ? (clicks / max) * 100 : 0;
                                    return (
                                        <div key={i} className="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-colors relative group" style={{ height: `${Math.max(height, 5)}%` }}>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                                                {clicks} clicks
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="w-full text-center text-gray-400 py-10">No data available for this period.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-500">Select a site to view analytics.</div>
                )}
                {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
            </div>

        </div>
    );
};

export default SeoAnalytics;
