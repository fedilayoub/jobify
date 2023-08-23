import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
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
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <button type="button" className="btn btn-block">
          Explore the app
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="member-link">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;