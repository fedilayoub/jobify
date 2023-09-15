import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";

const JobsContainer = () => {
  const {
    data: { jobs },
  } = useAllJobsContext();
  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  return (
    <Wrapper>
      {jobs.map((job) => (
        <Job key={job._id} job={job} />
      ))}
    </Wrapper>
  );
};

export default JobsContainer;
