import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './LiveSection.css'
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j22.png'
import streamFive from './j24.png'
import streamSix from './dummy.jpg'
// import streamSeven from './j26.png'
import { Col } from 'reactstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const LiveSection = () => {
    const [lives, setLives]=useState([])
    const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
    const getSubscribedUser = useSelector(state => state?.getAllAcceptedRequestReducer?.accpetedRequests);
    // const lives=[
    //     {
    //         pic:streamOne
    //     },
    //     {
    //         pic:streamThree
    //     },
    //     {
    //         pic:streamFour
    //     },
    //     {
    //         pic:streamFive
    //     },
    //     {
    //         pic:streamSix
    //     },
        
    //     {
    //         pic:streamFour
    //     },
    //     {
    //         pic:streamFive
    //     },
    //     {
    //         pic:streamSix
    //     },
       
    // ]
    const getAllUser= useSelector(state => state?.getAllUsers);
    const AllUser=getAllUser?.allUsers
    useEffect(()=>{
           
    setLives(AllUser?.filter(data=>data?.liveStreamStatus==="live"&&data?._id!==userId.id))
        },[AllUser])
    
console.log(lives,"-----------live section")
  return (
    <div className='live-chats '>
    <span className='ml-3' style={{color:"white",fontSize:"30px"}} ><Link to="/admin/home"
     style={{color:"white",fontSize:"50px"}}><IoMdArrowRoundBack/></Link></span>
       
    <div className='live-main-chats'>
  
{
    lives?
    lives?.map((data)=>(
        getSubscribedUser?.map((datas)=>(
              data?._id===datas?._id&&
<>
    <img src={data?.profilePic?data?.profilePic:streamSix} style={{width:"100px",height:"100px"}} className="mt-5 stream-pics"/> <br/>
    </>

    ))
    ))
    :
    <h3 className='mt-5 text-center'>No one streaming!</h3>

}

    
    </div>
    
     
   </div>
  )
}

export default LiveSection