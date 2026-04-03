# Individual Web Index (个人网页索引)

[![GitHub stars][stars-image]][stars-url]
[![GitHub forks][forks-image]][forks-url]
[![license GPL-3.0][license-image]][license-url]
[![commit-count-permonth][commit-image]][commit-url]
[![contributors-count][contributors-image]][contributors-url]

> “在算法编织的迷雾中，找回数字生活里的那一枚‘锚点’。”

---

在信息爆炸的今天，寻找特定、高质量的网站往往如同大海捞针。我们并不缺更多的搜索结果，缺的是一份属于自己的、精准的、可控的“数字指南”。

**Individual Web Index** 并不是一个复杂的工具。它更像是一份数字时代的“私人黄页”。它将 Notion 的灵活性与 Next.js 的高性能结合，为你打造一个极致、纯净的书签导航系统。

---

## 💡 为什么在 AI 时代，我们依然需要一份“黄页”？

很久以前，互联网初期有一种叫“黄页”的东西。它不依赖算法，只负责收录。随着搜索引擎的崛起，黄页逐渐淡出视野。

然而，在当下日益复杂的搜索环境下，结果的准确性往往被各种权重与广告消解。当你想要寻找那个曾经惊艳过你的小众工具，或者那个常读常新的技术博客时，搜索引擎并不总是那么可靠。

我仍然固执地认为，**每个人都需要一份属于自己的黄页**。
- **它是私人定制的**：只收录你真正认可的、高频使用的网站。
- **它是直观高效的**：包含标签分类与简短描述，让浏览与搜索不再是负担。
- **它是毫秒级触达的**：支持全拼与简拼搜索，让你在指尖跳跃间，找到那个久违的页面。

## ✨ 进化：从手动录入到云端数据库

这个项目经历了漫长的迭代。

起初，所有的网站数据都是我一行行手动输入到 JSON 文件里的。虽然那种“纯手工”的纯粹感让人着迷，但随着收藏的增加，维护成本也变得日益臃肿。每添加一个新站点，都意味着要打开编辑器、修改代码、重新部署……这种繁琐逐渐背离了“工具应服务于人”的初衷。

后来，我偶然在 B 站看到了一位 Up 主的分享：[用 Notion 当数据库写一个简单的 API][bilibili-url]。那一刻，我意识到 Notion 才是这个项目最完美的“后台”——它既有数据库的结构化，又有笔记软件的易用性。

目前的 **v3.0.0** 版本，正式实现了这一构想。我们利用 Notion API 将数据彻底云端化，并配合全新的前端架构，实现了极致的访问速度。这意味着，我只需在手机或电脑的 Notion App 里随手一记，几秒钟后，我的个人黄页就会自动更新。

在追求效率的同时，我们也没有忽略视觉的表达。我们引入了 **Tailwind CSS v4**，重新设计了全站 UI。深色模式下，那抹“深海蓝”不仅是为了视觉的舒适，更是为了在喧嚣的互联网中提供一丝静谧感。高对比度的胶囊式布局，让信息的呈现更加高效且美观。

当前的官方站点也终于落定在：[0211120.xyz](https://0211120.xyz)。

## 📓 关于 Notion API 的集成

正如前面提到的，这个想法起源于 B 站 Up 主的启发。虽然项目本身专注于前端展示，但其核心驱动力来自于 Notion 的开放接口。

> **参考资源**：[【S1E3】用 Notion 当数据库写一个简单的 API][bilibili-url]

在这个视频中，我系统地学习了如何将 Notion 作为一个“无头数据库”（Headless CMS）来驱动网页内容。虽然从 Notion 获取数据的底层代码属于项目的“心脏”，但我更愿意分享这种将“笔记软件”转化为“数据引擎”的思维方式。

尽管 Notion API 的原生响应速度有时并不理想，但我通过下文提到的缓存机制彻底解决了这一瓶颈。

## ⚡️ 速度与激情的“双层缓存”

虽然 Notion API 让数据管理变得优雅，但它的原生响应速度一直是一个让人头疼的短板——有时甚至需要等待数秒才能返回结果。

**我无法改变 Notion API 的访问速度，但我可以改变获取数据的方式。**

为了不让等待消磨掉寻找灵感的兴致，在 **v3.0.0** 中，我们实施了深度的技术优化，通过所谓的“双层缓存机制”彻底解决了这一瓶颈：

- **服务器端内存缓存**：通过在服务器端实现持久化的内存缓存，我们将原本长达 7-8 秒的 Notion API 延迟降低到了**毫秒级**。这一优化在开发模式和 Vercel ISR 中均已生效，确保了数据的即时性与访问的高性能。
- **客户端状态管理 (StatsContext)**：利用 React Context 在页面间共享数据，实现主页与关于页之间的“无缝、无刷新”即时导航。
- **🔍 智能搜索**：由 `tiny-pinyin` 驱动的拼音搜索功能。它支持中文名称与标签的全拼/简拼检索，让你能通过拼音快速定位到目标站点。
- **🎨 自适应图标**：全新的动态 SVG Favicon。它能随系统主题颜色实时变换，在细节处保持视觉的绝对统一。

## 🚀 如何搭建你的数字指南针？

自 2024 年 5 月 21 日起，部署这个项目变得像呼吸一样自然：

1.  **准备数据库**：复制这个 [Notion 页面模板][notion-url] 作为你自己的数据库，按需添加网站数据。
2.  **复刻仓库**：Fork 本仓库到你的 GitHub 账号。
3.  **Vercel 部署**：
    - 添加环境变量 `NOTION_TOKEN`（来自 [我的集成][access-url]）和 `DATABASE_ID`。
    - **别忘了**：在 Notion 页面中给你的数据库连接该集成，确保 API 能够正常调用。

### 📊 访问统计 (可选)
如果你还希望开启**全站访问量统计**，只需在 [Turso][turso-url] 创建一个免费数据库，并配置 `TURSO_DATABASE_URL` 与 `TURSO_AUTH_TOKEN`。若未配置，该功能将静默隐藏，绝不打扰。

---

## 📖 写在最后

这个项目是我对“个人数字空间”的一次小小探索。在今天这个信息过载的时代，拥有一个能够完全掌控、响应迅速且美感在线的个人书签系统，其实是一件挺奢侈的事情。

**Individual Web Index** 并不是为了取代任何强大的工具，它只是为了在浩瀚的互联网海洋中，为你留下一处能够随时停靠的避风港。

如果你也曾为找不到那个收藏已久的网址而焦虑，或者厌倦了被搜索引擎牵着鼻子走，或许你可以试试搭建这份属于你自己的“网页索引”。愿这个小工具能像一阵清风，为你繁忙的数字生活带来一丝清爽。

感谢每一位关注这个项目的你。如果你有任何问题、想法，或者只是单纯地想聊聊关于数字生活的心得，欢迎通过以下方式找到我：

- **Email**: [nowscott@qq.com](mailto:nowscott@qq.com)
- **示例站点**: [0211120.xyz](https://0211120.xyz)

---

[![Star History Chart][stars-history-image]][stars-url]


[stars-url]:https://github.com/NowScott/IndWebIndex/stargazers "星标"
[stars-image]: https://img.shields.io/github/stars/NowScott/IndWebIndex?label=Star
[forks-url]: https://github.com/NowScott/IndWebIndex/forks "复刻"
[forks-image]: https://img.shields.io/github/forks/NowScott/IndWebIndex?label=Fork
[license-url]: https://opensource.org/license/gpl-3-0/  "许可证"
[license-image]: https://img.shields.io/github/license/NowScott/IndWebIndex

[commit-url]:https://github.com/NowScott/IndWebIndex/commits/main "提交"
[commit-image]:https://img.shields.io/github/commit-activity/m/NowScott/IndWebIndex
[contributors-url]:https://github.com/NowScott/IndWebIndex/graphs/contributors "贡献者"
[contributors-image]:https://img.shields.io/github/contributors/NowScott/IndWebIndex

[web-url]:https://0211120.xyz "官方示例"
[web-image]:https://img.shields.io/badge/%E7%BD%91%E9%A1%B5%E9%A2%84%E8%A7%88-%E4%B8%AD%E6%96%87-blue
[stars-history-image]:https://api.star-history.com/svg?repos=NowScott/IndWebIndex&type=Date

[notion-url]:https://nowscott.notion.site/aef09fbce63649cba8b9269374dbb641?v=36b6f2625b8e4e5faf9f68e1284bd2bc&pvs=74
[access-url]:https://www.notion.so/my-integrations
[turso-url]:https://turso.tech "Turso Database"
[bilibili-url]:https://www.bilibili.com/video/BV1gF411E7pV/?share_source=copy_web&vd_source=98c7014c35363c157a4fba4929dbda77
