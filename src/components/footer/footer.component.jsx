import "./footer.component.css";
import { CDBFooter, CDBBtn, CDBIcon, CDBBox } from "cdbreact";
import logoImg from "../../assets/pictures/logo.png";

const FooterComponent = () => {
  return (
    <div className="footer">
      <CDBFooter className="shadow">
        <CDBBox
          display="flex"
          justifyContent="between"
          alignItems="center"
          className="mx-auto py-4 flex-wrap"
          style={{ width: "80%" }}
        >
          <CDBBox display="flex" alignItems="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img
                alt="logo"
                style={{ color: "black" }}
                src={logoImg}
                width="36px"
              />
            </a>
          </CDBBox>
          <CDBBox>
            <small className="ml-2 footer_text">
              &copy; Amazonia, 2022. All rights reserved.
            </small>
          </CDBBox>
          <CDBBox display="flex" className="socialmedia_icons">
            <a href="http://www.facebook.com" className="footer_socialmedia">
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="facebook-f" style={{ color: "#027eec" }} />
              </CDBBtn>
            </a>
            <a href="http://www.twitter.com" className="footer_socialmedia">
              <CDBBtn flat color="dark" className="mx-3 p-2">
                <CDBIcon fab icon="twitter" style={{ color: "#179cf0" }} />
              </CDBBtn>
            </a>
            <a href="http://www.instagram.com" className="footer_socialmedia">
              <CDBBtn flat color="dark" className="me-3 p-2">
                <CDBIcon fab icon="instagram" style={{ color: "#fe0061 " }} />
              </CDBBtn>
            </a>
            <a
              href="http://www.linkedin.com/in/ziv-gliser-b0734022b"
              className="footer_socialmedia"
            >
              <CDBBtn flat color="dark" className=" p-2">
                <CDBIcon fab icon="linkedin" style={{ color: "#0a66c2 " }} />
              </CDBBtn>
            </a>
          </CDBBox>
        </CDBBox>
      </CDBFooter>
    </div>
  );
};

export default FooterComponent;
