import "./navbar.component.css";
import axios from "axios";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Autosuggest from "react-autosuggest";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";

function NavbarComponent() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);
  const basket = useSelector((state) => state.auth.basket);
  const products = useSelector((state) => state.auth.products);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState("none");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showHamburger, setShowHamburger] = useState({
    visibility: "hidden",
  });

  useEffect(() => {
    if (user.id) {
      dispatch(authActions.updateBasket([]));
      axios
        .post("/baskets/getbasket", { userId: user.id })
        .then((res) => {
          dispatch(authActions.updateBasket(res.data));
        })
        .catch((err) => console.log("error: ", err));
    } else {
      dispatch(authActions.updateBasket([]));
    }
  }, [user]);

  const navStyle = {
    textDecoration: "none",
  };
  const userStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    margin: "0px 10px",
  };
  const dropdown = () => {
    if (display == "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };
  const handleSearch = (value) => {
    // e.preventDefault();
    console.log("searched value is: ", value);
    let product = products.filter((p) => {
      return p.name === value;
    })[0];
    console.log("product is: ", product);
    if (product) {
      navigate(`/product/${product._id}`);
      setValue("");
    } else {
      navigate(`/productstable/${value}`);
      setValue("");
      //navigate to products search page table
    }
  };

  //autosuggest -
  const getSuggestions = (value) => {
    const inputValue = value.value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : products.filter((product) =>
          product.name.toLowerCase().includes(inputValue)
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <>
      <div
        onClick={() => {
          handleSearch(suggestion.name);
          setValue("");
        }}
      >
        {suggestion.name}
      </div>
    </>
  );

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = (value) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const inputProps = {
    placeholder: "search for product",
    value,
    onChange: onChange,
  };
  const displayNavHam = () => {
    if (showHamburger.visibility === "hidden")
      setShowHamburger({ visibility: "visible" });
    else setShowHamburger({ visibility: "hidden" });
  };

  //return html:
  return (
    <div className="navbar">
      <NavLink to="/">
        <button className="navBtn_logo">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </button>
      </NavLink>

      <div className="header__search">
        <div className="header__searchInput">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <button
          className="header__searchInputButton"
          onClick={() => handleSearch(value)}
        >
          <FaSearch style={{ fontSize: "24px" }} />
        </button>
      </div>
      <div className="header__nav">
        <div
          className="header__profile"
          onClick={dropdown}
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              user.profileImage
                ? user.profileImage
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="userimage"
            style={userStyle}
          />
          <div className="dropDown_menu" style={{ display: display }}>
            <NavLink to={loggedIn ? "/profile" : "#"} className="dropDown_item">
              <div className="navBtn">
                <div className="header__option">
                  <span className="header__optionLineTwo">
                    Hello {loggedIn ? user.name : "Guest"}
                  </span>
                </div>
              </div>
            </NavLink>
            {user.isAdmin ? (
              <>
                <NavLink to="/admintableusers" className="dropDown_item">
                  <div className="navBtn">
                    <div className="header__option">
                      <span className="header__optionLineTwo">Users</span>
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/admintableproducts" className="dropDown_item">
                  <div className="navBtn">
                    <div className="header__option">
                      <span className="header__optionLineTwo">Products</span>
                    </div>
                  </div>
                </NavLink>
              </>
            ) : (
              <></>
            )}
            <NavLink
              to={!loggedIn ? "/login" : "/signout"}
              className="dropDown_item"
            >
              <div className="navBtn">
                <div className="header__option">
                  <span className="header__optionLineTwo">
                    {loggedIn ? "Sign Out" : "Sign In"}
                  </span>
                </div>
              </div>
            </NavLink>
          </div>
        </div>

        <NavLink to="/orders" style={navStyle}>
          <button className="navBtn">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </button>
        </NavLink>

        <NavLink to="#" style={navStyle}>
          <button className="navBtn">
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
          </button>
        </NavLink>
        {user.isAdmin ? (
          <NavLink to="/addproduct" style={navStyle}>
            <button className="navBtn">
              <div className="header__option">
                <span className="header__optionLineOne">Add</span>
                <span className="header__optionLineTwo">Products</span>
              </div>
            </button>
          </NavLink>
        ) : (
          <></>
        )}
        <NavLink to="/checkout" style={navStyle}>
          <button className="navBtn">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </button>
        </NavLink>
      </div>
      <div className="hanburger">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
