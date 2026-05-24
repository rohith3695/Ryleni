import React from 'react';

interface SerpPreviewProps {
    title: string;
    description: string;
    url: string;
}

const SerpPreview: React.FC<SerpPreviewProps> = ({ title, description, url }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3 text-left">Google Search Preview</h4>
            <div className="font-sans text-left">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">R</div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-900 leading-none">Ryleni Venture Studio</span>
                        <span className="text-xs text-gray-500 leading-none mt-0.5">{url}</span>
                    </div>
                </div>
                <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate font-medium">
                    {title || 'Page Title'}
                </h3>
                <p className="text-sm text-[#4d5156] mt-1 line-clamp-2">
                    {description || 'Page meta description will appear here...'}
                </p>
            </div>
        </div>
    );
};

export default SerpPreview;
