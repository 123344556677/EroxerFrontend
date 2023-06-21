import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineDollar,AiOutlineUserAdd,  AiOutlineHeart } from 'react-icons/ai';
import {BsDot, BsFillBellFill } from 'react-icons/bs';
import AOS from "aos";
import "aos/dist/aos.css";
import './ChatPortion.css'
import { Carousel, CarouselItem, Dropdown, Media, Progress } from 'reactstrap';
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './dummy.jpg'
import streamFive from './dummy.jpg'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import streamEight from './dummy.jpg'
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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getLastMessage } from 'Api/Api';
import { getRequestByRecieverId } from 'Api/Api';
import { updateAllCallStatus } from 'Api/Api';
import { getCallById } from 'components/redux/actions/callActions';
import { changeStatus } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import { updateNotiStatus } from 'Api/Api';
import { getContactById } from 'components/redux/actions/contactActions';
import { getRequestBySenderId } from 'components/redux/actions/requestActions';

const ChatPortion = () => {
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const [notiLen, setNotiLen] = useState(0);
     const [notiOpen, setNotiOpen] = useState(false);
     const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
     const [isOpen, setIsOpen] = useState(false);
     const [ subscribedByReciever,  setSubscribedByReciever] = useState([]);
     const getRequests = useSelector(state => state?.getAllRequestReducer?.userRequests);
     const getCalls = useSelector(state => state?.getAllCallReducer?.call);
     
     const getAllAcceptedRequests = useSelector(
    (state) => state?.getContactById?.contactById
  );
   const subscribedUsers= useSelector(state => state?.getAllSenderRequestReducer);
  const subscribedData=subscribedUsers?.senderAllRequests
 
  
    
    
  
 let readChats =getAllAcceptedRequests;
 const [lastMessages, setLastMessages] = useState();
 console.log(getRequests,"recievr requests")
 useEffect(()=>{
 setNotiLen((subscribedByReciever?.length || 0) + (getCalls?.length || 0))
 },[subscribedByReciever,getCalls])
  useEffect(()=>{
 setSubscribedByReciever(subscribedData?.filter(data=>data?.paymentData?.notiStatus===true))
 },[subscribedData])

 useEffect(()=>{
dispatch(getContactById(values))
dispatch(getRequestBySenderId(values))
dispatch(getCallById(values))
 },[])


 

 


  // let pinChats=[
  //     {
  //         pic:streamFive
  //     },
  //      {
  //         pic:streamSix
  //     },
  //      {
  //         pic:streamSeven
  //     },

  // ]
  // let recentChats=[
  //     {
  //         pic:streamOne
  //     },
  //      {
  //         pic:streamThree
  //     },
  //      {
  //         pic:streamFour
  //     },

  // ]
  // let unreadChats=[
  //     {
  //         pic:streamSeven
  //     },
  //      {
  //         pic:streamThree
  //     },
  //      {
  //         pic:streamFour
  //     },

  // ]
  let arrayforLastMessage=[]
    readChats?.map((datass)=>{
    
        arrayforLastMessage.push(
          {
            senderId:userId.id,
            recieverId:datass?._id

          }
        )

     

  })
  AOS.init()

  useEffect(()=>{
   

   
    getLastMessage(arrayforLastMessage)
    .then((res)=>{
      setLastMessages(res?.data)
      console.log(res,"last message")
    })
    
  },[])
     console.log(getRequests,"Reequests========>in noti")
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleMessage=(msg)=>{
   
    const words = msg.trim().split(/\s+/);
     console.log(words,"last message concardination in if")

  if (words.length > 2) {
     console.log(msg,"last message concardination in if")
    const shortenedText = words.slice(0, 1).join(' ');
    return (
      <span>
        {shortenedText} ...
      </span>
    );
  }

  return <span>{msg}</span>;
    
  }

  useEffect(() => {
    if (width < 1200) {
      setIsOpen(false);
    }
  }, [width]);
  const values={
        userId:userId.id
      }

  // useEffect(()=>{
  // getRequestByRecieverId(values)
  // .then((res)=>{
  //   console.log(res,"request by reciever")
  // })
  // },[])

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen,"toogle=====>")
  };
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
const history=useHistory()
const dispatch=useDispatch()
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
updateNotiStatus(callValues)

 
}
  return (
    <>
    {
    //  {width < 1100 && (
    //     <div className="toggles-icon"  style={{cursor:"pointer"}} >
    //       <i className={`fa fa-${isOpen ? "times" : "bars"}`} onClick={toggleOpen} style={{cursor:"pointer"}}/>
    //       </div>
      // )}

      // <div className={`contents ${isOpen && "open"}`}>
    }
       
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
       subscribedByReciever?.map((data)=>(
        
      <>
     <Media left>
        <img object  src={data?.userData?.profilePic?data?.userData?.profilePic:streamEight} alt="jannan" className=" chat-noti-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-2 mb-5" data-aos="fade-right">
        <h4 className='text-white chat-noti-profile-name  mb-0'style={{fontWeight:"600"}}>{data?.userData?.username?data?.userData?.username:data?.userData?.firstName}</h4>
      <Card className='chat-noti-card mr-2 '>
     <div style={{display:"flex"}}>
     
     <div>
     <p className='chat-noti-text'>{data?.userData?.username?data?.userData?.username:data?.userData?.firstName} Bought your subscription</p>
     {
    //  <Row>
    //  <Col xl={6}>
    //  <Button className='reset-button' onClick={()=>changeRequestStatus(data?._id,"accepted")}>Accept</Button>
    //  </Col>
    //   <Col xl={6}>
    //  <Button className='cancel-button'onClick={()=>changeRequestStatus(data?._id,"rejected")}>Reject</Button>
    //  </Col>

    //  </Row>
     }
     
     </div>
     </div>
     
     </Card>
        
      </Media>
    <hr className="ml-5 mr-3" style={{backgroundColor:"#666363"}}/>
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
   <div className='home-chats '>
  
  
   <Media className='mt-4 ml-3 chat-media'>
      <Media left>
        <img object  src={userData?.profilePic?userData?.profilePic:streamFive} alt="jannan" className="upper-profile rounded-circle" />
      </Media>
      <Media body className="ml-3 mt-3">
        <h3 className='text-white mb-0'style={{fontWeight:"600"}}>{userData?.firstName} {userData?.lastName}</h3>
       <p className="chat-designation">{userData?.onlineStatus?"online":"offline"}</p>
      </Media>
      <Media right onClick={handleNotiValues} style={{cursor:"pointer"}}>
      
        <div className="" onClick={handleNotiValues}>
        <BsFillBellFill className='mt-3 ' style={{marginLeft:"-50px",curosr:"pointer",color:"white",fontSize:"25px"}} />
        
      <Badge  style={{color:"white",backgroundColor:"red",marginLeft:"-10px"}} pill className="position-absolute mt-3 top-0 end-0">{notiLen}</Badge>
        
    
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
    readChats?.map((datass,index)=>(
      <div key={index}>
       
            
         <Row style={{cursor:"pointer"}} onClick={()=>history.push('/admin/chat')}>
        <Col>
        
      
  <img src={datass?.profilePic?datass?.profilePic:streamFour} class="rounded-circle chat-img mt-3 mb-4 " alt="" onClick={()=>history.push('/admin/chat')}/>
  {
                        datass?.onlineStatus===true&&
  <span style={{position: 'absolute', top: '0.1em' , }}>
    <span style={{display: 'inline-block', width: '0.7em',marginLeft:"6em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
  </span>
  }
  </Col>
   <Col className="chat-text-col mt-1 mb-4">
  <p class="mt-3 chat-text-inner" >{datass?.firstName}</p>
  {
                        lastMessages?.map((msg)=>(
                          <>
                       {
                       msg?.senderId===datass?._id&&
                         <p className="chat-designation"  style={{fontSize:"16px",fontWeight: msg?.readStatus===false?"700":""}}>{handleMessage(msg.message)}
                         {
                         msg?.recieverId===userId?.id&&
                         msg?.readStatus===false&&
                         <span className="ml-3"><BsDot style={{fontSize:"30px",color:"red",fontWeight:"700",height:"30px",width:"30px"}}/></span>
                          
                         }
                         </p>
                        }
                         
                         {
                         msg?.recieverId===datass?._id&&
                         <p className="chat-designation"  style={{fontSize:"16px",fontWeight: msg?.readStatus===false?"700":""}}>{handleMessage(msg.message)}
                         {
                         msg?.recieverId===userId?.id&&
                         msg?.readStatus===false&&
                         <span className="ml-3"><BsDot style={{fontSize:"30px",color:"red",fontWeight:"700",height:"30px",width:"30px"}}/></span>
                          
                         }
                         </p>
                        }
                         </>
                        
                        
                        
                         

                        ))
                        
                      
                      }
  </Col>

</Row>
 
        
  </div>
  

    ))
   }
</div>
</div>

 
  
   {
  //  </div>
   }
   <ToastContainer/>
    
   </>
  )
}

export default ChatPortion