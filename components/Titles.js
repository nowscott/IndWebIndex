//components/Titles.js
const Titles = ({ title = "Individual Web Index", link = "https://github.com/NowScott/IndWebIndex" }) => (
  <div className="pt-6 pb-4">
    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
      <a
        className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500 dark:from-lime-200 dark:to-emerald-400 hover:opacity-80 transition-opacity duration-300"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    </h1>
  </div>
);

export default Titles;