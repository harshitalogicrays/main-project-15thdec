import React from 'react'
import { BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import Logout from '../Logout'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../redux/authSlice'

const AdminNavbar = ({OpenSidebar}) => {
  const username=useSelector(selectUserName)
  return (
    <>
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsPersonCircle className='icon'/><label className='icon'>Welcome {username}</label>
          <Logout className='icon' style={{cursor:'pointer'}}/>
        </div>
    </header>
    </>
  )
}

export default AdminNavbar
