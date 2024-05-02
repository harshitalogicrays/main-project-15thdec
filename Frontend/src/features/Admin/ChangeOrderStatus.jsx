import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser'
import { useSelector } from 'react-redux'
import { selectUserName } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'

const ChangeOrderStatus = ({id,status,order}) => {
    let [ostatus,setOStatus]=useState(status)
    let userName=useSelector(selectUserName)
    const navigate=useNavigate()
    let handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const docRef=doc(db,"orders",id)
            await setDoc(docRef,{...order, orderStatus:ostatus,createdAt:order.createdAt, editedAt:Timestamp.now().toMillis()})
            emailjs.send('service_esvohar', 'template_bh29ved', {email:order.userEmail,name:userName,status:ostatus,amount:order.totalAmount}, {
                publicKey: 'ouyyULNr1Fl9QYxiJ',
              })
              .then( () => {
                  toast.success("order status changed")
                  navigate('/admin/orders')  },
                (error) => { toast.error(error.message)  }, );
        }
        catch(error){
            toast.error(error.message)
        }
    }
  return (
   <>
    <h3>Update Order Status</h3><hr/>
    <form onSubmit={handleSubmit}>
    <div class="mb-3 col-6">
        <label for="" class="form-label">Status</label>
        <select class="form-select" value={ostatus} onChange={(e)=>setOStatus(e.target.value)} >
            <option>Placed</option>
            <option>Shipped</option>
            <option>Cancelled</option>
            <option>Delivered</option>
            <option>Processing</option>
        </select>
        <button  type="submit"class="btn btn-primary mt-3"  > Update   </button>
        
        </div>
        </form>
  
    
   </>
  )
}

export default ChangeOrderStatus
