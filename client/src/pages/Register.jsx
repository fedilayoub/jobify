import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, Link } from "react-router-dom";
import { FormRow, Logo, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("You are now registered");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const { msg } = error.response.data;
    toast.error(msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4> Register</h4>
        <FormRow
          type="text"
          name="name"
          placeholder="Name"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          placeholder="Last Name"
        />
        <FormRow
          type="email"
          name="email"
          placeholder="Email"
        />
        <FormRow
          type="password"
          name="password"
          placeholder="Password"
        />
        <SubmitButton />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="member-link">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
