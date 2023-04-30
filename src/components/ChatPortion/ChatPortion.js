import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineDollar,AiOutlineUserAdd,  AiOutlineHeart } from 'react-icons/ai';
import {BsFillBellFill } from 'react-icons/bs';


import './ChatPortion.css'
import { Carousel, CarouselItem, Dropdown, Media, Progress } from 'reactstrap';
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j23.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import streamEight from './j27.png'
import streamNine from './j28.png'

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
} from "reactstrap";
import { getUsersById } from 'Api/Api';
import { useSelector } from 'react-redux';

const ChatPortion = () => {
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const [notiOpen, setNotiOpen] = useState(false);
     const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
      // const [userData, setUserData] = useState()
      const getUser= useSelector(state => state.getUserById);
      
        const userData=getUser?.userData
    // const values={
    //     userId:userId.id
      // }
    //  useEffect(()=>{
      
    //     getUsersById(values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //       } 
     
    // });
    //  },[])

  
    let chats=[
    {
      pic:streamOne,
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:streamThree,
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:streamFour,
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:streamFive,
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:streamSix,
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:streamSeven,
      name:"Alyan",
      lastText:"hy!"
    },
]
  return (
    <>
    {
      notiOpen&&
     <div className='home-noti-div'>
     <h3 className='home-noti-head'>Subscription</h3>
      <Progress  className="horizontal-progress-bar-menu" now={0}  />
     <Progress  className="vertical-progress-bar-menu" now={0} />
     <span style={{position: 'absolute', top: '0.1em', }}>
    <span style={{display: 'inline-block', width: '1.0em',marginLeft:"2.0em", marginTop:"3.3em", height: '1.0em', borderRadius: '50%', backgroundColor: 'white'}}>
    </span>
  </span>
     <div className='home-main-noti-div'>
     {
       [1,2].map((data)=>(
      <>
     
     <Media left>
        <img object  src={streamEight} alt="jannan" className=" chat-noti-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-2">
        <h4 className='text-white chat-noti-profile-name  mb-0'style={{fontWeight:"600"}}>Shaby</h4>
      <Card className='chat-noti-card mr-2'>
     <div style={{display:"flex"}}>
     <img src={streamNine} className="chat-noti-img"/>
     <div>
     <p className='chat-noti-text'>Hello how are i am a photograher and also <br/> doing some yoga classes for make body <br/> more attractive.</p>
     <Input className="ml-2 mt-2"style={{borderRadius: "30px",border:"1px solid white",width:"80%"}}/>
     
     </div>
     </div>
     
     </Card>
        
      </Media>
    <hr className="ml-5 mr-3" style={{backgroundColor:"#666363",marginTop:"30%"}}/>
    </>
    ))
    
     }
     
    
    
     <h3 className='home-noti-head-two'>Promotion</h3>
     {
       [1,2].map((data)=>(
 <>
     
     <Media left className='mt-3'>
        <img object  src={streamEight} alt="jannan" className=" chat-noti-profile rounded-circle mt-4" />
      </Media>
      <Media body className="ml-3 mt-2">
        <h4 className='text-white chat-noti-profile-name  mb-0'style={{fontWeight:"600"}}>Shaby</h4>
      <Card className='chat-noti-card mr-2'>
     <div style={{display:"flex"}}>
     <img src={streamNine} className="chat-noti-img"/>
     <div>
     <p className='chat-noti-text'>Hello how are i am a photograher and also <br/> doing some yoga classes for make body <br/> more attractive.</p>
     <Input className="ml-2 mt-2"style={{borderRadius: "30px",border:"1px solid white",width:"80%"}}/>
     
     </div>
     </div>
     
     </Card>
        
      </Media>
    <hr className="ml-5 mr-3" style={{backgroundColor:"#666363",marginTop:"30%"}}/>
    </>
        
       ))}
     

     
      </div>
     </div>
       }
   <div className='home-chats '>
  
  
   <Media className='mt-4 ml-3 chat-media'>
      <Media left>
        <img object  src={userData?.profilePic?userData?.profilePic:streamFive} alt="jannan" className="upper-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-3">
        <h3 className='text-white mb-0'style={{fontWeight:"600"}}>{userData?.firstName}</h3>
        <p className="chat-designation">Student</p>
      </Media>
      <Media right>
      {
        // <Dropdown isOpen={dropdownOpen} toggle={toggle} className="">
        // <DropdownToggle onClick={(e)=>e.preventDefault()} className="home-noti-bell">
      }
        <div className="">
        <BsFillBellFill className='mt-3 ' style={{marginLeft:"-50px",color:"white",fontSize:"25px"}}/>
      <Badge  style={{color:"white",backgroundColor:"red",marginLeft:"-10px"}} pill className="position-absolute mt-3 top-0 end-0">1</Badge>
    
    </div>
    
    {
        // </DropdownToggle>
        // <DropdownMenu className='home-noti-menu'  >
        // hanna don
        // </DropdownMenu>
        // </Dropdown>
    }
        
      </Media>
    </Media>
    
   
    <h2 className='home-title ml-3 mt-3 mb-0'>Recent Chats</h2>
    <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
    <div className='chat-div'>
    {
    chats.map((data,index)=>(
        <Row>
        <Col>
      
  <img src={data.pic} class="rounded-circle chat-img mt-3 mb-4 " alt="Your Image"/>
  <span style={{position: 'absolute', top: '0.1em' , }}>
    <span style={{display: 'inline-block', width: '0.7em',marginLeft:"6em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
  </span>
  </Col>
   <Col className="chat-text-col mt-1 mb-4">
  <p class="mt-3 chat-text-inner">{data.name}</p>
  <p class="text-muted chat-msg-inner">{data.lastText}</p>
  </Col>

</Row>

    ))
   }
</div>
 
   </div>
   </>
  )
}

export default ChatPortion