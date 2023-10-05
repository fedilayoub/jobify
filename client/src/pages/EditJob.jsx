import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job updated successfully");
      return redirect(`/dashboard/all-jobs`);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job?.position} />
          <FormRow type="text" name="company" defaultValue={job?.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={job?.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            list={JOB_STATUS}
            labelText={"job Status"}
            defaultValue={job?.PENDING}
          />
          <FormRowSelect
            name="jobType"
            list={JOB_TYPE}
            labelText={"job Type"}
            defaultValue={job?.FULL_TIME}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
