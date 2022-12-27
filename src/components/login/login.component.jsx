import "./login.component.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import jwt_decode from "jwt-decode";
import { notify } from "../../utils/functions";

function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState({});
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();

  //functions:
  const signIn = (e) => {
    // prevent default submit
    e.preventDefault();
    if (validateForm()) {
      //do a client side validation here
      axios
        .post("/users/login", { email, password })
        .then((data) => {
          if (!data.data.details) {
            localStorage.setItem("token", data.data);
            dispatch(authActions.login()); //update redux state
            dispatch(authActions.updateUserData(jwt_decode(data.data))); //update user info in redux store
            navigate("/"); //navigate to another page
          } else {
            notify("Invalid email or password");
          }
        })
        .catch((err) => {
          console.log("error in login: ", err);
        });
    }
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (!password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password";
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
    if (password) {
      let pattern = new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      );
      if (!pattern.test(password)) {
        formIsValid = false;
        errors["password"] = "*Please enter a valid password";
      }
    }
    setErrorMsgs({ errors });
    if (!formIsValid) setErrors(true);
    return formIsValid;
  };

  const forgotPass = (e) => {
    e.preventDefault();
    navigate("/forgotpassword");
  };
  const register = (e) => {
    e.preventDefault();
    // if its successful redirect to home page
    navigate("/register");
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
        <h1>Sign-in</h1>

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
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors ? (
            <div className="errorMsg">{errorMsgs.errors.password}</div>
          ) : (
            <></>
          )}
          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={forgotPass} className="login__registerButton">
          Forgot your password?
        </button>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default LoginComponent;
