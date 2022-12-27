import "../login/login.component.css";
import "../notFound/notFound.component.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { notify } from "../../utils/functions";

const ResetPasswordComponent = () => {
  const [verifiedURL, setVerifiedURL] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState({});
  const [errors, setErrors] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:3001/api/users/reset-password/${param.id}/${param.token}`;

  useEffect(() => {
    const verifiyURL = async () => {
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          if (res.status === 200) setVerifiedURL(true);
          else setVerifiedURL(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    verifiyURL();
  }, [param, url]);

  const resetPass = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        axios
          .post(url, { password })
          .then((data) => {
            notify("Password Updated!");
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!password) {
      formIsValid = false;
      errors["password"] = "*Please enter a password";
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
    setErrorMsgs({ errors });
    if (!formIsValid) setErrors(true);
    return formIsValid;
  };
  return (
    <>
      {verifiedURL ? (
        <div className="login">
          <Link to="/">
            <img
              className="login__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            />
          </Link>
          <div className="login__container">
            <form>
              <h5>New Password</h5>
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
                onClick={resetPass}
                className="login__signInButton"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <img
            src="https://almandental.com/public/klinik/img/404.png"
            className="four-0-four-image"
            alt=""
            width={"400px"}
          />
          <p class="four-0-four-msg">
            look like you are lost. Head to beack to our{" "}
            <Link to="/">homepage</Link>
          </p>
        </>
      )}
    </>
  );
};

export default ResetPasswordComponent;
