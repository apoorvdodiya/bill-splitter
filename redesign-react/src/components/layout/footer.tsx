import { Link } from "react-router-dom";

export const Footer = () => {
  const tabList = [
    {
      icon: "fa fa-users fa-lg",
      title: "Groups",
      selected: false,
      route: "groups",
    },
    {
      icon: "fa fa-bolt fa-lg",
      title: "Split",
      selected: false,
      route: "split",
    },
    {
      icon: "fa fa-cog fa-lg",
      title: "Settings",
      selected: false,
      route: "settings",
    },
  ];
  return (
    <>
      <div className="flex flex-row justify-around items-center p-3 shadow-sm">
        {tabList.map((t, i) => {
          return (
            <div key={t.route}>
              <Link to={t.route}>
                <i className={t.icon}></i>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
