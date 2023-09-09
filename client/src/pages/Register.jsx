import React from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
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
          defaultValue={"John"}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          placeholder="Last Name"
          defaultValue={"Doe"}
        />
        <FormRow
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={"john@gmail.com"}
        />
        <FormRow
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={"secret123"}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
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
