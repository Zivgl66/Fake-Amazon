import React, { useEffect, useState } from "react";
import "./home.page.css";
import { useSelector } from "react-redux";
import { getRandom } from "../../utils/functions";
import ProductItemComponent from "../../components/productItem/productItem.component";
import logoImg from "../../assets/pictures/logoBG.png";

function HomePage() {
  const [hightlightProducts, setHightlightProducts] = useState([]);
  let splicedArr = [];
  const products = useSelector((state) => state.auth.products);

  useEffect(() => {
    splicedArr = [...products];
    let randomNum = getRandom(0, splicedArr.length - 1);
    setHightlightProducts(splicedArr.slice(randomNum, randomNum + 3));
  }, []);

  return (
    <>
      <div className="home">
        <div className="home__container">
          <img
            className="home__image"
            src={logoImg }
            alt="background of amazon prime"
          />
          <div className="home__content">
            <div className="home_title">
              <h2>Recommended for you:</h2>
            </div>
            <div className="home__row">
              {hightlightProducts.length > 0 ? (
                hightlightProducts.map((product, index) => {
                  return (
                    <div className="highlitedProduct">
                      <ProductItemComponent
                        id={product._id}
                        title={product.name}
                        price={product.price}
                        rating={product.rating ? product.rating : 5}
                        image={product.imageURL}
                        key={"productKey" + index}
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="home_row">
                    <p>no products!</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
