"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// サンプルの会話データ
const initialMessages = [
    {
        id: "m1",
        author: "tsubasa",
        text: "おつかれさま〜 今日どこ行く？",
        createdAt: new Date("2025-10-08T08:00:00"),
    },
    {
        id: "m2",
        author: "misaki",
        text: "海の近くのカフェどうかな☕️",
        createdAt: new Date("2025-10-08T08:01:10"),
    },
    {
        id: "m3",
        author: "tsubasa",
        text: "賛成！ じゃあ11時に出よう",
        createdAt: new Date("2025-10-08T08:02:00"),
    },
    {
        id: "m4",
        author: "misaki",
        text: "OK〜 準備してくるね",
        createdAt: new Date("2025-10-08T08:02:45"),
    },
];

// 時刻を "8:02" のように表示
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// 日付セパレーター用（"2025/10/08"）
function formatDateYMD(date) {
    return date.toLocaleDateString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

export default function WorksSection() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    // 自動スクロール
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages.length]);

    // 日付セパレーターを挿入するための整形
    const withSeparators = useMemo(() => {
        const out = [];
        let lastDateKey = "";
        for (const m of messages) {
            const key = formatDateYMD(m.createdAt);
            if (key !== lastDateKey) {
                out.push({ __sep: key, key: `sep-${key}` });
                lastDateKey = key;
            }
            out.push(m);
        }
        return out;
    }, [messages]);

    // 送信処理（自分=misaki想定）
    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        const newMsg = {
            id: `m-${Date.now()}`,
            author: "misaki",
            text,
            createdAt: new Date(),
            read: true,
        };
        setMessages((prev) => [...prev, newMsg]);
        setInput("");

        // デモ用：1秒後に相手から返事
        setTimeout(() => {
            const reply = {
                id: `r-${Date.now()}`,
                author: "tsubasa",
                text: "了解！🚗",
                createdAt: new Date(),
            };
            setMessages((prev) => [...prev, reply]);
        }, 1000);
    };

    // Enterで送信（Shift+Enterで改行）
    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex h-dvh w-full flex-col bg-[color:var(--line-bg,#E5EDF1)] [--line-bg:#E5EDF1]">
            {/* ヘッダー（タイトル：夫のつぶやき） */}
            <div className="sticky top-0 z-10 flex h-20 items-center gap-3 bg-[color:var(--line-green,#00B900)] px-4 text-white">
                <div className="size-8 rounded-full bg-white/20 grid place-items-center font-bold">夫</div>
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col leading-tight">
                        <span className="text-base font-semibold">夫のつぶやき</span>
                        <span className="text-xs opacity-90">最新のつぶやき</span>
                    </div>

                    {/* header: no extra link here; link moved below content */}
                </div>
            </div>

            {/* 本文（スクロール領域） */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-3 py-4 pb-24 [@supports(padding:max)]:pb-[max(6rem,env(safe-area-inset-bottom))]"
            >
                <AnimatePresence initial={false}>
                    {withSeparators.map((item) => {
                        if ("__sep" in item) {
                            return (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    className="mb-3 flex justify-center"
                                >
                                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/60">
                                        {item.__sep.replaceAll("/", ".")}
                                    </span>
                                </motion.div>
                            );
                        }

                        const m = item;
                        const isMine = m.author === "misaki";

                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className={`mb-3 flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {/* 相手のアバター */}
                                {!isMine && (
                                    <div className="size-8 shrink-0 rounded-full bg-black/10 grid place-items-center text-xs font-bold text-black/70">
                                        夫
                                    </div>
                                )}

                                {/* 吹き出し */}
                                <div
                                    className={`relative max-w-[74%] rounded-2xl px-3 py-2 text-[15px] leading-snug shadow-sm ${isMine
                                        ? "bg-[color:var(--mine,#C6F5C6)] text-black [--mine:#C6F5C6]"
                                        : "bg-white text-black"
                                        } ${isMine ? "rounded-br-md" : "rounded-bl-md"}`}
                                >
                                    {m.text && <p className="whitespace-pre-wrap break-words">{m.text}</p>}
                                    {m.imageUrl && (
                                        <img
                                            src={m.imageUrl}
                                            alt="image message"
                                            className="mt-1 w-full rounded-xl"
                                        />
                                    )}

                                    {/* しっぽ */}
                                    <span
                                        className={`absolute bottom-0 h-3 w-3 translate-y-1/2 ${isMine ? "right-1 rotate-45" : "left-1 -rotate-45"
                                            } ${isMine ? "bg-[color:var(--mine,#C6F5C6)]" : "bg-white"}`}
                                        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                                    />

                                    {/* 時刻 + 既読 */}
                                    <div
                                        className={`mt-1 flex items-center gap-1 ${isMine ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        {isMine && m.read && (
                                            <span className="text-[10px] text-black/50">既読</span>
                                        )}
                                        <time className="text-[10px] text-black/40">
                                            {formatTime(m.createdAt)}
                                        </time>
                                    </div>
                                </div>

                                {/* 自分の空ダミー（アバターの代わりに余白を合わせる） */}
                                {isMine && <div className="size-8 shrink-0" />}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* 入力エリア */}
            <div className="sticky bottom-0 z-10 w-full bg-white/90 backdrop-blur supports-[padding:max]:pb-[env(safe-area-inset-bottom)]">
                <div className="mx-auto flex max-w-screen-sm items-end gap-2 px-3 py-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        placeholder="メッセージを入力"
                        className="max-h-32 w-full resize-none rounded-2xl border border-black/10 bg-black/5 px-3 py-2 outline-none focus:border-black/20"
                    />
                    <button
                        onClick={handleSend}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--line-green,#00B900)] text-white shadow active:scale-95"
                        aria-label="送信"
                    >
                        ➤
                    </button>
                </div>
            </div>
            {/* つぶやきへボタン（Instagramセクションの 'もっと見る' と同じ位置・デザイン） */}
            <div className="mt-14 text-center fade-in-up">
                <Link
                    href="/site/blog"
                    className="group inline-flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-6 focus:outline-none"
                    aria-label="つぶやきへ"
                >
                    {/* 円ボタン（デザインを合わせた） */}
                    <span className="grid place-items-center w-20 h-20 rounded-full border border-[#84B5C5] bg-zinc-100/60 text-[#84B5C5] shadow-sm transition-all
       group-hover:border-zinc-600 group-hover:bg-zinc-200/80 group-focus-visible:ring-1 group-focus-visible:ring-[#84B5C5]/50">
                        <svg
                            width="28" height="28" viewBox="0 0 24 24" fill="none"
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                            <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M18 9l4 3-4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>

                    {/* テキスト（色・フォントを合わせる） */}
                    <span className="text-[#84B5C5] text-xl sm:text-2xl tracking-wide font-semibold py-2
                            group-hover:underline underline-offset-4 decoration-[#84B5C5] transition-colors">
                        つぶやきへ
                    </span>

                </Link>
            </div>
        </div>
    );
}
