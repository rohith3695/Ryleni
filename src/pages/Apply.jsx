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
    faBriefcase,
    faCalendarAlt,
    faUsers,
    faFileAlt
} from "@fortawesome/free-solid-svg-icons";

const InputField = ({ icon, label, type = "text" }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[14px] font-myfont font-medium text-neutral-900 ml-1">{label}</label>
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

const Apply = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/funding_hero_bg_1777045310106.png"
                        alt="Apply Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/60" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season text-white leading-[1.1] mb-6"
                    >
                        Apply for <span className='font-instrument text-violet-600'>Funding</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 font-myfont text-lg md:text-xl max-w-[600px] mx-auto"
                    >
                        Ready to take your startup to the next level? Fill out the form below and our team will get in touch.
                    </motion.p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 px-6 max-w-[900px] mx-auto">
                <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
                    {/* Founder Info */}
                    <div className="flex flex-col gap-8">
                        <h2 className="text-2xl font-season text-neutral-900 border-b border-neutral-100 pb-4">
                            Founder Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField icon={faUser} label="Full Name" />
                            <InputField icon={faEnvelope} label="Email Address" type="email" />
                        </div>
                        <InputField icon={faPhone} label="Phone Number" />
                        <InputField icon={faBriefcase} label="Past Ventures" />
                    </div>

                    {/* Company Info */}
                    <div className="flex flex-col gap-8">
                        <h2 className="text-2xl font-season text-neutral-900 border-b border-neutral-100 pb-4">
                            Company Info
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField icon={faBuilding} label="Company Name" />
                            <InputField icon={faGlobe} label="Website" />
                        </div>
                        <InputField icon={faFileAlt} label="Elevator Pitch" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField icon={faCalendarAlt} label="Founded" />
                            <InputField icon={faUsers} label="Team Size" />
                        </div>
                        <InputField icon={faFileAlt} label="Pitch Deck URL" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8 flex flex-col items-center gap-4">
                        <PillButton label="Submit Application" href="#" />
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
