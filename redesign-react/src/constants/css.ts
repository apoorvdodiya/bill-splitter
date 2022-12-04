export const THEME = {
  headerHeight: "60px",
  footerHeight: "60px",
  bgPrimary:
    "dark:bg-slate-700 dark:text-slate-300 bg-slate-300 text-slate-800  text-lg",
  bgSecondary: "dark:bg-slate-800 bg-slate-200",
  borderColor: "dark:border-slate-300 border-slate-800",
  borderDarkerColor: "dark:border-slate-400 border-slate-700",
  // TODO ise recursively
  oldTransparentControl: `bg-transparent border px-2 rounded-full dark:border-slate-300 border-slate-800 outline-none focus:dark:border-slate-400`,
  transparentControl: `bg-transparent border px-2 rounded-md dark:border-slate-300 border-slate-800 outline-none focus:dark:border-slate-400`,
  btnPrimary:
    "bg-blue-500 text-white px-1.5 rounded-full shadow-sm hover:shadow-lg uppercase",
  btnOutline:
    "border-blue-50 border-2 text-slate-800 dark:text-white px-1.5 text-sm rounded shadow-sm hover:shadow-lg",
  btnPrimarySquarish:
    "bg-blue-500 text-white px-1.5 rounded-lg shadow-sm hover:shadow-lg uppercase",
  btnOutlineSquarish:
    "border-blue-50 border-2 text-slate-800 dark:text-white px-1.5 text-sm rounded shadow-sm hover:shadow-lg",
  errorColor: "",
};

export const COMPONENT = {
  reactSelect: {
    clearIndicator: (base: any) => ({
      backgroundColor: "transparent",
    }),
    container: (base: any) => ({
      ...base,
      height: "unset",
      padding: 0,
    }),
    input: (base: any) => ({
      ...base,
      margin: 0,
    }),
    multiValue: (base: any) => ({
      ...base,
      borderWidth: "1px",
      backgroundColor: "transparent",
      borderColor: "rgb(203 213 225 / var(--tw-border-opacity))",
      // borderColor: "rgb(203 213 225 / var(--tw-border-opacity))", // for light color
      color: "inherit",
      marginTop: 0,
      marginBottom: 0,
      padding: 0,
    }),
    singleValue: (base: any) => ({
      ...base,
      backgroundColor: "transparent",
      color: "inherit",
      margin: 0,
      padding: 0,
      fontSize: "80%",
      lineHeight: "140%",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      backgroundColor: "transparent",
      color: "inherit",
      margin: 0,
      padding: 0,
      fontSize: "80%",
      lineHeight: "140%",
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      backgroundColor: "transparent",
      color: "inherit",
    }),
    // input: (base: any) => ({
    //   ...base,
    //   border: "none",
    //   height: "unset",
    // }),
    control: (base: any) => ({
      ...base,
      borderColor: "rgb(203 213 225 / var(--tw-border-opacity))",
      outline: "2px solid transparent",
      outlineOffset: "2px",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      backgroundColor: "transparent",
      // borderColor: 'rgb(30 41 59 / var(--tw-border-opacity))', // for light theme
      borderWidth: "1px",
      width: "100%",
      fontFamily: "inherit",
      fontSize: "100%",
      fontWeight: "inherit",
      lineHeight: "inherit",
      color: "inherit",
      margin: 0,
      height: "unset",
      minHeight: "unset",
    }),
    menuList: (base: any) => ({
      ...base,
      backgroundColor: "#888",
    }),
  },
};
