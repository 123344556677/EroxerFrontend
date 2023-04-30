import React, { useEffect, useState } from 'react'
import { FaSearch, FaUserCheck } from 'react-icons/fa';
import { AiOutlineDollar,AiOutlineUserAdd,  AiOutlineHeart, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import {BsFillBellFill } from 'react-icons/bs';


import './ChatProfile.css'
import { Carousel, CarouselItem, Container, Media } from 'reactstrap';
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j23.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import streamEight from './j27.png'
import streamNine from './j28.png'
import streamTen from './j29.png'


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
import { MdExpandMore } from 'react-icons/md';
import { HiOutlineWifi } from 'react-icons/hi';
import { getUsersById } from 'Api/Api';
import { useSelector } from 'react-redux';

const ChatProfile = () => {
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
    //   const [userData, setUserData] = useState()
    // const values={
    //     userId:userId.id
    //   }
    //  useEffect(()=>{
      
    //     getUsersById(values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)

    //       } 
     
    // });
    //  },[])
      const getUser= useSelector(state => state.getUserById);
      
        const userData=getUser?.userData
  return (
    <div className='profile-chats '>
  
  
   <Media className='mt-4 ml-3 chat-media'>
      <Media left>
        <img object  src={userData?.profilePic?userData?.profilePic:streamFive}  alt="jannan" className="chat-upper-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-1">
        <h4 className='text-white mb-0'style={{fontWeight:"600"}}>{userData?.firstName} {userData?.lastName}</h4>
        <p className="chat-designation">Student</p>
      </Media>
      <Media right>
       
        <div>
        <BsFillBellFill className='mt-3' style={{marginLeft:"-50px",color:"white",fontSize:"20px"}}/>
      <Badge  style={{color:"white",backgroundColor:"red",marginLeft:"-10px",fontSize:"10px"}} pill className="position-absolute mt-2 top-0 end-0">1</Badge>
    </div>
      </Media>
    </Media>
 
    <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
    <div className='chat-div'>
 <Container className="d-flex justify-content-center">
 <img object  src={userData?.profilePic?userData?.profilePic:streamFour}  alt="jannan" className="profile-pic rounded-circle mt-3" />
 </Container>

 <h4 className='text-white text-center mb-0'style={{fontWeight:"600"}}>{userData?.username?userData?.username:userData?.firstName}</h4>
 <p className=' mb-0 text-center chat-designation'style={{fontWeight:"600"}}>@example.com</p>
 <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
 <div style={{display:"flex",justifyContent:"center"}}>
 
        <Button className='btn-sm mt-3 ml-2 chat-profile-button'>
        {
      <HiOutlineWifi className='mr-2 ' />
        }
      subscribe</Button>
      <Button className="chat-add-button btn-sm  mt-3  mt-0">
        <FaUserCheck className='mr-2'/>
        Add friend
        
      </Button>
      <MdExpandMore className='mt-3 ml-2' style={{fontSize:"30px",color:"white"}}/>
 </div>
 <div className='ml-3'>
 <h4 className='text-white mt-3 mb-0' style={{fontWeight:"600"}}>About</h4>
<p>{userData?.about?userData?.about:"I m A professional engeenier and also a Designer i want to met someone thats why i here"}</p>
<a href="www.erroxr.com/web/alexrock" style={{color:"blue"}}>{userData?.website?"www."+userData?.website:"www.erroxr.com/web/alexrock"}</a>
<div style={{display:"flex"}}>
<AiFillInstagram className='ml-1' style={{color:"white",fontSize:"20px"}}/>
<AiFillFacebook  className='ml-1' style={{color:"white",fontSize:"20px"}}/>
</div>
 </div>

 <hr style={{backgroundColor:"#555555",height:"2px"}} className="mr-3 ml-1"/>
 
 <div style={{display:"inline"}}>
 <img src={streamEight} style={{widht:"200px"}} className="ml-4"/>
<img src={streamNine}  className="ml-2" style={{marginTop:"-80px"}}/>

 </div>
 
   <img src={streamTen}  className="ml-4 mt-2"/>
 
</div>
 
   </div>
  )
}

export default ChatProfile