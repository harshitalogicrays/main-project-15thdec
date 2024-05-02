import React, { useEffect, useState } from 'react'
import ProductsList from './ProductsList'
import { Container } from 'react-bootstrap'
import useFetchCollection from '../custom hook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectproducts } from '../redux/productSlice'
import { FILTER_BY_CATEGORY, selectFilterProducts, selectcategory, selectserach } from '../redux/filterSlice'
import { Row, Col} from 'react-bootstrap'
const Products = () => {
  const {data}=useFetchCollection("products")
  // console.log(data)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(STORE_PRODUCTS(data))
  },[data])
  const products=useSelector(selectproducts)

  const {data:categories}=useFetchCollection("categories")
  //
  const filterProducts=useSelector(selectFilterProducts)
  const searchvalue=useSelector(selectserach)
  const categoryvalue=useSelector(selectcategory)
    //category 
    let [category,setCategory]=useState('')
    useEffect(()=>{
         dispatch(FILTER_BY_CATEGORY({products,category}))
    },[category])
    

    //price 
    let [price,setPrice]=useState()
  return (
    <>
       <Container className="mt-5">
        <h1>Products Page</h1><hr/>
        <Row>
      <Col xs={{span:'4'}}>
         <div className='row'>
            <label class="col-form-label col-3"><b>Category:</b></label>
            <div className="col-7">
                  <select class="form-select" value={category} onChange={(e)=>{
                     setCategory(e.target.value);}
                  }>
                     <option value=''> Select one</option>
                     {categories.map((c,i)=>
                     <option key={c.id}>{c.title}</option>
                  )}
                  </select>
            </div>
         </div>
      </Col>
      <Col xs={{span:'4',offset:'4'}}>    
      <div className='row'>
            <label class="col-form-label col-3"><b>Sort By:</b></label>
            <div className="col-7">
                  <select class="form-select" >
                     <option value='' selected disabled>Select one</option>
                     <option value="low">Low to High</option>
                     <option value="high">High to Low</option>
                  </select>
            </div>
         </div></Col>
      </Row>
        {
          searchvalue =='' && categoryvalue =='' ? 
          <ProductsList products={products}/>        
          :
          <>
              {filterProducts.length ==0 ? <h1>No Product Found</h1> :
              <ProductsList products={filterProducts}/>
              }
          </>
        }
        
        </Container>
    </>
  )
}

export default Products
