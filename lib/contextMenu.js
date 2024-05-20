const fontData = {
    "fonts": [
      {
        "name": "Smiley Sans Oblique",
        "displayName": "得意黑"
      },
      {
        "name": "LXGW WenKai",
        "displayName": "霞鹜文楷"
      },
      {
        "name": "KingHwa_OldSong",
        "displayName": "京華老宋体"
      },
      {
        "name": "MuzaiPixel",
        "displayName": "目哉像素体"
      },
      {
        "name": "LXGW Marker Gothic",
        "displayName": "霞鹜漫黑"
      }
    ]
  };
  
  export const populateContextMenu = () => {
      const menu = document.getElementById('customContextMenu').querySelector('ul');
      menu.innerHTML = ''; // 清空现有的菜单项，防止重复添加
  
      fontData.fonts.forEach((font) => {
          let li = document.createElement('li');
          li.textContent = font.displayName; // 显示中文字体名
          li.style.cursor = 'pointer';
          li.style.fontFamily = font.name; // 设置每个字体选项的字体样式
          li.onclick = () => {
              changeFont(font.name); // 调用更改字体的函数
          };
          menu.appendChild(li);
      });
  };
  
  export const changeFont = (font) => {
      document.documentElement.style.setProperty('--main-font-family', `"${font}"`);
      setCookie('userFont', font, 7); // 更新Cookie，持续7天
      updateMenuSelection(font); // 更新菜单选择状态
      document.getElementById('customContextMenu').style.display = 'none'; // 隐藏菜单
  };
  
  const updateMenuSelection = (selectedFont) => {
      const items = document.querySelectorAll('#customContextMenu li');
      items.forEach(item => {
          if (item.textContent.trim() === fontData.fonts.find(f => f.name === selectedFont).displayName) { // 使用正确的友好名称进行比较
              item.classList.add('selected-font');
          } else {
              item.classList.remove('selected-font');
          }
      });
  };
  
  const setCookie = (name, value, days) => {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  
  const getCookie = (name) => {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
  };
  
  const loadFont = () => {
      var userFont = getCookie('userFont');
      if (userFont) {
          document.documentElement.style.setProperty('--main-font-family', userFont);
          updateMenuSelection(userFont); // 更新菜单选择状态
      }
  };
  
  export const initializeContextMenu = () => {
      populateContextMenu(); // 填充右键菜单
      loadFont(); // 加载用户之前选择的字体
  
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
  };
  