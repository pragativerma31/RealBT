import React from 'react';
import { useSelector } from 'react-redux';
import { getUserMyProperties } from '../../../services/operations/profileAPI';
import { useEffect, useState } from 'react';
const MyProperties = () => { 

    const{token} = useSelector(state => state.auth)
    const [properties, setProperties] = useState(null);
    const getMyProperties = async () => {
        try{
            const response=await getUserMyProperties(token);
            setProperties(response);

        }
        catch(err){
            console.log("Unabel to fetch properties");

        }
    }
    useEffect(() => {
        getMyProperties();
    },[])
    
    return (
        <div>
            <div>My Property</div>
            {
                !properties ? (
                    <div>Loading...</div>
                ) 
                : !properties.length ? (<p>You have not buy any property yet!</p>) 
                :(
                    <div>
                        <div>
                            <p>Property name</p>
                            <p>Price</p>
                            <p>Location</p>
                        </div>

                        {/* Cards */}
                        {
                            properties.map((property,index) => (
                                <div>
                                    <div>
                                        <img src={property.images} />
                                        <div>
                                            <p>{property.title}</p>
                                            <p>{property.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {property.category}
                                    </div>
                                    <div>
                                        <p>Price: {property.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                )

            }
         
        </div>
    );
}
export default MyProperties;