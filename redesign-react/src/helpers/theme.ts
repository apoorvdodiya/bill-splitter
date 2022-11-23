export const toggleDarkMode = () => {
  const isDark: boolean = localStorage.getItem("isDark") === 'true';
  localStorage.setItem("isDark", isDark ? 'false' : 'true');
  setTheme(!isDark);
};

export const getTheme = () => {
  const isDark = localStorage.getItem("isDark") === 'true';
  setTheme(isDark);
  return isDark
};

const setTheme = (value: any) => {
  const classlist = document.getElementsByTagName("html")[0].classList;
  value ? classlist.add("dark") : classlist.remove("dark");
};
