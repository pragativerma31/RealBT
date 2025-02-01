import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';  
import propertyReducer from '../slices/PropertySlice';

const rootReducer = combineReducers({

    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    property: propertyReducer,
    
});

export default rootReducer;