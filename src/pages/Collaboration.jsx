import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PillButton from '../components/Pillbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLink, faBullseye, faShieldHalved, faAlignLeft, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { InputField, TextareaField, SelectField, FileUploadField } from '../components/FormFields';

const Collaboration = () => {
    const [formData, setFormData] = useState({
        whoPerson: '',
        purpose: '',
        businessProof: '',
        offeringSummary: '',
        entityType: '',
        contactNumber: '',
        mailId: '',
        linkedinId: '',
    });
    const [proposalFile, setProposalFile] = useState(null);
    const [touched, setTouched] = useState(false);

    const field = (key) => ({
        value: formData[key],
        onChange: (e) => setFormData((p) => ({ ...p, [key]: e.target.value })),
        error: touched && !formData[key].trim(),
    });

    const isValid =
        formData.whoPerson.trim() &&
        formData.purpose.trim() &&
        formData.businessProof.trim() &&
        formData.offeringSummary.trim() &&
        formData.entityType !== '' &&
        proposalFile !== null &&
        formData.contactNumber.trim() &&
        formData.mailId.trim() &&
        formData.linkedinId.trim();

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
                        alt="Collaboration Hero"
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
                        PARTNERSHIPS
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season text-white leading-[1.1] mb-4"
                    >
                        Let's <span className="font-instrument italic text-violet-400">Collaborate</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 font-myfont text-lg md:text-xl max-w-[600px] mx-auto"
                    >
                        Bring your proposal,let's build something meaningful together.
                    </motion.p>
                </div>
            </section>


            <section className="py-20 px-6 max-w-[800px] mx-auto">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                    <InputField
                        icon={faUser}
                        label="Who is the Person"
                        placeholder="Your full name or company representative"
                        {...field('whoPerson')}
                    />

                    <TextareaField
                        icon={faBullseye}
                        label="What is the Purpose"
                        placeholder="Describe the purpose of this collaboration..."
                        rows={4}
                        {...field('purpose')}
                    />

                    <TextareaField
                        icon={faShieldHalved}
                        label="Business Proof"
                        placeholder="Share verifiable proof of your business — registrations, existing clients, traction..."
                        rows={3}
                        {...field('businessProof')}
                    />

                    <TextareaField
                        icon={faAlignLeft}
                        label="One Line Summary of What You're Offering"
                        placeholder="Summarise your offering in one clear sentence..."
                        rows={2}
                        {...field('offeringSummary')}
                    />

                    <SelectField
                        icon={faBuilding}
                        label="Entity / Individual"
                        value={formData.entityType}
                        onChange={(e) => setFormData((p) => ({ ...p, entityType: e.target.value }))}
                        error={touched && formData.entityType === ''}
                        options={[
                            { value: '', label: 'Select type' },
                            { value: 'individual', label: 'Individual' },
                            { value: 'startup', label: 'Startup' },
                            { value: 'agency', label: 'Agency' },
                            { value: 'corporate', label: 'Corporate' },
                            { value: 'ngo', label: 'NGO / Non-profit' },
                            { value: 'other', label: 'Other' },
                        ]}
                    />

                    <FileUploadField
                        label="Upload Section for the Proposal"
                        accept=".pdf,.ppt,.pptx,.doc,.docx"
                        value={proposalFile}
                        onChange={(e) => setProposalFile(e.target.files[0] || null)}
                        error={touched && proposalFile === null}
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
                        placeholder="you@company.com"
                        type="email"
                        {...field('mailId')}
                    />

                    <InputField
                        icon={faLink}
                        label="LinkedIn Id of the User / Company"
                        placeholder="linkedin.com/in/yourprofile or linkedin.com/company/..."
                        type="url"
                        {...field('linkedinId')}
                    />

                    <div className="pt-8 flex flex-col items-center gap-4">
                        <PillButton label="Submit Proposal" href="#" />
                        <p className="text-neutral-400 font-myfont text-sm">
                            Secure 256-bit encrypted transmission.
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Collaboration;
