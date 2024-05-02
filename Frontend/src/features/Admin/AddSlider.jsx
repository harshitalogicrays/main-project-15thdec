import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase/config'
import { useSelector } from 'react-redux'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { selectSliders } from '../../redux/sliderSlice'


const AddSlider = () => {
    let [slider,setSlider]=useState({title:'',desc:'',status:'',image:''})
    let [isActive,setIsActive]=useState(false)
    let [uploadProgress,setUploadProgress]=useState(0)
    const navigate=useNavigate()

    // //edit 
    const {id}=useParams()
    const sliders=useSelector(selectSliders) 
    const sliderEdit=sliders.find((item)=>item.id==id)
    React.useEffect(()=>{
        if(id){
            setSlider({...sliderEdit})
            setIsActive(sliderEdit.status=="Active"?true:false)
            }
        else {setSlider({title:'',desc:'',status:'',image:''})}
    },[id])


let handleImage=(e)=>{
    let file=e.target.files[0]
 const storageRef = ref(storage, `ecommerce-15th/Slider/${Date.now()}`); 
 const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress)
  }, 
  (error) => { console.log(error.message)}, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     setSlider({...slider,image:downloadURL})
     console.log(downloadURL);
     
    });
  }
);
}

    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){
            try{
                const docRef=collection(db,"sliders")
                await addDoc(docRef,{...slider,
                    status:isActive ? "Active":"Inactive", createdAt:Timestamp.now().toMillis() })
                toast.success("slider added")
                navigate('/admin/viewslider')
            }
            catch(error){
                toast.error(error.message)
            }
        }
        else{
            if(sliderEdit.image != slider.image){
                deleteObject(ref(storage,sliderEdit.image))
            }
            try{
                const docRef=doc(db,"sliders",id)
                await setDoc(docRef,{...slider,
                    status:isActive ? "Active":"Inactive", 
                    createdAt:sliderEdit.createdAt,
                    editedAt:Timestamp.now().toMillis() })
                toast.success("slider updated")
                navigate('/admin/viewslider')
            }
            catch(error){
                toast.error(error.message)
            }
        }
       
    }
  return (
   <>
    <Card>
        <Card.Header>
            <h1>{id?"Edit ":"Add " }Slider <Button variant='danger' size="lg" className='float-end' as={Link} to='/admin/viewslider'>View Slider</Button></h1>
        </Card.Header>
        <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={slider.title} onChange={(e)=>setSlider({...slider,title:e.target.value})}></Form.Control>
                    </Form.Group>
                    {uploadProgress > 0 &&
                        <div class="progress">
                        <div class="progress-bar" style={{width: `${uploadProgress}%`}}>
                            {uploadProgress < 100 ? `uploading ${uploadProgress}%` : `uploaded ${uploadProgress}%`}
                        </div>
                      </div>
                    }
                    <Form.Group className='mb-3'>
                        <Form.Label>Choose Image</Form.Label>
                        <Form.Control type="file" onChange={handleImage}></Form.Control>
                    </Form.Group>
                    {id && <img src={slider.image} height={50} width={50}/>}
                    <Form.Group className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' value={slider.desc} onChange={(e)=>setSlider({...slider,desc:e.target.value})}></Form.Control>
                    </Form.Group>
                    <label className='me-3 mb-3'>Status</label>
                        <Form.Check inline type="radio" checked={isActive} 
                        onClick={(e)=>setIsActive(!isActive)}/>
                        <label>{isActive ? "(Active)" :"(Inactive)"}</label>
                    <br/>
                    <Button type="submit">{id? "Update" : "Submit"}</Button>
                </Form>
        </Card.Body>
    </Card>
   </>
  )
}

export default AddSlider
