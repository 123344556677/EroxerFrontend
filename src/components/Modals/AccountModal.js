import React, { useEffect, useState } from 'react'
import { AiOutlineDollar, AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import modalOne from './j45.png'
import './Modals.css'
import memberFour from './j41.png'
import memberFive from './j42.png'
import memberSix from './j43.png'
import memberSeven from './j44.png'
// import memberEight from './j45.png'
import memberNine from './j46.png'
import memberTen from './j52.png'
import { getUsersById } from 'Api/Api';
import { updateUser } from 'Api/Api';
import { toast } from 'react-toastify';

const AccountModal = (props) => {
    const history=useHistory()
    const[username,setUsername]=useState(userData?.username);
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState(userData?.firstName);
    const [lastName, setLastName] = useState(userData?.lastName);
    const[website,setWebsite]=useState(userData?.website);
      const[phoneNumber,setPhoneNumber]=useState(userData?.phoneNumber);
     const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
       const[profilePic,setProfilePic]=useState(userData?.profilePic);
      const [userData, setUserData] = useState()
      console.log(props,"modaValue===========>")
    const Values={
        userId:userId.id
      }
     useEffect(()=>{
      
      getUsersById(Values)
       .then(res => {
         console.log(res.data);
          if (res?.data?.message === "User Exist") {
           setUserData(res?.data?.data)
            setProfilePic(res?.data?.data?.profilePic)

          } 
     
    });
     },[])
     const update=async()=>{
        const values={
      userId:userId.id,
      firstName:firstName,
      lastName:lastName,
      website:website,
      phoneNumber:phoneNumber,
      username:username
      
    }
    await updateUser(values)
    .then((res)=>{
      if (res.data.message === "user updated") {
             toast.success('Profile updated', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    window.location.reload(false)
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
     
  function toggleModal() {
  setShowModal(!showModal);
}
const gotoPost=()=>{
    history.push('/admin/createPost');
    toggleModal();
}
const gotoAd=()=>{
    history.push('/admin/createAd');
    toggleModal();
}
  return (
   <div className='content'>
            <div>
                
                 <p  className='manage-table-link' onClick={toggleModal}style={{cursor:"pointer"}}>Edit</p>

                <Modal  isOpen={showModal} toggle={toggleModal} className="main-modal" style={{maxWidth:"400px",borderRadius:"10px"}}  >
                    
                     <div className="modal-header" >
                    

  </div>
  <div className="modal-body home-modal">
  <Row className='justify-content-center' style={{marginTop:"-20px"}}>
    <Col>
    <h1 className='text-center mb-0'>
    <img src={profilePic?profilePic:modalOne} style={{width:"20%",height:"20%",borderRadius:"200px"}}/></h1>
    <h4 className='text-white mb-0 text-center' style={{fontWeight:"600"}}>{userData?.firstName} {userData?.lastName}</h4>
    <p className="text-center"style={{color:"#BFB8B8",fontSize:"10px"}}>Eroxer</p>
    <hr style={{backgroundColor:"#555555"}}/>
    {
        props?.props==="name"&&
    <Row>
    <Col>
 <FormGroup  className='mt-2'>
    <Label
      for="exampleEmail"
      
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      first name
    </Label>
   
      <Input
        id="exampleEmail"
      
        placeholder="first name"
        type="text"
        className='reset-input'
        onChange={(e)=>setFirstName(e.target.value)}
      />
   
    </FormGroup>
    </Col>
    <Col>
 <FormGroup  className='mt-2'>
    <Label
      for="exampleEmail"
      
      style={{color:"white",fontWeight:"600",fontSize:"15px"}}
    >
      last name
    </Label>
   
      <Input
        id="exampleEmail"
      
        placeholder="last name"
        type="text"
        className='reset-input'
        onChange={(e)=>setLastName(e.target.value)}
      />
   
    </FormGroup>
    
    </Col>
   
    </Row>
    }
     {
        props?.props==="username"&&
   
   
    
      <Input
        id="exampleEmail"
       
        placeholder="username"
        type="text"
        className='reset-input'
        onChange={(e)=>setUsername(e.target.value)}
      />
    
    }
     {
        props?.props==="phoneNumber"&&
   
   
    
      <Input
        id="exampleEmail"
       
        placeholder="phone number"
        type="number"
        className='reset-input'
        onChange={(e)=>setPhoneNumber(e.target.value)}
      />
    
    }
     {
        props?.props==="website"&&
   
   
    
      <Input
        id="exampleEmail"
       
        placeholder="account name"
        type="text"
        className='reset-input'
        onChange={(e)=>setWebsite(e.target.value)}
      />
    
    }

 <h1 className='text-center mt-1' ><Button className="reset-button btn-md " onClick={update} >
    
    Save
    </Button ></h1>
    </Col>


    </Row>
   
    
    
  </div>
  
                </Modal>
               

            </div>
        </div>
  )
}

export default AccountModal