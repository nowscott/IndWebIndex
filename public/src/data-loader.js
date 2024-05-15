window.onload = function () {
    var sources, taglist = [], onlist = [], reslist = [];

    function randomSort(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            let rc = parseInt(Math.random() * l);
            const empty = arr[i];
            arr[i] = arr[rc];
            arr[rc] = empty;
        }
        return arr;
    }

    function unique(arr) { return Array.from(new Set(arr)); }

    function renderWebs(list) {
        for (let l in list) {
            var a = document.createElement('a');
            a.id = 'web';
            a.href = list[l].web;
            a.target = '_blank';
            a.innerHTML = list[l].name;
            a.title = list[l].brief;
            document.getElementById('webs-container').appendChild(a);
        }
    }

    function renderTags(tags) {
        document.getElementById('tags-container').innerHTML = ''; // 清空旧标签以重新渲染
        tags.forEach((tag, index) => {
            var button = document.createElement('button');
            button.id = 'tag' + index;
            button.innerHTML = tag;
            // 设置按钮的类名基于是否被选中
            button.className = onlist.includes(tag) ? 'tag on' : 'tag off';
            document.getElementById('tags-container').appendChild(button);
            button.onclick = () => toggleTagButton(button.id);
        });
    }

    function toggleTagButton(buttonId) {
        var button = document.getElementById(buttonId);
        var tagText = button.textContent;
        var tagIndex = onlist.indexOf(tagText);

        if (tagIndex === -1) {
            onlist.push(tagText); // 添加到选中列表
        } else {
            onlist.splice(tagIndex, 1); // 从选中列表移除
        }

        button.className = button.className === 'tag off' ? 'tag on' : 'tag off';
        updateResults(); // 更新结果和标签列表
    }

    function updateResults() {
        reslist = sources.filter(source => onlist.every(tag => source.tags.includes(tag)));
        document.getElementById('webs-container').innerHTML = reslist.length > 0 ? '' : '未找到符合条件的网页';
        renderWebs(randomSort(unique(reslist)));

        // 更新标签列表，将选中的标签放在前面
        let availableTags = [];
        reslist.forEach(source => {
            source.tags.forEach(tag => {
                if (!availableTags.includes(tag)) {
                    availableTags.push(tag);
                }
            });
        });

        onlist.forEach(tag => {
            const index = availableTags.indexOf(tag);
            if (index > -1) {
                availableTags.splice(index, 1);
            }
        });

        const sortedTags = onlist.concat(availableTags.filter(tag => !onlist.includes(tag)));
        renderTags(sortedTags);
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

    function extractAndRenderTags(sources) {
        let taglist = [];
        sources.forEach(source => {
            source.tags.forEach(tag => {
                if (!taglist.includes(tag)) {
                    taglist.push(tag);
                }
            });
        });
        taglist = randomSort(unique(taglist)); // 随机排序并去重标签列表
        renderTags(taglist); // 渲染标签列表
    }

    fetch("data.json") // 从服务器上获取数据
    .then(response => response.json())
    .then(data => {
        sources = data; // 存储数据源
        renderWebs(randomSort(unique(sources))); // 初始渲染网页列表
        extractAndRenderTags(sources); // 使用封装后的函数处理和渲染标签
        document.getElementById('s-btn').onclick = searchFunction; // 绑定搜索按钮的点击事件
        document.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                document.getElementById('s-btn').click();
            }
        });
    });
}
