import { useSelector} from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import { deleteProperty } from "../../../../services/operations/propertyAPI";
import { PROPERTY_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function PropertiesTable({properties}) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  // Delete property handler
  const handlePropertyDelete = async (propertyId) => {
    setLoading(true);
    await deleteProperty({ _id: propertyId }, token);

    setConfirmationModal(null);
    setLoading(false);
  };

  // Navigate to single property details page
  const handleSingleProperty = (propertyId) => {
    if (!propertyId) {
      alert("Error: Property ID is missing!"); // Prevent silent failure
      return;
    }
    navigate(`/properties/property/${propertyId}`);
  };

  return (
    <>
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Property
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Location
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {properties?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Property found
              </Td>
            </Tr>
          ) : (
            properties?.map((property) => (
              <Tr
                key={property._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                onClick={() => handleSingleProperty(property._id)}
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={property?.thumbnailImage}
                    alt={property?.title}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {property.title}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {property.description.split(" ").length > TRUNCATE_LENGTH
                        ? property.description.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                        : property.description}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(property.postedAt)}
                    </p>
                    {property.status === PROPERTY_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {property.location}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{property.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {/* Edit Button */}
                  <button
                    disabled={loading}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent accidental row click
                      navigate(`/dashboard/edit-property/${property._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    disabled={loading}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent accidental row click
                      setConfirmationModal({
                        text1: "Do you want to delete this property?",
                        text2: "All data related to this property will be deleted.",
                        btn1Text: loading ? "Loading..." : "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: loading ? () => {} : () => handlePropertyDelete(property._id),
                        btn2Handler: loading ? () => {} : () => setConfirmationModal(null),
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
