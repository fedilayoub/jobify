import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const {
    data: { jobs, totalJobs, numOfPages },
  } = useAllJobsContext();
  if (jobs.length === 0)
    return (
      <Wrapper>
        <h2>No jobs to display</h2>
      </Wrapper>
    );
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{totalJobs > 1 && "s"}
      </h5>
      {jobs.map((job) => (
        <Job key={job._id} job={job} />
      ))}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
