window.onload = function () {
    var sources, taglist = [], onlist = [], reslist = [];
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
            a.innerHTML = list[l].name
            a.title = list[l].brief
            document.getElementById('webs-container').appendChild(a)
        }
    }

    function renderTags(tags) {
        tags.forEach((tag, index) => {
            var button = document.createElement('button');
            button.id = 'tag' + index;
            button.innerHTML = tag;
            button.className = 'tag off';
            document.getElementById('tags-container').appendChild(button);
            button.onclick = () => toggleTagButton(button.id);
        });
    }    

    function toggleTagButton(buttonId) {
        var button = document.getElementById(buttonId);
        button.className = button.className === 'tag off' ? 'tag on' : 'tag off';
        var tagText = button.textContent;
        var tagIndex = onlist.indexOf(tagText);
        if (tagIndex === -1) {
            onlist.push(tagText);
        } else {
            onlist.splice(tagIndex, 1);
        }
        updateResults();
    }

    function updateResults() {
        reslist = sources.filter(source => onlist.every(tag => source.tags.includes(tag)));
        document.getElementById('webs-container').innerHTML = reslist.length > 0 ? '' : '未找到符合条件的网页';
        renderWebs(randomSort(unique(reslist)));
    }

    function searchFunction() {
        var keyword = document.getElementById('s-in').value.toLowerCase();
        reslist = sources.filter(source =>
            source.name.toLowerCase().includes(keyword) ||
            source.brief.toLowerCase().includes(keyword) ||
            source.tags.some(tag => tag.toLowerCase().includes(keyword))
        );
        document.getElementById('webs-container').innerHTML = reslist.length > 0 ? '' : '未找到符合条件的网页';
        renderWebs(randomSort(unique(reslist)));
    }

    fetch("data.json") // 从服务器上获取数据
    .then(response => response.json())
    .then(data => {
        sources = data; // 存储数据源
        renderWebs(randomSort(unique(sources))); // 初始渲染网页列表
        sources.forEach(s => {
            s.tags.forEach(tag => {
                if (!taglist.includes(tag)) {
                    taglist.push(tag);
                }
            });
        });
        taglist = randomSort(unique(taglist)); // 随机排序并去重标签列表
        renderTags(taglist); // 使用封装后的函数渲染标签
        document.getElementById('s-btn').onclick = searchFunction; // 绑定搜索按钮的点击事件
        document.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                document.getElementById('s-btn').click();
            }
        });
    });
}