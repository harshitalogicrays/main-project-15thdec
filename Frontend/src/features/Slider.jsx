import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import useFetchCollection from '../custom hook/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_SLIDERS, selectSliders } from '../redux/sliderSlice';
import './Slider.css'
const Slider = () => {
    const {data}=useFetchCollection("sliders")
    // console.log(data)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(STORE_SLIDERS(data))
    },[data])
    const allsliders=useSelector(selectSliders)
    const sliders=allsliders.filter(item=>item.status=="Active")
    // console.log(sliders)
  return (
    <Carousel fade indicators={false} controls={true}>
        {sliders.map((s,index)=>
            <Carousel.Item key={s.id} interval={2000}>
            <Image src={s.image} className="w-100" height='500px'/>
            <Carousel.Caption>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
            </Carousel.Caption>
            </Carousel.Item>
    )}
  </Carousel>
  )
}

export default Slider
