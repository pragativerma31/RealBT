import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import { deleteLoanOffer } from "../../../../services/operations/LoanOfferAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function LoanOfferTable({ loanOffers }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Delete loan offer handler
  const handleLoanOfferDelete = async (offerId) => {
    setLoading(true);
    // await deleteLoanOffer({ _id: offerId }, token);
    setConfirmationModal(null);
    setLoading(false);
  };

  const handleSingleOffer = (offerId) => {
    if (!offerId) {
      alert("Error: Offer ID is missing!"); // Prevent silent failure
      return;
    }
    navigate(`/loanOffers/${offerId}`);
  };

  return (
    <>
      <Table className="w-full border border-richblack-800 table-fixed">
        <Thead>
          <Tr className="bg-richblack-800 text-white">
            <Th className="p-4 text-left text-sm font-medium uppercase">Loan Title</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Loan Type</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Interest Rate</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Tenure</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Max Amount</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Status</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Created on</Th>
            <Th className="p-4 text-left text-sm font-medium uppercase">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loanOffers?.length === 0 ? (
            <Tr>
              <Td colSpan="8" className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Loan Offers Found
              </Td>
            </Tr>
          ) : (
            loanOffers?.map((offer) => (
              <Tr
                key={offer._id}
                className="border-b border-richblack-800 cursor-pointer hover:bg-richblack-700 transition-all"
                onClick={() => handleSingleOffer(offer._id)}
              >
                <Td className="p-4 text-sm font-medium text-richblack-100">{offer.title}</Td>
                <Td className="p-4 text-sm font-medium text-richblack-100">
                  {offer.loanType?.name || "N/A"}
                </Td>
                <Td className="p-4 text-sm font-medium text-richblack-100">
                  {offer.interestRate}%
                </Td>
                <Td className="p-4 text-sm font-medium text-richblack-100">
                  {offer.tenureInMonths} months
                </Td>
                <Td className="p-4 text-sm font-medium text-richblack-100">
                  ₹{offer.maxLoanAmount}
                </Td>
                <Td className="p-4 text-sm font-medium text-richblack-100">
                  {offer.status === "Pending" ? (
                    <span className="flex items-center gap-2 px-2 py-1 text-[12px] font-medium bg-red-700 text-white rounded-full">
                      <HiClock size={14} />
                      Pending
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-2 py-1 text-[12px] font-medium bg-green-400 text-white rounded-full">
                      <FaCheck size={12} />
                      Approved
                    </span>
                  )}
                </Td>
                <Td className="p-4 text-sm font-medium text-richblack-100">
                  {formatDate(offer.createdAt)}
                </Td>
                <Td className="p-4 text-sm font-medium text-richblack-100 flex gap-3">
                  {/* Edit Button */}
                  <button
                    disabled={loading}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click event
                      navigate(`/dashboard/edit-loan-offer/${offer._id}`);
                    }}
                    title="Edit"
                    className="text-blue-400 hover:scale-110 transition-transform duration-200"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    disabled={loading}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent row click event
                      setConfirmationModal({
                        text1: "Do you want to delete this loan offer?",
                        text2: "All data related to this offer will be deleted.",
                        btn1Text: loading ? "Loading..." : "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: loading ? () => {} : () => handleLoanOfferDelete(offer._id),
                        btn2Handler: loading ? () => {} : () => setConfirmationModal(null),
                      });
                    }}
                    title="Delete"
                    className="text-red-700 hover:scale-110 transition-transform duration-200"
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
