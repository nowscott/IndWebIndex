document.addEventListener('DOMContentLoaded', function () {
    var currentTime = new Date(); // 创建一个 Date 对象
    var currentHour = currentTime.getHours(); // 获取当前时间（小时）

    var dark_mode = document.getElementById('darkcss');
    var dark_mode_icon = document.getElementById('icon');
    var dark_mode_btn = document.getElementById('darkbtn');

    // 读取 cookie 中的模式设置
    var userPref = getCookie('themeMode');

    if (userPref) {
        applyTheme(userPref);
    } else {
        // 如果没有用户偏好设置，根据时间自动切换模式
        if (currentHour >= 22 || currentHour < 8) {
            applyTheme('dark');
        } else {
            applyTheme('daytime');
        }
    }

    dark_mode_btn.onclick = function () {
        var newTheme = (dark_mode_btn.className === 'daytime') ? 'dark' : 'daytime';
        applyTheme(newTheme);
        setCookie('themeMode', newTheme, 12); // 设置 cookie，有效期为 12 小时
    }
});

function applyTheme(theme) {
    var dark_mode = document.getElementById('darkcss');
    var dark_mode_icon = document.getElementById('icon');
    var dark_mode_btn = document.getElementById('darkbtn');

    if (theme === 'dark') {
        dark_mode.href = "/css/dark.css";
        dark_mode_icon.src = '/svg/sun.svg';
        dark_mode_btn.className = 'dark';
    } else {
        dark_mode.href = "/css/daytime.css";
        dark_mode_icon.src = '/svg/moon.svg';
        dark_mode_btn.className = 'daytime';
    }
}

function setCookie(name, value, hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
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
