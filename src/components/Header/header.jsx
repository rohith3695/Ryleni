
const Header = () => {
    return (
        <header className="w-full px-[18px] py-6 font-myfont thin italic">
            <div className="mx-auto flex max-w-[1240px] items-center gap-[18px] rounded-[28px] border border-neutral-200 bg-white px-[22px] py-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.10)] max-[760px]:rounded-[22px] max-[760px]:px-[14px] max-[760px]:py-[14px]">
                <a className="flex items-center gap-[14px] whitespace-nowrap text-neutral-950 no-underline" href="#">
                    <svg
                        className="block h-[34px] w-[34px]"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M10 49V15l18 18V15h10v34L20 31v18H10z"
                            fill="#0B0B0B"
                        />
                        <path
                            d="M44 15h10v34H44V15z"
                            fill="#0B0B0B"
                            opacity="0.9"
                        />
                    </svg>
                    <span className="text-[22px] font-bold uppercase tracking-[0.02em]" >
                        NEXACRFT
                    </span>
                </a>

                <nav
                    className="flex flex-1 items-center justify-center gap-11 max-[760px]:hidden text-[16px]"
                    aria-label="Primary"
                >
                    <a
                        className="rounded-full px-3 py-[10px] font-light text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Services
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] font-light text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        How It Works
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] font-light text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Portfolio
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] font-light text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Careers
                    </a>
                    <a
                        className="rounded-full px-3 py-[10px] font-light text-neutral-800 no-underline transition hover:bg-neutral-100"
                        href="#"
                    >
                        Updates
                    </a>
                </nav>

                <button
                    className="font-myfont italic whitespace-nowrap rounded-2xl bg-indigo-600 px-[22px] py-[14px] text-[15px] font-semibold text-white shadow-[0_10px_18px_rgba(0,0,0,0.28)] max-[760px]:hidden"
                    type="button"
                >
                    Apply Now
                </button>

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
