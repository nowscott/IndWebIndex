export const applyTheme = (theme) => {
  const dark_mode = document.getElementById('darkcss');
  const dark_mode_icon = document.getElementById('icon');
  const dark_mode_btn = document.getElementById('darkbtn');

  if (dark_mode && dark_mode_icon && dark_mode_btn) {
    if (theme === 'dark') {
      dark_mode.setAttribute('href', '/css/dark.css');
      dark_mode_icon.src = '/assets/svg/sun.svg';
      dark_mode_btn.className = 'dark';
    } else {
      dark_mode.setAttribute('href', '/css/daytime.css');
      dark_mode_icon.src = '/assets/svg/moon.svg';
      dark_mode_btn.className = 'daytime';
    }
  }
};

export const initializeTheme = () => {
  const dark_mode_btn = document.getElementById('darkbtn');
  const currentHour = new Date().getHours();
  const theme = (currentHour >= 22 || currentHour < 8) ? 'dark' : 'daytime';

  applyTheme(theme);

  if (dark_mode_btn) {
    dark_mode_btn.onclick = () => {
      const currentTheme = dark_mode_btn.className;
      const newTheme = (currentTheme === 'daytime') ? 'dark' : 'daytime';
      applyTheme(newTheme);
    };
  }
};