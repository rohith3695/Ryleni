import { motion } from "framer-motion"
import BlurText from "../BlurText"

const images = [
    { image: '/team/sudanva-shilannavar.png' },
    { image: '/team/peter-augustin.png' },
    { image: '/team/jishad-k.png' },
    { image: '/team/image.png' },
    { image: '/team/image copy.png' },
    { image: '/team/image copy 2.png' }
]


const Card = ({ image }) => {
    return (
        <div className="w-[400px] h-[540px] shrink-0 rounded-xl overflow-hidden">
            <img
                src={image}
                alt="team"
                className="w-full h-full object-cover "
            />
        </div>
    )
}

const Marquee = ({ children }) => {
    return (
        <div className="overflow-hidden mt-10">
            <motion.div
                className="flex gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity
                }}
            >
                {children}
                {children} {/* duplicate for loop */}
            </motion.div>
        </div>
    )
}

const Team = () => {
    return (
        <section className="py-20 dot-grid">
            <div className="flex flex-col items-center text-center gap-14">
                <h2 className="text-[clamp(2.4rem,4.6vw,4.5rem)] leading-none flex items-center justify-center gap-[0.3em] font-season">
                    <span>The Minds behind</span>
                    <BlurText
                        text="Ryleni."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="font-instrument italic text-violet-600 italic mt-0"
                    />
                </h2>
                <p className="text-gray-500 max-w-[600px]">
                    Our team of experienced operators, engineers, and strategists are dedicated to building the future.
                </p>
            </div>

            <Marquee>
                {
                    images.map((img, index) => (
                        <Card key={index} image={img.image}></Card>
                    ))
                }
            </Marquee>
        </section>
    )
}

export default Team;