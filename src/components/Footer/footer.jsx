import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeUp = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

const Footer = () => {
    const watermarkRef = useRef(null);
    const isWatermarkInView = useInView(watermarkRef, { once: true, margin: "-100px" });
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="footer-wrapper">
            <section className="bg-violet-600 min-h-screen flex flex-col px-6 md:px-24 pt-12 md:pt-16 pb-12 relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-[0.8fr_0.8fr_2fr] gap-x-12 gap-y-12 relative z-10 items-start">
                    <FadeUp delay={0}>
                        <div className="flex flex-col gap-8">
                            <h3 className="text-[#f1f0ee] text-3xl font-myfont tracking-tight">Sitemap</h3>
                            <div className="flex flex-col gap-3">
                                {['About', 'Process', 'Portfolio'].map((link) => (
                                    <motion.a
                                        key={link}
                                        href="#"
                                        whileHover={{ x: 5, color: '#ffffff' }}
                                        className="text-[#d4d4d4] text-[20px] font-myfont leading-relaxed transition-all"
                                    >
                                        {link}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <div className="flex flex-col gap-8">
                            <h3 className="text-[#f1f0ee] text-3xl font-myfont tracking-tight">Follow us</h3>
                            <div className="flex flex-col gap-3">
                                {['LinkedIn', 'Instagram', 'Twitter'].map((link) => (
                                    <motion.a
                                        key={link}
                                        href="#"
                                        whileHover={{ x: 5, color: '#ffffff' }}
                                        className="text-[#d4d4d4] text-[20px] font-myfont leading-relaxed transition-all"
                                    >
                                        {link}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <div className="flex flex-col gap-1 md:pl-20">
                            <h2 className="text-[#f1f0ee] text-3xl md:text-5xl font-myfont tracking-tight">Contact us:</h2>
                            <motion.a
                                href="mailto:hello@ryleni.com"
                                whileHover={{ opacity: 0.8 }}
                                className="text-[#f1f0ee] text-[clamp(28px,4.5vw,72px)] font-instrument italic tracking-tighter border-b-[5px] border-[#f1f0ee] inline-block pb-0 w-fit leading-tight mt-1"
                            >
                                support@ryleni.in
                            </motion.a>

                            <div className="mt-16 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 font-myfont tracking-tight">
                                <p className="text-[#f1f0ee] text-[14px] opacity-100">© 2026 Ventures Studio. All rights reserved.</p>
                                <span className="hidden md:inline text-[#f1f0ee] opacity-30 text-[12px]">|</span>
                                <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                                    <a href="#" className="text-[#f1f0ee] text-[14px] opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</a>
                                    <span className="text-[#f1f0ee] opacity-30 text-[12px]">|</span>
                                    <a href="#" className="text-[#f1f0ee] text-[14px] opacity-80 hover:opacity-100 transition-opacity">Terms of Service</a>
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-start pointer-events-none select-none overflow-hidden z-0 opacity-[0.04] md:opacity-100">
                    <motion.div
                        ref={watermarkRef}
                        initial={{ opacity: 0, y: 150 }}
                        animate={isWatermarkInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ color: '#edece9', marginLeft: '-3vw' }}
                        className="text-[32vw] font-black tracking-[-0.07em] leading-[0.7] whitespace-nowrap uppercase opacity-[0.12] translate-y-[18%]"
                    >
                        RYLENI
                    </motion.div>
                </div>

                <motion.button
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-6 bottom-6 md:right-12 md:top-12 md:bottom-auto w-14 h-14 md:w-20 md:h-20 bg-[#edece9] rounded-full flex items-center justify-center pointer-events-auto transition-transform z-20 shadow-xl"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                </motion.button>
            </section>
        </div>
    );
};

export default Footer;
