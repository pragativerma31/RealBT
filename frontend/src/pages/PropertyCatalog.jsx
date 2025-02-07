import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer";
import Property_Card from "../components/core/PropertyCatalog/Property_Card";
import  apiConnector  from "../services/apiConnector";
import  {propertyEndpoints}  from "../services/apis";
// import Error from "./Error";

function PropertyCatalog() {
  const { loading } = useSelector((state) => state.profile);
  const [properties, setProperties] = useState([]);

  // Fetch All Properties
  useEffect(() => {
    (async () => {
      try {
        const res = await apiConnector("GET", propertyEndpoints.GET_ALL_PROPERTIES_API);
        setProperties(res?.data?.AllProperties || []);
      } catch (error) {
        console.log("Could not fetch properties.", error);
      }
    })();
  }, []);

    if (loading || properties.length === 0) {
        return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
    );
  }

  return (
    <>
      <div className="box-content bg-richblack-700 px-4">
        <div className="mx-auto flex min-h-[160px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-3xl text-richblack-5">All Properties</p>
          <p className="max-w-[870px] text-richblack-200">
            Explore various properties available on our platform.
          </p>
        </div>
      </div>

      {/* Properties Listing in Vertical Layout */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="flex flex-col gap-6 w-full items-center">
          {properties.map((property, index) => (
            <Property_Card key={index} property={property} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PropertyCatalog;
