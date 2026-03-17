// components/SearchBox.js
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBox = ({ searchQuery, setSearchQuery }) => (
    <div className="flex justify-center w-full px-4 mb-4">
      <div className="relative group max-w-sm w-full">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <HiOutlineSearch className="w-4 h-4" />
        </div>
        <input
          className="
          w-full pl-9 pr-4 py-1.5
          text-sm
          text-slate-800 dark:text-slate-200
          bg-sky-50/50 dark:bg-slate-800/50
          border border-sky-200 dark:border-slate-700
          rounded-xl shadow-sm hover:shadow-md focus:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50
          transition-[background-color,border-color,color] duration-400 placeholder:text-slate-400"
          type="text"
          placeholder="搜索网页、标签或拼音..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
  
  export default SearchBox;