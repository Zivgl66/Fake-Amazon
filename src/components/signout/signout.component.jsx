import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const SignoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authActions.logout()); //clear redux
    localStorage.clear(); //clear local storage
    navigate("/");
  });

  return <></>;
};
export default SignoutComponent;
