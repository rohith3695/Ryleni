import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PillButton from '../components/Pillbutton';
import {
    faUserGroup,
    faRocket,
    faGlobe,
    faArrowTrendUp,
    faLink,
} from '@fortawesome/free-solid-svg-icons';

const sections = [
    { id: 'founder-dna', label: 'Founder DNA', icon: faUserGroup },
    { id: 'venture-core', label: 'Venture Core', icon: faRocket },
    { id: 'market-intel', label: 'Market Intel', icon: faGlobe },
    { id: 'traction', label: 'Traction', icon: faArrowTrendUp },
    { id: 'the-ask', label: 'The Ask', icon: faLink },
];

const InputField = ({ label, placeholder, type = 'text', required }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label}{required && ' *'}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-white border border-neutral-200 rounded-full py-4 px-6 text-neutral-700 font-myfont text-[16px] placeholder:text-neutral-300 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all shadow-sm"
        />
    </div>
);

const TextareaField = ({ label, placeholder, required }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label}{required && ' *'}
        </label>
        <textarea
            rows={5}
            placeholder={placeholder}
            className="w-full bg-white border border-neutral-200 rounded-2xl py-4 px-6 text-neutral-700 font-myfont text-[16px] placeholder:text-neutral-300 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all shadow-sm resize-none"
        />
    </div>
);

const SelectField = ({ label, options, required }) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase">
            {label}{required && ' *'}
        </label>
        <div className="relative">
            <select
                className="w-full bg-white border border-neutral-200 rounded-full py-4 px-6 pr-12 text-neutral-700 font-myfont text-[16px] focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all shadow-sm appearance-none"
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
    </div>
);

const sectionContent = {
    'founder-dna': (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <FontAwesomeIcon icon={faUserGroup} />
                </div>
                <h2 className="text-3xl font-season text-neutral-900">Founder Identity</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" placeholder="John Doe" required />
                <InputField label="Email" placeholder="john@example.com" type="email" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2.5 w-full">
                    <label className="text-[12px] font-myfont font-bold tracking-[0.18em] text-neutral-500 uppercase flex items-center gap-2">
                        <FontAwesomeIcon icon={faLink} className="text-violet-600" />
                        LinkedIn URL
                    </label>
                    <input
                        type="url"
                        placeholder="linkedin.com/in/..."
                        className="w-full bg-white border border-neutral-200 rounded-full py-4 px-6 text-neutral-700 font-myfont text-[16px] placeholder:text-neutral-300 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all shadow-sm"
                    />
                </div>
                <InputField label="Past Ventures" placeholder="Previous startups or projects" />
            </div>
        </div>
    ),
    'venture-core': (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <FontAwesomeIcon icon={faRocket} />
                </div>
                <h2 className="text-3xl font-season text-neutral-900">Venture Architecture</h2>
            </div>
            <TextareaField
                label="Problem Statement (Why Now?)"
                placeholder="Define the structural gap in the market..."
                required
            />
            <TextareaField
                label="The Wedge (Solution)"
                placeholder="How specifically do you penetrate the market?"
                required
            />
            <InputField
                label="Unfair Advantage"
                placeholder="IP, Network, or Speed?"
                required
            />
        </div>
    ),
    'market-intel': (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <FontAwesomeIcon icon={faGlobe} />
                </div>
                <h2 className="text-3xl font-season text-neutral-900">Market Intelligence</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="TAM (Total Market Size)" placeholder="e.g. $10B" required />
                <InputField label="Target Persona" placeholder="e.g. SaaS Founders" required />
            </div>
            <TextareaField
                label="Go-to-Market Strategy"
                placeholder="How will you acquire your first 100 users?"
                required
            />
        </div>
    ),
    'traction': (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                </div>
                <h2 className="text-3xl font-season text-neutral-900">Growth & Traction</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Current Stage"
                    required
                    options={[
                        { value: 'idea', label: 'Idea' },
                        { value: 'prototype', label: 'Prototype' },
                        { value: 'mvp', label: 'MVP' },
                        { value: 'revenue', label: 'Revenue Stage' },
                        { value: 'growth', label: 'Growth Stage' },
                    ]}
                />
                <InputField label="Monthly Revenue (₹)" placeholder="0" type="number" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Total Users / Clients" placeholder="e.g. 500" type="number" />
                <InputField label="Monthly Burn Rate (₹)" placeholder="0" type="number" />
            </div>
        </div>
    ),
    'the-ask': (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    <FontAwesomeIcon icon={faLink} />
                </div>
                <h2 className="text-3xl font-season text-neutral-900">Capital & The Raise</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Fundraising Goal (₹)" placeholder="0" type="number" required />
                <InputField label="Valuation Expectation (₹)" placeholder="Post-money valuation" />
            </div>
            <InputField label="Pitch Deck Link (Drive/Docsend)" placeholder="https://..." type="url" required />
            <div className="flex justify-center pt-4">
                <PillButton label="Submit to Ryleni Studio" href="#" />
            </div>
        </div>
    ),
};

const Founder = () => {
    const [activeSection, setActiveSection] = useState(0);

    const goTo = (index) => setActiveSection(index);
    const goNext = () => setActiveSection((prev) => Math.min(prev + 1, sections.length - 1));
    const goPrev = () => setActiveSection((prev) => Math.max(prev - 1, 0));

    return (
        <div className="min-h-screen bg-white">

            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/funding_hero_bg_1777045310106.png"
                        alt="Founder Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/65" />
                </div>

                <div className="relative z-10 text-center px-6 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold tracking-[0.2em] text-violet-400 uppercase mb-4 font-myfont"
                    >
                        FOUNDERS
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season text-white leading-[1.1] mb-4"
                    >
                        Apply as <span className="font-instrument italic text-violet-400">Founder</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 font-myfont text-lg md:text-xl max-w-[600px] mx-auto"
                    >
                        Build your venture inside Ryleni Studios.
                    </motion.p>
                </div>
            </section>


            <section className="py-20 px-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row gap-10 items-start">


                    <div className="w-full md:w-[300px] shrink-0">
                        <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-5 flex flex-col gap-2">
                            {sections.map((section, index) => {
                                const isActive = activeSection === index;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => goTo(index)}
                                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-200 font-myfont font-semibold tracking-widest text-[12px] uppercase w-full
                                            ${isActive
                                                ? 'border border-neutral-900 text-neutral-900 bg-white shadow-sm'
                                                : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 border border-transparent'
                                            }`}
                                    >
                                        <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[15px] ${isActive ? 'bg-violet-100 text-violet-600' : 'bg-neutral-100 text-neutral-400'}`}>
                                            <FontAwesomeIcon icon={section.icon} />
                                        </span>
                                        {section.label}
                                        {isActive && (
                                            <svg className="ml-auto shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                    <div className="flex-1 min-w-0">
                        <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-10 md:p-14">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSection}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    >
                                        {sectionContent[sections[activeSection].id]}
                                    </motion.div>
                                </AnimatePresence>
                            </form>


                            <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-100">
                                <button
                                    onClick={goPrev}
                                    disabled={activeSection === 0}
                                    className="text-[11px] font-myfont font-bold tracking-widest uppercase text-neutral-400 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous Section
                                </button>

                                <div className="flex items-center gap-2">
                                    {sections.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeSection ? 'w-10 bg-violet-600' : 'w-4 bg-neutral-200'}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={goNext}
                                    disabled={activeSection === sections.length - 1}
                                    className="text-[11px] font-myfont font-bold tracking-widest uppercase text-neutral-900 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next Section
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Founder;
