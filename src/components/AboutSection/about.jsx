import { motion } from "framer-motion"

const Aboutsection = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 22 },
        show: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        }),
    }

    return (
        <section className="w-full border-t border-neutral-200 py-24 dot-grid">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-start gap-14 md:grid-cols-12">
                    <div className="md:col-span-7">
                        <motion.h2
                            className="font-myfont Bold m-0 max-w-full text-[clamp(32px,4.6vw,4.25rem)] leading-[0.95] tracking-[-0.02em] text-neutral-900"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.7 }}
                            variants={fadeUp}
                            custom={0}
                        >
                            More than just capital.
                        </motion.h2>

                        <motion.p
                            className="mt-10 max-w-[60ch] whitespace-normal md:whitespace-pre-line text-[16px] leading-relaxed text-gray-500 md:text-[18px]"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={fadeUp}
                            custom={0.12}
                        >
                            {`Ryleni works with early stage and growth 
stage ventures to bring clarity, direction, and
investor readiness to their journey. The firm
actively supports startups in fundraising by
structuring financials, aligning them with the
right investors, and participating in deal
execution.`}
                        </motion.p>

                        <motion.p
                            className="mt-8 max-w-[60ch] whitespace-normal md:whitespace-pre-line text-[16px] leading-relaxed text-gray-500 md:text-[18px]"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={fadeUp}
                            custom={0.18}
                        >
                            {`Through its portfolio, Ryleni has
contributed across sectors, supporting
product development, operational
improvements, and capital access with a
practical, results-driven approach.`}
                        </motion.p>

                        <motion.ul
                            className="mt-12 flex flex-col gap-4 text-neutral-800"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={fadeUp}
                            custom={0.24}
                        >
                            <li className="flex items-center gap-3">
                                <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium text-[16px] md:text-[18px]">Access to our partnering & design team</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium text-[16px] md:text-[18px]">Deep expertise across industries</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="font-medium text-[16px] md:text-[18px]">Close a Series A within 6 months</span>
                            </li>
                        </motion.ul>
                    </div>

                    <div className="md:col-span-5 md:mt-24">
                        <div className="flex flex-col gap-8">
                            <motion.div
                                className="relative overflow-hidden rounded-3xl bg-neutral-100"
                                initial={{ opacity: 0, scale: 1.03 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.35 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="aspect-[3/4] w-full" />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_30%,rgba(79,70,229,0.22),transparent_60%),radial-gradient(60%_55%_at_70%_70%,rgba(17,24,39,0.10),transparent_55%)]" />
                                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
                            </motion.div>

                            <motion.div
                                className="w-full flex justify-end"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={fadeUp}
                                custom={0.12}
                            >
                                <span className="font-myfont bold text-[clamp(2rem,4.6vw,4.25rem)] leading-[0.95] tracking-[0.02em] text-violet-600">
                                    We are co-builders.
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Aboutsection
