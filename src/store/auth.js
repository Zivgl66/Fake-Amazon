import { createSlice } from "@reduxjs/toolkit";

// create variable that we want redux to store for us
const initalAuthState = {
  loggedIn: false,
  userData: {},
  products: [],
  basket: [],
};

/*
    this is a redux toolkit pattern to create the store for redux it self
    redux toolkit also create reducres/actions to manipulate the state.
*/
const authSlice = createSlice({
  //for redux use
  name: "auth",
  //initial state
  initialState: initalAuthState,
  //functions to munipuldate the state
  //the functions inside the reducers called actions.
  reducers: {
    //we will call this function when use logged in
    //to update the loggedIn state
    login(state) {
      state.loggedIn = true;
    },
    //we will call this function when use logged out
    //to update the loggedIn state
    logout(state) {
      state.loggedIn = false;
      state.basket = [];
      state.userData = {};
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
    updateUserImage(state, action) {
      state.userData.profileImage = action.payload;
    },
    updateProducts(state, action) {
      state.products = action.payload;
    },
    updateBasket(state, action) {
      state.basket = action.payload;
    },
    addToBasket(state, action) {
      state.basket = [...state.basket, action.payload];
    },
  },
});

//export the actions so we can use them from other components/pages
//to update the state
export const authActions = authSlice.actions;

//export the configuration/state/actions to the index.js of redux
//so redux can configure the state
export default authSlice.reducer;
