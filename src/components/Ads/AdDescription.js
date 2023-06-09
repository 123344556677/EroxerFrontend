import React, { useEffect, useState } from 'react'
import { Card, Col, Row,Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'
import AdDesOne from './j31.png'
import AdDesTwo from './dummy.jpg'
import { FaSearch, FaUserAlt } from 'react-icons/fa'
import { AiOutlineUserAdd } from 'react-icons/ai'
import ChatProfile from 'components/ChatProfile/ChatProfile'
import { useParams,useHistory } from 'react-router-dom'
import { getAdsById } from 'Api/Api'
import Moment from 'react-moment';
import { useSelector } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify'
import { createContact } from 'Api/Api'
import ChatPortion from 'components/ChatPortion/ChatPortion'

const AdDescription = () => {
const [adData,setAdData]=useState()
const [animationCheck, setAnimationCheck] = useState(false)
const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
const { id } = useParams();
const getUser= useSelector(state => state.getUserById);
const getAds = useSelector(state => state?.getAds);
  const userData=getUser?.userData

  const history=useHistory()
    useEffect(()=>{
      
     getAdsById(id)
    .then(res => {
         console.log(res.data,"==============>addata");
         
           setAdData(res?.data?.data)
          
     
    });
    },[])
    console.log(adData,)
     const filteredAds=getAds?.ads?.filter((data)=>data?._id!==adData?._id)
     const contact=(e)=>{
      console.log(e,"ad id------->")
      setAnimationCheck(true)
      const values={
        contactorId:userId?.id,
        recieverId:e

      }
      createContact(values)
      .then((res)=>{
        if(res.data.message==="contact Generated"){
          setTimeout(() => {
          history.push('/admin/chat')
          },2000)

        }
      })
     }

  return (
    <div className='content'>
    {
    
    //  <Row>
    //  <Col  xl={4}>
    //  <h2 className='home-title'>{userData?.firstName} {userData?.lastName}</h2>
    //  </Col>
    //  <Col  xl={5}>
    //  <div className="home-input-addon">
    //  <InputGroup style={{ borderRadius: '20px' }} >
    //   <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
    //     <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
    //       <FaSearch className="home-search" style={{ color: 'white' }} />
    //     </InputGroupText>
    //   </InputGroupAddon>
    //   <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white' }} placeholder="Search" />
    // </InputGroup>
    // </div>
    //  </Col>

    //  </Row>
    }
    <Row>
    <Col xl={8} className='ml-lg-3'>
    <Card className='ml-lg-5' style={{backgroundColor:"#1E1E1E",borderRadius: "18px",zoom:"0.85",boxShadow:" 0px 0px 16px 3px rgba(0, 0, 0, 0.25)"}}>
   <div
        style={{
          backgroundImage: `url(${adData?.adPic?adData?.adPic:AdDesOne})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '350px',
           width:"",
          position: 'relative',
          borderRadius: "12.5524px",
         
        }}
        className="ml-3 mr-3 mt-3"
      >
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            transform: 'translate(50%, 50%)',
          }}
        >
          <img
            src={adData?.userData?.profilePic?adData?.userData?.profilePic:AdDesTwo}
            alt="Profile"
            className="rounded-circle"
            style={{
              backgroundColor:"#1E1E1E",
              padding:"7px",
              
              height: '100px',
              width: '100px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <Row className='profile-user-row' style={{marginTop:"-15px"}}>
      <Col >
      
      <h4 className='mt-3 user-name mb-0 '>{adData?.userData?.profileName?adData?.userData?.profileName:adData?.userData?.firstName} <span className='ml-1'><FaUserAlt/></span>
       <span><AiOutlineUserAdd style={{fontSize:"25px",marginLeft:"80%"}} className='user-name '/></span></h4>  
       {
      // <p style={{color:" #8B8B8B",fontSize:"10px"}} >{adData?.userData?.profileName?adData?.userData?.profileName:adData?.userData?.firstName}</p>
       }
      <Row>
      <Col>
     <h5 className='mt-3 user-name mb-0 '>Avaialable</h5>
     </Col>
     <Col className='text-right mt-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}} className="mr-lg-5"><Moment format="MM/DD/YYYY">{adData?.date}</Moment> at {adData?.time}</p>
     </Col>
     </Row>
     <hr className='mb-0' style={{backgroundColor:"#969696",height:"1px",marginRight:"7%"}}/>
     <Row>
      <Col>
     <h5 className='mt-3 user-name mb-0 '>Meeting</h5>
     </Col>
     <Col className=' text-right mt-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}} className="mr-lg-5">{adData?.meetingType}</p>
     </Col>
     </Row>
       <hr className='mb-0' style={{backgroundColor:"#969696",height:"1px",marginRight:"7%"}}/>
     <Row>
      
     <Col className='mt-3 mb-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}}>{adData?.description?adData?.description:"The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet,   consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,  sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </p>
     </Col>
     </Row>
</Col>
{
// <Col className='text-right' xl={2}>

// </Col>
}

    </Row>
    {
      id!==userId?.id&&
    <h1 className='text-center mt-3'>
    {
    animationCheck?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
<Button className='reset-button ml-lg-3 reset-button' onClick={()=>contact(adData?.userId)}>Contact</Button>
    }
</h1>
  }
    </Card>
{
  filteredAds?.map((data)=>(
    <Card className='ml-lg-5' style={{backgroundColor:"#1E1E1E",borderRadius: "18px",zoom:"0.85",boxShadow:" 0px 0px 16px 3px rgba(0, 0, 0, 0.25)"}}>
   <div
        style={{
          backgroundImage: `url(${data?.adPic?data?.adPic:AdDesOne})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '350px',
           width:"",
          position: 'relative',
          borderRadius: "12.5524px",
         
        }}
        className="ml-3 mr-3 mt-3"
      >
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            transform: 'translate(50%, 50%)',
          }}
        >
          <img
            src={data?.userData?.profilePic?data?.userData?.profilePic:AdDesTwo}
            alt="Profile"
            className="rounded-circle"
            style={{
              backgroundColor:"#1E1E1E",
              padding:"7px",
              
              height: '100px',
              width: '100px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      <Row className='profile-user-row' style={{marginTop:"-15px"}}>
      <Col >
      
      <h4 className='mt-3 user-name mb-0 '>{data?.userData?.profileName?data?.userData?.profileName:data?.userData?.firstName}<span className='ml-1'><FaUserAlt/></span></h4>
      {
      //  <span><AiOutlineUserAdd style={{fontSize:"25px",marginLeft:"80%",marginTop:"-50px"}} className='user-name '/></span>
      } 
       {
      // <p style={{color:" #8B8B8B",fontSize:"10px"}} >{data?.userData?.profileName?data?.userData?.profileName:data?.userData?.firstName}</p>
       }
      <Row>
      <Col>
     <h5 className='mt-3 user-name mb-0 '>Avaialable</h5>
     </Col>
     <Col className='text-right mt-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}} className="mr-lg-5"><Moment format="MM/DD/YYYY">{data?.date}</Moment> at {data?.time}</p>
     </Col>
     </Row>
     <hr className='mb-0' style={{backgroundColor:"#969696",height:"1px",marginRight:"7%"}}/>
     <Row>
      <Col>
     <h5 className='mt-3 user-name mb-0 '>Meeting</h5>
     </Col>
     <Col className=' text-right mt-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}} className="mr-lg-5">{data?.meetingType}</p>
     </Col>
     </Row>
       <hr className='mb-0' style={{backgroundColor:"#969696",height:"1px",marginRight:"7%"}}/>
     <Row>
      
     <Col className='mt-3 mb-3'>
       <p style={{color:" #8B8B8B",fontSize:"10px",fontWeight:"600"}}>{data?.description?data?.description:"The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet,   consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,  sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </p>
     </Col>
     </Row>
</Col>
{
// <Col className='text-right' xl={2}>

// </Col>
}

    </Row>
    {
      data?.userId!==userId?.id&&
    <h1 className='text-center mt-3'>
    {
    animationCheck?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
<Button className='reset-button ml-lg-3 reset-button' onClick={()=>contact(data?.userId)}>Contact</Button>
    }
</h1>
  }
    
    </Card>
    ))
}
    </Col>
    <Col>
    <ChatPortion/>
    </Col>

    </Row>
    <ToastContainer/>
    </div>
  )
}

export default AdDescription