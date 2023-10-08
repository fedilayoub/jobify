import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBiggerSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map(({ path, text, icon }) => {
        const { role = "user" } = user;
        if (role !== "admin" && path === "admin") return;
        return (
            <NavLink
              to={path}
              key={text}
              className="nav-link"
              onClick={isBiggerSidebar ? null : toggleSidebar}
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          
        );
      })}
    </div>
  );
};

export default NavLinks;
