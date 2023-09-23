import React from "react";
import { Link, redirect, Form, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("You are now logged in");
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    const { msg } = error.response.data;
    toast.error(msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("You can test the app now");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="text"
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
        <SubmitButton />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="member-link">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
