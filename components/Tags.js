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
              className={`home-frosted-tag ${isActive ? 'home-frosted-tag-active' : ''}`}
              aria-pressed={isActive}
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
