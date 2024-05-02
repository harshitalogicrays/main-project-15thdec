import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row, Toast } from 'react-bootstrap'
import { FaPenSquare } from 'react-icons/fa'
import RegisterImg from '/src/assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../features/Loader'
import { Timestamp, doc, setDoc } from 'firebase/firestore'



const Register = () => {
  const redirect=useNavigate()
  let initialState={username:'',email:'',password:'',cpassword:'',role:"1"}
  let [user,setUser]=useState({...initialState}) //state object
  let [isLoading,setIsLoading]=useState(false)
  let handleSubmit=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async(userCredential) => {
        const user1 = userCredential.user;
        // console.log(user1)
        try{
          const docRef=doc(db,"users",user1.uid)
          await setDoc(docRef,{...user,createdAt:Timestamp.now().toMillis()})
          toast.success("registered successfully")
          redirect('/')
          setIsLoading(false)
        }
        catch(error){
          setIsLoading(false)
          toast.error(error.message)
        }
      })
      .catch((error) => {setIsLoading(false)
        toast.error(error.message)
      });
    }
  return (
    <>
      <Container className='mt-5 shadow p-2'>
        {isLoading && <Loader/>}
        <h1><FaPenSquare/> Register Here</h1>
        <hr/>
            <Row>
              <Col xs={6}><Image src={RegisterImg} fluid/> </Col>
              <Col xs={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}></Form.Control>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="cpassword" type="password" value={user.cpassword} onChange={(e)=>setUser({...user,cpassword:e.target.value})}></Form.Control>
                    </Form.Group>
                    <Button variant='primary' type="submit">Submit</Button>
                </Form>
                <p>Already an Account ?? <Link to='/login'>Login</Link></p>
              </Col>
            </Row>
      </Container>
 

        

</>
  )
}

export default Register
