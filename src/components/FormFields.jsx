import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faFileArrowUp, faTag, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

export const InputField = ({ icon, label, placeholder, type = 'text', value, onChange, error, optional }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label}
            {!optional && <span className="ml-1 text-violet-500">*</span>}
            {optional && <span className="ml-1 normal-case tracking-normal font-normal text-neutral-400">(optional)</span>}
        </label>
        <div className={icon ? 'relative flex items-center group' : undefined}>
            {icon && (
                <div className="absolute left-5 text-neutral-400 group-focus-within:text-violet-600 transition-colors z-10">
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full bg-white border rounded-full py-4 ${icon ? 'pl-14 pr-6' : 'px-6'} text-neutral-700 font-myfont text-[15px] placeholder:text-neutral-300 focus:outline-none transition-all shadow-sm
                    ${error ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20' : 'border-neutral-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20'}`}
            />
        </div>
        {error && <p className="text-[11px] font-myfont text-red-500 pl-2">This field is required</p>}
    </div>
);

export const TextareaField = ({ icon, label, placeholder, value, onChange, error, rows = 4 }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label} <span className="text-violet-500">*</span>
        </label>
        <div className={icon ? 'relative group' : undefined}>
            {icon && (
                <div className="absolute left-5 top-[18px] text-neutral-400 group-focus-within:text-violet-600 transition-colors">
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full bg-white border rounded-2xl py-4 ${icon ? 'pl-14 pr-6' : 'px-6'} text-neutral-700 font-myfont text-[15px] placeholder:text-neutral-300 focus:outline-none transition-all shadow-sm resize-none
                    ${error ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20' : 'border-neutral-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20'}`}
            />
        </div>
        {error && <p className="text-[11px] font-myfont text-red-500 pl-2">This field is required</p>}
    </div>
);

export const SelectField = ({ icon, label, options, value, onChange, error, optional }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label}
            {!optional && <span className="ml-1 text-violet-500">*</span>}
            {optional && <span className="ml-1 normal-case tracking-normal font-normal text-neutral-400">(optional)</span>}
        </label>
        <div className={`relative ${icon ? 'flex items-center group' : ''}`}>
            {icon && (
                <div className="absolute left-5 text-neutral-400 group-focus-within:text-violet-600 transition-colors z-10">
                    <FontAwesomeIcon icon={icon} />
                </div>
            )}
            <select
                value={value}
                onChange={onChange}
                className={`w-full bg-white border rounded-full py-4 ${icon ? 'pl-14' : 'pl-6'} pr-10 text-neutral-700 font-myfont text-[15px] focus:outline-none transition-all shadow-sm appearance-none
                    ${error ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400/20' : 'border-neutral-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20'}`}
            >
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
        {error && <p className="text-[11px] font-myfont text-red-500 pl-2">Please select an option</p>}
    </div>
);

export const FileUploadField = ({ label, accept, hint = 'PDF, PNG, JPG up to 10MB', value, onChange, error, required, optional }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label}
            {required && <span className="ml-1 text-violet-500">*</span>}
            {optional && <span className="ml-1 normal-case tracking-normal font-normal text-neutral-400">(optional)</span>}
        </label>
        <label className={`flex items-center gap-4 w-full bg-white border border-dashed rounded-2xl py-5 px-6 cursor-pointer transition-all group
            ${error ? 'border-red-400 bg-red-50/20' : value ? 'border-violet-400 bg-violet-50/20' : 'border-neutral-300 hover:border-violet-400 hover:bg-violet-50/30'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                ${value ? 'bg-violet-200 text-violet-600' : 'bg-violet-100 text-violet-500 group-hover:bg-violet-200'}`}>
                <FontAwesomeIcon icon={value ? faCheckCircle : faFileArrowUp} className="text-[16px]" />
            </div>
            <div className="overflow-hidden">
                <p className={`font-myfont font-semibold text-[15px] truncate ${value ? 'text-violet-700' : 'text-neutral-700'}`}>
                    {value ? value.name : 'Click to upload'}
                </p>
                <p className="text-neutral-400 font-myfont text-[13px] mt-0.5">
                    {value ? `${(value.size / 1024).toFixed(1)} KB` : hint}
                </p>
            </div>
            <input type="file" accept={accept} className="hidden" onChange={onChange} />
        </label>
        {error && <p className="text-[11px] font-myfont text-red-500 pl-2">Please upload a file</p>}
    </div>
);

export const IndustriesField = ({ tags, setTags, error }) => {
    const [input, setInput] = useState('');

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) setTags([...tags, trimmed]);
        setInput('');
    };

    const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
    };

    return (
        <div className="flex flex-col gap-2.5 w-full">
            <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
                Industries Preferred <span className="text-violet-500">*</span>
                <span className="ml-2 normal-case tracking-normal font-normal text-neutral-400">add industries</span>
            </label>
            <div className={`w-full bg-white border rounded-2xl py-3 px-4 transition-all shadow-sm
                ${error ? 'border-red-400' : 'border-neutral-200 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500/20'}`}>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-1.5 bg-violet-100 text-violet-700 font-myfont font-semibold text-[12px] px-3 py-1.5 rounded-full">
                                <FontAwesomeIcon icon={faTag} className="text-[10px]" />
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)} className="text-violet-400 hover:text-violet-700 transition-colors ml-0.5">
                                    <FontAwesomeIcon icon={faTimes} className="text-[10px]" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. Fintech, SaaS, HealthTech… press Enter to add"
                        className="flex-1 bg-transparent text-neutral-700 font-myfont text-[14px] placeholder:text-neutral-300 focus:outline-none py-1 px-2"
                    />
                    <button type="button" onClick={addTag} className="flex items-center gap-1 text-[11px] font-myfont font-bold text-violet-600 hover:text-violet-800 transition-colors px-2 py-1 rounded-full hover:bg-violet-50">
                        <FontAwesomeIcon icon={faPlus} />
                        Add
                    </button>
                </div>
            </div>
            {error && <p className="text-[11px] font-myfont text-red-500 pl-2">Please add at least one industry</p>}
        </div>
    );
};
