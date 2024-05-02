import React from 'react'
import LoaderImg from '/src/assets/loader.gif'
import './loader.css'
import ReactDom from 'react-dom'
const Loader = () => {
  return ReactDom.createPortal(
    <div className='wrapper'>
        <div className='loader'>
            <img src={LoaderImg} />
        </div>
    </div> , document.getElementById('loader')
  )
}

export default Loader
