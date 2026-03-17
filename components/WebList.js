import React, { memo } from 'react';

// components/WebList.js
const WebList = memo(({ filteredPosts }) => (
  <section className="mb-12 px-6 sm:px-12 lg:px-24 max-w-[90rem] mx-auto">
    <div>
      <div className="h-[2px] rounded-full bg-sky-300 dark:bg-zinc-500/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"></div>
    </div>
    <div className='mt-8 flex flex-wrap justify-center gap-2 items-center'>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <a
            key={post.name}
            className={`
              group relative flex items-center justify-center 
              transition-[background-color,border-color,color,transform,box-shadow] duration-300
               px-3.5 py-1.5 text-[11px] sm:text-xs rounded-full border
               bg-[linear-gradient(165deg,rgba(244,249,255,0.94),rgba(227,240,255,0.84))] dark:bg-[linear-gradient(165deg,rgba(43,43,47,0.9),rgba(28,28,30,0.95))] text-[#773d31] dark:text-zinc-200 border-sky-300 dark:border-zinc-500/80
               shadow hover:border-orange-500 dark:hover:border-zinc-300 hover:shadow-lg hover:bg-white dark:hover:bg-[#2C2C2E] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
               hover:-translate-y-1
             `}
            href={post.web}
            target="_blank"
            rel="noopener noreferrer"
            title={post.brief}>
            <span className="font-extrabold group-hover:text-[#773d31] dark:group-hover:text-white transition-colors text-center whitespace-nowrap">
              {post.name}
            </span>
          </a>
        ))
      ) : (
        <div className="py-12 text-slate-400 italic text-xs text-center w-full">
          未找到符合条件的网页
        </div>
      )}
    </div>
  </section>
));

export default WebList;
