import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
  const { user, logoutUser } = useDashboardContext();
  const [showLogoutUser, setShowLogoutUser] = useState(false);
  return (
    <Wrapper>
      <button
        onClick={() => setShowLogoutUser(!showLogoutUser)}
        className="btn logout-btn"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogoutUser ? "dropdown show-dropdown" : "dropdown"}>
        <button className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
