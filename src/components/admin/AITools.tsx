import { Bot, Sparkles, MessageSquare } from 'lucide-react';

const AITools = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Content Generator</h3>
                <p className="text-gray-500 text-sm mb-4">Generate blog posts and social media content using Ryleni's AI models.</p>
                <div className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg font-medium cursor-not-allowed">Coming Soon</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Prompt Manager</h3>
                <p className="text-gray-500 text-sm mb-4">Manage and optimize system prompts for the AI assistants.</p>
                <div className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg font-medium cursor-not-allowed">Coming Soon</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Chat Analysis</h3>
                <p className="text-gray-500 text-sm mb-4">Analyze customer support chats for sentiment and key topics.</p>
                <div className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg font-medium cursor-not-allowed">Coming Soon</div>
            </div>
        </div>
    );
};

export default AITools;
