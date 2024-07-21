// components/Tags.js
const Tags = ({ tags, onList, handleToggleTagButton }) => (
  <div>
    <div className='text-center text-base my-[1vh] text-purple-700 dark:text-stone-100'>
      选择标签
    </div>
    <div className='mx-[8vw] py-[1vh] text-center'>
      {tags.map(tag => (
        <button
          key={tag}
          className={`inline-block m-1 p-[1px_5px] leading-6 rounded-md tracking-wide text-[0.9em]
            border-[1.5px] border-gray-400  
              ${onList.includes(tag) ?
              'text-stone-100 dark:text-slate-950 bg-slate-600 dark:bg-gray-100' :
              'text-slate-600 dark:text-gray-100 bg-stone-100 dark:bg-slate-950'}`}
          onClick={() => handleToggleTagButton(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

export default Tags;