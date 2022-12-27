import "./navbar.component.css";
import axios from "axios";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import Autosuggest from "react-autosuggest";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";

const NavbarComponentTwo = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);
  const basket = useSelector((state) => state.auth.basket);
  const products = useSelector((state) => state.auth.products);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState("none");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [onFocusHamburger, setOnFocusHamburger] = useState(false);
  const profileImg = useRef(null);
  const hamburgerMenu = useRef(null);

  const handleBlur = () => {
    if (onFocus) {
      dropdown();
      profileImg.current.blur();
      setOnFocus(false);
    } else {
      profileImg.current.focus();
      setOnFocus(true);
    }
  };

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
    if (display === "none") setDisplay("block");
    else setDisplay("none");
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
    } else if (value === "") {
      navigate(`/productstable/searchvalueisempty`);
      setValue("");
    } else {
      navigate(`/productstable/${value}`);
      setValue("");
      //navigate to products search page table
    }
  };

  const handleShowNavbar = () => {
    if (onFocusHamburger) {
      setShowNavbar(!showNavbar);
      hamburgerMenu.current.blur();
      setOnFocusHamburger(false);
    } else {
      hamburgerMenu.current.focus();
      setOnFocusHamburger(true);
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

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/">
          <button className="navBtn_logo">
            <img
              className="logoImg"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
          </button>
        </NavLink>
      </div>
      <div className="search">
        <div className="searchInput">
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
          className="searchInputButton"
          onClick={() => handleSearch(value)}
        >
          <FaSearch style={{ fontSize: "24px" }} />
        </button>
      </div>
      <div
        className="menu-icon"
        ref={hamburgerMenu}
        contentEditable
        onBlur={() => {
          setShowNavbar(!showNavbar);
        }}
        onFocus={() => {
          setShowNavbar(!showNavbar);
        }}
        onClick={handleShowNavbar}
      >
        <MenuIcon />
      </div>
      <div className={`nav-elements  ${showNavbar && "active"}`}>
        <ul>
          <li>
            <div
              className="profile"
              ref={profileImg}
              onClick={() => handleBlur()}
              onBlur={() => {
                dropdown();
              }}
              onFocus={() => {
                dropdown();
              }}
              style={{ cursor: "pointer" }}
              contentEditable
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
                <NavLink
                  to={loggedIn ? "/profile" : "#"}
                  className="dropDown_item"
                >
                  <div className="navBtn">
                    <div className="option">
                      <span className="optionLineTwo">
                        Hello {loggedIn ? user.name : "Guest"}
                      </span>
                    </div>
                  </div>
                </NavLink>
                {user.isAdmin ? (
                  <>
                    <NavLink to="/addproduct" className="dropDown_item">
                      <div className="navBtn">
                        <div className="option">
                          <span className="optionLineTwo">Add Product</span>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/admintableusers" className="dropDown_item">
                      <div className="navBtn">
                        <div className="option">
                          <span className="optionLineTwo">Users</span>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to="/admintableproducts" className="dropDown_item">
                      <div className="navBtn">
                        <div className="option">
                          <span className="optionLineTwo">Products</span>
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
                    <div className="option">
                      <span className="optionLineTwo">
                        {loggedIn ? "Sign Out" : "Sign In"}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
          </li>
          <li>
            <NavLink to="/orders" style={navStyle}>
              <button className="navBtn">
                <div className="option">
                  <span className="optionLineOne">Returns</span>
                  <span className="optionLineTwo">& Orders</span>
                </div>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/yourprime" style={navStyle}>
              <button className="navBtn">
                <div className="option">
                  <span className="optionLineOne">Your</span>
                  <span className="optionLineTwo">Prime</span>
                </div>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/checkout" style={navStyle}>
              <button className="navBtn">
                <div className="optionBasket">
                  <ShoppingBasketIcon />
                  <span className="optionLineTwo basketCount">
                    {basket?.length}
                  </span>
                </div>
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="second_menu ">
        <div className="catagories">
          <a href="http://localhost:3000/productstable/Home & Kitchen">
            <button>Home & Kitchen</button>
          </a>
          <a href="http://localhost:3000/productstable/Cell Phones & Accessories">
            <button>Cell Phones & Accessories</button>
          </a>
          <a href="http://localhost:3000/productstable/Computers & Accessories">
            <button>Computers & Accessories</button>
          </a>
          <a href="http://localhost:3000/productstable/Lighting & Ceiling Fans">
            <button> Lighting & Ceiling Fans</button>
          </a>
          <a href="http://localhost:3000/productstable/Tools & Home Improvement">
            <button> Tools & Home Improvement</button>
          </a>
          <a href="http://localhost:3000/productstable/Televisions & Video Products">
            <button> Televisions & Video Products</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponentTwo;
