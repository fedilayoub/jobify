import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { StatItem } from "../components";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        count={users}
        color="#e9b949"
        title="Current Users"
        icon={<FaSuitcaseRolling />}
        bcg="#fcefc7"
      />
      <StatItem
        count={jobs}
        color="#947acb"
        title="Total Jobs"
        icon={<FaCalendarCheck />}
        bcg="#fcefc7"
      />
    </Wrapper>
  );
};
export default Admin;
