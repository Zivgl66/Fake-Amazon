import "./productItem.component.css";
import { useNavigate } from "react-router-dom";

const ProductItemComponent = ({ id, title, rating, price, image }) => {
  let star = Number(rating);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="container_product_item"
        onClick={() => navigate(`/product/${id}`)}
      >
        <div className="product_item_top">
          <h2 className="product_item_name">{title}</h2>
          <div className="product_item_image">
            <img src={image} alt="product_item image" />
          </div>
        </div>
        <div className="product_item_bottom">
          <div className="product_item_list">
            <div className="product_item_rating">
              {Array(star)
                .fill()
                .map((_, i) => (
                  <p key={"ratingKey" + i}>🌟</p>
                ))}
            </div>
            <div className="product_item_price">${price}</div>
          </div>

          <p className="product_item_paragraph">
            Free shipping to israel when you spend over $49.00
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItemComponent;
