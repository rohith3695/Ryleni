import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/BlurText';

const Updates = () => {
    return (
        <div className="min-h-screen bg-white">
            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/typewriter_hero.png"
                        alt="Updates Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/55" />
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
                        className="text-xs font-bold tracking-[0.22em] text-white/80 uppercase mb-4"
                    >
                        TEAM &amp; CULTURE
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season text-white leading-[1.1] mb-4 flex justify-center items-center gap-3"
                    >
                        Latest&nbsp;
                        <BlurText
                            text="Updates"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="font-instrument italic text-violet-500"
                        />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 font-myfont text-base md:text-lg max-w-[560px] mx-auto leading-relaxed"
                    >
                        Follow our journey, welcome new team members, and stay updated
                        <br className="hidden sm:block" /> with the latest happenings at Ryleni.
                    </motion.p>
                </div>
            </section>

            <section className="py-20 px-6 flex flex-col items-center justify-center">
                <div className="relative w-56 h-56 flex items-center justify-center mb-10">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.18, 0.08] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-indigo-400 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        className="absolute inset-6 bg-indigo-500 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                        className="absolute inset-12 bg-indigo-500 rounded-full"
                    />

                    <div className="absolute inset-[3.5rem] bg-indigo-600 rounded-full shadow-lg flex items-center justify-center z-10 text-white">
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                        >
                            <path d="M23 4v6h-6" />
                            <path d="M1 20v-6h6" />
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </motion.svg>
                    </div>

                    <motion.div
                        animate={{ y: [-8, 8, -8] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-2 right-8 w-3.5 h-3.5 bg-indigo-500 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [8, -8, 8] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-6 left-4 w-2.5 h-2.5 bg-indigo-600 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-1/2 -left-4 w-2 h-2 bg-indigo-400 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [5, -5, 5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-3 left-1/3 w-2.5 h-2.5 bg-indigo-500 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [-6, 6, -6] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-1/4 -right-5 w-2 h-2 bg-indigo-400 rounded-full"
                    />
                </div>

                <div className="text-center font-myfont">
                    <h2 className="text-[18px] font-myfont text-neutral-900 mb-2">
                        No updates yet
                    </h2>
                    <p className="text-neutral-500 text-sm max-w-[320px] leading-relaxed mx-auto">
                        Check back soon for new team announcements and company news.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Updates;
