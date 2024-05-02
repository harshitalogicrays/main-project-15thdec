import React, { useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import ImageMaginifier from './ImageMaginifier'
import './ImageMaginifier.css'
const ImageThumbnail = ({images}) => {
    let [image,setImage]=useState(images[0])
    let [index,setIndex]=useState(0)
    let handleClick=(i)=>{
        setIndex(i)
        setImage(images[i])
    }
    let handlePrev=(i)=>{
        if(i > 0){
            setIndex(i-1)
            setImage(images[index])
        }  
    }
    let handleNext=(i)=>{
        if(i < images.length-1){
            setIndex(i+1)
            setImage(images[index])
        }  
    }
  return (
    <>
        {/* <img src={image} width={500} height={300} className='mb-3'/><br/> */}
        <ImageMaginifier imgUrl={image}/> 
               {/* <button
            type="button"
            class="btn btn-secondary"  onClick={()=>handlePrev(index)}
        >
            <FaArrowAltCircleLeft/>
        </button>
        
        {images.map((img,i)=>
            <img src={img} height={100} width={100} 
            className={`me-3 ${index==i ? 'border border-dark border-5':''}`} onClick={()=>handleClick(i)}/>
        )}
        <button
            type="button"
            class="btn btn-secondary" onClick={()=>handleNext(index)}
        >
            <FaArrowAltCircleRight/>
        </button> */}
    </>
  )
}

export default ImageThumbnail
