/**
 * 切换字体并保存到cookie
 */
function toggleFont() {
    // 获取根元素当前的字体设置
    var rootStyle = getComputedStyle(document.documentElement);
    var currentFont = rootStyle.getPropertyValue('--main-font-family').trim();

    // 根据当前字体决定切换到哪种字体
    var newFont = currentFont === 'Smiley Sans Oblique' ? 'LXGW WenKai' : 'Smiley Sans Oblique';

    // 更新根元素的CSS变量
    document.documentElement.style.setProperty('--main-font-family', newFont);

    // 存储新字体到Cookie，确保用户下次访问时应用相同的字体
    setCookie('userFont', newFont, 7);
}

/**
 * 设置Cookie的函数
 * @param {string} name Cookie的名称
 * @param {string} value Cookie的值
 * @param {number} days Cookie的过期天数
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * 获取Cookie的函数
 * @param {string} name Cookie的名称
 * @return {string|null} 返回Cookie的值或者null
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * 加载用户设置的字体
 */
function loadFont() {
    var userFont = getCookie('userFont');
    if (userFont) {
        document.documentElement.style.setProperty('--main-font-family', userFont);
    }
}

// 在文档加载完毕时加载字体
document.addEventListener('DOMContentLoaded', loadFont);

// 处理右键菜单事件
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    var contextMenu = document.getElementById('customContextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
});

// 处理点击事件，隐藏自定义的右键菜单
document.addEventListener('click', function(event) {
    var contextMenu = document.getElementById('customContextMenu');
    if (event.target.offsetParent !== contextMenu) {
        contextMenu.style.display = 'none';
    }
});
