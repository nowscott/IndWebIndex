// components/Tags.js
const Tags = ({ tags, onList, handleToggleTagButton }) => (
    <div>
      <h2 className="title-tags">选择标签</h2>
      <div id="tags-container">
        {tags.map(tag => (
          <button
            key={tag}
            className={onList.includes(tag) ? 'tag on' : 'tag off'}
            onClick={() => handleToggleTagButton(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
  
  export default Tags;