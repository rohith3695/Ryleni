import { motion } from 'framer-motion';

const steps = [
    {
        number: '1',
        title: 'Apply',
        description: 'Share your thesis, early traction, and why now. We respond to every qualified application.'
    },
    {
        number: '2',
        title: 'Evaluation',
        description: 'We meet executives with partners to stress-test the market, model, and team complimentary.'
    },
    {
        number: '3',
        title: 'Studio Build',
        description: 'Run a rapid-build program with dedicated product, design, and talent support.'
    },
    {
        number: '4',
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
            <div className="font-myfont text-sm font-semibold tracking-[0.22em] text-violet-600">
                THE PROCESS
            </div>
            <h2 className="mt-5 text-[clamp(2.1rem,4.2vw,3.75rem)] font-myfont leading-[1.05] tracking-[-0.02em] text-neutral-900">
                A Clear path from <span className='font-instrument italic text-violet-600'>idea</span> to <span className='font-instrument italic text-violet-600'>scale</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-relaxed text-neutral-700 md:text-[18px]">
                Our streamlined process gets you from application to investment in weeks, not months.
            </p>
        </motion.div>

        {/* Mobile: vertical list */}
        <div className="md:hidden max-w-sm mx-auto px-6 mt-12 flex flex-col gap-8">
            {steps.map((step) => (
                <motion.div
                    key={step.number}
                    className="flex gap-5 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Number(step.number) * 0.15 }}
                    viewport={{ once: true, margin: "-30px" }}
                >
                    <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-violet-600 text-white font-medium shadow-sm">
                        {step.number}
                    </div>
                    <div className="text-left">
                        <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                        <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Desktop: SVG snake */}
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
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-violet-600 text-white font-medium shadow-sm">
                            {step.number}
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
                {[steps[3], steps[2]].map((step) => (
                    <motion.div
                        key={step.number}
                        style={{ textAlign: 'center', width: '176px' }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: Number(step.number) * 0.3 }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-violet-600 text-white font-medium shadow-sm">
                            {step.number}
                        </div>
                        <h3 className="text-base font-semibold">{step.title}</h3>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed text-neutral-700">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

export default Process
