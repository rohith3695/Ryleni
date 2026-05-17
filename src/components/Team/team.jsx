import BlurText from "../BlurText"

const images = [
    { image: '/team/sudanva-shilannavar.png' },
    { image: '/team/peter-augustin.png' },
    { image: '/team/jishad-k.png' },
    { image: '/team/sudanva-shilannavar.png' },
    { image: '/team/peter-augustin.png' },
    { image: '/team/jishad-k.png' }
]

const Card = ({ image }) => {
    return (
        <div className="w-[280px] md:w-[400px] h-[380px] md:h-[540px] shrink-0 rounded-xl overflow-hidden select-none">
            <img
                src={image}
                alt="team"
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
            />
        </div>
    )
}

const Team = () => {
    return (
        <section className="py-20 dot-grid overflow-hidden">
            <div className="flex flex-col items-center text-center gap-8 md:gap-14">
                <h2 className="text-[clamp(32px,4.6vw,4.5rem)] leading-[1.1] flex flex-col md:flex-row items-center justify-center md:gap-[0.3em] font-season px-4">
                    <span className="whitespace-normal">The Minds behind</span>
                    <BlurText
                        text="Ryleni."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="font-instrument italic text-violet-600 italic mt-0"
                    />
                </h2>
                <p className="mt-6 font-myfont text-[16px] md:text-[18px] max-w-[600px] mx-auto leading-relaxed text-gray-500">
                    Our team of experienced operators, engineers, and strategists are dedicated to building the future.
                </p>
            </div>

            <div className="mt-10 w-full overflow-hidden" style={{ pointerEvents: 'none' }}>
                <div className="team-marquee-track flex gap-6" style={{ pointerEvents: 'none' }}>
                    {images.map((img, index) => (
                        <Card key={`a-${index}`} image={img.image} />
                    ))}
                    {images.map((img, index) => (
                        <Card key={`b-${index}`} image={img.image} />
                    ))}
                </div>
            </div>

            <style>{`
                .team-marquee-track {
                    width: max-content;
                    animation: marquee-scroll 30s linear infinite;
                    will-change: transform;
                }
                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @media (max-width: 767px) {
                    .team-marquee-track {
                        animation-duration: 18s;
                    }
                }
            `}</style>
        </section>
    )
}

export default Team;