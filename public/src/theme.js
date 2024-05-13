document.addEventListener('DOMContentLoaded', function () {
    var currentTime = new Date(); // 创建一个 Date 对象
    var currentHour = currentTime.getHours(); // 获取当前时间（小时）

    var dark_mode = document.getElementById('darkcss');
    var dark_mode_icon = document.getElementById('icon');
    var dark_mode_btn = document.getElementById('darkbtn');

    if (currentHour >= 22 || currentHour < 8) {
        dark_mode.href = "/css/dark.css";
        dark_mode_icon.src = '/svg/sun.svg';
    } else {
        dark_mode.href = "/css/daytime.css";
        dark_mode_icon.src = '/svg/moon.svg';
    }

    dark_mode_btn.onclick = function () {
        if (dark_mode_btn.className == 'daytime') {
            dark_mode_btn.className = 'dark';
            dark_mode.href = "/css/dark.css";
            dark_mode_icon.src = '/svg/sun.svg';
        } else {
            dark_mode_btn.className = 'daytime';
            dark_mode.href = "/css/daytime.css";
            dark_mode_icon.src = '/svg/moon.svg';
        }
    }
});
