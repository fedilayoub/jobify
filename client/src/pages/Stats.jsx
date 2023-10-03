import { ChartsContainer, StatsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const res = await customFetch("/jobs/stats");
    return res.data;
  },
};
export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
