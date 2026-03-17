import React, { memo } from 'react';

// components/Tags.js
const Tags = memo(({ tags, onList, handleToggleTagButton }) => (
  <section className="mb-6 px-6 sm:px-12 lg:px-24 max-w-[90rem] mx-auto">
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
                : 'bg-sky-100/70 dark:bg-[#1C1C1E] text-orange-500 dark:text-zinc-400 border-sky-300 dark:border-zinc-800 hover:border-orange-500 dark:hover:border-zinc-600 hover:bg-white dark:hover:bg-[#2C2C2E] shadow hover:shadow-md'}
            `}
            onClick={() => handleToggleTagButton(tag)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  </section>
));

export default Tags;