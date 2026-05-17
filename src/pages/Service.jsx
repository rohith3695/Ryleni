import React from 'react';
import { motion } from 'framer-motion';
import BlurText from '../components/BlurText';
import PillButton from '../components/Pillbutton';

const servicePillars = [
    {
        title: "Venture building",
        description: "We help entrepreneurs turn into scalable business with our proven framework.",
        image: "/Serv/service1.png",
        isHighlighted: true
    },
    {
        title: "Capital Investment",
        description: "Access growth capital with flexible terms designed for your stage.",
        image: "/Serv/service2.png",
        isHighlighted: false
    },
    {
        title: "Strategic Support",
        description: "Get hands-on guidance on operators who've scaled companies.",
        image: "/Serv/service3.png",
        isHighlighted: false
    },
    {
        title: "Growth & Ops",
        description: "Leverage data-driven framework to accelerate your growth.",
        image: "/Serv/service4.png",
        isHighlighted: false
    },
    {
        title: "Innovation Lab",
        description: "Access cutting edge tools and methodology for rapid innovation.",
        image: "/Serv/service5.png",
        isHighlighted: false
    },
    {
        title: "Market Expansion",
        description: "Scale your business into new markets with our global network.",
        image: "/Serv/service6.png",
        isHighlighted: false
    },
    {
        title: "Legal & Compliance",
        description: "Navigate complex legal landscapes with expert support.",
        image: "/Serv/service7.png",
        isHighlighted: false
    },
    {
        title: "Founder Programs",
        description: "Accelerate your growth through our exclusive programs.",
        image: "/Serv/service8.png",
        isHighlighted: false
    }
];

const Service = () => {
    return (
        <div className="min-h-screen bg-white font-myfont overflow-hidden">

            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 dot-grid">
                <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.2em] text-violet-600 uppercase mb-6"
                    >
                        OUR SERVICES
                    </motion.div>

                    <h1 className="text-[clamp(32px,5vw,3.5rem)] font-season leading-[1.1] text-neutral-900 mb-8 max-w-[900px]">
                        Everything you need to <br />
                        <BlurText
                            text="Build & Scale."
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="font-instrument italic text-violet-600 justify-center"
                        />
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-[18px] md:text-[22px] leading-relaxed text-neutral-500 max-w-[700px] mb-12"
                    >
                        We aren't just investors. We are operators, engineers, and designers who get in the trenches with you.
                    </motion.p>
                </div>
            </section>


            <section className="py-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {servicePillars.map((pillar, index) => (
                        <div
                            key={index}
                            className={`
                                p-10 py-14 rounded-[40px] flex flex-col items-center text-center h-full shadow-sm
                                ${pillar.isHighlighted
                                    ? "bg-violet-600 text-white"
                                    : "bg-[#f8faff] text-neutral-900"}
                            `}
                        >
                            <div className="mb-10">
                                <img
                                    src={pillar.image}
                                    alt={pillar.title}
                                    className={`w-14 h-14 object-contain ${pillar.isHighlighted ? "brightness-0 invert" : ""}`}
                                />
                            </div>

                            <h3 className={`text-[22px] font-myfont tracking-tight mb-4 ${pillar.isHighlighted ? "text-white" : "text-neutral-900"}`}>
                                {pillar.title}
                            </h3>

                            <p className={`text-[15px] leading-relaxed max-w-[240px] mx-auto ${pillar.isHighlighted ? "text-white/90" : "text-neutral-500"}`}>
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="min-h-screen px-6 md:px-12 lg:px-24 bg-neutral-950 text-white relative overflow-hidden flex items-center justify-center">

                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url("/Serv/Rectangle 2632.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-neutral-950/80" />
                </div>

                <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[clamp(32px,5vw,4.5rem)] font-season leading-[1.1] mb-8 max-w-[900px]"
                    >
                        Ready to join the <br />
                        <span className="font-instrument italic text-violet-400">Ryleni Portfolio?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-lg md:text-xl max-w-[600px] mb-12 font-myfont"
                    >
                        Join the Ryleni ecosystem and turn your vision into reality.Apply now and let's discuss how we can help accelerate your venture.
                    </motion.p>

                    <PillButton label="Apply Now" href="mailto:support@ryleni.in" />
                </div>
            </section>
        </div>
    );
};

export default Service;
