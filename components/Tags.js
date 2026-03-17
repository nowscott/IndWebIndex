import React, { memo } from 'react';

// components/Tags.js
const Tags = memo(({ tags, onList, handleToggleTagButton, emptyHint }) => (
  <section className="mb-8 px-6 sm:px-12 lg:px-24 max-w-[90rem] mx-auto">
    {tags.length > 0 ? (
      <div className='flex flex-wrap justify-center gap-1.5'>
        {tags.map(tag => {
          const isActive = onList.includes(tag);
          return (
            <button
              key={tag}
              className={`
                px-3 py-1 text-[11px] sm:text-xs rounded-lg border 
                transition-[background-color,border-color,color,transform,box-shadow] duration-300
                ${isActive 
                  ? 'bg-orange-500 dark:bg-orange-500 text-white dark:text-white border-orange-500 dark:border-orange-500 shadow-md scale-105' 
                  : 'bg-[linear-gradient(165deg,rgba(244,249,255,0.94),rgba(226,239,255,0.85))] dark:bg-[linear-gradient(165deg,rgba(43,43,47,0.9),rgba(27,27,30,0.94))] text-[#773d31] dark:text-zinc-300 border-sky-300 dark:border-zinc-500/80 hover:border-orange-500 dark:hover:border-zinc-300 hover:bg-white dark:hover:bg-[#2C2C2E] shadow hover:shadow-md dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]'}
              `}
              onClick={() => handleToggleTagButton(tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
    ) : (
      <div className="py-12 text-slate-400 italic text-xs text-center w-full">
        {emptyHint}
      </div>
    )}
  </section>
));

export default Tags;
