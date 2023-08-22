import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            nobis quam totam omnis aut ullam! Vero dolore id ab earum nulla
            voluptate aut sint excepturi expedita iste nisi, esse obcaecati.
            Itaque molestiae, cupiditate aliquid eveniet magnam ipsa quae,
            doloremque nemo distinctio necessitatibus corporis labore obcaecati
            aspernatur consequuntur. Sint quod nobis voluptas. Numquam
            consequuntur.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
