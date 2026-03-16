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
              bg-sky-50/50 dark:bg-[#451a1a]/80 text-orange-600 dark:text-green-50 border-sky-200/80 dark:border-[#5a1a1a]
              shadow hover:border-orange-500 dark:hover:border-rose-400 hover:shadow-lg hover:bg-white dark:hover:bg-[#5a1a1a]/90
              hover:-translate-y-1
            `}
            href={post.web}
            target="_blank"
            rel="noopener noreferrer"
            title={post.brief}>
            <span className="font-extrabold group-hover:text-orange-500 dark:group-hover:text-white transition-colors text-center whitespace-nowrap">
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