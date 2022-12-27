import { useState } from "react";
import "../login/login.component.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/functions";

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState({});
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (firstname.length < 2) {
      formIsValid = false;
      errors["firstname"] = "*Please enter your first name";
    }
    if (!lastname) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your last name";
    }
    if (!email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email";
    }
    if (!phone) {
      formIsValid = false;
      errors["phone"] = "*Please enter your phone number";
    }
    if (!password) {
      formIsValid = false;
      errors["password"] = "*Please enter a password";
    }
    if (!confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please enter a matching password";
    }
    if (firstname.length >= 2) {
      console.log(!firstname.match(/^\w+$/));
      if (!firstname.match(/^\w+$/)) {
        formIsValid = false;
        errors["firstname"] = "*Please use alphanumeric characters only";
      }
    }
    if (lastname.length >= 2) {
      if (!lastname.match(/^\w+$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please use alphanumeric characters only";
      }
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
        errors["password"] =
          "*Please use capital and small letter, speacial character and numbers";
      }
    }
    if (confirmPassword) {
      let pattern = new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      );
      if (!pattern.test(confirmPassword)) {
        formIsValid = false;
        errors["confirmPassword"] =
          "*Please use capital and small letter, speacial character and a number";
      }
    }
    setErrorMsgs({ errors });
    if (!formIsValid) setErrors(true);
    return formIsValid;
  };
  const register = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (profileImage === "") {
        setProfileImage(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        );
      }
      let newUser = {
        email,
        password,
        firstname,
        lastname,
        phone,
        isAdmin: isAdmin,
        profileImage,
      };
      if (confirmPassword === password) {
        axios
          .post("/users", newUser)
          .then((res) => {
            console.log(res.data.message);
            if (res.data.status === "ok") {
              navigate("/login");
              notify("Welcome!");
            } else {
              notify(res.data.message);
            }
          })
          .catch((err) => {
            console.log("error axios: ", err);
          });
      } else {
        console.log("passwords do not match");
      }
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="login website logo"
        />
      </Link>

      <div className="register__container">
        <h2>Resgister</h2>
        <form>
          <h5>First Name</h5>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors ? (
            <div className="errorMsg">{errorMsgs.errors.firstname}</div>
          ) : (
            <></>
          )}
          <h5>Last Name</h5>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors ? (
            <div className="errorMsg">{errorMsgs.errors.lastname}</div>
          ) : (
            <> </>
          )}
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
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
          <h5>Confirm Password</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors ? (
            <div className="errorMsg">{errorMsgs.errors.confirmPassword}</div>
          ) : (
            <></>
          )}
          <h5>Phone</h5>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors ? (
            <div className="errorMsg">{errorMsgs.errors.phone}</div>
          ) : (
            <></>
          )}
          <h5>Profile Image URL</h5>
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
          <h5>Admin?</h5>
          <input
            type="checkbox"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <button
            type="submit"
            onClick={register}
            className="login__signInButton"
          >
            Register
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
    </div>
  );
}

export default RegisterComponent;
