import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faQuestion } from '@fortawesome/free-solid-svg-icons';
import BlurText from '../components/BlurText';

const Careers = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/funding_hero_bg_1777045310106.png"
                        alt="Careers Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/60" />
                </div>

                <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-10 opacity-50">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            {[...Array(6)].map((_, j) => (
                                <div key={j} className="w-1.5 h-1.5 rounded-full bg-white" />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-10 opacity-50">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                            {[...Array(6)].map((_, j) => (
                                <div key={j} className="w-1.5 h-1.5 rounded-full bg-white" />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="relative z-10 text-center px-6 pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold tracking-[0.2em] text-white uppercase mb-4"
                    >
                        WE ARE HIRING
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season text-white leading-[1.1] mb-4 flex justify-center items-center gap-3"
                    >
                        Join Our <BlurText text="Team" delay={150} animateBy="words" direction="top" className="font-instrument italic text-violet-600" />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 font-myfont text-lg md:text-xl max-w-[600px] mx-auto leading-relaxed"
                    >
                        Help us build the next generation of category-defining companies. <br />
                        Review our open positions below.
                    </motion.p>
                </div>
            </section>

            <section className="py-32 px-6 flex flex-col items-center justify-center min-h-[50vh]">
                <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-violet-600 rounded-full opacity-10"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute inset-4 bg-violet-500 rounded-full opacity-20"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute inset-8 bg-violet-400 rounded-full opacity-30"
                    />
                    <div className="absolute inset-14 bg-violet-600 rounded-full shadow-lg flex items-center justify-center z-10 text-white">
                        <div className="relative">
                            <FontAwesomeIcon icon={faChair} className="text-4xl" />
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-violet-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-sm">
                                <FontAwesomeIcon icon={faQuestion} />
                            </div>
                        </div>
                    </div>

                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-4 w-4 h-4 bg-violet-500 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-8 left-0 w-3 h-3 bg-violet-600 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 -left-6 w-2 h-2 bg-violet-400 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 left-1/4 w-3 h-3 bg-violet-500 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [-8, 8, -8] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 -right-8 w-2 h-2 bg-violet-400 rounded-full"
                    />
                </div>

                <div className="text-center font-myfont">
                    <h2 className="text-[22px] font-myfont font-normal text-neutral-900 mb-2">
                        No job openings available
                    </h2>
                    <p className="text-neutral-500 text-sm max-w-[320px] leading-relaxed mx-auto">
                        There are no job openings in our company. please check back later for future opportunities.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Careers;
