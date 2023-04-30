import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'reactstrap'
import AdDesOne from './j31.png'
import AdDesTwo from './j27.png'
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineUserAdd } from 'react-icons/ai'
import ChatProfile from 'components/ChatProfile/ChatProfile'
import { useParams,useHistory } from 'react-router-dom'
import { getAdsById } from 'Api/Api'
import Moment from 'react-moment';

const AdDescription = () => {
const [adData,setAdData]=useState()
const { id } = useParams();
    useEffect(()=>{
      
     getAdsById(id)
    .then(res => {
         console.log(res.data,"==============>addata");
         
           setAdData(res?.data?.data)
          
     
    });
    },[])
    console.log(adData,)
  return (
    <div className='content'>
    <Row>
    <Col xl={8}>
    <Card style={{backgroundColor:"#1E1E1E",borderRadius: "18px",zoom:"0.75",boxShadow:" 0px 0px 16px 3px rgba(0, 0, 0, 0.25)"}}>
   <div
        style={{
          backgroundImage: `url(${adData?.adPic?adData?.adPic:AdDesOne})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '350px',
           width:"",
          position: 'relative',
          borderRadius: "12.5524px",
         
        }}
        className="ml-3 mr-3 mt-3"
      >
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            transform: 'translate(50%, 50%)',
          }}
        >
          <img
            src={adData?.userData?.profilePic?adData?.userData?.profilePic:AdDesTwo}
            alt="Profile"
            className="rounded-circle"
            style={{
              backgroundColor:"#1E1E1E",
              padding:"7px",
              
              height: '100px',
              width: '100px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <Row className='profile-user-row' style={{marginTop:"-15px"}}>
      <Col >
      
      <h4 className='mt-3 user-name mb-0 '>Alex dee <span className='ml-1'><FaUserAlt/></span>
       <span><AiOutlineUserAdd style={{fontSize:"25px",marginLeft:"75%"}} className='user-name '/></span></h4>  
      <p style={{color:" #8B8B8B",fontSize:"10px"}} >{adData?.userData?.profileName?adData?.userData?.profileName:adData?.userData?.firstName}</p>
      <Row>
      <Col>
     <h5 className='mt-3 user-name mb-0 '>Avaialable</h5>
     </Col>
     <Col className='text-right mt-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}} className="mr-3"><Moment format="MM/DD/YYYY">{adData?.date}</Moment> at {adData?.time}</p>
     </Col>
     </Row>
     <hr className='mb-0' style={{backgroundColor:"#969696",height:"1px"}}/>
     <Row>
      <Col>
     <h5 className='mt-3 user-name mb-0 '>Meeting</h5>
     </Col>
     <Col className='text-right mt-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}} className="mr-3">{adData?.meetingType}</p>
     </Col>
     </Row>
       <hr className='mb-0' style={{backgroundColor:"#969696",height:"1px"}}/>
     <Row>
      
     <Col className='mt-3 mb-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}}>{adData?.description?adData?.description:"The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet,   consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,  sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </p>
     </Col>
     </Row>
</Col>
{
// <Col className='text-right' xl={2}>

// </Col>
}

    </Row>
    </Card>
    </Col>
    <Col>
    <ChatProfile/>
    </Col>

    </Row>
    
    </div>
  )
}

export default AdDescription