//components/Titles.js
const Titles = () => (
  <div>
    <div className={`text-4xl my-3 text-center font-normal title-1`}>
      <a
        className="underline hover:no-underline text-orange-400 dark:text-lime-100"
        href="https://github.com/NowScott/IndWebIndex"
        target="_blank"
        rel="noopener noreferrer"
      >
        Individual Web Index.
      </a>
    </div>
    <div className={`text-xl my-1 text-center font-normal title-2`}>
      <a
        className="underline hover:no-underline text-purple-700 dark:text-stone-100"
        href="https://github.com/nowscott/IndWebIndex/blob/main/README.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        如何部署
      </a>
    </div>
  </div>
);

export default Titles;