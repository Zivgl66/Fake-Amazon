import "./productItem.component.css";
import { useNavigate } from "react-router-dom";

const ProductItemComponent = ({ id, title, rating, price, image }) => {
  let star = Number(rating);
  const navigate = useNavigate();

  return (
    <>
      <div className="card_container animate glow delay-1">
        <div className="card_product">
          <div
            className="card_product_img"
            onClick={() => navigate(`/product/${id}`)}
          >
            <img src={image} alt="product item" />
          </div>
          <div className="card_product_info">
            <p
              className="card_product_title"
              onClick={() => navigate(`/product/${id}`)}
            >
              {title}
            </p>
            <div className="card_product_rating ">
              {Array(star)
                .fill()
                .map((_, i) => (
                  <p key={"ratingKey" + i}>🌟</p>
                ))}
            </div>
            <div className="card_product_pricing">
              <button
                className="card_product_price btn_animation"
                onClick={() => navigate(`/product/${id}`)}
              >
                <span>Buy for ${price}</span>
              </button>
              <p className="card_product_shipping">
                <sub>Free shipping to israel when you spend over $49.00</sub>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItemComponent;
