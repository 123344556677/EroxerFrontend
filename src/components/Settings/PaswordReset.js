import React, { useEffect, useState } from 'react'
import ChatPortion from 'components/ChatPortion/ChatPortion'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { toast, ToastContainer } from 'react-toastify';
import resetOne from './j38.png'
import { updatePassword } from 'Api/Api'
import { getUsersById } from 'Api/Api'

const PaswordReset = () => {
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [userData, setUserData] = useState()
   const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
   const [animationCheck, setAnimationCheck] = useState(false)
    const Values={
        userId:userId.id
      }
     useEffect(()=>{
      
      getUsersById(Values)
       .then(res => {
         console.log(res.data);
          if (res?.data?.message === "User Exist") {
           setUserData(res?.data?.data)
          } 
     
    });
     },[])
    
  const changePassword=async(e)=>{
     setAnimationCheck(true)
   e.preventDefault()
   if(password===confirmPassword){
    const values={
      password:password,
      email:userData?.email
    }
      await updatePassword(values)
       .then((res)=>{
      if (res.data.message === "password updated") {
             toast.success('Password updated', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setAnimationCheck(false)
      
   }
    })
  }
   else{
 toast.error('Passwords must be same', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setAnimationCheck(false)
   }

  }
  return (
    <div className='content'>
     <span className='' style={{color:"white",fontSize:"10px",marginLeft:"50px"}} ><Link to="/admin/home"
     style={{color:"white",fontSize:"40px",marginTop:"-4%",position:"absolute"}}><IoMdArrowRoundBack/></Link></span>
    <Row className='justify-content-center'>
    <Col xl={8}>
    <h1 className='text-center mt-3'>
     <img src={resetOne}  alt=""/></h1>
     <Form onSubmit={changePassword}>
     <FormGroup>
               
     <FormGroup row>
    <Label
      for="exampleEmail"
      sm={2}
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      Current
    </Label>
    <Col sm={10}>
      <Input
        id="exampleEmail"
        // name="email"
        placeholder=""
        type="password"
        className='reset-input'
        required
      />
    </Col>
    </FormGroup>
                 <FormGroup row>
    <Label
      for="exampleEmail"
      sm={2}
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      New
    </Label>
    <Col sm={10}>
      <Input
        id="exampleEmail"
        name="email"
        placeholder=""
        type="password"
        className='reset-input'
        onChange={(e)=>setPassword(e.target.value)}
         required
      />
    </Col>
    </FormGroup>
                <FormGroup row>
    <Label
      for="exampleEmail"
      sm={2}
      xl={3}
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      Retype New
    </Label>
    <Col sm={8} xl={9}>
      <Input
        id="exampleEmail"
        // name="email"
        placeholder=""
        type="password"
        className='reset-input'
        style={{marginLeft:"-11%",width:"111%"}}
        required
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />
    </Col>
    </FormGroup>
              </FormGroup>
              <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-1 ml-1'  />
    {' '} <Label style={{color:"white",fontSize:"10px"}} className="ml-4">forgotten your password? Confirm or 
    add an email address or phone number first.</Label>
     
  </FormGroup>
   <Col className='text-right'>
   {
      animationCheck?
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      :
   <Button className="reset-button">Save</Button>
   }
   </Col>
  </Form>
 

     </Col>
     <Col>
     <ChatPortion/>
     </Col>
     </Row>

<ToastContainer />
    </div>
  )
}

export default PaswordReset