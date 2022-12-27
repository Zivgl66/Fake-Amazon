import "./product.component.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Link } from "react-router-dom";
import { notify } from "../../utils/functions";

const ProductComponent = ({ id, title, image, price, rating, quantity }) => {
  const user = useSelector((state) => state.auth.userData);
  const basket = useSelector((state) => state.auth.basket);
  const products = useSelector((state) => state.auth.products);
  const dispatch = useDispatch();

  //functions:

  const addtobasket = () => {
    if (user.id) {
      let product = products.find((p) => {
        return p._id === id;
      });
      if (product) {
        let productToInsert = {
          productId: product._id,
          quantity: 1,
          userId: user.id,
          productPrice: product.price,
        };
        if (
          !basket.find((b) => {
            return b.productId === productToInsert.productId;
          })
        ) {
          dispatch(authActions.addToBasket(productToInsert));
          axios
            .post("/baskets", productToInsert)
            .then((res) => {
              notify(`${title} added to your cart`);
              console.log(res);
            })
            .catch((err) => {
              console.log("error from add to basket: ", err);
            });
        } else {
          notify("Already in cart! change quantity in cart");
        }
      }
    } else {
      notify("Please login to add items to your cart");
    }
  };
  //return html:
  return (
    <>
      <div className="product">
        <div className="product__info">
          <Link to={`/product/${id}`} className="product_clickable_title">
            {title}
          </Link>
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
            <br />
            {quantity ? <small>quantity: {quantity}</small> : <></>}
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={"ratingKey" + i}>🌟</p>
              ))}
          </div>
        </div>

        <img src={image} alt="product" style={{ height: "250px" }} />

        <button
          onClick={() => {
            addtobasket();
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductComponent;
