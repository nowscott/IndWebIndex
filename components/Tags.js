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
              transition-[background-color,border-color,color] duration-300
              ${isActive 
                ? 'bg-orange-500 dark:bg-rose-600 text-white dark:text-white border-orange-500 dark:border-rose-400 shadow-md scale-105' 
                : 'bg-sky-100/70 dark:bg-[#451a1a]/80 text-orange-500 dark:text-green-50 border-sky-300 dark:border-[#5a1a1a] hover:border-orange-500 dark:hover:border-rose-400 hover:bg-white dark:hover:bg-[#5a1a1a]/90 shadow hover:shadow-md'}
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