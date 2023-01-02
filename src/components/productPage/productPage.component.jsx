import "./productPage.component.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { notify } from "../../utils/functions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductItemComponent from "../productItem/productItem.component";

const ProductPageComponent = () => {
  const user = useSelector((state) => state.auth.userData);
  const basket = useSelector((state) => state.auth.basket);
  const products = useSelector((state) => state.auth.products);
  let { id } = useParams();
  const [date, setDate] = useState(new Date());
  let shippingDay = `${date.getDay() + 21}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  let fastDeliveryDay = `${date.getDay() + 14}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [rat, setRat] = useState(5);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setDate(new Date());
    console.log(shippingDay);
    axios
      .get(`/products/${id}`)
      .then((data) => {
        setProduct(data.data[0]);
        setRat(Number(data.data[0].rating));
      })
      .catch((err) => console.log("error getting product: ", err));
  }, [id]);

  useEffect(() => {
    let tempArr = [];
    tempArr = products.filter((p) => {
      return p.catagory === product.catagory;
    });
    tempArr = tempArr.sort(() => Math.random() - 0.5).slice(0, 3);
    setRelatedProducts(tempArr);
  }, [product]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity !== product.stock) setQuantity(quantity + 1);
  };

  const addToBasket = () => {
    if (user.id) {
      let productToInsert = {
        productId: product._id,
        quantity: quantity,
        userId: user.id,
        productPrice: product.price,
      };
      let basketId = basket.find((b) => {
        return b.productId === productToInsert.productId;
      });
      if (!basketId) {
        dispatch(authActions.addToBasket(productToInsert));
        axios
          .post("/baskets", productToInsert)
          .then((res) => {
            notify(`${product.name} add to your cart!`);
            axios
              .post("/baskets/getbasket", { userId: user.id })
              .then((res) => {
                dispatch(authActions.updateBasket(res.data));
              })

              .catch((err) => console.log("error: ", err));
          })
          .catch((err) => {
            console.log("error from add to basket: ", err);
          });
      } else if (quantity !== basketId.quantity) {
        axios
          .post("/baskets/updatebasketquantity", {
            basketId: basketId._id,
            quantity: quantity,
          })
          .then((res) => {
            notify("Updated quantity");
            axios
              .post("/baskets/getbasket", { userId: user.id })
              .then((res) => {
                dispatch(authActions.updateBasket(res.data));
              })

              .catch((err) => console.log("error: ", err));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        notify("Already in cart!");
      }
    } else {
      notify("Please login to add items to your cart");
    }
  };

  return (
    <>
      <div className="product_page">
        <div className="container_productpage">
          <div className="product_card">
            <div className="product_left">
              <div className="product_image text-center">
                <img src={product.imageURL} alt="" />
              </div>
            </div>
            <div className="product_center">
              <div className="product_title">
                <h1>{product.name}</h1>
                <h3>
                  <strong> Description: </strong> {product.description}
                </h3>
              </div>
              <div className="product_stars">
                {Array(rat)
                  .fill()
                  .map((_, i) => (
                    <p key={"checkoutproduct" + i}>🌟</p>
                  ))}
              </div>
              <div className="product_description">
                <div className="product_stock">
                  <h4>only {product.stock} left in stock.</h4>
                </div>
              </div>
            </div>
            <div className="product_right">
              <div className="product_info">
                <h4>Buying options:</h4>
                <div className="product_rating">
                  <div className="product_price">
                    <h5>from {product.price}$</h5>
                  </div>
                </div>

                <div className="product_shipping">
                  <h6>
                    usually ships within 24 hours.
                    <br />
                    Order today to get it by {shippingDay}.
                    <br />
                    Order with PRIME - receive {fastDeliveryDay}
                    <br />
                    Item ships to Israel.
                  </h6>
                </div>
                <div className="product_cart">
                  <div className="product_quantity">
                    <button
                      className="product_btn_quantity"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <span className="product_quantity_number">{quantity}</span>
                    <button
                      className="product_btn_quantity"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>

                  <IconButton
                    color="secondary"
                    aria-label="add to shopping cart"
                    onClick={() => addToBasket()}
                    size="large"
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container_related_products">
          <div className="related_products_title">
            <h3>Related Products: </h3>
          </div>
          <div className="related_products">
            {relatedProducts.map((p, i) => {
              return (
                <ProductItemComponent
                  id={p._id}
                  title={p.name}
                  price={p.price}
                  rating={p.rating ? p.rating : 5}
                  image={p.imageURL}
                  key={"productKey" + i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPageComponent;
