const Herosection = () => {

    return (
        <section className="w-full mt-8 py-12 min-h-[calc(100svh-140px)]">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-col gap-10">
                    <h1 className="text-center">
                        <span className="block text-[70px] font-myfont leading-[1]">
                            We Build, Fund & Scale
                        </span>
                        <span className="text-violet-600 block mt-1 font-myfont italic text-[50px] leading-[1]">
                            Innovative Startups.
                        </span>
                    </h1>

                    <p className="font-myfont text-[19px] leading-[1.6] text-neutral-400 max-w-[650px] mx-auto">
                        Our venture studio partners with founders to transform <br />
                        breakthrough ideas into scalable companies through <br />
                        capital, strategy, and operational excellence.
                    </p>
                    <div className="mx-auto flex w-full max-w-[650px] items-center gap-6">
                        <button className="flex-1 rounded-xl border bg-violet-600 text-white px-6 py-3 text-sm font-semibold text-neutral-900">
                            Explore services
                        </button>
                        <button className="flex-1 rounded-xl border border-violet-600 bg-white px-6 py-3 text-sm font-semibold text-neutral-900">
                            Apply for funding
                        </button>
                        <button className="flex-1 rounded-xl border border-violet-600 bg-white px-6 py-3 text-sm font-semibold text-neutral-900">
                            Brochure
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Herosection;
