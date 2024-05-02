import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail, selectUserId, selectUserName } from "../redux/authSlice";
import { EMPTY_CART, selectCartItems, selectTotalAmount } from "../redux/cartSlice";
import { selectShippingAddress } from "../redux/checkoutSlice";
import emailjs from '@emailjs/browser';

export default function CheckoutForm() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) { return; }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret" );
    if (!clientSecret) { return;}
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {  return;}
    setIsLoading(true);

     await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },redirect:"if_required"
    }).then((result)=>{
      if(result.error){toast.error(result.error.message)
      return}
    if(result.paymentIntent){
      if(result.paymentIntent.status=='succeeded'){
        toast.success("payment done")
        setIsLoading(false)
        saveorder()//save order 

      }
    }
    })

    setIsLoading(false);
  };

  const paymentElementOptions = { layout: "tabs"}

  let userId=useSelector(selectUserId)
  let userEmail=useSelector(selectUserEmail)
  let cartItems=useSelector(selectCartItems)
  let totalAmount=useSelector(selectTotalAmount)
  let shippingAddress=useSelector(selectShippingAddress)
  let userName=useSelector(selectUserName)

  let saveorder=async()=>{
    let today=new Date()
    try{
      let orderConfig ={userId,userEmail,cartItems,totalAmount,shippingAddress,orderDate:today.toLocaleDateString(), OrderTime:today.toLocaleTimeString(),
        orderStatus:"Placed",createdAt:Timestamp.now().toMillis()}

      const docRef=collection(db,"orders")
      await addDoc(docRef,orderConfig)

        //mail 
        emailjs.send('service_esvohar', 'template_bh29ved', {email:userEmail,name:userName,status:orderConfig.orderStatus,amount:totalAmount}, {
          publicKey: 'ouyyULNr1Fl9QYxiJ',
        })
        .then( () => {
            dispatch(EMPTY_CART())
            toast.success("order placed")
            navigate('/')  },
          (error) => { toast.error(error.message)  }, );
    }
    catch(error){
      toast.error(error.message)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
        <div class="d-grid gap-2">
           
      <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary mt-3">
        <span id="button-text">
          {isLoading ? <div class="d-flex justify-content-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div> : "Pay now"}
        </span>
      </button>
        </div>
        

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}