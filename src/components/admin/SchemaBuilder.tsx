import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

interface SchemaBuilderProps {
    initialData?: any;
    onChange: (data: any) => void;
}

const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ initialData, onChange }) => {
    const [type, setType] = useState('Organization');
    const [data, setData] = useState({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ryleni Venture Studio",
        "url": "https://rylenivesture.com",
        "logo": "https://rylenivesture.com/logo.png",
        "description": "",
        ...initialData
    });

    useEffect(() => {
        if (initialData) {
            setData({ ...data, ...initialData });
            if (initialData['@type']) setType(initialData['@type']);
        }
    }, [initialData]);

    const handleChange = (key: string, value: string) => {
        const newData = { ...data, [key]: value };
        setData(newData);
        onChange(newData);
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
        const newData = { ...data, "@type": newType };
        setData(newData);
        onChange(newData);
    };

    return (
        <div className="space-y-4 border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-700">Structured Data (JSON-LD)</h4>
                <div className="flex gap-2">
                    <select
                        value={type}
                        onChange={(e) => handleTypeChange(e.target.value)}
                        className="text-xs border border-gray-300 rounded-lg px-2 py-1 outline-none bg-white focus:ring-1 focus:ring-primary"
                    >
                        <option value="Organization">Organization</option>
                        <option value="LocalBusiness">Local Business</option>
                        <option value="Service">Service</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">URL</label>
                    <input
                        type="text"
                        value={data.url || ''}
                        onChange={(e) => handleChange('url', e.target.value)}
                        className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Logo URL</label>
                    <input
                        type="text"
                        value={data.logo || ''}
                        onChange={(e) => handleChange('logo', e.target.value)}
                        className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-primary bg-white"
                    />
                </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 relative group">
                <pre className="text-xs text-green-400 font-mono overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-2">
                    {JSON.stringify(data, null, 2)}
                </pre>
                <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
                    className="absolute top-2 right-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy to clipboard"
                >
                    <Copy className="w-4 h-4" />
                </button>
            </div>
            <p className="text-xs text-gray-500">
                This schema will be automatically injected into the page &lt;head&gt;.
            </p>
        </div>
    );
};

export default SchemaBuilder;
