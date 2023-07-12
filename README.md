# Individual Web Index

[![update data.json](https://github.com/NowScott/web_database/actions/workflows/scraping.yml/badge.svg?branch=main&event=workflow_dispatch)](https://github.com/NowScott/web_database/actions/workflows/scraping.yml)
![GitHub Repo stars](https://img.shields.io/github/stars/NowScott/IndWebIndex)

## 1.Purpose of creation
Long ago, there was a website in the early days of the internet called Yellow Pages, which contained an index of many other websites. Over time, it gradually evolved into search engines.

However, in search engines, the results often lack accuracy when it comes to finding specific websites. Therefore, I still believe that everyone needs their own Yellow Pages.

This personal Yellow Pages would include a collection of frequently used websites, along with the ability to add tags and brief descriptions for simple searching and browsing functionality.

In the end, I decided to name this personal Yellow Pages as "Individual Web Index."

## 2.Website iteration
From the time I had this idea until now, this website has gone through many iterations, and the URL has also changed several times. The current and final website is [现在scott.top](https://nowscott.top)。

In the beginning, the data file was manually entered directly, and every time I wanted to update the data content, I had to access the developer interface, make changes to the data file, and then upload it to GitHub. This made me feel very unfriendly.

Therefore, in the latest version, I utilized the Notion API to store the data in Notion's database. I will explain the specific implementation details in the next section.

## 3.How to use the Notion API
(The code for fetching data from Notion is not included in this project.)

This idea originated from a video by an uploader on Bilibili, and the link is provided below:

[【S1E3】用Notion当数据库写一个简单的API](https://www.bilibili.com/video/BV1gF411E7pV/?share_source=copy_web&vd_source=98c7014c35363c157a4fba4929dbda77)

In this video, I learned how to use the Notion API to fetch data from Notion and display it on a web page. If you have any questions, you can watch the video for more information.

To summarize, I utilized a website called Netlify to deploy a service. This service runs every time someone visits the domain I deployed, retrieves data from Notion, and returns it to the frontend. Once the frontend receives the data, it can be displayed on the webpage.

This sounds great, right? However, this simple process takes around 7 to 8 秒之前 at most, which does not align with the vision of a fast-loading personal website. Therefore, I made further improvements in this area.

## 4.Some optimizations
I cannot change the access speed of the Notion API, but what I can change is the way data is fetched. If we want to make modifications more convenient, we can store a copy of the data in a convenient location. When accessing the website, we can fetch this stored data, effectively resolving the issue of slow access speed.

When the data is modified, the aforementioned convenient data copy will not be updated immediately because it cannot communicate directly with Notion. To address this, I leverage GitHub Actions to regularly update the stored data. This ensures that the data remains up-to-date.

## 5.Final Notes
In summary, this project is a web-based personal website index that addresses the issue of slow access speed and ensures timely data updates. These optimizations make modifications easier and provide a more efficient and seamless user experience. Thank you for your interest in this project.

If you have any questions or inquiries regarding this project, you can contact me via email at: [<i class="fa fa-envelope-o"></i> 现在scott@qq.com](mailto:nowscott@qq.com)
