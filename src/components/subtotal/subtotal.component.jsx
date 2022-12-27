import "./subtotal.component.css";
import { Currency } from "react-tender";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { notify } from "../../utils/functions";
import axios from "axios";

function SubtotalComponent() {
  const dispatch = useDispatch();

  const basket = useSelector((state) => state.auth.basket);
  const user = useSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);

  const getSubtotal = () => {
    if (basket.length === 0) return 0;
    if (basket.length === 1) return basket[0].productPrice;
    else {
      let subtotal = basket.reduce((a, b) => {
        return a + b.productPrice;
      }, 0);
      return subtotal;
    }
  };
  //Purchase commenced - notify user, close Modal, clear cart in redux and in DB
  const purchase = () => {
    notify("Good purchase! Products will be at your door soon.");
    setIsOpen(false);
    dispatch(authActions.updateBasket([]));
    axios
      .post("/baskets/emptybasket", { userId: user.id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error from empty basket: ", err);
      });
  };

  const checkout = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="subtotal">
      <strong>Subtotal</strong>
      <Currency value={getSubtotal()} currency="USD" locale="en-US" />

      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={checkout}>Proceed to Checkout</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="modal_div">
          <div className="input">
            <h5>are you sure you want to proccess payment?</h5>
          </div>
          <div className="buttons">
            <div className="button">
              <Button
                onClick={() => purchase()}
                variant="contained"
                color="success"
                size="small"
              >
                Pay
              </Button>
            </div>
            <div className="button">
              <Button
                onClick={() => setIsOpen(false)}
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
  );
}

export default SubtotalComponent;
