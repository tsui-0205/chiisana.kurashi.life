"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavigationMenu({ isOpen, onClose }) {
    const pathname = usePathname();
    const [hash, setHash] = useState("");

    useEffect(() => {
        const update = () => setHash(window.location.hash || "");
        update();
        window.addEventListener("hashchange", update);
        return () => window.removeEventListener("hashchange", update);
    }, []);

    const menuItems = [
        { href: "/", label: "ホーム", type: "internal" },
        { href: "#about", label: "わたしたちのこと", type: "anchor" },
        { href: "/blog", label: "日々のこと", type: "internal" },
        {
            href: "https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag==",
            label: "Instagram",
            type: "external",
        },
    ];

    const isActive = (item) => {
        if (item.type === "anchor") return hash === item.href;
        if (item.type === "internal") return pathname === item.href;
        return false;
    };
    const renderList = (mobile = false) => (
        <ul className={`${mobile ? 'space-y-6 text-lg' : 'space-y-2 text-[15px] leading-6 tracking-wide'}`}>
            {menuItems.map((item, index) => {
                const active = isActive(item);
                const baseClass = mobile
                    ? 'block text-zinc-900 hover:text-zinc-700 transition-colors cursor-pointer py-3 px-2 text-center'
                    : 'block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 pl-5 pr-3 rounded-lg hover:bg-zinc-50';
                const Wrapper = item.type === "internal" ? Link : "a";
                const wrapperProps =
                    item.type === "external"
                        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                        : { href: item.href };

                return (
                    <li key={index} className={`relative ${mobile ? '' : 'group'}`} data-active={active}>
                        {!mobile && (
                            <span
                                aria-hidden
                                className={
                                    `pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-6 w-px bg-zinc-300 opacity-0 transition-opacity duration-300 group-hover:opacity-60 data-[active=true]:opacity-60`
                                }
                            />
                        )}
                        <Wrapper
                                    {...wrapperProps}
                                    className={`${baseClass} data-[active=true]:text-zinc-900`}
                                    onClick={onClose}
                                    data-active={active}
                                    style={{ cursor: 'pointer' }}
                                >
                            {item.label}
                        </Wrapper>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <>
            {/* Mobile-only full-screen overlay */}
            <div className={`md:hidden fixed inset-0 z-50 transition-opacity ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`} aria-hidden={!isOpen}>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
                <div className={`relative h-full overflow-auto bg-white/95 p-6 flex flex-col transform origin-top transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-6'}`}>
                    <div className="flex items-center justify-end">
                        <button onClick={onClose} className="p-2 rounded-md text-zinc-700" aria-label="閉じるメニュー">✕</button>
                    </div>
                    <nav className="mt-8">{renderList(true)}</nav>
                </div>
            </div>

            {/* Desktop: compact fixed panel at top-right when open; hidden when closed */}
            <div className="hidden md:block">
                {isOpen && (
                    <div className="fixed top-16 right-8 z-40 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 transition-transform duration-200">
                        <nav>{renderList(false)}</nav>
                    </div>
                )}
            </div>
        </>
    );
}
