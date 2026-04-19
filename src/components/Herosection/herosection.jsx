import BlurText from '../BlurText';
import PillButton from '../Pillbutton';

const Herosection = () => {
    return (
        <section className="w-full mt-8 py-12 min-h-[calc(100svh-140px)]">
            <div className="flex flex-col items-center text-center">
                <div className="flex flex-col gap-10">
                    <h1 className="text-center">
                        <span className="block text-[70px] font-season leading-[1]">
                            We Build, Fund & Scale
                        </span>
                        <BlurText
                            text="Innovative Startups."
                            delay={200}
                            animateBy="words"
                            direction="top"
                            className="text-violet-600 mt-1 font-instrument italic text-[70px] leading-[1] justify-center"
                        />
                    </h1>

                    <p className="text-[19px] leading-[1.6] text-neutral-700 max-w-[650px] mx-auto">
                        Our venture studio partners with founders to transform <br />
                        breakthrough ideas into scalable companies through <br />
                        capital, strategy, and operational excellence.
                    </p>

                    <div className="mx-auto flex items-center justify-center gap-4 flex-wrap">
                        <PillButton label="Explore services" href="#" />
                        <PillButton label="Apply for funding" href="#" />
                        <PillButton label="Brochure" href="#" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Herosection;
