import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
    const {total} = useSelector(state => state.cart);
    const handleBuyCourse = () => {
        const properties = cart.map((item) => item._id);
        console.log(properties);
    }
    return (    
        <div>
            <p>Total:</p>
            <p>Rs {total}</p>
            <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}/>
        </div>
    )
}
export default RenderTotalAmount;