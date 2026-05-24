import { useState } from 'react';
import { Settings, FileText, Bot, Activity } from 'lucide-react';
import SeoEditor from './SeoEditor';
import SeoSettings from './SeoSettings';
import RobotsEditor from './RobotsEditor';
import SitemapManager from './SitemapManager';
import SiteHealth from './SiteHealth';
import SeoAnalytics from './SeoAnalytics';

const SeoDashboard = () => {
    const [activeSubTab, setActiveSubTab] = useState<'pages' | 'global' | 'indexing' | 'health' | 'analytics'>('pages');

    return (
        <div className="space-y-6">
            {/* Sub-Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex gap-2 overflow-x-auto">
                <button
                    onClick={() => setActiveSubTab('pages')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSubTab === 'pages' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <FileText className="w-4 h-4" /> On-Page SEO
                </button>
                <button
                    onClick={() => setActiveSubTab('global')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSubTab === 'global' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Settings className="w-4 h-4" /> Global Settings
                </button>
                <button
                    onClick={() => setActiveSubTab('indexing')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSubTab === 'indexing' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Bot className="w-4 h-4" /> Indexing & Crawl
                </button>
                <button
                    onClick={() => setActiveSubTab('health')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSubTab === 'health' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Activity className="w-4 h-4" /> Site Health
                </button>
                <button
                    onClick={() => setActiveSubTab('analytics')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSubTab === 'analytics' ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <Activity className="w-4 h-4" /> Analytics
                </button>
            </div>

            {/* Content Area */}
            <div>
                {activeSubTab === 'pages' && <SeoEditor />}
                {activeSubTab === 'global' && <SeoSettings />}
                {activeSubTab === 'indexing' && (
                    <div className="space-y-6">
                        <RobotsEditor />
                        <SitemapManager />
                    </div>
                )}
                {activeSubTab === 'health' && (
                    <SiteHealth />
                )}
                {activeSubTab === 'analytics' && (
                    <SeoAnalytics />
                )}
            </div>
        </div>
    );
};

export default SeoDashboard;
