import { combineReducers } from "redux";
import { ProductReducer } from "./ProductReducer";
import { userReducer } from "./userReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({ 
    ProductReducer,
    userReducer,
    cart : cartReducer
})