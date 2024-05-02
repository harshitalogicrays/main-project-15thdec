import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Col, Container, Image, Row ,Form, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../features/Loader'
import { FaGoogle } from 'react-icons/fa'
import { GoogleAuthProvider } from 'firebase/auth'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/cartSlice'

const Login = () => {
    let [user,setUser]=useState({email:'',password:''})
    let [isLoading,setIsLoading]=useState(false)
    let redirect=useNavigate()

    let URL1=useSelector(selectURL)
    let redirectURL=()=>{
      if(URL1.includes('cart')){redirect('/cart')}
      else {redirect('/')}
    }

    let handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then(async(userCredential) => {
            const user1 = userCredential.user;
            try{
                const docRef=doc(db,"users",user1.uid)
                const docSnap=await getDoc(docRef)
                if(docSnap.exists()){
                  // console.log(docSnap.data())
                  let role=docSnap.data().role
                    if(role=="0"){
                        redirect('/admin')
                    }   
                    else if(role=="1"){
                        // redirect('/')
                        redirectURL()
                    }     
                    toast.success("loggedIn Successfully")
                    setIsLoading(false)   
              }
            }
              catch(error){console.log(error.message)}
   
           
        })
        .catch((error) => { setIsLoading(false)
            toast.error(error.message)
        });
    }
    const provider = new GoogleAuthProvider();
    let loginwithgoogle=()=>{
        signInWithPopup(auth, provider)
        .then(async(result) => {
          const user1 = result.user;
          try{
            const docRef=doc(db,"users",user1.uid)
            await setDoc(docRef,{username:user1.displayName,email:user1.email,role:'1',createdAt:Timestamp.now().toMillis()})
            // redirect('/')
            redirectURL()
            toast.success("loggedIn Successfully")
          }
          catch(error){
            toast.error(error.message)
          }

        }).catch((error) => {
            toast.error(error.message)
        });
      
    }
  return (
    <Container className='mt-5 shadow p-3'>
        {isLoading && <Loader/>}
        <h1>Login Page</h1><hr/>
        <Row>
            <Col>
            <Image src='/src/assets/login.png' fluid />
            </Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder='enter email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder='enter password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                    </Form.Group>
                    <div class="d-grid gap-2">
                    <Button variant='primary' type="submit">Login</Button>
                    </div>
                    <hr/>
                    <div class="d-grid gap-2">
                    <Button variant='danger' type="button" onClick={loginwithgoogle}><FaGoogle/> Login with Google</Button>
                    </div>
                   
                </Form>
                <p>create an account?? <Link to='/register'>Signup</Link></p>
            </Col>
        </Row>
    </Container>
  )
}

export default Login
