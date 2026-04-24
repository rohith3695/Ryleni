import React from 'react';
import { motion } from 'framer-motion';
import PillButton from '../Pillbutton';
import BlurText from '../BlurText';

const projects = [
    {
        tag: "SAAS",
        title: "FlowTech",
        description: "AI-powered investment platform for retail investors",
        image: "/Portfolio/Rectangle 2636.png"
    },
    {
        tag: "HEALTHCARE",
        title: "MedConnect",
        description: "Telemedicine infrastructure for rural providers",
        image: "/Portfolio/Rectangle 2680.png"
    },
    {
        tag: "LOGISTICS",
        title: "LogiChain",
        description: "Supply chain optimize using AI",
        image: "/Portfolio/Rectangle 2638.png"
    }
];

const PortfolioContent = () => {
    return (
        <section className="w-full bg-[#fcfcfc] dot-grid py-24 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16 md:mb-24"
                >
                    <div className="py-1 px-3 mb-4 uppercase tracking-[0.05em] text-sm font-myfont text-violet-600 ">
                        PORTFOLIO
                    </div>
                    <h2 className="text-[clamp(32px,4.6vw,4.5rem)] font-myfont leading-[1.1] tracking-[-0.02em] text-neutral-900 mb-6 flex flex-wrap items-center justify-center gap-x-[0.25em]">
                        <span>Selected</span>
                        <BlurText
                            text="ventures."
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="font-instrument italic text-violet-600 mt-0"
                        />
                    </h2>
                    <p className="text-gray-500 font-myfont text-[16px] md:text-[18px] max-w-[600px] mx-auto leading-relaxed">
                        Our team of experienced operators, engineers, and strategists are dedicated to building the future.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ease: "easeOut", duration: 0.6, delay: index * 0.1 }}
                            whileHover="hover"
                            className="w-full flex flex-col bg-[#f0f5fc] rounded-[32px] cursor-pointer shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-500 overflow-hidden group-hover/grid:opacity-70 hover:!opacity-100 group hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
                        >
                            <motion.div
                                variants={{ hover: { y: -6 } }}
                                transition={{ ease: "easeOut", duration: 0.3 }}
                                className="w-full flex flex-col h-full"
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        variants={{ hover: { scale: 1.05 } }}
                                        transition={{ ease: "easeOut", duration: 0.4 }}
                                        className="w-full h-full object-cover bg-gray-200"
                                    />
                                    <motion.div
                                        variants={{ hover: { opacity: 0.15 } }}
                                        initial={{ opacity: 0 }}
                                        transition={{ ease: "easeOut", duration: 0.3 }}
                                        className="absolute inset-0 bg-black pointer-events-none"
                                    />
                                </div>

                                <div className="p-8 pb-10 flex flex-col flex-grow relative overflow-hidden">
                                    <motion.div
                                        variants={{ hover: { y: 0 } }}
                                        initial={{ y: 0 }}
                                        className="flex flex-col h-full"
                                    >
                                        <span className="text-[#6563ff] font-myfont tracking-[0.05em] text-xs uppercase mb-3 drop-shadow-sm">
                                            {project.tag}
                                        </span>
                                        <motion.h3
                                            variants={{ hover: { y: -2 } }}
                                            transition={{ ease: "easeOut", duration: 0.3 }}
                                            className="text-2xl text-gray-900 font-myfont tracking-tight mb-2"
                                        >
                                            {project.title}
                                        </motion.h3>
                                        <motion.p
                                            variants={{ hover: { y: -2 } }}
                                            transition={{ ease: "easeOut", duration: 0.3, delay: 0.05 }}
                                            className="text-neutral-500 font-myfont items-start text-[14px] leading-snug"
                                        >
                                            {project.description}
                                        </motion.p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease: "easeOut", duration: 0.6, delay: 0.3 }}
                    className="mt-20 flex justify-center w-full"
                >
                    <PillButton label="View full portfolio" href="/portfolio" />
                </motion.div>

            </div>
        </section>
    );
};

export default PortfolioContent;
