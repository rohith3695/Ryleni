import { motion } from 'framer-motion';
import PillButton from '../Pillbutton';

const steps = [
    {
        number: '1',
        icon: '/Process/apply.png',
        title: 'Apply',
        description: 'Share your thesis, early traction, and why now. We respond to every qualified application.'
    },
    {
        number: '2',
        icon: '/Process/evaluation.png',
        title: 'Evaluation',
        description: 'We meet executives with partners to stress-test the market, model, and team complimentary.'
    },
    {
        number: '3',
        icon: '/Process/build.png',
        title: 'Studio Build',
        description: 'Run a rapid-build program with dedicated product, design, and talent support.'
    },
    {
        number: '4',
        icon: '/Process/scale.png',
        title: 'Launch & Scale',
        description: 'Raise follow-on capital, unlock our corporate network, and scale into new markets.'
    }
]

const TOP_Y = 32;
const MID_Y = 270;
const BOT_Y = 508;
const CONT_H = 720;

const Process = () => (
    <section className="py-20 dot-grid" style={{ overflow: 'clip' }}>
        <motion.div
            className="font-myfont mx-auto max-w-5xl px-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="font-myfont text-sm font-bold tracking-[0.2em] text-violet-600 uppercase">
                THE PROCESS
            </div>
            <h2 className="mt-5 text-[clamp(32px,4.6vw,4.5rem)] font-myfont leading-[1.1] tracking-[-0.02em] text-neutral-900">
                A Clear path from <span className='font-instrument italic text-violet-600'>idea</span> to <span className='font-instrument italic text-violet-600'>scale</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] md:text-[18px] leading-relaxed text-gray-500">
                Our streamlined process gets you from application to investment in weeks, not months.
            </p>
        </motion.div>

        <div className="md:hidden max-w-sm mx-auto px-6 mt-12 flex flex-col gap-10">
            {steps.map((step) => (
                <motion.div
                    key={step.number}
                    className="flex gap-5 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Number(step.number) * 0.15 }}
                    viewport={{ once: true, margin: "-30px" }}
                >
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-violet-600 shadow-sm shrink-0">
                        <img src={step.icon} alt={step.title} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-base font-semibold text-neutral-900 leading-tight">{step.title}</h3>
                        <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{step.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <div
            className="hidden md:block max-w-5xl mx-auto"
            style={{ position: 'relative', height: `${CONT_H}px` }}
        >
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    overflow: 'visible',
                }}
                viewBox={`0 0 1000 ${CONT_H}`}
                preserveAspectRatio="none"
                fill="none"
            >
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    d={`
                        M 88 ${TOP_Y}
                        H 912
                        A 119 119 0 0 1 912 ${MID_Y}
                        H 88
                        A 119 119 0 0 0 88 ${BOT_Y}
                        H 912
                    `}
                    className="stroke-violet-600"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>

            <div
                style={{
                    position: 'absolute',
                    top: `${TOP_Y - 32}px`,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    zIndex: 10,
                }}
            >
                {[steps[0], steps[1]].map((step) => (
                    <motion.div
                        key={step.number}
                        style={{ textAlign: 'center', width: '176px' }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: Number(step.number) * 0.3 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-violet-600 shadow-sm">
                            <img src={step.icon} alt={step.title} className="w-10 h-10 object-contain" />
                        </div>
                        <h3 className="text-base text-neutral-full font-semibold">{step.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed text-neutral-700">{step.description}</p>
                    </motion.div>
                ))}
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: `${BOT_Y - 32}px`,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    zIndex: 10,
                }}
            >
                {[steps[2], steps[3]].map((step) => (
                    <motion.div
                        key={step.number}
                        style={{ textAlign: 'center', width: '176px' }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: Number(step.number) * 0.3 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-violet-600 shadow-sm">
                            <img src={step.icon} alt={step.title} className="w-10 h-10 object-contain" />
                        </div>
                        <h3 className="text-base font-semibold">{step.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed text-neutral-700">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div 
            className="flex justify-center mt-20 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <PillButton label="Apply now" href="#" />
        </motion.div>
    </section>
)

export default Process
