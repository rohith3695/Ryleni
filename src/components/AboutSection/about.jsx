const Aboutsection = () => {
    return (
        <section className="w-full border-t border-neutral-200 py-24">
            <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col gap-14">
                    <div className="max-w-3xl">
                        <h2 className="m-0 font-myfont text-[clamp(2.5rem,4.8vw,4.5rem)] leading-[1.1] text-neutral-900">
                            Who we are ?
                        </h2>

                        <p className="mt-5 text-[18px] leading-relaxed text-neutral-600">
                            We&apos;re a venture studio that partners with founders to take ideas from
                            zero to one and scale them with strategy, capital, and execution.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-6">
                            <h3 className="font-myfont text-[20px] text-neutral-900">Build</h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                                Product, brand, and systems designed to ship fast and iterate
                                faster.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6">
                            <h3 className="font-myfont text-[20px] text-neutral-900">Fund</h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                                Capital planning and fundraising support aligned to your stage.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6">
                            <h3 className="font-myfont text-[20px] text-neutral-900">Scale</h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                                Growth strategy, hiring, and ops to turn momentum into a company.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Aboutsection;
