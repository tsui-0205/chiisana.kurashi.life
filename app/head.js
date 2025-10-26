export default function Head() {
  return (
    <>
      {/* YakuHanJP Narrow (cdn) */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp-narrow.min.css" />
      {/* Zen Kaku Gothic New (Google Fonts) */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500&display=swap" />
      {/* Zen Maru Gothic (Google Fonts) */}
      <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700&display=swap" rel="stylesheet" />
      {/* Kosugi Maru & Yomogi (Google Fonts) - fallbacks similar to YasashisaGothic */}
      <link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Yomogi&display=swap" rel="stylesheet" />
    </>
  );
}
