import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LayoutDashboard, Globe, Bot, LogOut, CalendarCheck } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import ApplicationsTable from '../components/admin/ApplicationsTable';
import SeoDashboard from '../components/admin/SeoDashboard';
import AITools from '../components/admin/AITools';
import JobApplicationsTable from '../components/admin/JobApplicationsTable';
import MeetingBookingsTable from '../components/admin/MeetingBookingsTable';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('crm');

    // Hardcoded password - simple security as requested
    const ADMIN_PASSWORD = "ryleni987";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
                >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
                    <p className="text-gray-500 mb-8">Enter the password to view the dashboard.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primaryDark transition-colors"
                        >
                            Access Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <HelmetProvider>
            <div className="min-h-screen bg-gray-50 pb-20 font-sans text-left">
                {/* Header / Nav */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-lg">R</span>
                            Admin Dashboard
                        </h1>

                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex gap-6 -mb-px overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveTab('crm')}
                                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'crm'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                CRM
                            </button>
                            <button
                                onClick={() => setActiveTab('meetings')}
                                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'meetings'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <CalendarCheck className="w-4 h-4" />
                                Meeting Bookings
                            </button>
                            <button
                                onClick={() => setActiveTab('jobs')}
                                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'jobs'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Job Applications
                            </button>
                            <button
                                onClick={() => setActiveTab('seo')}
                                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'seo'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Globe className="w-4 h-4" />
                                SEO & Traffic
                            </button>
                            <button
                                onClick={() => setActiveTab('ai')}
                                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'ai'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <Bot className="w-4 h-4" />
                                AI Tools
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'crm' && <ApplicationsTable />}
                        {activeTab === 'meetings' && <MeetingBookingsTable />}
                        {activeTab === 'jobs' && <JobApplicationsTable />}
                        {activeTab === 'seo' && <SeoDashboard />}
                        {activeTab === 'ai' && <AITools />}
                    </motion.div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default Admin;
