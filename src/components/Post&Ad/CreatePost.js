import ChatPortion from 'components/ChatPortion/ChatPortion'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Card, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import postOne from './j46.png'
import FileBase64 from "react-file-base64";
import './post.css'
import { createPost } from 'Api/Api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsersById } from 'Api/Api'

const CreateAd = () => {
  const [postPic, setPostPic] = useState();
  const [postCheck, setPostCheck] = useState(false);
  const [commentsCheck, setCommentsCheck] = useState(false);
  const [price, setPrice] = useState(0);
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const [userData, setUserData] = useState()
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
   const handlePostPic=(e)=>{
        setPostPic(e.selectedFile.base64);
        
    }
     const handleCheckboxChange = () => {
    setPostCheck(!postCheck);
  };
  const handleCommentsChange = () => {
    setCommentsCheck(!postCheck);
  };
  const post=async()=>{
    const values={
      userId:userId.id,
      postPic:postPic,
      postCheck:postCheck,
      commentsCheck:commentsCheck,
      price:price,
      postProfilePic:userData?.profilePic
    }
    await createPost(values)
    .then((res)=>{
      if (res.data.message === "post Generated") {
             toast.success('Post Created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
  }
  else{
    toast.error('Server Error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
  }
    })

  }
  return (
    <div className='content'>
    <Row>
    <Col xl={10}>
    <Row>
    
    <Col xl={11}>
    <Row>
     <Col>
     <h1 className='home-title'>Alex Rock</h1>
     </Col>
     <Col  xl={8} className="text-right">
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
    </Col>
    </Row>
    
    <Row className='justify-content-center'>
    <Col xl={6} className="">
    <h2 className='text-center text-white' style={{fontWeight:"600"}}>Create post <br/>
For your Meeting</h2>
    
     <Card className=" " style={{backgroundColor:"#1e1e2b",borderRadius:"4px",border:"1px solid white"}} >
    <h1 className='mt-5 mb-5 text-center'>
    <div  style={{opacity:"0",position:"absolute",zIndex:"10"}}>
    <FileBase64
        type="file"
        className="text-center"
        onDone={(base64) => handlePostPic({ selectedFile: base64 })}
       style={{cursor:"pointer"}}


    />
    </div>
    <img src={postPic?postPic:postOne} style={{width:postPic&&"80%",zIndex:"5"}}/>
     
    </h1>
   

    </Card>
    <div class="input-group">
  <input type="text" class="form-control ad-input" placeholder="Public or Private"/>
  <div class="input-group-append" className='switch-input'>
    <label class="switch">
      <input type="checkbox" checked={postCheck} onChange={handleCheckboxChange}  />
      <span class="slider round"></span>
    </label>
  </div>
</div>
<div class="input-group mt-3">
  <input type="text" class="form-control ad-input" placeholder="Allow Comments"/>
  <div class="input-group-append" className='switch-input'>
    <label class="switch">
      <input type="checkbox"  onChange={handleCommentsChange} />
      <span class="slider round"></span>
    </label>
  </div>
</div>
<div class="input-group mt-3">
  <input type="text" class="form-control ad-input" placeholder="Price"/>
  <div class="input-group-append switch-input" className='switch-input'  >
    <span class="input-group-text counter-input"  id="counter">
      <button class="btn btn-sm  mr-1" type="button" id="btn-minus" onClick={()=>setPrice(price-1)}>-</button>
      ${price}
      <button class="btn btn-sm  ml-1" type="button" id="btn-plus"onClick={()=>setPrice(price+1)}>+</button>
    </span>
  </div>
</div>
    
    
     
      
       
    <Row className='justify-content-end mt-3'>
    <Button className='reset-button mr-2' onClick={post}>Submit</Button>
    </Row>
    </Col>
    

   
    
    </Row>
    </Col>
    
    <Col xl={1}>
     <ChatPortion/>
     </Col>
     </Row>
    
    <ToastContainer/>
    </div>
  )
}

export default CreateAd;