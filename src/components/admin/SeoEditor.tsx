import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, Globe, AlertTriangle, CheckCircle, Eye, Code } from 'lucide-react';
import SerpPreview from './SerpPreview';
import SocialPreview from './SocialPreview';
import SchemaBuilder from './SchemaBuilder';

const PAGES = [
    { id: 'home', name: 'Home', path: '/' },
    { id: 'portfolio', name: 'Portfolio', path: '/portfolio' },
    { id: 'service', name: 'Service', path: '/service' },
    { id: 'apply', name: 'Apply', path: '/apply' },
    { id: 'founder', name: 'Founder', path: '/founder' },
    { id: 'careers', name: 'Careers', path: '/careers' },
];

const SeoEditor = () => {
    const [selectedPage, setSelectedPage] = useState(PAGES[0]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'content' | 'previews' | 'schema'>('content');

    const [globalDomain, setGlobalDomain] = useState('rylenivesture.com');
    const [globalProtocol, setGlobalProtocol] = useState('https');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: '',
        ogImage: '',
        canonical: '',
        noindex: false,
        schema: {},
    });

    useEffect(() => {
        fetchMetadata(selectedPage.id);
    }, [selectedPage]);

    useEffect(() => {
        const fetchGlobalSettings = async () => {
            try {
                const docRef = doc(db, 'seo_settings', 'global');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.domain) setGlobalDomain(data.domain);
                    if (data.protocol) setGlobalProtocol(data.protocol);
                }
            } catch (err) {
                console.error("Failed to fetch global settings", err);
            }
        };
        fetchGlobalSettings();
    }, []);

    const fetchMetadata = async (pageId: string) => {
        setLoading(true);
        try {
            const docRef = doc(db, 'seo_settings', pageId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    keywords: data.keywords || '',
                    ogImage: data.ogImage || '',
                    canonical: data.canonical || '',
                    noindex: data.noindex || false,
                    schema: data.schema || {},
                });
            } else {
                setFormData({
                    title: '',
                    description: '',
                    keywords: '',
                    ogImage: '',
                    canonical: '',
                    noindex: false,
                    schema: {},
                });
            }
        } catch (err) {
            console.error("Error fetching SEO data:", err);
            alert("Failed to load SEO data.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'seo_settings', selectedPage.id), formData, { merge: true });
            alert("SEO settings saved successfully!");
        } catch (err) {
            console.error("Error saving SEO data:", err);
            alert("Failed to save SEO data.");
        } finally {
            setSaving(false);
        }
    };

    const getLengthColor = (current: number, min: number, max: number) => {
        if (current === 0) return 'text-gray-400';
        if (current < min) return 'text-yellow-600';
        if (current > max) return 'text-red-500';
        return 'text-green-600';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Page List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Pages
                    </h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {PAGES.map(page => (
                        <button
                            key={page.id}
                            onClick={() => setSelectedPage(page)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${selectedPage.id === page.id
                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                        >
                            {page.name}
                            <span className="block text-xs text-gray-400 font-normal mt-0.5">{page.path}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Editor Form */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[600px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Editing: {selectedPage.name}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saving || loading}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center">
                        <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Internal Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('content')}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Content & Meta
                            </button>
                            <button
                                onClick={() => setActiveTab('previews')}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'previews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                <Eye className="w-4 h-4" /> Live Previews
                            </button>
                            <button
                                onClick={() => setActiveTab('schema')}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'schema' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                <Code className="w-4 h-4" /> Schema Markup
                            </button>
                        </div>

                        {activeTab === 'content' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                {/* Indexing Warnings */}
                                {formData.noindex && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3 text-red-800 text-sm">
                                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold">Warning:</span> 'No Index' is enabled. This page will be hidden from Google search results.
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Page Title &lt;title&gt;</label>
                                        <span className={`text-xs font-medium ${getLengthColor(formData.title.length, 30, 60)}`}>
                                            {formData.title.length} / 60 chars
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="e.g. Ryleni Venture Studio | Build & Scale"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                                        <span className={`text-xs font-medium ${getLengthColor(formData.description.length, 120, 160)}`}>
                                            {formData.description.length} / 160 chars
                                        </span>
                                    </div>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="e.g. Ryleni Venture Studio helps startups with funding, mentorship..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                                    <input
                                        type="text"
                                        value={formData.keywords}
                                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="Separate with commas"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.ogImage}
                                            onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            placeholder="https://"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                        <input
                                            type="text"
                                            value={formData.canonical}
                                            onChange={(e) => setFormData({ ...formData, canonical: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            placeholder="Leave empty to use default"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Indexing & Crawling</h4>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.noindex ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 bg-white group-hover:border-red-400'}`}>
                                            {formData.noindex && <CheckCircle className="w-3.5 h-3.5" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={formData.noindex}
                                            onChange={(e) => setFormData({ ...formData, noindex: e.target.checked })}
                                            className="hidden"
                                        />
                                        <span className={`${formData.noindex ? 'text-red-700 font-medium' : 'text-gray-600'}`}>
                                            Prevent Google from indexing this page (noindex)
                                        </span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2 pl-8">
                                        Check this only if you want to hide this page from search results (e.g. internal pages, duplicate content).
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'previews' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <SerpPreview
                                    title={formData.title}
                                    description={formData.description}
                                    url={`${globalProtocol}://${globalDomain}${selectedPage.path}`}
                                />
                                <SocialPreview
                                    title={formData.title}
                                    description={formData.description}
                                    image={formData.ogImage}
                                    domain={globalDomain}
                                />
                            </div>
                        )}

                        {activeTab === 'schema' && (
                            <div className="animate-in fade-in duration-300">
                                <SchemaBuilder
                                    initialData={formData.schema}
                                    onChange={(schema) => setFormData({ ...formData, schema })}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeoEditor;
