import ChatSection from 'components/ChatSection/ChatSection';
import React from 'react'
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j23.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import './Chat.css'

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

const Chat = () => {
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
    [1,2,3,4,5,6].map((data,index)=>(
    <div>
    <Media className=' ml-3 mt-4' >
      <Media left>
        <img src={streamFour} style={{widht:"40px",height:"40px"}}class="rounded-circle " alt="Your Image"/>
  
      </Media>
      
      <Media body className="ml-2 message-media mt-3">
       <Input
                  defaultValue=""
                  placeholder="Type your message here..."
                  type="text"
                  
                  className="chat-inputs mt-3 "
                 
                />
      </Media>
      
    </Media>
    <Row className=''  style={{marginLeft:"270px"}}>
    <Media className=''  >
      
      
      <Media body className="ml-2 message-media mt-1">
       <Input
                  defaultValue=""
                  placeholder="Type your message here..."
                  type="text"
                  
                  className="chat-second-inputs mt-4"
                 
                />
      </Media>
      <Media right>
        <img src={streamFive} style={{widht:"40px",height:"40px"}}class="rounded-circle " alt="Your Image"/>
  
      </Media>
      
    </Media>
    </Row>

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
  <Input placeholder="Type your message here..." className='chat-thired-inputs'style={{marginTop:"0"}} />
  <InputGroupAddon style={{border:"none"}} addonType="append">
    <Button  className='chat-attach' style={{marginTop:"-1px"}}>
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