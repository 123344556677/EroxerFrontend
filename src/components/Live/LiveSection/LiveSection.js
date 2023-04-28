import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './LiveSection.css'
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j22.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
// import streamSeven from './j26.png'
import { Col } from 'reactstrap'

const LiveSection = () => {
    const lives=[
        {
            pic:streamOne
        },
        {
            pic:streamThree
        },
        {
            pic:streamFour
        },
        {
            pic:streamFive
        },
        {
            pic:streamSix
        },
        
        {
            pic:streamFour
        },
        {
            pic:streamFive
        },
        {
            pic:streamSix
        },
       
    ]
    
  return (
    <div className='live-chats '>
    <span className='ml-3' style={{color:"white",fontSize:"30px"}} ><Link to="/admin/home"
     style={{color:"white",fontSize:"50px"}}><IoMdArrowRoundBack/></Link></span>
       
    <div className='live-main-chats'>
  
{
    lives.map((data)=>(
<>
    <img src={data.pic} style={{width:"100px",height:"100px"}} className="mt-5 stream-pics"/> <br/>
    </>

    ))

}

    
    </div>
    
     
   </div>
  )
}

export default LiveSection