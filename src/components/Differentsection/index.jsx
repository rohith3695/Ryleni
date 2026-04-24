import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import BlurText from "../BlurText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

const services = [
    {
        number: "01",
        title: "Tailored Approach",
        description: "Every startup is unique. We design our engagement to match your specific goals, challenges, and market context.",
        image: "/Homeserv/1.jpeg"
    },
    {
        number: "02",
        title: "Comprehensive Solutions",
        description: "We empower businesses to enhance operational efficiency, modernize their technology, and implement intelligent solutions that drive long-term performance.",
        image: "/Homeserv/2.jpeg"
    },
    {
        number: "03",
        title: "Accessible for Startups",
        description: "Avoid steep upfront costs. Our flexible entry fees with subscription based model make professional support achievable for early-stage ventures.",
        image: "/Homeserv/3.jpeg"
    },
    {
        number: "04",
        title: "Hands-On Execution",
        description: "We embed ourselves in your vision, translating ideas into tangible products and processes alongside your team, ensuring every step drives real impact.",
        image: "/Homeserv/4.jpeg"
    },
    {
        number: "05",
        title: "Proven Founders",
        description: "Our team has built and scaled businesses themselves, bringing real world insights to help you succeed faster.",
        image: "/Homeserv/5.jpeg"
    },
];

const STICKY_TOP = 120;
const CARD_STEP = 460;

function MediaBlock({ image, imageY }) {
    return (
        <div
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 280,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <motion.img
                src={image}
                alt="Service"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    y: imageY,
                }}
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    );
}

function ContentBlock({ service }) {
    return (
        <div className="font-myfont">
            <span
                style={{
                    display: "inline-block",
                    background: "rgba(255, 255, 255, 0.15)",
                    fontSize: 14,
                    padding: "6px 12px",
                    borderRadius: 999,
                    color: "#fff",
                }}
            >
                <FontAwesomeIcon
                    icon={fas[`fa${parseInt(service.number)}`]}
                    style={{ color: "rgb(255, 255, 255)" }}
                />
            </span>

            <h3
                className="font-myfont"
                style={{
                    fontSize: "clamp(1.3rem, 4vw, 2rem)",
                    fontWeight: 500,
                    marginTop: 12,
                    marginBottom: 0,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                }}
            >
                {service.title}
            </h3>

            <p
                className="font-myfont"
                style={{
                    fontSize: 15,
                    color: "rgba(255, 255, 255, 0.8)",
                    marginTop: 12,
                    maxWidth: 420,
                    lineHeight: 1.65,
                }}
            >
                {service.description}
            </p>
        </div>
    );
}

function ServiceCard({ service, index, total, scrolledPx }) {
    const isEven = index % 2 === 0;
    const isLast = index === total - 1;

    const blurStart = index * CARD_STEP + CARD_STEP * 0.5;
    const blurEnd = (index + 1) * CARD_STEP;

    const scale = useTransform(
        scrolledPx,
        isLast ? [0, 1] : [blurStart, blurEnd],
        isLast ? [1, 1] : [1, 0.93]
    );
    const blur = useTransform(
        scrolledPx,
        isLast ? [0, 1] : [blurStart, blurEnd],
        isLast ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(6px)"]
    );
    const opacity = useTransform(
        scrolledPx,
        isLast ? [0, 1] : [blurStart, blurEnd],
        isLast ? [1, 1] : [1, 0.75]
    );

    const imageY = useTransform(scrolledPx, [0, total * CARD_STEP], [0, -24]);

    return (
        <motion.div
            style={{
                position: "sticky",
                top: STICKY_TOP,
                zIndex: 10 + index,
                scale,
                filter: blur,
                opacity,
                transformOrigin: "top center",
                marginBottom: 24,
            }}
            whileHover={{ y: -2, transition: { duration: 0.3, ease: "easeOut" } }}
        >
            <div
                style={{
                    background: "#7c3aed",
                    borderRadius: 24,
                    overflow: "hidden",
                }}
                className="p-5 md:p-[48px]"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[48px] items-center min-h-0 md:min-h-[340px]">
                    {isEven ? (
                        <>
                            <div className="hidden md:block"><MediaBlock image={service.image} imageY={imageY} /></div>
                            <ContentBlock service={service} />
                        </>
                    ) : (
                        <>
                            <ContentBlock service={service} />
                            <div className="hidden md:block"><MediaBlock image={service.image} imageY={imageY} /></div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const containerRef = useRef(null);
    const scrolledPx = useMotionValue(0);

    useEffect(() => {
        let rafId;

        const update = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrolled = Math.max(0, -rect.top);
                scrolledPx.set(scrolled);
            }
            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(rafId);
    }, [scrolledPx]);

    return (
        <section
            className="border-t border-neutral-200 dot-grid"
            style={{ paddingTop: 40, paddingBottom: 100 }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ marginBottom: 56, textAlign: "center" }}>
                    <div
                        className="font-myfont"
                        style={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            color: "#7c3aed",
                            textTransform: "uppercase",
                            marginBottom: 20,
                        }}
                    >
                        What Makes Us Different
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <h2
                            className="font-myfont"
                            style={{
                                fontSize: "clamp(32px, 4.6vw, 4.5rem)",
                                fontWeight: 500,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                color: "#111",
                                margin: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.3em",
                                flexWrap: "wrap",
                                textAlign: "center"
                            }}
                        >
                            <span>What Makes Ryleni</span>
                            <BlurText
                                text="Different"
                                delay={150}
                                animateBy="words"
                                direction="top"
                                className="font-instrument italic text-violet-600 mt-0"
                            />
                        </h2>

                        <p
                            className="font-myfont mx-auto"
                            style={{
                                fontSize: 17,
                                color: "#6b7280",
                                maxWidth: 600,
                                lineHeight: 1.6,
                                margin: 0,
                                textAlign: "center",
                            }}
                        >
                            Five principles that define how we partner, build, and grow with every founder.
                        </p>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    style={{
                        position: "relative",
                        paddingBottom: 0,
                    }}
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.number}
                            service={service}
                            index={index}
                            total={services.length}
                            scrolledPx={scrolledPx}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}