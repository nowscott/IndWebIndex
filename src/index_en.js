window.onload = function () {
    var sources, taglist = [], onlist = [], reslist = [];
    var currentTime = new Date();// 创建一个 Date 对象
    var currentHour = currentTime.getHours();// 获取当前时间（小时）
    // 自动切换夜间模式，如果当前时间在晚上 23 点到早上 8 点之间，则进入夜间模式
    dark_mode = document.getElementById('darkcss')
    dark_mode_icon = document.getElementById('icon')
    dark_mode_btn = document.getElementById('darkbtn')
    if (currentHour >= 22 || currentHour < 8) {// 更改页面的背景颜色为深色
        dark_mode.href = "/css/dark.css"
        dark_mode_icon.src = '/svg/moon.svg'
    } else {
        dark_mode.href = "/css/daytime.css"
        dark_mode_icon.src = '/svg/sun.svg'
    }
    dark_mode_btn.onclick = function () {//夜间模式按钮功能
        if (dark_mode_btn.className == 'daytime') {
            dark_mode_btn.className = 'dark'
            dark_mode.href = "/css/dark.css"
            dark_mode_icon.src = '/svg/moon.svg'
        } else {
            dark_mode_btn.className = 'daytime'
            dark_mode.href = "/css/daytime.css"
            dark_mode_icon.src = '/svg/sun.svg'
        }
    }
    function randomSort(arr) {//创建随机函数
        for (let i = 0, l = arr.length; i < l; i++) {
            let rc = parseInt(Math.random() * l)
            // 让当前循环的数组元素和随机出来的数组元素交换位置
            const empty = arr[i]
            arr[i] = arr[rc]
            arr[rc] = empty
        }
        return arr
    }
    function unique(arr) { return Array.from(new Set(arr)) }// 数组去重方法的定义
    function renderWebs(list) {//创建包含网站信息的列表
        for (l in list) {
            var a = document.createElement('a')
            a.id = 'web'
            a.href = list[l].web
            a.target = '_blank'
            a.innerHTML = list[l].name_en
            a.title = list[l].brief_en
            document.getElementById('webs-container').appendChild(a)
        }
    }
    fetch("https://www.nowscott.top/data.json")//从服务器上获取数据
        .then(response => response.json()).then(data => {
            sources = data//将筛选工作放在了上层服务器上，这里就不筛选了
            renderWebs(randomSort(unique(sources)))
            sources.forEach(s => { for (let i = 0; i < s.tags_en.length; i++) { taglist.push(s.tags_en[i]) } })
            taglist = randomSort(unique(taglist))
            for (let i = 0; i < taglist.length; i++) {
                var button = document.createElement('button')
                button.id = 'tag' + i
                button.innerHTML = taglist[i]
                button.className = 'tag off'
                document.getElementById('tags-container').appendChild(button)
                document.getElementById('tag' + i).onclick = function () {
                    if (document.getElementById('tag' + i).className == 'tag off') {
                        document.getElementById('tag' + i).className = 'tag on'
                        onlist.push(document.getElementById('tag' + i).textContent)
                    } else {
                        document.getElementById('tag' + i).className = 'tag off'
                        onlist.splice(onlist.indexOf(document.getElementById('tag' + i).textContent), 1)
                    }
                    reslist = []
                    sources.forEach(r => {
                        if (onlist.filter(function (val) { return r.tags_en.indexOf(val) > -1 }).length == onlist.length) { reslist.push(r) }
                    })
                    document.getElementById('webs-container').innerHTML = ''
                    if (reslist.length == 0) { document.getElementById('webs-container').innerHTML = '未找到符合条件的网页' }
                    renderWebs(randomSort(unique(reslist)))
                }
            }
            document.getElementById('s-btn').onclick = function () {//定义搜索按钮功能
                var keyword = document.getElementById('s-in').value
                keyword = keyword.toLowerCase();
                reslist = []
                sources.forEach(s => {//遍历资源搜索
                    n = s.name_en.toLowerCase()
                    b = s.brief_en.toLowerCase()
                    if (n.indexOf(keyword) !== -1 || b.indexOf(keyword) !== -1) { reslist.push(s) }
                    for (t in s.tags_en) {
                        tag = s.tags_en[t].toLowerCase()
                        if (tag.indexOf(keyword) !== -1) { reslist.push(s) }
                    }
                })
                document.getElementById('webs-container').innerHTML = ''
                if (reslist.length == 0) { document.getElementById('webs-container').innerHTML = '未找到符合条件的网页' }
                renderWebs(randomSort(unique(reslist)))
            }
            document.addEventListener('keydown', event => {//按下了回车键，执行搜索
                if (event.keyCode === 13) { document.getElementById('s-btn').click() }
            })
        })
}