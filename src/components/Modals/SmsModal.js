import { verifyCode } from 'Api/Api';
import { initiateEmailVerification } from 'Api/Api';
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import modalOne from './j51.png'
import './Modals.css'

const SmsModal = () => {
     const [showModal, setShowModal] = useState(false);
    const [phoneCheckOne, setPhoneCheckOne]=useState(true);
    const [phoneCheckTwo, setPhoneCheckTwo]=useState(false);
    const [email, setEmail]=useState();
    const [code, setCode]=useState();
    
    const history=useHistory()
   
  function toggleModal() {
  setShowModal(!showModal);
}
// const setSecondPassword=()=>{
//     setPasswordOne(false);
//     setPasswordTwo(true);

// }
const sendingCode=()=>{
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
     setPhoneCheckOne(false);
     setPhoneCheckTwo(true)
        }
    })
   
    

}
const verifyingCode=()=>{
    const values={
        code:code
    }
    verifyCode(values)
    .then((res)=>{
        if(res.data.message==="Verification successful"){
            toast.success('congratulations! your account is verified', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    
      theme: 'dark',
     
    });
    toggleModal()
setTimeout(() => {
    history.push('/admin/home')
    }, 2000);
}
     if(res.data.message==="Verification invalid"){
    toast.success('Verification code is invalid or has expired', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     
        }
    })
   
    

}

  return (
   <div className='content' >
            <div  >
                <Button className="auth-button" onClick={toggleModal} style={{fontSize:"12px"}}>Use email (email)</Button>

                <Modal  isOpen={showModal} toggle={toggleModal} className="" style={{marginTop:"200px"}} >
                <div className="modal-body ">
                <h1 className='text-center text-white mb-0'>Email Verification</h1>
                 <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-1"/>
                {
                    phoneCheckOne&&
                    <>
          <Input
        id="exampleEmail"
        name="email"
        type="email"
        className='reset-input'
        placeholder="Enter your email"
        onChange={(e)=>setEmail(e.target.value)}

      />
      <h1 className='text-center'>
      <Button className='reset-button mt-3' onClick={sendingCode}>Send Code</Button></h1>
      </>
                }
            {
                    phoneCheckTwo&&
                    <>
          <Input
        id="exampleEmail"
        name="code"
        type="text"
        className='reset-input'
        placeholder="Enter code"
        onChange={(e)=>setCode(e.target.value)}

      />
      <h1 className='text-center'>
      <Button className='reset-button mt-3 mb-0' onClick={verifyingCode}>Verify</Button></h1>
      <a style={{color:"#229ED9",cursor:"pointer"}}onClick={sendingCode}>Resend code</a>
      </>
                }
                </div>
                </Modal>

            </div>
            <ToastContainer/>
        </div>
  )
}

export default SmsModal