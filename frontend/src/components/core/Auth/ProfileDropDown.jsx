import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../common/ConfirmationModal"
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { Logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) {
    return null
  }

  const handleNavigateToProfile = () => {
    navigate("/dashboard/my-profile")
  }

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.imageURL}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          {/* User Info */}
          <div
            className="flex items-center gap-x-3 py-[10px] px-[12px] cursor-pointer mr-10"
            onClick={handleNavigateToProfile}
          >
            <img
              src={user?.imageURL}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[40px] rounded-full object-cover"
            />
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-richblack-100">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-richblack-400">{user?.email}</p>
            </div>
          </div>
  
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm  text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
            <button onClick={()=>setConfirmationModal({
                text1:"Are you sure you want to logout?",
                text2:"You will be redirected to the login page",
                btn1Text:"Logout",
                btn2Text:"Cancel",
                btn1Handler:()=>dispatch(Logout(token,navigate)),
                btn2Handler:()=> setConfirmationModal(null),
            })}
            className="text-sm font-medium  w-full h-full text-richblack-300">
                <div className="flex items-center  gap-x-2">
                    <VscSignOut className="text-lg" />
                    <span>Logout</span>
                </div>
            </button>
          </div>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
      )}
    </button>
  )
}
