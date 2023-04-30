import ChatSection from 'components/ChatSection/ChatSection';
import React, { useEffect, useRef, useState } from 'react'
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j23.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Chat.css'
import { socketUrl } from 'Api/Api';

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
  Media,
} from "reactstrap";
import { AiFillPhone } from 'react-icons/ai';
import { BsCameraVideoFill, BsFillSendFill } from 'react-icons/bs';
import { IoIosAttach, IoMdMore } from 'react-icons/io';
import ChatProfile from 'components/ChatProfile/ChatProfile';
import {io} from 'socket.io-client'
import Pusher from 'pusher-js';
import axios from 'axios';
import { sendMessage } from 'Api/Api';
import { getAllChatsById } from 'Api/Api';
const pusher = new Pusher('78bfd9bc497cd883c526', {
  cluster: 'ap1',
  useTLS: true,
});

const Chat = () => {
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const [messages,setMessages]=useState([])
  const [message,setMessage]=useState('')
  const [arrivalMessage,setArrivalMessage]=useState(null)
  // const [socket,setSocket]=useState();
  // const socket=useRef();

// "644e89f4551d4f1cb45c64cf"
  // useEffect(()=>{
  //   socket.current=io("ws://localhost:8900")
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // },[])
  const roomId = "644e89f4551d4f1cb45c64cf";
 useEffect(() => {

    const channel = pusher.subscribe(roomId);
    channel.bind('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    // axios.get(`/api/chat?roomId=${roomId}`).then((response) => {
    //   setMessages(response.data);
    // });


    // socket.current.emit("addUser", userId.id);
    // socket.current.on("getUsers", (users) => {
    //  console.log(users,"=============>users")
    // });
    
  return () => {
      channel.unbind("message");
      pusher.unsubscribe(roomId);
      pusher.disconnect();
    };
  }, [roomId]);

  // useEffect(() => {
  // const values={
  //   recieverId:"644e89f4551d4f1cb45c64cf",
  //    senderId:userId.id
  // }
  // getAllChatsById(values)
  // .then((res)=>{
  //   console.log(res,"all chats==========>")
  //   setMessages(res?.data)

  // })

    
  // }, []);

    console.log(messages);

  const sendingMessage=()=>{
    const values={
      message:message,
      roomId:"644e89f4551d4f1cb45c64cf",
      userId:userId.id

    }

    sendMessage(values)
    setMessage('');
  }
AOS.init();
  return (
    <div className='content'>
    <Row>
  
    <ChatSection/>
   
   
 <Col xl={8} style={{ zIndex: "1090"}}>
    <Row className='' style={{marginTop:"-50px"}}>
    <Col >
      <Media className=' ml-3' >
      <Media left>
        <img src={streamFour} style={{width:"50px",height:"50px"}}class="rounded-circle " alt="Your Image"/>
  <span style={{position: 'absolute'}}>
    <span style={{display: 'inline-block', width: '0.5em', marginLeft:"-1em", height: '0.5em' ,marginBottom:"-2.3em", borderRadius: '50%', backgroundColor: 'green'}}></span>
  </span>
      </Media>
      <Media body className="ml-2">
        <h3 className='text-white mb-0'>Assi</h3>
        <p className="chat-designation">nice yo meet you</p>
      </Media>
      
    </Media>
    </Col>
    <Col className='text-left'>
    <div style={{display:"flex",justifyContent: "flex-end"}}>
    <AiFillPhone className='top-icons'/>
    <BsCameraVideoFill  className='top-icons'/>
    <IoMdMore  className='top-icons'/>
    </div>
    </Col>
    </Row>
    <hr style={{backgroundColor:"#555555", height:"3px",borderRadius:"50px"}} className="mr-2 ml-3"/>
    <div className='message-div'>
    {
    messages?.map((data,index)=>(
    <div>
    {
      // data.username===userId.id&&
      data.username===userId.id?
      
    <Media className=' ml-3 mt-4' data-aos="fade-up" >
      <Media left>
        <img src={streamFour} style={{widht:"40px",height:"40px"}}class="rounded-circle " alt="Your Image"/>
  
      </Media>
      
      <Media body className="ml-2 message-media mt-3">
      
        
       <Input
                  defaultValue=""
                  placeholder="Type your message here..."
                  type="text"
                  value={data?.message}
                  
                  className="chat-inputs mt-3 "
                 
                />
      
      </Media>
      
    </Media>
    :
    <Row className=''  style={{marginLeft:"270px"}} data-aos="fade-up">
    <Media className=''  >
      
      
      <Media body className="ml-2 message-media mt-1">
      
        
       <Input
                  defaultValue=""
                  placeholder="Type your message here..."
                  type="text"
                   value={data?.message}
                  className="chat-second-inputs mt-4"
                 
                />
      
                
      </Media>
      <Media right>
        <img src={streamFive} style={{widht:"40px",height:"40px"}}class="rounded-circle " alt="Your Image"/>
  
      </Media>
      
    </Media>
    </Row>
    }
    

    </div>
    ))
    }
    
    </div>
    <div className="chat-below-div">
    <hr style={{backgroundColor:"#555555", height:"3px",borderRadius:"50px"}} className="mr-2 ml-3 mt-5 mb-0"/>
    <InputGroup className='' >
  <InputGroupAddon addonType="prepend">
    <Button color="secondary" className='chat-attach'style={{marginTop:"0px"}}>
      <i className="fa fa-paperclip" aria-hidden="true" style={{fontSize:"20px"}}></i>
       
    </Button>
  </InputGroupAddon>
  <Input placeholder="Type your message here..." onChange={(e)=>setMessage(e.target.value)} className='chat-thired-inputs'style={{marginTop:"0"}} />
  <InputGroupAddon style={{border:"none"}} addonType="append">
    <Button  className='chat-attach' style={{marginTop:"-1px"}} onClick={sendingMessage}>
      <BsFillSendFill style={{fontSize:"20px"}}/>
    </Button>
  </InputGroupAddon>
</InputGroup>
    </div>
     
    
    </Col>
    <Col xl={4}>
   <ChatProfile/>
    </Col>
    
    </Row>
    
    </div>
  )
}

export default Chat