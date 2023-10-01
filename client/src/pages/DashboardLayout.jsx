import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar, Loading } from "../components";
import { checkDarkTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDarkTheme());
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
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
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("You are now logged out");
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
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
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
