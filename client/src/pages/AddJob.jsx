import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job created successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    console.log(error);
    const { msg } = error.response.data;
    toast.error(msg);
    return error;
  }
} 


const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user?.location}
          />
          <FormRowSelect
            name="jobStatus"
            list={JOB_STATUS}
            labelText={"job Status"}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name="jobType"
            list={JOB_TYPE}
            labelText={"job Type"}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-block form-btn"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
