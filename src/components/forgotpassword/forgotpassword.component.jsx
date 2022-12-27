import "../login/login.component.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils/functions";

function ForgotPasswordComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMsgs, setErrorMsgs] = useState({});
  const [errors, setErrors] = useState(false);
  //functions:
  const forgotPass = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("/users/forgotpassword", { email: email })
        .then((res) => {
          console.log(res);
          notify("check your email for further instructions");
        })
        .catch((err) => console.log(err));
    }
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (email) {
      //regular expression for email validation
      let pattern = new RegExp(
        /^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email";
      }
    }
    setErrorMsgs({ errors });
    if (!formIsValid) setErrors(true);
    return formIsValid;
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1></h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors ? (
            <div className="errorMsg">{errorMsgs.errors.email}</div>
          ) : (
            <></>
          )}
          <button
            type="submit"
            onClick={forgotPass}
            className="login__signInButton"
          >
            Send Email
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="login__registerButton"
        >
          Sign-in
        </button>
        <button
          onClick={() => navigate("/register")}
          className="login__registerButton"
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
