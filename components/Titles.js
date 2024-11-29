//components/Titles.js
const Titles = ({ title = "Individual Web Index", link = "https://github.com/NowScott/IndWebIndex" }) => (
  <div>
    <h1 className="text-[2rem] my-3 text-center font-normal title-1">
      <a
        className="underline hover:no-underline text-orange-400 dark:text-lime-100"
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