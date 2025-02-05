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
import { deleteLoanApplication } from "../../../../services/operations/LoanApplicationAPI";
import { APPLICATION_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function LoanApplicationTable({ loanApplications }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Delete loan application handler
  const handleLoanDelete = async (applicationId) => {
    setLoading(true);
    await deleteLoanApplication({ _id: applicationId }, token);

    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Loan Type
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Amount
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Status
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {loanApplications?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Loan Applications Found
              </Td>
            </Tr>
          ) : (
            loanApplications?.map((application) => (
              <Tr
                key={application._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="text-sm font-medium text-richblack-100">
                  {application.loanType}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{application.amount}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {application.status === APPLICATION_STATUS.PENDING ? (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                      <HiClock size={14} />
                      Pending
                    </p>
                  ) : (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                        <FaCheck size={8} />
                      </div>
                      Approved
                    </p>
                  )}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {/* Edit Button */}
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-loan/${application._id}`)}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this loan application?",
                        text2: "All data related to this loan will be deleted.",
                        btn1Text: loading ? "Loading..." : "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: loading ? () => {} : () => handleLoanDelete(application._id),
                        btn2Handler: loading ? () => {} : () => setConfirmationModal(null),
                      })
                    }
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
