import React, { useEffect, useState } from 'react'
import { FaSearch, FaUserCheck } from 'react-icons/fa';
import { AiOutlineDollar,AiOutlineUserAdd,  AiOutlineHeart, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import {BsFillBellFill } from 'react-icons/bs';


import './ChatProfile.css'
import { Carousel, CarouselItem, Container, Media, Progress } from 'reactstrap';
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './dummy.jpg'
import streamFive from './dummy.jpg'
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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getReduxPostsById } from 'components/redux/actions/postActions';
import { getReduxUserById } from 'components/redux/actions/userActions';
import { getUserById } from 'components/redux/actions/userActions';
import { getAllUsers } from 'components/redux/actions/userActions';
import { changeStatus } from 'Api/Api';
import { toast } from 'react-toastify';
import { updateAllCallStatus } from 'Api/Api';
import { getCallById } from 'components/redux/actions/callActions';

const ChatProfile = (props) => {
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const [notiLen, setNotiLen] = useState(0);
    const [notiOpen, setNotiOpen] = useState(false);
     const getRequests = useSelector(state => state?.getAllRequestReducer?.userRequests);
     const getCalls = useSelector(state => state?.getAllCallReducer?.call);
  const history=useHistory()
    //   const [userData, setUserData] = useState()
    const values={
        userId:userId.id
      }
    //  useEffect(()=>{
      
    //     getUsersById(values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)

    //       } 
     
    // });
    
    //  },[])
    const getUser= useSelector(state => state?.getUserById);
        const userOriginal=getUser?.userData
  
      let posts=[];
      let sendingId=props?.profileData?._id;
       const user = useSelector((state) =>
    getReduxUserById(state?.getAllUsers, sendingId)
  );
      const userData=user
    const AllUserPosts = useSelector((state) =>
    getReduxPostsById(state?.getPosts, sendingId)
  );
  AllUserPosts?.map((data)=>{
   
    if(data?.key==="post"&&data?.postCheck!==true){
            posts.push(data)
    }
   
     
   })
   const dispatch=useDispatch()
   useEffect(() => {
      dispatch(getUserById(values))
      dispatch(getAllUsers())
      
        
    }, [dispatch])
    const changeRequestStatus=(id,status)=>{
  console.log(id,status)
  const reqValues={
    recieverId:userId.id,
    senderId:id,
    status:status
  }
  changeStatus(reqValues)
  window.location.reload(false)
  toast.success("Request Accepted", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });

}
const handleNotiValues=()=>{
  setNotiOpen(!notiOpen);
  setNotiLen(0)
  const callValues={
    userId:userId.id
  }
updateAllCallStatus(callValues)
.then((res)=>{
 dispatch(getCallById(values))
})
 
}
useEffect(()=>{
 setNotiLen((getRequests?.length || 0) + (getCalls?.length || 0))
 },[])

      console.log(props,"---------->prfileData")
  return (
    <>
    {
      notiOpen&&
     <div className='home-noti-div'  data-aos="fade-down">
     <h3 className='home-noti-head'>Notifications</h3>
     
      <Progress  className="horizontal-progress-bar-menu" now={0}  />
     <Progress  className="vertical-progress-bar-menu" now={0} />
     <span style={{position: 'absolute', top: '0.3em', }}>
    <span style={{display: 'inline-block', width: '1.0em',marginLeft:"2.5em", marginTop:"3.3em", height: '1.0em', borderRadius: '50%', backgroundColor: 'white'}}>
    </span>
  </span>
  
    
     <div className='home-main-noti-div'>
     {
       getRequests?.map((data)=>(
      <>
     <Media left>
        <img object  src={data?.profilePic?data?.profilePic:streamEight} alt="jannan" className=" chat-noti-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-2 mb-5" data-aos="fade-right">
        <h4 className='text-white chat-noti-profile-name  mb-0'style={{fontWeight:"600"}}>{data?.username?data?.username:data?.firstName}</h4>
      <Card className='chat-noti-card mr-2 '>
     <div style={{display:"flex"}}>
     
     <div>
     <p className='chat-noti-text'>{data?.username?data?.username:data?.firstName} sent you friend Request</p>
     <Row>
     <Col xl={6}>
     <Button className='reset-button' onClick={()=>changeRequestStatus(data?._id,"accepted")}>Accept</Button>
     </Col>
      <Col xl={6}>
     <Button className='cancel-button'onClick={()=>changeRequestStatus(data?._id,"rejected")}>Reject</Button>
     </Col>

     </Row>
     
     </div>
     </div>
     
     </Card>
        
      </Media>
    <hr className="ml-5 mr-3" style={{backgroundColor:"#666363",marginTop:"30%"}}/>
    </>
    ))
    
     }
     {
       getCalls?.map((data)=>(
      <>
     <Media left>
        <img object  src={data?.profilePic?data?.profilePic:streamEight} alt="jannan" className=" chat-noti-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-2 mb-5" data-aos="fade-right">
        <h4 className='text-white chat-noti-profile-name  mb-0'style={{fontWeight:"600"}}>{data?.username?data?.username:data?.firstName}</h4>
      <Card className='chat-noti-card mr-2 '>
     <div style={{display:"flex"}}>
     
     <div>
     <p className='chat-noti-text'>Missed a call from {data?.username?data?.username:data?.firstName} </p>
     <Row>
     <Col xl={12}>
     <Button onClick={()=>history.push(`/admin/profile/${data?._id}`)} className='reset-button'>View Profile</Button>
     </Col>
     

     </Row>
     
     </div>
     </div>
     
     </Card>
        
      </Media>
    <hr className="ml-5 mr-3" style={{backgroundColor:"#666363",marginTop:"30%"}}/>
    </>
    ))
    
     }
    
     
    
    
     
     

     
      </div>
     </div>
       }
    <div className='profile-chats '>
  
  
   <Media className='mt-4 ml-3 chat-media'>
      <Media left>
        <img object  src={userOriginal?.profilePic?userOriginal?.profilePic:streamFive}  alt="jannan" className="chat-upper-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-1">
      
        <h4 className='text-white mb-0'style={{fontWeight:"600"}}>{userOriginal?.firstName} {userOriginal?.lastName}</h4>
        <p className="chat-designation">{userOriginal?.onlineStatus?"online":"offline"}</p>
      </Media>
      <Media right style={{cursor:"pointer"}}  onClick={handleNotiValues}>
       
        <div  onClick={handleNotiValues}>
        {
      //   <BsFillBellFill className='mt-3' style={{marginLeft:"-50px",color:"white",fontSize:"20px"}} onClick={handleNotiValues}/>
      //    {
      //     notiLen&&
      // <Badge  style={{color:"white",backgroundColor:"red",marginLeft:"-10px",fontSize:"10px"}} pill className="position-absolute mt-2 top-0 end-0">{notiLen}</Badge>
      //    }
        }
    </div>
      </Media>
    </Media>
 
    <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
    {
    props?.profileData?
    <>
 <Container className="d-flex justify-content-center">
 <img object  src={props?.profileData?.profilePic?props?.profileData?.profilePic:streamFour}  alt="jannan" className="profile-pic rounded-circle mt-3" onClick={()=>{history.push(`/admin/profile/${props?.profileData?._id}`)}} />
 </Container>

 <h4 className='text-white text-center mb-0'style={{fontWeight:"600"}} onClick={()=>{history.push(`/admin/profile/${props?.profileData?._id}`)}}>{userData?.username?userData?.username:userData?.firstName}</h4>
 <p className=' mb-0 text-center chat-designation'style={{fontWeight:"600"}}>{props?.profileData?.onlineStatus?"online":"offline"}</p>
 <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
 
 <div style={{display:"flex",justifyContent:"center"}}>
 {
      //   <Button className='btn-sm mt-3 ml-2 chat-profile-button'>
      //   {
      // <HiOutlineWifi className='mr-2 ' />
      //   }
      // subscribe</Button>
      // <Button className="chat-add-button btn-sm  mt-3  mt-0">
      //   <FaUserCheck className='mr-2'/>
      //   Add friend
        
      // </Button>
      // <MdExpandMore className='mt-3 ml-2' style={{fontSize:"30px",color:"white"}}/>
      }
 </div>
 <div className='ml-3'>
 <h4 className='text-white mt-3 mb-0' style={{fontWeight:"600"}}>About</h4>
<p>{props?.profileData?.about?props?.profileData?.about:"No description!"}</p>
<a href="www.erroxr.com/web/alexrock" style={{color:"blue"}}>{props?.profileData?.website?"www."+props?.profileData?.website:""}</a>

<div style={{display:"flex"}}>
<AiFillInstagram className='ml-1' style={{color:"white",fontSize:"20px"}}/>
<AiFillFacebook  className='ml-1' style={{color:"white",fontSize:"20px"}}/>
</div>
 </div>

 <hr style={{backgroundColor:"#555555",height:"2px"}} className="mr-3 ml-1"/>

 <Row>
 {
   posts?.map((data)=>(
 <Col xl={5}>
 <img src={data?.postPic} alt=""  className="ml-lg-3 mt-2"/>
 </Col>
 ))
 }


 </Row>
 </>
 :
 <h3 className="text-center mt-3">No friends?</h3>
}
 
  
 

 
   </div>
   </>
  )
}

export default ChatProfile