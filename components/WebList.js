// components/WebList.js
const WebList = ({ filteredPosts }) => (
    <div>
      <h2 className="title-webs">筛选网页</h2>
      <div id="webs-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <a key={post.name} id="web" href={post.web} target="_blank" rel="noopener noreferrer" title={post.brief}>
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