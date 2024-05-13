// 字体列表
const fonts = ['Smiley Sans Oblique', 'LXGW WenKai', 'Zhuque Fangsong', 'KingHwa_OldSong'];
const fontnames = ['得意黑', '霞鹜文楷', '朱雀仿宋', '京华老宋体'];

function populateContextMenu() {
    const menu = document.getElementById('customContextMenu').querySelector('ul');
    menu.innerHTML = ''; // 清空现有的菜单项，防止重复添加

    fonts.forEach((font, index) => {
        let li = document.createElement('li');
        li.textContent = fontnames[index]; // 显示中文字体名
        li.style.cursor = 'pointer';
        li.style.fontFamily = font; // 设置每个字体选项的字体样式
        li.onclick = () => {
            changeFont(font); // 调用更改字体的函数
        };
        menu.appendChild(li);
    });
}


function changeFont(font) {
    document.documentElement.style.setProperty('--main-font-family', `"${font}"`);
    setCookie('userFont', font, 7); // 更新Cookie，持续7天
    updateMenuSelection(font); // 更新菜单选择状态
    document.getElementById('customContextMenu').style.display = 'none'; // 隐藏菜单
}

function updateMenuSelection(selectedFont) {
    const items = document.querySelectorAll('#customContextMenu li');
    items.forEach(item => {
        if (item.textContent.trim() === fontnames[fonts.indexOf(selectedFont)]) { // 使用正确的友好名称进行比较
            item.classList.add('selected-font');
        } else {
            item.classList.remove('selected-font');
        }
    });
}



document.addEventListener('DOMContentLoaded', function() {
    populateContextMenu(); // 填充右键菜单
    loadFont(); // 加载用户之前选择的字体
});

// 处理右键菜单事件
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    var contextMenu = document.getElementById('customContextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
});

// 处理点击事件，隐藏自定义的右键菜单
document.addEventListener('click', function (event) {
    var contextMenu = document.getElementById('customContextMenu');
    if (event.target.offsetParent !== contextMenu) {
        contextMenu.style.display = 'none';
    }
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function loadFont() {
    var userFont = getCookie('userFont');
    if (userFont) {
        document.documentElement.style.setProperty('--main-font-family', userFont);
        updateMenuSelection(userFont); // 更新菜单选择状态
    }
}
