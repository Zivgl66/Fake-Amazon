import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "./store/auth";
import jwt_decode from "jwt-decode";
import HomePage from "./pages/home/home.page";
import NavbarComponent from "./components/navbar/navbar.component";
import LoginComponent from "./components/login/login.component";
import CheckoutComponent from "./components/checkout/checkout.component";
import ReturnsComponent from "./components/returns/returns.component";
import RegisterComponent from "./components/register/register.component";
import SignoutComponent from "./components/signout/signout.component";
import LoaderComponent from "./components/loader/loader.component";
import AddProductComponent from "./components/addproduct/addproduct.component";
import { ToastContainer } from "react-toastify";
import ProfilePageComponent from "./components/profilePage/profilePage.component";
import ProductPageComponent from "./components/productPage/productPage.component";
import AdminTableProductsComponent from "./components/adminTableProducts/adminTableProducts.component";
import AdminTableUsersComponent from "./components/adminTableUsers/adminTableUsers.component";
import ProductsTableComponent from "./components/productstable/productstable.component";
import NotFoundComponent from "./components/notFound/notFound.component";
import FooterComponent from "./components/footer/footer.component";
import ScrollToTop from "./components/scrollToTop/scrollToTop.component";
import ForgotPasswordComponent from "./components/forgotpassword/forgotpassword.component";
import ResetPasswordComponent from "./components/resetpassword/resetpassword.component";
import NavbarComponentTwo from "./components/navbarTwo/navbar.component";

function App() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("/users/loginbytoken", token)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", token);
            dispatch(authActions.login());
            dispatch(authActions.updateUserData(jwt_decode(token)));
            setLoader(true);
          }
        })
        .catch((err) => {
          console.log("error from login with token axios: ", err);
          setLoader(true);
        });
    } else {
      console.log("no token!");
      setLoader(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get("/products")
      .then((data) => {
        dispatch(authActions.updateProducts(data.data));
      })
      .catch((err) => {
        console.log("error from fetching products: ", err);
      });
  });

  return loader ? (
    <div className="app">
      <ToastContainer />
      <main>
        <BrowserRouter>
          <ScrollToTop />
          {/* <NavbarComponent /> */}
          <NavbarComponentTwo />
          <Routes>
            <Route path="/" index element={<HomePage />} exact />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/checkout" element={<CheckoutComponent />} />
            <Route path="/orders" element={<ReturnsComponent />} />
            <Route
              path="/productstable/:search"
              exact
              element={<ProductsTableComponent />}
            />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/signout" element={<SignoutComponent />} />
            <Route
              path="/forgotpassword"
              element={<ForgotPasswordComponent />}
            />
            <Route
              path="/resetpassword/:id/:token"
              element={<ResetPasswordComponent />}
            />
            <Route path="/profile" element={<ProfilePageComponent />} />
            <Route
              path="/admintableproducts"
              index
              element={<AdminTableProductsComponent />}
            />
            <Route
              path="/admintableusers"
              element={<AdminTableUsersComponent />}
            />
            <Route path="/addproduct" element={<AddProductComponent />} />
            <Route path="/product/:id" element={<ProductPageComponent />} />
            <Route path="/404" element={<NotFoundComponent />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  ) : (
    <LoaderComponent />
  );
}

export default App;
