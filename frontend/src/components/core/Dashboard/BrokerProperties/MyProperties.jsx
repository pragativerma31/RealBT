import { useEffect } from "react";
import { VscAdd } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchBrokersProperty } from "../../../../services/operations/propertyAPI";
import IconBtn from "../../../common/IconBtn";
import PropertiesTable from "../BrokerProperties/PropertyTable";

export default function MyProperties() {
  const { token } = useSelector((state) => state.auth);
  const [properties ,setProperty ] = useState([])
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const result = await dispatch(fetchBrokersProperty(token));
        console.log("Fetched properties:", result);
        if (result) {
          setProperty(result);  // ✅ No error now
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperty();
  }, [dispatch, token]);  // ✅ Added dependencies

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Properties</h1>
        <IconBtn
          text="Add Property"
          onClick={() => navigate("/dashboard/add-property")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {properties &&  <PropertiesTable properties={properties} />}
    </div>
  );
}
