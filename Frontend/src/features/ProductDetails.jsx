import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useFetchCollection from '../custom hook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts } from '../redux/productSlice'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../redux/cartSlice'
import ImageThumbnail from './ImageThumbnail'

const ProductDetails = () => {
    const {id}=useParams()
    const data = useSelector(selectproducts)
    console.log(data)
    const product=data.find(item=>item.id==id)
    const cartItems=useSelector(selectCartItems)
    const itemIndex=cartItems.findIndex(item=>item.id==product.id)
    const dispatch=useDispatch()
    const item=cartItems.find(item=>item.id==product.id) 
    // const similarproducts= data.filter(items=>items.category==product.category)
  return (
   <Container className='mt-5 shadow p-4'>
    <Row>
        <Col>
           <ImageThumbnail images={product.image}/>
        </Col>
        <Col>
            {product.stock > 0 ? 
            <span  class="badge rounded-pill text-bg-success float-end">In Stock</span>
            :
            <span  class="badge rounded-pill text-bg-danger float-end">out of Stock</span>
            }
            <h4 >{product.category}</h4>
            <h5>{product.name}</h5>
            <p>${product.price}</p>
            <p>{product.desc}</p>
            {itemIndex == -1 ? 
            <Button  onClick={()=>dispatch(ADD_TO_CART(product))}>Add to Cart</Button>
            :
<>
            <button type="button"  onClick={()=>dispatch(DECREASE(item))}>-</button>
            <input type="text" style={{width:'40px',textAlign:'center'}} value={item.qty} readOnly />
            <button type="button" onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
          
</>
            }

        </Col>
    </Row>
   </Container>
  )
}

export default ProductDetails
