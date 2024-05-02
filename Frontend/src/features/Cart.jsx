import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_CART_ITEM, SAVE_URL, selectCartItems, selectTotalAmount } from '../redux/cartSlice'
import { FaArrowCircleLeft, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/authSlice'


const Cart = () => {
  const cartItems=useSelector(selectCartItems)
  const dispatch=useDispatch()
  const totalAmount=useSelector(selectTotalAmount)
  useEffect(()=>{
    dispatch(CALCULATE_TOTAL())
  },[cartItems])

  let isLoggedIn=useSelector(selectIsLoggedIn)
  const navigate=useNavigate()
  const url=window.location.href
  let handleCheckout=()=>{
    if(isLoggedIn) navigate('/checkout-details')
    else {
        dispatch(SAVE_URL(url))
        navigate('/login')
}
  }
   return (
   <>
   <Container className='mt-5 shadow p-2'>
        <h1>Cart Page </h1><hr/>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Category</th>
          <th>Name</th>
          <th>Image</th><th>Price</th>
            <th>quantity</th><th>Total Price</th> <th>Action</th>        </tr>
      </thead>
      <tbody>
        {cartItems.length==0 && <tr><td colSpan={8}>No Item in Cart</td></tr>}
        {cartItems.map((cart,i)=><tr key={cart.id}>
          <td>{i+1}</td>
          <td>{cart.category}</td>
          <td>{cart.name}</td>
          <td><img src={cart.image} height={50} width={50}/></td>
          <td>{cart.price}</td>
          <td>
            <button type="button"  onClick={()=>dispatch(DECREASE(cart))}>-</button>
            <input type="text" style={{width:'40px',textAlign:'center'}} value={cart.qty} readOnly />
            <button type="button" onClick={()=>dispatch(ADD_TO_CART(cart))}>+</button>
           </td>
          <td>{cart.qty * cart.price}</td>
          <td>
          <button  type="button" class="btn btn-danger" 
           onClick={()=>dispatch(REMOVE_CART_ITEM(cart))}>
                  <FaTrashAlt/>Remove
                </button>
          </td>
        </tr>)}
      </tbody>
    </Table>
    <Row>
      <Col xs={9}>
          <button
            type="button"
            class="btn btn-danger btn-lg"   onClick={()=>dispatch(EMPTY_CART())}
          >
            Empty Cart
          </button>
          <br/>
          <Link to='/'><FaArrowCircleLeft/>Back to Home</Link>
      </Col>
      <Col xs={3}>
          <h3>Total: <span className='float-end'>${totalAmount}</span></h3>
          <hr/>
          <div class="d-grid gap-2">
            <button
              type="button"
              name=""
              id=""
              class="btn btn-primary" onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
          
      </Col>
    </Row>
   </Container>
    
   </>
  )
}

export default Cart
