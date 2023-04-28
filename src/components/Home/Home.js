import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineDollar,AiOutlineUserAdd,  AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts as posts } from 'components/redux/actions/postActions';
import { getAds as ads } from 'components/redux/actions/adsActions';
import './Home.css'
import { Carousel, CarouselItem } from 'reactstrap';
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j23.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import profilePic from './j27.png'
import postOne from './j2.png'

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
import Sidebar from 'components/Sidebar/Sidebar';
import Logo from './logo.png'
import ChatPortion from 'components/ChatPortion/ChatPortion';
import PaymentModal from 'components/Modals/PaymentModal';
import { getUsersById } from 'Api/Api';
import { getAllPosts } from 'Api/Api';
import { getUserById } from 'components/redux/actions/userActions';
const images = [
  'https://picsum.photos/id/1015/300/200',
  'https://picsum.photos/id/1025/300/200',
  'https://picsum.photos/id/1035/300/200'
];

let chats=[
    {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
]
let streamPics=[
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
        pic:streamSeven
    },
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
        pic:streamSeven
    },
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
        pic:streamSeven
    }
]

const Home = () => {
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
      // const [userData, setUserData] = useState()
      const [postData, setPostData] = useState()
      const dispatch=useDispatch()
        const getPosts = useSelector(state => state.getPosts);
        const getUser= useSelector(state => state.getUserById);
      
        const userData=getUser?.userData
       
        
    // const { posts, error } = getPosts
    console.log(getPosts,"post----------->data")
    const values={
        userId:userId.id
      }
    //  useEffect(()=>{
    //   useEffec(() => {
    //     dispatch(posts())
    //     dispatch(ads())
        
    // }, [dispatch])
    //    getUsersById(values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res.data.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //       } 
     
    // });
    // getAllPosts()
    // .then(res => {
    //      console.log(res.data);
         
    //        setPostData(res?.data)
          
     
    // });
     
    //  },[])
     useEffect(() => {
      dispatch(getUserById(values))
      dispatch(posts())
      dispatch(ads())
        
    }, [dispatch])
    // useEffect(() => {
    //   
        
    // }, [dispatch])

     console.log(postData,"=========>postData")
  return (

    
     <div className="content home-div">
     
      
     
     <Row>
     <Col xl={8}>
     <Row>
     <Col>
     <h2 className='home-title'>{userData?.firstName} {userData?.lastName}</h2>
     </Col>
     <Col  xl={8}>
     <div className="home-input-addon">
     <InputGroup style={{ borderRadius: '20px' }} >
      <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
        <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
          <FaSearch className="home-search" style={{ color: 'white' }} />
        </InputGroupText>
      </InputGroupAddon>
      <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white' }} placeholder="Search" />
    </InputGroup>
    </div>
     </Col>

     </Row>
    
    
<div style={{position: 'relative'}}>
  <span style={{color:"white",fontWeight:"600",fontSize:"15px"}}>Live </span>
  <span style={{position: 'absolute', top: '0.1em', }}>
    <span style={{display: 'inline-block', width: '0.5em', marginBottom:"0.3em", height: '0.5em', borderRadius: '50%', backgroundColor: 'red'}}></span>
  </span>
</div>

<div class="container mt-2 mb-3"  style={{zoom:"0.80"}}>
  <div class="row">
    <div class="col">
      <ul class="image-list">
      {
streamPics.map((data,index)=>(


        <li><img src={data.pic} salt="Image 1"/></li>
        ))
}
        
        
      </ul>
    </div>
  </div>
</div>

  <span style={{color:"white",fontWeight:"600",fontSize:"18px"}} >Lets Discover </span>
  {
    getPosts?.posts?.map((data)=>(
 <div class="card card-main" style={{zoom:"0.70"}}>
 
  <img src={data?.postProfilePic?data?.postProfilePic:profilePic}  class="card-img-top rounded-circle" alt="..."/>
 
  <div class="card-body">
   <img src={data?.postPic?data?.postPic:"https://picsum.photos/id/1015/1200/800"} style={{width:"900px",height:"350px",borderRadius:"40px"}}/>
  </div>
  <div class="card-footer bg-transparent d-flex justify-content-end mb-5" >
 
 
     <AiOutlineHeart className='' style={{color:"white",fontSize:"35px",marginTop:"-60px",marginRight:"-12px",background:"#1e1e26",borderRadius:"20px 0 0 0",paddingTop:"10px"}}/>
    <AiOutlineUserAdd className='ml-2' style={{color:"white",fontSize:"35px",marginTop:"-60px",background:"#1e1e26",marginRight:"-12px",borderRadius:"0 0 0 0",paddingTop:"10px"}}/>
   <PaymentModal/>
  </div>
</div>
))
  }


     </Col>
     
    
{
    <ChatPortion/>
//    <div className='home-chats '>
//    <Row>
//    <Col className='text-center '>
//     <img src="https://picsum.photos/id/237/300/200" class="chat-img-top rounded-circle img-fluid" alt="Your Image"/>
//     <p className='chat-text mt-2'>Alex Rock</p>
//     <p className='chat-designation'>Student</p>
//     </Col>
   
//    </Row>
//     <h2 className='home-title ml-3 mt-3 mb-0'>Recent Chats</h2>
//     <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
//     {
//     chats.map((data,index)=>(
//         <Row>
//         <Col>
      
//   <img src={data.pic} class="rounded-circle chat-img mt-3 mb-4 " alt="Your Image"/>
//   <span style={{position: 'absolute', top: '0.1em' , }}>
//     <span style={{display: 'inline-block', width: '0.7em',marginLeft:"6em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
//   </span>
//   </Col>
//    <Col className="chat-text-col mt-3 mb-4">
//   <p class="mt-3 chat-text-inner">{data.name}</p>
//   <p class="text-muted chat-msg-inner">{data.lastText}</p>
//   </Col>

// </Row>

//     ))
//    }

//    </div>
}
     
     
     
     
     
     </Row>
   
  
       
      </div>
      
    
  )
}

export default Home