// components/SearchBox.js
const SearchBox = ({ searchQuery, setSearchQuery }) => (
    <div className="search-box">
      <input
        className="search-in"
        id="s-in"
        type="text"
        placeholder="🔍请输入关键词"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
  
  export default SearchBox;