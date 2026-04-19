
import PillButton from '../Pillbutton';

const Header = () => {
    return (
        <header className="w-full px-[18px] py-6 font-season">
            <div className="mx-auto flex max-w-[1240px] items-center gap-[18px] rounded-[28px] border border-neutral-200 bg-white px-[22px] py-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.10)] max-[760px]:rounded-[22px] max-[760px]:px-[14px] max-[760px]:py-[14px]">
                <a className="flex items-center gap-[12px] whitespace-nowrap text-neutral-950 no-underline" href="#">
                    <img
                        src="/favicon.svg"
                        alt="Ryleni Logo"
                        className="block h-[32px] w-auto shrink-0 object-contain"
                    />
                    <span className="text-[26px] font-bold lowercase tracking-[-0.03em] text-violet-600 not-italic font-myfont">
                        ryleni
                    </span>
                </a>

                <nav
                    className="flex flex-1 items-center justify-end pr-5 gap-5 max-[760px]:hidden text-[16px]"
                    aria-label="Primary"
                >
                    <a
                        className="rounded-full px-3 py-[10px] text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Services
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        How It Works
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Portfolio
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Careers
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Updates
                    </a>
                </nav>

                <div className="max-[760px]:hidden shrink-0">
                    <PillButton label="Apply Now" href="#" isSmall={true} variantColor="#7c3aed" />
                </div>

                <button
                    className="ml-auto hidden h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-neutral-200 bg-white max-[760px]:inline-flex"
                    type="button"
                    aria-label="Open menu"
                >
                    <svg
                        className="h-[18px] w-[18px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M4 7h16M4 12h16M4 17h16"
                            stroke="#0B0B0B"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header
