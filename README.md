# Individual Web Index（网页索引）

[![GitHub stars][stars-image]][stars-url]
[![GitHub forks][forks-image]][forks-url]
[![license GPL-3.0][license-image]][license-url]
[![commit-count-permonth][commit-image]][commit-url]
[![contributors-count][contributors-image]][contributors-url]


## 1.如何部署

在2024年5月21日的更新之后，部署这个项目变得更加简单。您只需要复制这个[Notion页面][notion-url]作为您自己的数据库，根据需要添加网站数据，然后fork这个仓库。

接下来，进入Vercel部署，添加两个环境变量NOTION_TOKEN和DATABASE_ID。这些分别是从[我的集成][access-url]网站获得的密钥，以及您的Notion数据库的ID，当然也不要忘记给你的数据库连接集成。

这样就完成了部署，可以尽情在notion数据库中添加你自己需要的网页。

## 2.创建的目的

很久以前，互联网初期有一个叫做黄页的网站，上面索引了许多其他网站。随着时间的推移，它逐渐演变成了搜索引擎。

然而，在搜索引擎中，当涉及到寻找特定网站时，结果往往缺乏准确性。因此，我仍然认为每个人都需要自己的黄页。

这个个人黄页将包含一系列经常使用的网站，以及添加标签和简短描述的功能，方便搜索和浏览。

最终，我决定将这个个人黄页命名为“个人网站索引”。

## 3.网站迭代

从我有这个想法到现在，这个网站经历了多次迭代，URL也变化了几次。当前并且是最终的网站是[nowscott.top](https://nowscott.top)。

在最新的 **v3.0.0** 版本中，我们进行了一次彻底的现代化重构。我们引入了 **Tailwind CSS v4**，重新设计了全站 UI，打造了极具现代感的“深海蓝”深色模式与高对比度的胶囊式布局，让信息的呈现更加高效且美观。

起初，数据文件是直接手动输入的。而在最新版本中，我们利用 Notion API 将数据存储在 Notion 的数据库中，并配合全新的前端架构实现了极致的访问速度。

## 4.如何使用Notion API
（从Notion获取数据的代码未包含在此项目中。）

这个想法起源于Bilibili上一个上传者的视频，下面提供链接：

[【S1E3】用Notion当数据库写一个简单的API](https://www.bilibili.com/video/BV1gF411E7pV/?share_source=copy_web&vd_source=98c7014c35363c157a4fba4929dbda77)

在这个视频中，我学习到了如何使用Notion API从Notion获取数据并在网页上显示。如果你有任何问题，可以观看视频了解更多信息。

总而言之，我利用 Notion API 从 Notion 获取数据并在前端展示。虽然 Notion API 本身响应时间可能较长，但我通过下文提到的优化手段彻底解决了这个问题。

## 5.一些优化

我无法改变Notion API的访问速度，但我可以改变获取数据的方式。在 **v3.0.0** 中，我们实现了 **“双层缓存机制”**：

- **服务器端内存缓存**：通过在服务器端实现持久化的内存缓存，将原本 7-8 秒的 Notion API 延迟降低到了毫秒级（在开发模式和 Vercel ISR 中均生效）。
- **客户端状态管理 (StatsContext)**：利用 React Context 在页面间共享数据，实现主页与关于页之间的“无缝、无刷新”即时导航。

此外，我们还引入了：
- **智能搜索**：由 `tiny-pinyin` 驱动的拼音搜索功能，让你能通过拼音快速找到中文标签和网站。
- **自适应图标**：全新的动态 SVG Favicon，能随主题颜色实时变换，保持视觉统一。

## 6.最后的说明

总之，这个项目是一个基于网络的个人网站索引，它通过深度优化解决了访问速度慢的问题，并确保了数据及时更新。这些优化使修改变得更加容易，并提供了更高效、无缝的用户体验。感谢您对这个项目的兴趣。

如果您对这个项目有任何问题或询问，可以通过电子邮件联系我：[nowscott@qq.com](mailto:nowscott@qq.com)

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

[web-url]:https://www.nowscott.top "中文网页"
[web-image]:https://img.shields.io/badge/%E7%BD%91%E9%A1%B5%E9%A2%84%E8%A7%88-%E4%B8%AD%E6%96%87-blue
[stars-history-image]:https://api.star-history.com/svg?repos=NowScott/IndWebIndex&type=Date

[notion-url]:https://nowscott.notion.site/aef09fbce63649cba8b9269374dbb641?v=36b6f2625b8e4e5faf9f68e1284bd2bc&pvs=74

[access-url]:https://www.notion.so/my-integrations
