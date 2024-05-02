function toggleFont() {
    var rootStyle = getComputedStyle(document.documentElement);
    var currentFont = rootStyle.getPropertyValue('--main-font-family').trim();

    // 根据当前字体决定切换到哪种字体
    var newFont = currentFont === 'SmileySans' ? 'LXGW' : 'SmileySans';

    // 更新根元素的CSS变量
    document.documentElement.style.setProperty('--main-font-family', newFont);

    // 存储新字体到localStorage，确保用户下次访问时应用相同的字体
    localStorage.setItem('userFont', newFont);
}

function loadFont() {
    var userFont = localStorage.getItem('userFont');
    if (userFont) {
        document.documentElement.style.setProperty('--main-font-family', userFont);
    }
}

document.addEventListener('DOMContentLoaded', loadFont);

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    var contextMenu = document.getElementById('customContextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
});
document.addEventListener('click', function(event) {
    var contextMenu = document.getElementById('customContextMenu');
    if (event.target.offsetParent !== contextMenu) {
        contextMenu.style.display = 'none';
    }
});


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', loadFont);

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    var contextMenu = document.getElementById('customContextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
});
document.addEventListener('click', function(event) {
    var contextMenu = document.getElementById('customContextMenu');
    if (event.target.offsetParent !== contextMenu) {
        contextMenu.style.display = 'none';
    }
});
