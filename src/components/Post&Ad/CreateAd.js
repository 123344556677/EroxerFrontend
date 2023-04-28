import ChatPortion from 'components/ChatPortion/ChatPortion'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Card, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import postOne from './j46.png'
import './post.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase64 from "react-file-base64";
import { createAd } from 'Api/Api'
import { getUsersById } from 'Api/Api'


const CreatePost = () => {
   const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
   const [avaialableFor,setAvailableFor]=useState('');
   const [time,setTme]=useState();
   const [date,setDate]=useState();
   const [gender,setGender]=useState('');
   const [meetingType,setMeetingType]=useState('');
   const [description,setDescription]=useState('');
   const [adPic,setAdPic]=useState('');
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
   const handleAdPic=(e)=>{
        setAdPic(e.selectedFile.base64);
        
    }

   const ad=async()=>{
    const values={
      userId:userId.id,
      avaialableFor:avaialableFor,
      time:time,
      date:date,
      gender:gender,
      meetingType:meetingType,
      description:description,
      adProfilePic:userData?.profilePic,
      adPic:adPic,
      userData:userData



    }
    await createAd(values)
    .then((res)=>{
      if (res.data.message === "ad Generated") {
             toast.success('Ad Created', {
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
    <Col xl={8} className="text-center">
    <Row>
     <Col>
     <h1 className='home-title'>Alex Rock</h1>
     </Col>
     <Col  xl={8}>
    
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
      <h2 className='text-center text-white' style={{fontWeight:"600"}}>Create Ad <br/>
For your Meeting</h2>
     <Card className=" " style={{backgroundColor:"#1e1e2b",borderRadius:"4px",border:"1px solid white"}} >
    <h1 className='mt-5 mb-5'>
    <div  style={{opacity:"0",position:"absolute",zIndex:"10"}}>
    <FileBase64
        type="file"
        className="text-center"
        onDone={(base64) => handleAdPic({ selectedFile: base64 })}
       style={{cursor:"pointer"}}


    />
    </div>
   <img src={adPic?adPic:postOne} style={{width:adPic&&"80%",zIndex:"5"}}/>
     
    </h1>
   

    </Card>
    <Input
        id="exampleEmail"
        placeholder=" I am avaialable for..."
        type="text"
        className='post-input'
        onChange={(e)=>setAvailableFor(e.target.value)}
       
      />
      <Row className='mt-4'>
      <Col>
       <Input
        id="exampleEmail"
        name="datetime"
        placeholder="Month,Date"
        type="date"
        className='post-input '
         onChange={(e)=>setDate(e.target.value)}
       
      />
      </Col>
      <Col>
  
    <Input
      id="exampleSelect"
      name="select"
      placeholder="Time"
      type="time"
      className='post-input'
       onChange={(e)=>setTme(e.target.value)}
      
    />
      

      </Col>
      
      </Row>
      <Row className='mt-4'>
      <Col>
       
    
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='Gender'
       onChange={(e)=>setGender(e.target.value)}
    >
      <option>
       Gender
      </option>
      <option>
        Male
      </option>
      <option>
        Female
      </option>
      <option>
        Other
      </option>
      
    </Input>
  
      </Col>
      <Col>
       
    <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='Meeting Type'
       onChange={(e)=>setMeetingType(e.target.value)}
    >
      <option>
       Meeting Type
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
 
      </Col>
      
      </Row>
       <Input
      id="exampleText"
      name="text"
      type="textarea"
      placeholder='Description'
      className='post-text mt-4'
      onChange={(e)=>setDescription(e.target.value)}
      
    />
    <Row className='justify-content-end mt-3'>
    <Button className='reset-button mr-2' onClick={ad}>Save</Button>
    </Row>
    </Col>
    <Col xl={4}>
    <ChatPortion/>
    
    </Col>
    
    </Row>
    
    <ToastContainer />
    </div>
  )
}

export default CreatePost