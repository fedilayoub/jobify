import React, { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { checkDarkTheme } from "../App";
import customFetch from "../utils/customFetch";
const DashboardContext = createContext({});

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDarkTheme());
  const toggleDarkTheme = () => {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme((prevState) => !prevState);
    document.body.classList.toggle("dark-theme", newIsDarkTheme);
    localStorage.setItem("darkTheme", newIsDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const logoutUser = async () => {
    localStorage.removeItem("user");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        showSidebar,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default DashboardLayout;
