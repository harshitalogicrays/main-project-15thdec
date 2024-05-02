import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './Sidebar'
import './AdminLayout.css'
const AdminLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <>
     <div className='grid-container'>
        <AdminNavbar OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Outlet/>
     </div>
    </>
  )
}

export default AdminLayout
