import React from 'react';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import FontMenu from '../components/FontMenu';
import Head from 'next/head';
import VisitActivity from '../components/VisitActivity';
import { getDatabase } from '../lib/notion';
import { getVisitActivitySnapshot } from '../lib/visitStats';
import Link from 'next/link';

const principles = [
  ['01', '个人黄页', '为自己留下一个清晰、可信、随时能回来的入口。'],
  ['02', '按自己的方式归档', '不追逐平台的默认排序，让每一条路径都按你的习惯展开。'],
  ['03', '回到纯粹浏览', '少一点干扰与推荐，把注意力留给真正想看的内容。'],
];

const AboutPage = ({ count, lastFetched, visitActivity, activitySnapshotAt }) => {

  return (
    <div className='about-page m-0 min-h-screen overflow-auto tracking-widest flex flex-col font-inherit'>
      <Head>
        <title>关于 - IndWebIndex</title>
      </Head>
      
      <HeaderBar lastFetched={lastFetched} count={count} />
      <FontMenu />

      <main className="about-shell flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-24">
        <section className="about-manifesto text-left" aria-labelledby="about-title">
          <div>
            <p className="about-kicker">INDWEBINDEX · ABOUT</p>
            <h1 id="about-title" className="about-title mt-5">
              Individual<br />Web Index
            </h1>
            <p className="about-lead mt-6">
              互联网时代的个人黄页，让寻找回归准确与高效。
            </p>
            <Link
              href="/"
              className="about-glass-button inline-flex items-center justify-center mt-9 px-7 py-3 rounded-full text-base font-bold"
            >
              开始探索
            </Link>
          </div>
          <p className="about-manifesto-note">
            把常用的网页整理成一张只属于你的索引。少一点被推着走，多一点准确抵达。
          </p>
        </section>

        {visitActivity && (
          <section className="about-activity-stage" aria-label="访问活动快照">
            <VisitActivity activity={visitActivity} snapshotAt={activitySnapshotAt} />
          </section>
        )}

        <section className="about-principles" aria-labelledby="about-values-title">
          <div className="about-principles-heading">
            <p className="about-kicker">WHAT GUIDES THIS INDEX</p>
            <h2 id="about-values-title">为个人留下清晰入口</h2>
          </div>
          <ol className="about-principles-list">
            {principles.map(([number, title, description]) => (
              <li key={number} className="about-principle">
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const databaseId = process.env.DATABASE_ID;
  const posts = await getDatabase(databaseId);
  const lastFetched = new Date().toISOString();
  
  // 关于页只需提供元数据统计，不要同步 posts 列表到全局缓存，
  // 这样能确保跳回首页时，首页使用的是其自身半小时内稳定的随机排序数据。
  const normalPosts = (posts || []).filter(post => post.state !== '隐藏');
  const count = normalPosts.length;
  let visitSnapshot = null;

  try {
    visitSnapshot = await getVisitActivitySnapshot();
  } catch (error) {
    console.error('[About] Visit activity snapshot unavailable:', error);
  }

  return {
    props: {
      count,
      lastFetched,
      visitActivity: visitSnapshot?.activity || null,
      activitySnapshotAt: visitSnapshot ? new Date().toISOString() : null,
    },
  };
}

export default AboutPage;
