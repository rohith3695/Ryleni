import React from 'react';
import { motion } from 'framer-motion';
import PillButton from '../components/Pillbutton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faEnvelope,
    faPhone,
    faBuilding,
    faGlobe,
    faFileAlt,
    faDollarSign,
    faChartLine
} from "@fortawesome/free-solid-svg-icons";

const InputField = ({ icon, label, type = "text" }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[14px] font-myfont text-neutral-900 ml-1">{label}</label>
        <div className="relative flex items-center group">
            <div className="absolute left-5 text-neutral-400 group-focus-within:text-violet-600 transition-colors">
                <FontAwesomeIcon icon={icon} />
            </div>
            <input
                type={type}
                className="w-full bg-white border border-neutral-200 rounded-full py-4 pl-14 pr-6 text-neutral-900 font-myfont text-[15px] focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600/20 transition-all placeholder:text-neutral-300 shadow-sm"
            />
        </div>
    </div>
);

const SelectField = ({ icon, label, options, placeholder }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[14px] font-myfont text-neutral-900 ml-1">{label}</label>
        <div className="relative flex items-center group">
            <div className="absolute left-5 text-neutral-400 group-focus-within:text-violet-600 transition-colors z-10">
                <FontAwesomeIcon icon={icon} />
            </div>
            <select
                className="w-full bg-white border border-neutral-200 rounded-full py-4 pl-14 pr-10 text-neutral-900 font-myfont text-[15px] focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600/20 transition-all shadow-sm appearance-none invalid:text-neutral-400"
                defaultValue=""
                required
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute right-5 pointer-events-none text-neutral-400">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    </div>
);

const TextareaField = ({ icon, label }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[14px] font-myfont text-neutral-900 ml-1">{label}</label>
        <div className="relative group">
            <div className="absolute left-5 top-5 text-neutral-400 group-focus-within:text-violet-600 transition-colors">
                <FontAwesomeIcon icon={icon} />
            </div>
            <textarea
                rows={5}
                className="w-full bg-white border border-neutral-200 rounded-3xl py-4 pl-14 pr-6 text-neutral-900 font-myfont text-[15px] focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600/20 transition-all shadow-sm resize-none"
            />
        </div>
    </div>
);

const Apply = () => {
    const ticketSizeOptions = [
        { value: "under-100k", label: "Under $100K" },
        { value: "100k-500k", label: "$100K - $500K" },
        { value: "500k-1m", label: "$500K - $1M" },
        { value: "1m-plus", label: "$1M+" }
    ];

    const stageFocusOptions = [
        { value: "pre-seed", label: "Pre-Seed" },
        { value: "seed", label: "Seed" },
        { value: "series-a", label: "Series A" },
        { value: "series-b", label: "Series B+" }
    ];

    return (
        <div className="min-h-screen bg-white">

            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/funding_hero_bg_1777045310106.png"
                        alt="Apply Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/60" />
                </div>

                <div className="relative z-10 text-center px-6 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold tracking-[0.2em] text-violet-400 uppercase mb-4"
                    >
                        INVESTORS
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season text-white leading-[1.1] mb-4"
                    >
                        Register as <span className='font-instrument text-violet-400'>Investor</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 font-myfont text-lg md:text-xl max-w-[600px] mx-auto"
                    >
                        Co-invest in studio-built ventures with conviction.
                    </motion.p>
                </div>
            </section>


            <section className="py-20 px-6 max-w-[800px] mx-auto">
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <InputField icon={faUser} label="Full Name *" />
                    <InputField icon={faEnvelope} label="Email *" type="email" />
                    <InputField icon={faPhone} label="Phone" />
                    <InputField icon={faBuilding} label="Firm / Family Office *" />
                    <SelectField 
                        icon={faDollarSign} 
                        label="Typical Ticket Size (USD) *" 
                        options={ticketSizeOptions}
                        placeholder="Select typical ticket size (usd)" 
                    />
                    <SelectField 
                        icon={faChartLine} 
                        label="Stage Focus" 
                        options={stageFocusOptions}
                        placeholder="Select stage focus" 
                    />
                    <TextareaField icon={faFileAlt} label="Investment Thesis / Sectors *" />
                    <InputField icon={faGlobe} label="Website" />


                    <div className="pt-8 flex flex-col items-center gap-4">
                        <PillButton label="SUBMIT APPLICATION" href="#" />
                        <p className="text-neutral-400 font-myfont text-sm">
                            Secure 256-bit encrypted transmission.
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Apply;
