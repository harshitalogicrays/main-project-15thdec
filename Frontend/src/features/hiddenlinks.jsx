import { FaArrowAltCircleLeft, FaHome, FaList, FaLock, FaPenAlt, FaShoppingCart } from "react-icons/fa"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image, NavDropdown } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/authSlice";
import { selectCartItems } from "../redux/cartSlice";

export const ShowOnLogin=({children})=>{
    const isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn)return children
    else return null
}

export const ShowOnLogout=({children})=>{
  const isLoggedIn=useSelector(selectIsLoggedIn)
  if(!isLoggedIn)return children
  else return null
}

export const CartShow=()=>{
  const cartItems=useSelector(selectCartItems)
  return (<>
  <Link to='/cart' >
          <FaShoppingCart size={30} style={{color:'white'}}/>
                <span class="badge rounded-pill text-bg-danger">{cartItems.length}</span >
  </Link>
    
                
  </>)
}


