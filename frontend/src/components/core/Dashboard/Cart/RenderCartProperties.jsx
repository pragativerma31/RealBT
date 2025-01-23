import React from "react";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const RenderCartProperties = () => { 
    const  {cart} = useSelector(state => state.cart);  
    const dispatch = useDispatch();   
    return (    

        <div>
            {
                cart.map((item, index) => {
                    <div>
                        <div>
                            <img src={property?.images} />
                            <div>
                                <p>{property?.title}</p>
                                <p>{property?.category?.name}</p>
                                <div>
                                    <span></span>
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emptyIcon={<GiNinjaStar />}
                                    fullIcon={<GiNinjaStar />} 
                                    />
                                    <span>{propety?.RatingsAndReviews?.length} Ratings</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => dispatch(removeFromCart(course._id))}>
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p>Rs {property?.price}</p>
                        </div>

                    </div>
                })
            }
        </div>       
    )
}
export default RenderCartProperties; 