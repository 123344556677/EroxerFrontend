import React from 'react'
import authOne from './j37.png'
import authTwo from './j36.png'
import authThree from './j35.png'
import { Button, Col, FormGroup, Input, Label, Media, Row } from 'reactstrap'
import './Settings.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import ChatPortion from 'components/ChatPortion/ChatPortion'

const Authentication= () => {
  return (
    
    <div className='content'>
    <Row>
    <Col xl={8}>
    <span className='' style={{color:"white",fontSize:"10px",marginLeft:"50px"}} ><Link to="/admin/home"
     style={{color:"white",fontSize:"40px",marginTop:"-80px",position:"absolute"}}><IoMdArrowRoundBack/></Link></span>
    <Row className="justify-content-center">
    <Col className='text-center '>
    <img src={authThree} style={{color:"white"}}/>
    <h2 className='text-white mb-0 mt-4' style={{fontWeight:"600"}}>Two Factor Authentication</h2>
    <p className="" style={{color:"grey",fontSize:"13px"}}>If we notice an attempted login from a device or browser we don't <br/>
    recognize, we'll ask for your password and a verification code.</p>
    
    </Col>
   
    </Row>
    <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-1"/>

    <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"20px"}}>Select Security Method</Label>
    
  </FormGroup>
  <Row>
  <Col xl={6}>
  <Media className='mt-4 ml-lg-3 chat-media'>
      <Media left>
        <img object  src={authTwo} alt="jannan" className=" rounded-circle" />
      </Media>
      <Media body className="ml-3 ">
        <h3 className='text-white mb-0 'style={{fontWeight:"600"}}>Security Key</h3>
        <p className="chat-designation mt-2" >Use a physical security key to help protect your <br/>
        Facebook account from unauthorized access. .<br/> You won't need to enter a code.</p>
        <Button className="auth-button">Use scurity key</Button>
      </Media>
      
    </Media>'
  </Col>
  <Col xl={6}>
  <Media className='mt-4 ml-lg-3 chat-media'>
      <Media left>
        <img object  src={authOne} alt="jannan" className=" rounded-circle" />
      </Media>
      <Media body className="ml-3 ">
        <h3 className='text-white mb-0 'style={{fontWeight:"600"}}>Text Message (SMS)</h3>
        <p className="chat-designation mt-2" >Use text message (SMS) to receive verification <br/> codes. For your protection, phone numbers used <br/>
         for two-factor 
        authentication can't be used to <br/> reset your password when two-factor is on.</p>
        <Button className="auth-button" style={{fontSize:"12px"}}>Use text message (SMS)</Button>
      </Media>
      
    </Media>
  
  </Col>
  
  
  </Row>
  </Col>
  <Col xl={4} >
  <ChatPortion/>
  </Col>
  </Row>
    
    
    </div>
  )
}

export default Authentication;