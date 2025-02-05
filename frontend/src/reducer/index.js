import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import propertyReducer from "../slices/PropertySlice";
import loanApplicationReducer from "../slices/loanApplicationSlice"; // Import it here

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    property: propertyReducer,
    loanApplication: loanApplicationReducer, // Add it here
});

export default rootReducer;
