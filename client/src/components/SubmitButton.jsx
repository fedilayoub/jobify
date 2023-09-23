import { useNavigation } from "react-router-dom";

const SubmitButton = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className={`btn btn-block ${formBtn ? "form-btn" : ""}`}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
