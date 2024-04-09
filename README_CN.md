# Individual Web Index

[![data update][data-update-image]][data-update-url]
[![GitHub stars][stars-image]][stars-url]
[![GitHub forks][forks-image]][forks-url]
[![license GPL-3.0][license-image]][license-url]

[![commit-count-permonth][commit-image]][commit-url]
[![contributors-count][contributors-image]][contributors-url]

[![web][web-image]][web-url]
[![web-en][web-en-image]][web-en-url]

## Star History

[![Star History Chart][stars-history-image]][stars-url]

[data-update-url]:https://github.com/NowScott/web_database/actions/workflows/scraping.yml "数据更新"
[data-update-image]:https://img.shields.io/github/actions/workflow/status/NowScott/IndWebIndex/scraping.yml?label=data%20update
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
[web-en-url]:https://www.nowscott.top/en "English Web"
[web-en-image]:https://img.shields.io/badge/Preview-EN-blue
[stars-history-image]:https://api.star-history.com/svg?repos=NowScott/IndWebIndex&type=Date

[notion-url]:https://nowscott.notion.site/0c3540063c0245a3947494527e83ba7a?v=8757a2fec25246fcb24574ba60542f00

[access-url]:https://www.notion.so/my-integrations

# 切换为英语

[![readme][readme-image]][readme-url]

[readme-url]:https://github.com/NowScott/IndWebIndex/blob/main/README.md "英文版本"
[readme-image]:https://img.shields.io/badge/English_Version-blue

## 1.如何部署

在2024年4月9日的更新之后，部署这个项目变得更加简单。您只需要复制这个[Notion页面][notion-url]作为您自己的数据库，根据需要添加网站数据，然后fork这个仓库。

接下来，进入仓库设置，找到Actions下的Secrets and variables。在那里添加两个Repository secrets：ACCESS_TOKEN和DATABASE_ID。这些分别是从[我的集成][access-url]网站获得的密钥，以及您的Notion数据库的ID。

请注意，在获取密钥之后，您需要将您的集成连接到您的数据库，并手动运行GitHub Actions中的update data.json。这样就完成了部署。

## 2.创建的目的

很久以前，互联网初期有一个叫做黄页的网站，上面索引了许多其他网站。随着时间的推移，它逐渐演变成了搜索引擎。

然而，在搜索引擎中，当涉及到寻找特定网站时，结果往往缺乏准确性。因此，我仍然认为每个人都需要自己的黄页。

这个个人黄页将包含一系列经常使用的网站，以及添加标签和简短描述的功能，方便搜索和浏览。

最终，我决定将这个个人黄页命名为“个人网站索引”。

## 3.网站迭代

从我有这个想法到现在，这个网站经历了多次迭代，URL也变化了几次。当前并且是最终的网站是[nowscott.top](https://nowscott.top)。

起初，数据文件是直接手动输入的，每次想要更新数据内容，我都必须访问开发者接口，对数据文件进行更改，然后上传到GitHub。这让我感到非常不友好。

因此，在最新版本中，我利用Notion API将数据存储在Notion的数据库中。具体的实现细节将在下一部分解释。

## 4.如何使用Notion API
（从Notion获取数据的代码未包含在此项目中。）

这个想法起源于Bilibili上一个上传者的视频，下面提供链接：

[【S1E3】用Notion当数据库写一个简单的API](https://www.bilibili.com/video/BV1gF411E7pV/?share_source=copy_web&vd_source=98c7014c35363c157a4fba4929dbda77)

在这个视频中，我学习到了如何使用Notion API从Notion获取数据并在网页上显示。如果你有任何问题，可以观看视频了解更多信息。

总而言之，我利用一个叫Netlify的网站部署了一个服务。这个服务每次有人访问我部署的域名时都会运行，它从Notion获取数据并返回给前端。一旦前端接收到数据，就可以在网页上显示。

听起来很棒，对吧？然而，这个简单的过程最多需要7到8秒的时间，这与快速加载个人网站的愿景不符。因此，我在这方面做了进一步的改进。

## 5.一些优化

我无法改变Notion API的访问速度，但我可以改变获取数据的方式。如果我们想要更方便地进行修改，我们可以在一个便利的位置存储一份数据副本。在访问网站时，我们可以获取这个存储的数据，有效地解决了访问速度慢的问题。

当数据被修改时，上述便利的数据副本不会立即更新，因为它不能与Notion直接通信。为了解决这个问题，我利用GitHub Actions定期更新存储的数据。这确保了数据保持最新。

## 6.最后的说明

总之，这个项目是一个基于网络的个人网站索引，它解决了访问速度慢的问题，并确保了数据及时更新。这些优化使修改变得更加容易，并提供了更高效、无缝的用户体验。感谢您对这个项目的兴趣。

如果您对这个项目有任何问题或询问，可以通过电子邮件联系我：[nowscott@qq.com](mailto:nowscott@qq.com)
