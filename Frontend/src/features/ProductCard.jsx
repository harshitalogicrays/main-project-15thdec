
import React, {  useEffect } from 'react'
import { Button, Card, Col } from 'react-bootstrap'

import { CartShow } from './hiddenlinks'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../redux/cartSlice'

const ProductCard = ({product}) => {
  const dispatch=useDispatch()
  return (
    <Col xs={3}>
        <Card className='mb-3'>
          <Link to={`/productdetails/${product.id}`}>
            <Card.Img variant="top"  src={product.image[0]} height={180}/>
        </Link>
            <Card.Body>
                 <Card.Title>{product.category} <hr/>{product.name}</Card.Title>
                <Card.Text>{product.price}  </Card.Text>
                <Button variant="primary" onClick={(e)=>dispatch(ADD_TO_CART(product))}>Add to Cart</Button>
                
                          </Card.Body>
        </Card>
    </Col>
  )
}

export default ProductCard

