// components/WebList.js
const WebList = ({ filteredPosts }) => (
  <section className="mb-12 px-6 sm:px-12 lg:px-24 max-w-[90rem] mx-auto border-t border-gray-100 dark:border-slate-800/50 pt-8">
    <div className='flex flex-wrap justify-center gap-2 items-center'>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <a
            key={post.name}
            className={`
              group relative flex items-center justify-center transition-all duration-300
              px-3.5 py-1.5 text-[11px] sm:text-xs rounded-full border
              bg-white dark:bg-slate-600/30 text-slate-700 dark:text-slate-100 border-slate-400/80 dark:border-slate-500/50
              shadow-sm hover:border-blue-500 dark:hover:border-blue-300 hover:shadow-md hover:bg-white dark:hover:bg-slate-600
              hover:-translate-y-0.5
            `}
            href={post.web}
            target="_blank"
            rel="noopener noreferrer"
            title={post.brief}>
            <span className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center whitespace-nowrap">
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
);

export default WebList;