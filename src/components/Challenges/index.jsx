import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../BlurText';

const challengesData = [
    {
        icon: "/Challenges/Mask group (4).png",
        title: "Securing Initial Capital",
        description: "Raising funds takes months of distraction from building the actual product.",
        isHighlighted: true
    },
    {
        icon: "/Challenges/Mask group (5).png",
        title: "Finding the Right Talent",
        description: "Hiring top-tier engineering and design talent is competitive and expensive.",
        isHighlighted: false
    },
    {
        icon: "/Challenges/Mask group (6).png",
        title: "Technical Execution",
        description: "Building scalable infrastructure and avoiding technical debt requires deep expertise.",
        isHighlighted: false
    },
    {
        icon: "/Challenges/Mask group (7).png",
        title: "Go-to-Market Strategy",
        description: "Getting the first 100 paying customers is often the hardest milestone.",
        isHighlighted: false
    },
    {
        icon: "/Challenges/Mask group (8).png",
        title: "Product-Market Fit",
        description: "Iterating quickly to find a product that the market actually wants.",
        isHighlighted: false
    },
    {
        icon: "/Challenges/Mask group (9).png",
        title: "Operational Overhead",
        description: "Dealing with legal, accounting and HR instead of focusing on growth.",
        isHighlighted: false
    }
];

const ChallengeCard = ({ data, index }) => {
    const colIndex = index % 3;
    const initialProps =
        colIndex === 0 ? { x: -80, opacity: 0 } :
            colIndex === 1 ? { scale: 0.9, opacity: 0 } :
                { x: 80, opacity: 0 };

    return (
        <motion.div
            initial={initialProps}
            whileInView={{ x: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={`
                group relative p-8 py-10 rounded-[40px] flex flex-col items-center text-center transition-all duration-500 w-full h-full min-h-[340px] justify-center
                ${data.isHighlighted
                    ? "bg-violet-600 text-white shadow-2xl shadow-violet-600/20"
                    : "bg-[#f8f6ff] text-neutral-900 shadow-sm"}
            `}
        >
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center mb-6">
                    <img
                        src={data.icon}
                        alt={data.title}
                        className={`w-full h-full object-contain ${data.isHighlighted ? "brightness-0 invert" : ""}`}
                    />
                </div>

                <h3 className="text-[20px] font-myfont bold tracking-tight mb-4 whitespace-nowrap">
                    {data.title}
                </h3>

                <p className={`
                    text-[14px] leading-relaxed max-w-[220px]
                    ${data.isHighlighted ? "text-white/90" : "text-neutral-500"}
                `}>
                    {data.description}
                </p>
            </div>
        </motion.div>
    );
};

const Challenges = () => {
    return (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-white font-myfont overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.2em] text-violet-600 uppercase mb-3"
                    >
                        THE CHALLENGE
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[clamp(32px,4.6vw,4.5rem)] font-myfont text-neutral-900 leading-[1.1] tracking-[-0.02em] flex flex-wrap justify-center gap-x-[0.25em] items-center"
                    >
                        <span>Problems founders face when</span>
                        <BlurText
                            text="starting up."
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="font-instrument italic text-violet-600 mt-0"
                        />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 font-myfont text-[16px] md:text-[18px] max-w-[600px] mx-auto leading-relaxed text-gray-500"
                    >
                        Building a startup is hard. We’ve been there and have built Ryleni to solve this exact pain points.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1240px] mx-auto">
                    {challengesData.map((challenge, index) => (
                        <div key={index} className="flex justify-center">
                            <ChallengeCard
                                data={challenge}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Challenges;
