import React from "react";

/** 外枠はできるだけ薄く。白いマットは画像側で作るので Card 自体は余計な背景を付けない */
export function Card({ children, className = "" }) {
  return (
    <div className={`group m-3 md:m-4 ${className}`}>
      {children}
    </div>
  );
}

/** タイトルや日付用の内側余白。見た目を合わせたいなら文字サイズもここで統一 */
export function CardContent({ children, className = "" }) {
  return <div className={`pt-3 ${className}`}>{children}</div>;
}

/**
 * 白い額縁（マット）＋薄い影を画像側で作る。
 * - 画像は 4:5 固定比率
 * - フチは p-4（SPは p-3）で再現
 * - Hover時は画像だけ 1.02 スケール
 */
export function CardImage({ src, alt, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-white py-3 px-2 md:py-4 md:px-4 ring-1 ring-neutral-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_6px_24px_rgba(0,0,0,0.06)]">
        <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            onLoad={(e) => {
              const box = e.currentTarget.parentElement;
              if (box) box.classList.add("is-loaded");
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/blog/blog-main.jpg";
              const box = e.currentTarget.parentElement;
              if (box) box.classList.add("is-loaded");
            }}
          />
        </div>
      </div>
    </div>
  );
}
