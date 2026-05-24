import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PillButton from '../components/Pillbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faBriefcase, faBuilding, faTag, faLink } from '@fortawesome/free-solid-svg-icons';
import { InputField, TextareaField, SelectField, IndustriesField, FileUploadField } from '../components/FormFields';

const Apply = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        about: '',
        minTicketSize: '',
        maxTicketSize: '',
        entityType: '',
        linkedinId: '',
        contactNumber: '',
        mailId: '',
    });
    const [portfolioFile, setPortfolioFile] = useState(null);
    const [industries, setIndustries] = useState([]);
    const [touched, setTouched] = useState(false);

    const field = (key, type = 'text') => ({
        value: formData[key],
        onChange: (e) => setFormData((p) => ({ ...p, [key]: e.target.value })),
        error: touched && !formData[key].trim(),
        type,
    });

    const isValid =
        formData.fullName.trim() &&
        formData.about.trim() &&
        formData.minTicketSize.trim() &&
        formData.maxTicketSize.trim() &&
        formData.entityType !== '' &&
        industries.length > 0 &&
        formData.linkedinId.trim() &&
        formData.contactNumber.trim() &&
        formData.mailId.trim();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched(true);
    };

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
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                    <InputField
                        icon={faUser}
                        label="Full Name"
                        placeholder="John Doe"
                        {...field('fullName')}
                    />

                    <TextareaField
                        icon={faBriefcase}
                        label="About"
                        placeholder="Tell us about yourself and your investment background..."
                        rows={3}
                        {...field('about')}
                    />

                    <FileUploadField
                        label="Investor Portfolio"
                        accept=".pdf,.doc,.docx"
                        hint="PDF / DOC / DOCX"
                        value={portfolioFile}
                        onChange={(e) => setPortfolioFile(e.target.files[0] || null)}
                        error={false}
                        optional
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            icon={faTag}
                            label="Minimum Ticket Size"
                            placeholder="e.g. ₹10 Lakhs"
                            {...field('minTicketSize')}
                        />
                        <InputField
                            icon={faTag}
                            label="Maximum Ticket Size"
                            placeholder="e.g. ₹5 Crores"
                            {...field('maxTicketSize')}
                        />
                    </div>

                    <SelectField
                        icon={faBuilding}
                        label="Entity / Individual"
                        value={formData.entityType}
                        onChange={(e) => setFormData((p) => ({ ...p, entityType: e.target.value }))}
                        error={touched && formData.entityType === ''}
                        options={[
                            { value: '', label: 'Select type' },
                            { value: 'individual', label: 'Individual' },
                            { value: 'family-office', label: 'Family Office' },
                            { value: 'venture-fund', label: 'Venture Fund' },
                            { value: 'corporate', label: 'Corporate / Strategic' },
                            { value: 'angel-network', label: 'Angel Network' },
                        ]}
                    />

                    <IndustriesField
                        tags={industries}
                        setTags={setIndustries}
                        error={touched && industries.length === 0}
                    />

                    <InputField
                        icon={faLink}
                        label="LinkedIn Id"
                        placeholder="linkedin.com/in/yourprofile"
                        type="url"
                        {...field('linkedinId')}
                    />

                    <InputField
                        icon={faPhone}
                        label="Contact Number"
                        placeholder="+91 00000 00000"
                        type="tel"
                        {...field('contactNumber')}
                    />

                    <InputField
                        icon={faEnvelope}
                        label="Mail Id"
                        placeholder="you@email.com"
                        type="email"
                        {...field('mailId')}
                    />

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
