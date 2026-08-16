import React, { memo } from 'react';
import { Glass } from '@samasante/liquid-glass';

const tagGlassOptics = {
  strength: 0.025,
  depth: 0.35,
  curvature: 0.12,
  bend: 0.45,
  bendWidth: 0.12,
  dispersion: 0.08,
  frost: 4,
  saturate: 1.06,
  sheen: 0.22,
  sheenWidth: 2,
  glow: 0.06,
};

// components/Tags.js
const Tags = memo(({ tags, onList, handleToggleTagButton, emptyHint }) => (
  <section className="mb-8 px-6 sm:px-12 lg:px-24 max-w-[90rem] mx-auto">
    {tags.length > 0 ? (
      <div className='flex flex-wrap justify-center gap-1.5'>
        {tags.map(tag => {
          const isActive = onList.includes(tag);
          return (
            <Glass
              key={tag}
              className={`home-liquid-tag ${isActive ? 'home-liquid-tag-active' : ''}`}
              radius={8}
              optics={tagGlassOptics}
            >
              <button
                className="home-liquid-tag-button"
                aria-pressed={isActive}
                onClick={() => handleToggleTagButton(tag)}
              >
                {tag}
              </button>
            </Glass>
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
