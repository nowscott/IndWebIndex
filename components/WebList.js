// components/WebList.js
const WebList = ({ filteredPosts }) => (
  <div>
    <div className='text-center text-base my-[1vh] text-purple-700 dark:text-stone-100'>
      筛选网页
    </div>
    <div className='mx-[8vw] py-[1vh] text-center'>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <a
            key={post.name}
            className='inline-block m-1 p-[1px_5px] leading-6 rounded-md tracking-wide text-[0.9em]
            text-blue-900 dark:text-gray-100
             bg-lime-50 dark:bg-blue-950 border-[1.5px] border-gray-400'
            href={post.web}
            target="_blank"
            rel="noopener noreferrer"
            title={post.brief}>
            {post.name}
          </a>
        ))
      ) : (
        <p>未找到符合条件的网页</p>
      )}
    </div>
  </div>
);

export default WebList;