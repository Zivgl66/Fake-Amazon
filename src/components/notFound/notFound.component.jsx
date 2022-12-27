import { Link } from "react-router-dom";
import "./notFound.component.css";

const NotFoundComponent = () => {
  return (
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
  );
};

export default NotFoundComponent;
