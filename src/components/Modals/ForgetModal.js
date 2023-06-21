import { verifyCode } from 'Api/Api';
import { getUsersById } from 'Api/Api';
import { updatePassword } from 'Api/Api';
import { initiateEmailVerification } from 'Api/Api';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import modalOne from './j51.png'
import './Modals.css'

const ForgetModal = () => {
     const [showModal, setShowModal] = useState(false);
    const [passwordOne, setPasswordOne]=useState(true);
    const [passwordTwo, setPasswordTwo]=useState(false);
    const [passwordThree, setPasswordThree]=useState(false);
    const [animationCheck, setAnimationCheck] = useState(false)
    const [email, setEmail]=useState();
    const [code, setCode]=useState();
    const [password, setPassword]=useState();
    const [alphabet, setAlphabet]=useState(false);
    const [number, setNumber]=useState(false);
    const [special, setSpecial]=useState(false);
    const [userData, setUserData] = useState()
    const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
    const history=useHistory()
    // const Values={
    //     userId:userId.id
    //   }
    // useEffect(()=>{
      
    //   getUsersById(Values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //       } 
     
    // });
    //  },[])
   
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
// const pickPasswordValue=(e)=>{
//   setPassword(e.target.value)
//   setAlphabet(false)
//   setNumber(false)
//   setSpecial(false)

// }

const sendingEmail=()=>{
  setAnimationCheck(true)
   const values={
        email:email
    }
    initiateEmailVerification(values)
    .then((res)=>{
        if(res.data.message==="email sent"){
            toast.success('code sent to given email', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setPasswordOne(false);
    setPasswordTwo(true);
    setAnimationCheck(false)
   
        }
    })
}
const verifyingCode=()=>{
  setAnimationCheck(true)
    const values={
        code:code
    }
    verifyCode(values)
    .then((res)=>{
        if(res.data.message==="Verification successful"){
            toast.success('code verified', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    
      theme: 'dark',
     
    });
   setPasswordTwo(false);
    setPasswordThree(true);
    setAnimationCheck(false)
}
     if(res.data.message==="Verification invalid"){
    toast.success('Verification code is invalid or has expired', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setAnimationCheck(false)
     
        }
    })
   
    

}
const changePassword=async()=>{
  setAnimationCheck(true)
  const values={
      password:password,
      email:email
    }
      await updatePassword(values)
       .then((res)=>{
      if (res.data.message === "password updated") {
             toast.success('Password updated', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    toggleModal()
      
   }
   if (res.data.message === "email does not exist") {
             toast.error('user not exist', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setAnimationCheck(false)
     toggleModal()
      
   }
    })
   
//    const alphabeticRegex = /^[a-zA-Z]+$/;
//     const containsOnlyAlphabets = alphabeticRegex.test(password);
//    if(containsOnlyAlphabets){
//     const numericRegex = /^[0-9]+$/;

//   const containsOnlyNumbers = numericRegex.test(password);
//     if(containsOnlyNumbers){
//       const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

//   const containsSpecialChars = specialCharRegex.test(password);
//   if(containsSpecialChars){
    
//   }
//   else{
//     setSpecial(true)
//   }
//   }
//   else{
// setNumber(true)
//   }
//   }
//   else{
//     setAlphabet(true)
//   }
  

  }

  return (
   <div className='content' >
            <div  >
               <p  className="login-end text-right mt-1" onClick={toggleModal}style={{cursor:"pointer"}}>
            
              Forgot password?
            
              
               </p>

                <Modal  isOpen={showModal} toggle={toggleModal} style={{marginTop:"100px"}}>
                {
                    passwordOne&&
                    <>
                    
                     <div className="modal-header" >
                     <h4 className='text-white text-center' style={{fontWeight:"600"}}>Reset Your Passoword</h4>
                     
                   

  </div>
  <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
  <div className="modal-body home-modal" style={{borderRadius:"40px"}}>
  <FormGroup 
  className='mt-4 mb-4'
  row>
    <Label
      for="exampleEmail"
      sm={2}
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      Email
    </Label>
    <Col sm={10}>
      <Input
        id="exampleEmail"
        name="email"
        type="email"
        className='reset-input '
        placeholder="Enter your email"
        onChange={(e)=>setEmail(e.target.value)}

      />
    </Col>
    </FormGroup>
  
  {
//     <Row>
//     <Col>
//     <p className='text-white mb-0' style={{fontSize:"10px",fontWeight:"600"}}>How do you want to receive the </p>
// <p className='text-white' style={{fontSize:"10px",fontWeight:"600"}}>code to reset your password?</p>
// <Row>
// <Col>
// <FormGroup className='ml-2 mt-3'>
//  <Input type="radio" className='mt-2'  />
//     {' '} <Label  className="mb-0" style={{color:"white",fontWeight:"600",fontSize:"13px"}}>Send code via Phone number</Label>
//     <p className='' style={{color:"#BFB8B8",fontSize:"10px",marginTop:"-10px"}}>+12312312313232131</p>
//     </FormGroup>
//     </Col>
//     <Col className='text-right'>
//     <img src={modalOne} className="mr-2" style={{width:"50px",height:"50px"}}/>
//     <p className='text-white ml-3 '>Alex Rock</p>
//     </Col>
//     </Row>
//     <FormGroup className='ml-2 mt-3'>
//  <Input type="radio" className='mt-2'  />
//     {' '} <Label  className="mb-0" style={{color:"white",fontWeight:"600",fontSize:"13px"}}>Send code Email</Label>
//     <p className='' style={{color:"#BFB8B8",fontSize:"10px"}}> www.a***********@gmail.com</p>
//     </FormGroup>
// </Col>

        
//     </Row>
  }
    
    
    
  </div>
    <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
    <Row className="justify-content-end">
  
    
    <Col xl={12} className="text-right">
    {
      animationCheck?
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
     <Button type="button" className="  reset-button mr-2 mb-2" onClick={sendingEmail}>
     Continue
    </Button> 
    }
    
    
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
       
        type="text"
        className='reset-input'
        placeholder="Enter Code"
        onChange={(e)=>setCode(e.target.value)}

      />
    
    </Col>
    <Col className='text-right'>
    <p className='text-white ml-3 mb-0'>We sent your code to:</p>
    <span className=' ml-3 ' style={{color:"#BFB8B8",fontSize:"12px"}}>{email}</span>
    </Col>
    </Row>
    
</Col>

        
    </Row>
    
    
    
  </div>
    <hr style={{backgroundColor:"#555555",marginTop:"-10px"}} className="mr-3 ml-3"/>
    <Row className="justify-content-end">
  <Col xl={6}>
  <a  className="ml-3 mt-3"style={{color:"#229ED9",fontSize:"10px"}} onClick={sendingEmail}>Resend Code?</a>
  </Col>
    
    <Col xl={6} className="text-right">
    {
      animationCheck?
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
     <Button type="button" className="  reset-button mr-2 mb-2" onClick={verifyingCode}>
     Continue
    </Button> 
    }
    
    
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
        type="password"
        className='reset-input'
        style={{marginLeft:"-11%",width:"111%"}}
        onChange={(e)=>setPassword(e.target.value)}
      />
      {
      //   alphabet===true&&number===true&&
      // <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Medium</span></p>
      // }
      // {
      //   alphabet===true&&special===true&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Medium</span></p>
      // }
      // {
      //   number===true&&special===true&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Medium</span></p>
      // }
      // {
      //   number===true&&special===false&&alphabet===false&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Weak</span></p>
      // }
      // {
      //   number===false&&special===true&&alphabet===false&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Weak</span></p>
      // }
      // {
      //   number===false&&special===false&&alphabet===true&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Weak</span></p>
      // }
      // {
      //   number===true&&special===true&&alphabet===true&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Strong</span></p>
      // }
      //  {
      //   number===false&&special===false&&alphabet===false&&
    
      //  <p className='chat-designation' style={{color:"#BFB8B8"}}>Password Strength:<span style={{color:"#009633"}}>Weak</span></p>
      }
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
    {
      animationCheck?
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
     <Button type="button" className="  reset-button mr-2 mb-2" onClick={changePassword}>
     Continue
    </Button>
    } 

    
    
    </Col>
    </Row>
    </>
                }
                </Modal>

            </div>
            <ToastContainer/>
        </div>
  )
}

export default ForgetModal