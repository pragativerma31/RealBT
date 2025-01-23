import { useSelector } from "react-redux"



export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart)

    return (
        <div>
            <h1>
                Cart
            </h1>
            <p>{totalItems} Properties in Cart</p>
            {
                total > 0
                    ? (<div>
                        <RenderCartProperties />
                        <RenderTotalAmount />
                    </div>)
                    : (<p>Your cart is empty</p>)
            }


        </div>
    )
}