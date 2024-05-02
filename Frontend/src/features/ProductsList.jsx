import React, { useEffect, useState } from 'react'
import { Row, Col} from 'react-bootstrap'
import ProductCard from './ProductCard'
import Loader from './Loader'
import useFetchCollection from '../custom hook/useFetchCollection'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import { FILTER_BY_CATEGORY } from '../redux/filterSlice'

const ProductsList = ({products}) => {


   //pagination
   const itemsPerPage = 2 
   const [itemOffset, setItemOffset] = useState(0);
   const [currentItems ,setCurrentItems]=useState([])
   const [pageCount ,setPageCount]=useState(0)

   useEffect(()=>{
      const endOffset = itemOffset + itemsPerPage; //0+10 => 10 , 20+10=30
     setCurrentItems(products.slice(itemOffset, endOffset)); //102 -> (0,10)=> 0 to 9 , 20,30=>20 to 29
      setPageCount(Math.ceil(products.length / itemsPerPage)); // 102/10 => 10.2 => 11
   },[itemOffset,products])
   
   let handlePageClick=(event) => {
      const newOffset = (event.selected * itemsPerPage) % products.length; //2*10 % 102=>20
      setItemOffset(newOffset); // 20
    };

  
  return (
   <>
        <Row className='mt-4'>
         {currentItems.map((product,i)=><ProductCard key={[product.id]}  product={product}/>)}
      </Row>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
       activeLinkClassName="active"
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
      />
      </>

  )
}

export default ProductsList
