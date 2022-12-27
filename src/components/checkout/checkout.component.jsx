import "./checkout.component.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import SubtotalComponent from "../subtotal/subtotal.component";
import CheckoutProductComponent from "../checkoutProduct/checkoutProduct.component";
import { notify } from "../../utils/functions";

function CheckoutComponent() {
  const user = useSelector((state) => state.auth.userData);
  const basket = useSelector((state) => state.auth.basket);
  const products = useSelector((state) => state.auth.products);
  const [productsInBasket, setProductsInBasket] = useState([]);
  let tempArr = [];
  const dispatch = useDispatch();

  const removeFromBasket = (productId, index) => {
    setProductsInBasket((currentArr) =>
      currentArr.filter((p, i) => i !== index)
    );
    let basketId = basket.find((b) => {
      return b.productId === productId;
    });
    axios
      .get(`/baskets/deletefrombasket/${basketId._id}`)
      .then((res) => {
        axios
          .post("/baskets/getbasket", { userId: user.id })
          .then((res) => {
            dispatch(authActions.updateBasket(res.data));
            notify("Item removed from cart");
          })

          .catch((err) => console.log("error: ", err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.id)
      axios
        .post("/baskets/getbasket", { userId: user.id })
        .then((res) => {
          dispatch(authActions.updateBasket(res.data));
        })
        .catch((err) => console.log("error: ", err));
  }, []);

  useEffect(() => {
    basket.map((b) => {
      let productToInsert = products.find((p) => {
        return p._id === b.productId;
      });
      productToInsert = Object.assign({}, productToInsert);
      productToInsert.quantity = b.quantity;
      if (tempArr.indexOf(productToInsert) === -1)
        tempArr = [...tempArr, productToInsert];
    });
    setProductsInBasket(tempArr);
  }, [basket]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user ? user.name : "Guest"}</h3>
          <h2 className="checkout__title">Your Shopping Cart</h2>
          {basket ? (
            productsInBasket.map((item, index) => (
              <CheckoutProductComponent
                key={index + "checkoutcomponent"}
                index={index}
                id={item._id}
                title={item.name}
                image={item.imageURL}
                price={item.price}
                rating={item.rating ? item.rating : 5}
                quantity={item.quantity}
                removeFromBasket={removeFromBasket}
              />
            ))
          ) : (
            <>
              <div>
                <p>your basket is empty</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="checkout__right">
        <SubtotalComponent />
      </div>
    </div>
  );
}

export default CheckoutComponent;
