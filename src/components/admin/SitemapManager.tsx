import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, FileCode, CheckCircle, Download, ExternalLink, XCircle } from 'lucide-react';

const PAGES = [
    { id: 'home', name: 'Home', path: '/' },
    { id: 'portfolio', name: 'Portfolio', path: '/portfolio' },
    { id: 'service', name: 'Service', path: '/service' },
    { id: 'apply', name: 'Apply', path: '/apply' },
    { id: 'founder', name: 'Founder', path: '/founder' },
    { id: 'careers', name: 'Careers', path: '/careers' },
];

const SitemapManager = () => {
    const [includedPages, setIncludedPages] = useState<Record<string, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [domain, setDomain] = useState('https://rylenivesture.com');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            // Fetch inclusion settings
            const sitemapDoc = await getDoc(doc(db, 'seo_settings', 'sitemap'));
            if (sitemapDoc.exists()) {
                setIncludedPages(sitemapDoc.data().included || {});
            } else {
                // Default all to true
                const defaults: Record<string, boolean> = {};
                PAGES.forEach(p => defaults[p.id] = true);
                setIncludedPages(defaults);
            }

            // Fetch domain from global settings
            const globalDoc = await getDoc(doc(db, 'seo_settings', 'global'));
            if (globalDoc.exists() && globalDoc.data().domain) {
                const protocol = globalDoc.data().protocol || 'https';
                setDomain(`${protocol}://${globalDoc.data().domain}`);
            }
        } catch (error) {
            console.error("Error fetching sitemap settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'seo_settings', 'sitemap'), { included: includedPages }, { merge: true });
            alert('Sitemap settings saved!');
        } catch (error) {
            console.error("Error saving sitemap settings:", error);
            alert('Failed to save.');
        } finally {
            setSaving(false);
        }
    };

    const generateXml = () => {
        const date = new Date().toISOString().split('T')[0];
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        PAGES.forEach(page => {
            if (includedPages[page.id]) {
                xml += `  <url>\n`;
                xml += `    <loc>${domain}${page.path}</loc>\n`;
                xml += `    <lastmod>${date}</lastmod>\n`;
                xml += `    <changefreq>weekly</changefreq>\n`;
                xml += `    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>\n`;
                xml += `  </url>\n`;
            }
        });

        xml += `</urlset>`;
        return xml;
    };

    const handleDownload = () => {
        const xml = generateXml();
        const element = document.createElement("a");
        const file = new Blob([xml], { type: 'text/xml' });
        element.href = URL.createObjectURL(file);
        element.download = "sitemap.xml";
        document.body.appendChild(element);
        element.click();
    };

    const togglePage = (id: string) => {
        setIncludedPages(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-primary" /> Sitemap Manager
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
                    >
                        <Download className="w-4 h-4" /> Download XML
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Settings
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
            ) : (
                <div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-sm text-blue-800 flex items-start gap-3">
                        <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold mb-1">How to use:</p>
                            <p>Select the pages you want to include in your sitemap. Download the XML file and upload it to the root of your website (public folder), or submit it directly to Google Search Console.</p>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Page Name</th>
                                    <th className="px-6 py-3">Path</th>
                                    <th className="px-6 py-3 text-center">In Sitemap</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {PAGES.map(page => (
                                    <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">{page.name}</td>
                                        <td className="px-6 py-3 text-gray-500 font-mono">{page.path}</td>
                                        <td className="px-6 py-3 text-center">
                                            <button
                                                onClick={() => togglePage(page.id)}
                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${includedPages[page.id]
                                                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {includedPages[page.id] ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
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

export default SitemapManager;
