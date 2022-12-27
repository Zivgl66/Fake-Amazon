import "./profilePage.component.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "react-modal";
import axios from "axios";
import { notify } from "../../utils/functions";

const ProfilePageComponent = () => {
  const user = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [style, setStyle] = useState({
    display: "none",
  });
  const dispatch = useDispatch();

  const changePicture = () => {
    if (profileImage.length != 0) {
      axios
        .post("/users/updateprofileimage", {
          email: user.email,
          imageURL: profileImage,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 202) {
            notify("Image was updated");
            dispatch(authActions.updateUserImage(profileImage));
            setStyle({ display: "none" });
            setProfileImage("");
          }
          setIsOpen(false);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
  };
  const showEditBtn = () => {
    if (style.display === "none") setStyle({ display: "block" });
    else setStyle({ display: "none" });
  };
  return (
    <>
      <div className="container_profile">
        <Card
          sx={{
            maxWidth: 400,
            background: "rgba( 255, 255, 255, 0.2 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: " blur( 20px )",
            borderRadius: "20px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            width: {
              xs: 300,
              sm: 350,
              md: 400,
            },
          }}
        >
          <CardMedia
            className="profile_card_image"
            component="img"
            alt="user profile image"
            height="350"
            image={user.profileImage}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={() => showEditBtn()}
          />
          <button
            className="edit_btn"
            style={style}
            onClick={() => setIsOpen(true)}
          >
            <EditIcon />
          </button>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <p className="uppercase">
                {user.name} {user.lastname}
              </p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is your AMAZON profile page.
            </Typography>
          </CardContent>
          <CardActions className="profile_card_buttons">
            <Button size="small" variant="contained">
              {user.email}
            </Button>
            <Button size="small" variant="contained">
              {user.phone}
            </Button>
          </CardActions>
        </Card>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
            setStyle({ display: "none" });
          }}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
        >
          <div className="modal_div">
            <div className="input">
              <h4>image URL:</h4>
              <input
                type="text"
                value={profileImage}
                placeholder="URL..."
                onChange={(e) => setProfileImage(e.target.value)}
              />
            </div>
            <div className="buttons">
              <div className="button">
                <Button
                  onClick={() => changePicture()}
                  variant="contained"
                  color="success"
                  size="small"
                >
                  Submit
                </Button>
              </div>
              <div className="button">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setStyle({ display: "none" });
                  }}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfilePageComponent;
