import React from 'react'
import  ReactDOM  from 'react-dom'
import {RingLoader} from "react-spinners"
import "../stylesheet/loader.css"


const Loader = () => {
  return ReactDOM.createPortal (
    <div className='wrapper'>
        <RingLoader 
        className='loader'
        color="yellow"
        
        
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"/>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader