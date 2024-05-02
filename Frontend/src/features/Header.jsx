import React, {  useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import {FaArrowAltCircleLeft, FaHome, FaList, FaLock, FaPenAlt, FaSearch} from 'react-icons/fa'
import { Button, Form, Image, InputGroup } from 'react-bootstrap';
import {  CartShow, ShowOnLogin, ShowOnLogout } from './hiddenlinks';
import Logout from './Logout';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_USER, LOGOUT_USER, selectIsLoggedIn, selectUserName, selectUserRole } from '../redux/authSlice';
import { FILTER_BY_SEARCH } from '../redux/filterSlice';
import useFetchCollection from '../custom hook/useFetchCollection';
import { STORE_PRODUCTS, selectproducts } from '../redux/productSlice';
const Header = () => {
let username=useSelector(selectUserName)
let isLoggedIn=useSelector(selectIsLoggedIn)
let role=useSelector(selectUserRole)
  const dispatch=useDispatch()
    useEffect(()=>{
      onAuthStateChanged(auth, async(user) => {
        if (user) {
            const uid = user.uid;
            try{
              const docRef=doc(db,"users",uid)
              const docSnap=await getDoc(docRef)
              if(docSnap.exists()){
                // console.log(docSnap.data())
                let obj={name:docSnap.data().username
                        ,email:docSnap.data().email,
                        role:docSnap.data().role,
                        id:uid}
                dispatch(LOGIN_USER(obj))
              }              
            }
            catch(error){console.log(error.message)}
        } 
        else {
          dispatch(LOGOUT_USER())
          }
      });
    },[auth])


//search -
let [search,setSearch]=useState('')
let navigate=useNavigate()
const {data}=useFetchCollection("products")
useEffect(()=>{dispatch(STORE_PRODUCTS(data))},[data])
const products=useSelector(selectproducts)
// let handleSearch=(e)=>{
//   e.preventDefault()
//   dispatch(FILTER_BY_SEARCH({products,search}))
// }

useEffect(()=>{
  dispatch(FILTER_BY_SEARCH({products,search}))
  navigate('/products')
},[search])
  return (
    <>
     {(isLoggedIn && role=='0') ?
      <h2 className='text-center bg-danger'> <Link
    to='/admin'
    >
      Admin Panel
    </Link></h2>
      :''}
   
     <Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#home">
        <Image src={'/src/assets/images/a.jpg'} width={40} height={40}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/'><FaHome/> Home</Nav.Link>
          <Nav.Link as={Link} to='/'><FaHome/> about</Nav.Link>
          <Nav.Link as={Link} to='/products'><FaList/> Products</Nav.Link>
        </Nav>
        {/* {(isLoggedIn && role=='0') ?
        <Nav className='me-auto'>
            <Link
              type="button"
              class="btn btn-danger btn-lg" to='/admin'
            >
              Admin Panel
            </Link>
            
        </Nav> :''} */}

         <Form className='me-auto'>
        <InputGroup >  
          <Form.Control placeholder='search here' type="text"  
          value={search} onChange={(e)=>setSearch(e.target.value)}></Form.Control>
          {/* <Button variant='danger' type="submit" onClick={handleSearch}><FaSearch/></Button> */}
        </InputGroup>
        </Form>
        <Nav>
          {role !='0' && 
            <Nav.Link><CartShow/>
            </Nav.Link>}
            <ShowOnLogout>
                  <Nav.Link as={Link} to='/login'><FaLock/> Login</Nav.Link>
                  <Nav.Link as={Link} to='/register'><FaPenAlt/> Register</Nav.Link>
            </ShowOnLogout>
            <ShowOnLogin>
            <Nav.Link as={Link} to='/myorders'>My Orders</Nav.Link>
                <Nav.Link as={Link} to='/'>Welcome {username}</Nav.Link>
                <Nav.Link><Logout/></Nav.Link>
            </ShowOnLogin>
         </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </>
   
);
}

export default Header
