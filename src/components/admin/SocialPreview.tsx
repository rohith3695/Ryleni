import React from 'react';

interface SocialPreviewProps {
    title: string;
    description: string;
    image: string;
    domain: string;
}

const SocialPreview: React.FC<SocialPreviewProps> = ({ title, description, image, domain }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3 text-left">Social Share Preview</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden max-w-sm mx-auto bg-gray-50 text-left">
                <div className="aspect-[1.91/1] bg-gray-200 w-full flex items-center justify-center overflow-hidden relative group">
                    {image ? (
                        <img src={image} alt="OG" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <span className="text-sm">No Image</span>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-[#f0f2f5]">
                    <p className="text-xs text-gray-500 uppercase mb-0.5 truncate">{domain}</p>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 truncate">{title || 'Page Title'}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{description || 'Description...'}</p>
                </div>
            </div>
        </div>
    );
};

export default SocialPreview;
