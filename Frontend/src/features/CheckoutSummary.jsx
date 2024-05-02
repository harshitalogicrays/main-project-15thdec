import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const Total =useSelector(selectTotalAmount)

  return (
    <>
        <h1>Checkout Summary</h1><hr/>
            <div >
            <h5>Total Items :{cartItems.length}<br/>
                    Total Price : ${Total}</h5>
                {cartItems.map((c,i)=>
                <div className="card mb-2" key={i}>
                    <p>Item : {c.name}<br/>
                        Qty : {c.qty}<br/>
                        unit price: {c.price}
                    </p>
                </div>
            )}
            </div>

    </>
  )
}

export default CheckoutSummary
