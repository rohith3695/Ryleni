import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faRocket, faGlobe, faArrowTrendUp, faLink, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import PillButton from '../components/Pillbutton';
import { InputField, TextareaField, SelectField, FileUploadField } from '../components/FormFields';

const sections = [
    { id: 'personal-info', label: 'Personal Info', icon: faUserGroup },
    { id: 'company-details', label: 'Company Details', icon: faRocket },
    { id: 'documents', label: 'Documents', icon: faArrowTrendUp },
    { id: 'links', label: 'Links', icon: faGlobe },
    { id: 'startup-idea', label: 'Startup Idea', icon: faLink },
];

const validate = (formData, files) => ({
    'personal-info':
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        formData.gender !== '' &&
        formData.dob !== '' &&
        formData.linkedinProfile.trim() !== '',
    'company-details':
        formData.companyName.trim() !== '' &&
        formData.uinId.trim() !== '' &&
        formData.contactNumber.trim() !== '' &&
        formData.mailId.trim() !== '',
    'documents':
        files.incorporationCert !== null &&
        files.pitchDeck !== null,
    'links':
        formData.productLink.trim() !== '' &&
        formData.companyWebsite.trim() !== '',
    'startup-idea':
        formData.startupIdea.trim() !== '',
});

const Founder = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [touched, setTouched] = useState({});

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', gender: '', dob: '', linkedinProfile: '',
        companyName: '', uinId: '', linkedinCompany: '', contactNumber: '', mailId: '',
        productLink: '', companyWebsite: '',
        startupIdea: '',
    });

    const [files, setFiles] = useState({
        incorporationCert: null,
        pitchDeck: null,
        financials: null,
    });

    const sectionValidity = validate(formData, files);

    const field = (key) => ({
        value: formData[key],
        onChange: (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value })),
        error: touched[key] && !formData[key].trim(),
    });

    const fileField = (key) => ({
        value: files[key],
        onChange: (e) => setFiles((prev) => ({ ...prev, [key]: e.target.files[0] || null })),
        error: touched[key] && files[key] === null,
    });

    const touchSection = (sectionId) => {
        const fields = {
            'personal-info': ['firstName', 'lastName', 'gender', 'dob', 'linkedinProfile'],
            'company-details': ['companyName', 'uinId', 'contactNumber', 'mailId'],
            'documents': ['incorporationCert', 'pitchDeck'],
            'links': ['productLink', 'companyWebsite'],
            'startup-idea': ['startupIdea'],
        };
        const next = {};
        (fields[sectionId] || []).forEach((f) => { next[f] = true; });
        setTouched((prev) => ({ ...prev, ...next }));
    };

    const isSectionComplete = (index) => sectionValidity[sections[index].id];

    const goTo = (index) => {
        if (index <= activeSection) { setActiveSection(index); return; }
        for (let i = activeSection; i < index; i++) {
            if (!isSectionComplete(i)) { touchSection(sections[i].id); return; }
        }
        setActiveSection(index);
    };

    const goNext = () => {
        if (!isSectionComplete(activeSection)) { touchSection(sections[activeSection].id); return; }
        setActiveSection((prev) => Math.min(prev + 1, sections.length - 1));
    };

    const goPrev = () => setActiveSection((prev) => Math.max(prev - 1, 0));

    const sectionContent = {
        'personal-info': (
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                        <FontAwesomeIcon icon={faUserGroup} />
                    </div>
                    <h2 className="text-3xl font-season text-neutral-900">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="First Name" placeholder="John" {...field('firstName')} />
                    <InputField label="Last Name" placeholder="Doe" {...field('lastName')} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        label="Gender"
                        {...field('gender')}
                        error={touched.gender && formData.gender === ''}
                        options={[
                            { value: '', label: 'Select gender' },
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                            { value: 'prefer-not', label: 'Prefer not to say' },
                        ]}
                    />
                    <InputField label="Date of Birth (DOB)" placeholder="DD / MM / YYYY" type="date" {...field('dob')} />
                </div>
                <InputField label="LinkedIn Profile" placeholder="linkedin.com/in/yourprofile" type="url" {...field('linkedinProfile')} />
            </div>
        ),
        'company-details': (
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                        <FontAwesomeIcon icon={faRocket} />
                    </div>
                    <h2 className="text-3xl font-season text-neutral-900">Company Details</h2>
                </div>
                <InputField label="Company Name" placeholder="Your startup name" {...field('companyName')} />
                <InputField label="UIN Id from the MCA" placeholder="Enter your MCA UIN identifier" {...field('uinId')} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="LinkedIn (preferred)" placeholder="linkedin.com/company/..." type="url" optional
                        value={formData.linkedinCompany}
                        onChange={(e) => setFormData((p) => ({ ...p, linkedinCompany: e.target.value }))}
                        error={false}
                    />
                    <InputField label="Contact Number" placeholder="+91 00000 00000" type="tel" {...field('contactNumber')} />
                </div>
                <InputField label="Mail Id" placeholder="hello@yourcompany.com" type="email" {...field('mailId')} />
            </div>
        ),
        'documents': (
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                        <FontAwesomeIcon icon={faArrowTrendUp} />
                    </div>
                    <h2 className="text-3xl font-season text-neutral-900">Documents</h2>
                </div>
                <FileUploadField
                    label="Upload Incorporation Certificate"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...fileField('incorporationCert')}
                />
                <FileUploadField
                    label="Upload Pitch Deck"
                    required
                    accept=".pdf,.ppt,.pptx"
                    {...fileField('pitchDeck')}
                />
                <FileUploadField
                    label="Financials — for revenue making startups"
                    optional
                    accept=".pdf,.xlsx,.xls,.csv"
                    value={files.financials}
                    onChange={(e) => setFiles((p) => ({ ...p, financials: e.target.files[0] || null }))}
                    error={false}
                />
            </div>
        ),
        'links': (
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                        <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <h2 className="text-3xl font-season text-neutral-900">Links</h2>
                </div>
                <InputField
                    label="Product / Service Attach Link"
                    placeholder="https://your-product-link.com"
                    type="url"
                    {...field('productLink')}
                />
                <InputField
                    label="Company Website / Product / Service Link"
                    placeholder="https://yourcompany.com"
                    type="url"
                    {...field('companyWebsite')}
                />
            </div>
        ),
        'startup-idea': (
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                        <FontAwesomeIcon icon={faLink} />
                    </div>
                    <h2 className="text-3xl font-season text-neutral-900">Your Startup Idea</h2>
                </div>
                <TextareaField
                    label="One Line for the Startup Idea"
                    placeholder="Describe your startup in one compelling sentence..."
                    rows={3}
                    {...field('startupIdea')}
                />
                <div className="flex justify-center pt-4">
                    <PillButton label="Submit Application" href="#" />
                </div>
            </div>
        ),
    };

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
                                const isCompleted = isSectionComplete(index);
                                const isLocked = index > activeSection && !isCompleted;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => goTo(index)}
                                        disabled={isLocked}
                                        title={isLocked ? 'Complete previous sections first' : ''}
                                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all duration-200 font-myfont font-semibold tracking-widest text-[12px] uppercase w-full
                                            ${isActive
                                                ? 'border border-neutral-900 text-neutral-900 bg-white shadow-sm'
                                                : isLocked
                                                    ? 'text-neutral-300 border border-transparent cursor-not-allowed'
                                                    : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 border border-transparent'
                                            }`}
                                    >
                                        <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[15px] transition-colors
                                            ${isActive
                                                ? 'bg-violet-100 text-violet-600'
                                                : isCompleted && !isActive
                                                    ? 'bg-emerald-100 text-emerald-500'
                                                    : isLocked
                                                        ? 'bg-neutral-100 text-neutral-300'
                                                        : 'bg-neutral-100 text-neutral-400'
                                            }`}>
                                            {isCompleted && !isActive
                                                ? <FontAwesomeIcon icon={faCheckCircle} />
                                                : isLocked
                                                    ? <FontAwesomeIcon icon={faLock} className="text-[13px]" />
                                                    : <FontAwesomeIcon icon={section.icon} />
                                            }
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
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300
                                                ${i === activeSection
                                                    ? 'w-10 bg-violet-600'
                                                    : isSectionComplete(i)
                                                        ? 'w-4 bg-emerald-400'
                                                        : 'w-4 bg-neutral-200'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={goNext}
                                    disabled={activeSection === sections.length - 1}
                                    className={`text-[11px] font-myfont font-bold tracking-widest uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                                        ${isSectionComplete(activeSection)
                                            ? 'text-neutral-900 hover:text-violet-600'
                                            : 'text-neutral-400'
                                        }`}
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
