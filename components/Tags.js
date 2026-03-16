// components/Tags.js
const Tags = ({ tags, onList, handleToggleTagButton }) => (
  <section className="mb-6 px-6 sm:px-12 lg:px-24 max-w-[90rem] mx-auto">
    <div className='flex flex-wrap justify-center gap-1.5'>
      {tags.map(tag => {
        const isActive = onList.includes(tag);
        return (
          <button
            key={tag}
            className={`
              px-3 py-1 text-[11px] sm:text-xs rounded-lg border transition-all duration-200
              ${isActive 
                ? 'bg-slate-800 dark:bg-blue-500 text-white dark:text-white border-slate-800 dark:border-blue-400 shadow-md scale-105' 
                : 'bg-white dark:bg-slate-600/40 text-slate-700 dark:text-slate-200 border-slate-400/80 dark:border-slate-500 hover:border-blue-500 dark:hover:border-slate-400 hover:bg-white dark:hover:bg-slate-600 shadow-sm hover:shadow-md'}
            `}
            onClick={() => handleToggleTagButton(tag)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  </section>
);

export default Tags;