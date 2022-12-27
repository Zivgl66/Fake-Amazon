import "./checkoutProduct.component.css";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function CheckoutProductComponent({
  removeFromBasket,
  index,
  id,
  image,
  title,
  price,
  rating,
  quantity,
  hideButton,
}) {
  let rat = Number(rating);
  const navigate = useNavigate();

  //return html:
  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={image}
        onClick={() => navigate(`/product/${id}`)}
      />

      <div className="checkoutProduct__info">
        <Link to={`/product/${id}`}>{title}</Link>
        <p className="checkoutProduct__price">
          <strong>${price}</strong>
          <br />
          <strong>Quantity: {quantity}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rat)
            .fill()
            .map((_, i) => (
              <p key={"checkoutproduct" + i}>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => removeFromBasket(id, index)}
            color="warning"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default CheckoutProductComponent;
