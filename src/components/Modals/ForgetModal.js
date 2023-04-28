import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import modalOne from './j51.png'
import './Modals.css'

const ForgetModal = () => {
     const [showModal, setShowModal] = useState(false);
    const [passwordOne, setPasswordOne]=useState(true);
    const [passwordTwo, setPasswordTwo]=useState(false);
    const [passwordThree, setPasswordThree]=useState(false);
    const history=useHistory()
   
  function toggleModal() {
  setShowModal(!showModal);
}
const setSecondPassword=()=>{
    setPasswordOne(false);
    setPasswordTwo(true);

}
const setThiredPassword=()=>{
    setPasswordTwo(false);
    setPasswordThree(true);

}

  return (
   <div className='content' >
            <div  >
               <p  className="login-end text-right mt-1" onClick={toggleModal}style={{cursor:"pointer"}}>
            
              Forgot password?
            
              
               </p>

                <Modal  isOpen={showModal} toggle={toggleModal} className="" >
                {
                    passwordOne&&
                    <>
                    
                     <div className="modal-header" >
                     <h4 className='text-white text-center' style={{fontWeight:"600"}}>Reset Your Passoword</h4>
                     
                   

  </div>
  <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
  <div className="modal-body home-modal" style={{borderRadius:"40px"}}>
    <Row>
    <Col>
    <p className='text-white mb-0' style={{fontSize:"10px",fontWeight:"600"}}>How do you want to receive the </p>
<p className='text-white' style={{fontSize:"10px",fontWeight:"600"}}>code to reset your password?</p>
<Row>
<Col>
<FormGroup className='ml-2 mt-3'>
 <Input type="radio" className='mt-2'  />
    {' '} <Label  className="mb-0" style={{color:"white",fontWeight:"600",fontSize:"13px"}}>Send code via Phone number</Label>
    <p className='' style={{color:"#BFB8B8",fontSize:"10px",marginTop:"-10px"}}>+12312312313232131</p>
    </FormGroup>
    </Col>
    <Col className='text-right'>
    <img src={modalOne} className="mr-2" style={{width:"50px",height:"50px"}}/>
    <p className='text-white ml-3 '>Alex Rock</p>
    </Col>
    </Row>
    <FormGroup className='ml-2 mt-3'>
 <Input type="radio" className='mt-2'  />
    {' '} <Label  className="mb-0" style={{color:"white",fontWeight:"600",fontSize:"13px"}}>Send code Email</Label>
    <p className='' style={{color:"#BFB8B8",fontSize:"10px"}}> www.a***********@gmail.com</p>
    </FormGroup>
</Col>

        
    </Row>
    
    
    
  </div>
    <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
    <Row className="justify-content-end">
  
    
    <Col xl={12} className="text-right">
     <Button type="button" className="  reset-button mr-2 mb-2" onClick={setSecondPassword}>
     Continue
    </Button> 
    
    
    </Col>
    </Row>
    </>
                }
                {
                    passwordTwo&&
                    <>
                    
                     <div className="modal-header" >
                     <h4 className='text-white text-center' style={{fontWeight:"600"}}>Enter security code</h4>
                     
                   

  </div>
  <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
  <div className="modal-body home-modal" style={{borderRadius:"40px"}}>
    <Row>
    <Col>
    <p className='text-white mb-0' style={{fontSize:"10px",fontWeight:"600"}}>Please check your emails for a message with your code.Your </p>
<p className='text-white' style={{fontSize:"10px",fontWeight:"600"}}>code is 6 numbers long </p>
<Row className='mt-3'>
<Col>
 
      <Input
        id="exampleEmail"
        name="email"
        placeholder=""
        type="email"
        className='reset-input'
        placeholder="Enter Code"

      />
    
    </Col>
    <Col className='text-right'>
    <p className='text-white ml-3 mb-0'>We sent your code to:</p>
    <span className=' ml-3 ' style={{color:"#BFB8B8",fontSize:"12px"}}>www.a***********@gmail.com</span>
    </Col>
    </Row>
    
</Col>

        
    </Row>
    
    
    
  </div>
    <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
    <Row className="justify-content-end">
  <Col xl={6}>
  <a  className="ml-3 mt-3"style={{color:"#229ED9",fontSize:"10px"}}>Resend Code?</a>
  </Col>
    
    <Col xl={6} className="text-right">
     <Button type="button" className="  reset-button mr-2 mb-2" onClick={setThiredPassword}>
     Continue
    </Button> 
    
    
    </Col>
    </Row>
    </>
                }
                {
                    passwordThree&&
                    <>
                    
                     <div className="modal-header" >
                     <h4 className='text-white text-center' style={{fontWeight:"600"}}>Choose a new Password </h4>
                     
                   

  </div>
  <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
  <div className="modal-body home-modal" style={{borderRadius:"40px"}}>
    <Row>
    <Col>
    <p className='text-white mb-0' style={{fontSize:"10px",fontWeight:"600"}}>Create a new password that is at least 6 characters lonh.A strong pssword is combineof  </p>
<p className='text-white' style={{fontSize:"10px",fontWeight:"600"}}>letters,numbers,and punctuations marks.</p>
<Row>
<Col xl={12}>
  <FormGroup row className='mt-3'>
    <Label
      for="exampleEmail"
      sm={2}
      xl={4}
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      New Password
    </Label>
    <Col sm={5} xl={5}>
      <Input
        id="exampleEmail"
        name="email"
        placeholder=""
        type="email"
        className='reset-input'
        style={{marginLeft:"-11%",width:"111%"}}
      />
      <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Medium</span></p>
    </Col>
    </FormGroup>
    </Col>
   
    </Row>
    
</Col>

        
    </Row>
    
    
    
  </div>
    <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
    <Row className="justify-content-end">
  
    
    <Col xl={12} className="text-right">
     <Button type="button" className="  reset-button mr-2 mb-2" onClick={toggleModal}>
     Continue
    </Button> 
    
    
    </Col>
    </Row>
    </>
                }
                </Modal>

            </div>
        </div>
  )
}

export default ForgetModal