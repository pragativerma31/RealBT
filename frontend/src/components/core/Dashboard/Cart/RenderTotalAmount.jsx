import { useSelector } from "react-redux"

export default function RenderTotalAmount() {
  const { total } = useSelector((state) => state.cart)


  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
    </div>
  )
}