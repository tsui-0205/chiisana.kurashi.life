"use client";

import Link from "next/link";

export default function NavigationMenu({ isOpen, onClose }) {
    const menuItems = [
        { href: "/", label: "ホーム", type: "internal" },
        { href: "#about", label: "わたしたちのこと", type: "anchor" },
        { href: "/blog", label: "日々のこと", type: "internal" },
        {
            href: "https://www.instagram.com/chiisana.kurashi.life?igsh=MXVpeDk4YjRwbzZrag==",
            label: "Instagram",
            type: "external"
        }
    ];

    return (
        <div className={`mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300 ${isOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-4'}`}>
            <nav>
                <ul className="space-y-4 text-sm">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.type === "external" ? (
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-zinc-100"
                                    onClick={onClose}
                                >
                                    {item.label}
                                </a>
                            ) : item.type === "internal" ? (
                                <Link
                                    href={item.href}
                                    className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-zinc-100"
                                    onClick={onClose}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <a
                                    href={item.href}
                                    className="block text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer py-2 px-3 rounded-lg hover:bg-zinc-100"
                                    onClick={onClose}
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
