// components/SearchBox.js
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBox = ({ searchQuery, setSearchQuery }) => (
    <div className="flex justify-center w-full px-4 mb-4">
      <div className="relative group max-w-sm w-full">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500 group-focus-within:text-blue-500 dark:group-focus-within:text-zinc-300 transition-colors">
          <HiOutlineSearch className="w-4 h-4" />
        </div>
        <input
          className="
          w-full pl-9 pr-4 py-1.5
          text-sm
          text-slate-700 dark:text-zinc-100
          bg-sky-100/70 dark:bg-[#1C1C1E]
          border border-sky-300 dark:border-zinc-800
          rounded-xl shadow-sm hover:shadow-md focus:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-zinc-500/20
          transition-[background-color,border-color,color] duration-400 placeholder:text-slate-400 dark:placeholder:text-zinc-500"
          type="text"
          placeholder="搜索网页、标签或拼音..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
  
  export default SearchBox;