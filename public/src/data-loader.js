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

    // fetch("data.json") // 从服务器上获取数据
    // .then(response => response.json())
    // .then(data => {
    //     sources = data; // 存储数据源
    //     renderWebs(randomSort(unique(sources))); // 初始渲染网页列表
    //     extractAndRenderTags(sources); // 使用封装后的函数处理和渲染标签
    //     document.getElementById('s-btn').onclick = searchFunction; // 绑定搜索按钮的点击事件
    //     document.addEventListener('keydown', event => {
    //         if (event.keyCode === 13) {
    //             document.getElementById('s-btn').click();
    //         }
    //     });
    // });

        function saveToCookie(data) {
        try {
            let jsonString = JSON.stringify(data);
            document.cookie = "sources=" + encodeURIComponent(jsonString) + ";path=/";
        } catch (e) {
            console.error("JSON stringify error:", e);
        }
    }

    function loadFromCookie() {
        let name = "sources=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                let jsonString = c.substring(name.length, c.length);
                console.log("JSON String from Cookie:", jsonString); // 添加日志
                try {
                    return JSON.parse(jsonString);
                } catch (e) {
                    console.error("JSON parse error:", e);
                }
            }
        }
        return null;
    }

    function compareAndUpdateData(newData) {
        let storedData = loadFromCookie();
        if (JSON.stringify(newData) !== JSON.stringify(storedData)) {
            saveToCookie(newData);
        }
    }

    // 从 Cookie 中加载数据并渲染网页
    sources = loadFromCookie();
    if (sources) {
        renderWebs(randomSort(unique(sources)));
        extractAndRenderTags(sources);
    } else {
        // 如果Cookie中没有数据，进行fetch请求
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                sources = data; // 存储数据源
                saveToCookie(sources); // 保存到Cookie
                renderWebs(randomSort(unique(sources))); // 初始渲染网页列表
                extractAndRenderTags(sources); // 使用封装后的函数处理和渲染标签
            });
    }

    // 异步进行数据爬取和更新，仅更新Cookie
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            compareAndUpdateData(data);
        });

    document.getElementById('s-btn').onclick = searchFunction;
    document.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            document.getElementById('s-btn').click();
        }
    });
}
