// components/SearchBox.js
const SearchBox = ({ searchQuery, setSearchQuery }) => (
    <div className="text-center inline-block py-[1vh] w-[80vw]">
      <input
        className="
        text-blue-900 dark:text-gray-300
        bg-yellow-50 dark:bg-blue-950
        w-48 m-0.5 p-1 text-center border-2 border-gray-600 rounded-lg"
        type="text"
        placeholder="🔍请输入关键词"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
  
  export default SearchBox;