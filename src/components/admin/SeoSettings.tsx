import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Loader2, Settings } from 'lucide-react';

const SeoSettings = () => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        domain: '',
        protocol: 'https',
        targetMarket: '',
        brandKeywords: '',
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'seo_settings', 'global');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFormData(docSnap.data() as any);
            }
        } catch (error) {
            console.error("Error fetching global settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'seo_settings', 'global'), formData, { merge: true });
            alert('Global SEO settings saved!');
        } catch (error) {
            console.error("Error saving global settings:", error);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" /> Project Context & Global Settings
                </h2>
                <button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Context
                </button>
            </div>

            {loading ? (
                <div className="py-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Protocol</label>
                            <select
                                value={formData.protocol}
                                onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                            >
                                <option value="https">HTTPS (Secure - Recommended)</option>
                                <option value="http">HTTP (Not Recommended)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Domain Directory</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    {formData.protocol}://
                                </span>
                                <input
                                    type="text"
                                    value={formData.domain}
                                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                    placeholder="www.rylenivesture.com"
                                    className="flex-1 min-w-0 block w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Market / Region</label>
                        <input
                            type="text"
                            value={formData.targetMarket}
                            onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                            placeholder="e.g. United States, Global English, UK Fintech"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">Helps identifying local SEO opportunities.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Keywords & Competitors</label>
                        <textarea
                            value={formData.brandKeywords}
                            onChange={(e) => setFormData({ ...formData, brandKeywords: e.target.value })}
                            rows={3}
                            placeholder="Enter main brand keywords and key competitors separated by commas..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">Used for content analysis and keyword suggestion features.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeoSettings;
