import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PillButton from '../Pillbutton';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Services', href: '/service' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'How It Works', href: '#' },
        { name: 'Careers', href: '/careers' },
        { name: 'Updates', href: '/updates' },
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <header className="relative w-full px-[18px] py-6 font-season z-[100]">
            <div className="mx-auto flex max-w-[1240px] items-center gap-[18px] rounded-full border border-neutral-200 bg-white px-[22px] py-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.10)] max-[760px]:px-[14px] max-[760px]:py-[14px]">
                <Link className="flex items-center gap-[12px] whitespace-nowrap text-neutral-950 no-underline" to="/">
                    <img
                        src="/Logo.png"
                        alt="Ryleni Logo"
                        className="block h-[35px] md:h-[46px] w-auto shrink-0 object-contain"
                    />
                </Link>

                <nav
                    className="flex flex-1 items-center justify-end pr-5 gap-5 max-[760px]:hidden text-[16px]"
                    aria-label="Primary"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            className="rounded-full px-3 py-[10px] text-neutral-800 no-underline transition hover:bg-neutral-100"
                            to={link.href}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="max-[200px]:hidden shrink-0 font-sans">
                    <PillButton label="Apply Now" href="#" isSmall={true} />
                </div>

                <button
                    className="ml-auto hidden h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-neutral-200 bg-white max-[760px]:inline-flex"
                    type="button"
                    aria-label="Open menu"
                    onClick={() => setIsOpen(true)}
                >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M4 12h16M4 17h16" stroke="#0B0B0B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 z-[1001] h-full w-[280px] bg-white p-8 shadow-[-10px_0_30px_rgba(0,0,0,0.1)]"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-12">
                                    <img
                                        src="/Logo.svg"
                                        alt="Ryleni Logo"
                                        className="block h-[40px] w-auto shrink-0 object-contain"
                                    />
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-100 bg-neutral-50"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-6 font-myfont">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-[22px] font-medium text-neutral-800 no-underline hover:text-violet-600 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-auto pt-8 border-t border-neutral-100 text-center font-sans">
                                    <PillButton label="Apply Now" href="/service" isSmall={false} variantColor="#7c3aed" />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
