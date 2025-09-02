import React from 'react';

export function Input(props) {
  const { className = '', ...rest } = props;
  return (
    <input
      className={`bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-full px-5 py-3 text-zinc-800 placeholder:text-zinc-400 font-light tracking-wide shadow-sm hover:border-zinc-300/80 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all duration-200 ${className}`}
      spellCheck={false}
      data-ms-editor={true}
      {...rest}
    />
  );
}
