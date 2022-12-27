import "../login/login.component.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { notify } from "../../utils/functions";

const AddProductComponent = () => {
  const user = useSelector((state) => state.auth.userData);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(1);
  const [added, setAdded] = useState(false);

  const addProduct = (e) => {
    e.preventDefault();
    axios
      .post("/products", {
        name,
        price,
        description,
        catagory,
        stock,
        rating: rating,
        imageURL,
        sellerId: user.id,
      })
      .then((data) => {
        if (data.status === 200) {
          notify("Product added!");
          setAdded(true);
        }
      })
      .catch((err) => console.log("adding product error: ", err));
  };
  const refreshPage = () => {
    window.location.reload();
  };

  return added ? (
    <>
    
      <div className="login">
        <Link to="/">
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          />
        </Link>
        <div className="login__container">
          <button className="login__signInButton" onClick={refreshPage}>
            Add another
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>New Product:</h1>

        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h5>Price</h5>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <h5>Description</h5>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h5>Catagory</h5>
          <input
            type="text"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          />
          <h5>Rating</h5>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <h5>Image URL</h5>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <h5>Stock</h5>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <button
            type="submit"
            onClick={addProduct}
            className="login__signInButton"
          >
            Add Product
          </button>
        </form>

        <p>
          Press the 'Add Product' button in order to upload a new product to the
          products data base.
        </p>
      </div>
    </div>
  );
};

export default AddProductComponent;
