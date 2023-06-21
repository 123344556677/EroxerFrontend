import React from 'react'
import { Button, ButtonGroup, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Col, Media, Progress, Row } from 'reactstrap'
import DashboardSection from './DashboardSection/DashboardSection'
import './Dashboard.css'

import TipsOne from './dummy.jpg'

import { Circle } from 'rc-progress'
import { AiOutlineDollar } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getReduxSubscribedUser } from 'components/redux/actions/paymentAction'
import { createPaymentRequest } from 'Api/Api'
import { toast,ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { getUserById } from 'components/redux/actions/userActions'
import { getAllCreatorRequest } from 'components/redux/actions/creatorActions'
import { getAllTip } from 'components/redux/actions/paymentAction'
import EroxrFeeModal from 'components/Modals/EroxrFeeModal'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useHistory } from 'react-router-dom'
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');



const Dashboard = () => {
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const [theme, setTheme] = useState(false);
  const tipUsers = useSelector((state) =>
    getReduxSubscribedUser(state?.getAllTip, userId?.id)
  );
  const subscribedUsers= useSelector(state => state?.getAllSenderRequestReducer);
  const subscribedData=subscribedUsers?.senderAllRequests
  const getUser= useSelector(state => state?.getUserById);
  const userData=getUser?.userData
  console.log(tipUsers,"users subscribed======>")
  const Values={
    userId:userId.id
  }
  const history=useHistory()
  const [showModal, setShowModal] = useState(false);
  const dispatch=useDispatch()
  let total = 0;
  let tips = 0;
  let subscriptions = 0;

subscribedData?.map((data) => {
  total += data?.paymentData?.payment || 0;
  subscriptions += data?.paymentData?.payment || 0;
});

tipUsers?.map((data) => {
  total += data?.paymentData?.tip || 0;
  tips += data?.paymentData?.tip || 0;
});
const withdraw=()=>{
  const values={
    userId:userId?.id,
    userData:userData,
    payment:total,

  }
  if(total>0){
  createPaymentRequest(values)
  .then((res)=>{
    if(res?.data?.message==="request Generated"){
      toast.success('you will get your payment,once our team verify your request!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });

    }
    else{
       toast.error('Server error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });

    }
  })
}
else{
  toast.warn('Your balance is $0', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
}
}
 useEffect(() => {
      dispatch(getUserById(Values))
     
      dispatch(getAllCreatorRequest())
      dispatch(getAllTip())
        
    }, [dispatch])
    const closeModal = () => {
    setShowModal(false);
  };
 
  return (
    <div className='content' style={{zoom:"0.75"}}>
     <Elements stripe={stripePromise} className="" >
    <EroxrFeeModal isOpen={showModal} toggle={closeModal}/>
    </Elements>
    {
      userData?.eroxrFee===false&&
      userData?.creator===false&&
      
   <Col xl={10} className=''>  
   <Row className='justify-content-center mt-5'>
    <lottie-player className="mr-lg-5"  src="https://assets5.lottiefiles.com/packages/lf20_bogmlqx0.json"  background="transparent"  speed="1"  style={{width: "150px", height: "150px"}}  loop  autoplay></lottie-player>
    
   </Row>
   <h1 className='text-center'>
   <Button type='submit'onClick={()=>setShowModal(true)} className='reset-button mr-2' style={{paddingLeft:"200px",paddingRight:"210px"}} >Buy our MemberShip!</Button>
   </h1>
   </Col>    // <h3  className='ml-lg-5'>Please become eroxr member by buying our member ship!</h3>
    
     
      }
      {
      userData?.eroxrFee===false&&
      userData?.creator===true&&
      
   <Col xl={10} className=''>  
   <Row className='justify-content-center mt-5'>
    <lottie-player className="mr-lg-5"  src="https://assets5.lottiefiles.com/packages/lf20_bogmlqx0.json"  background="transparent"  speed="1"  style={{width: "150px", height: "150px"}}  loop  autoplay></lottie-player>
    
   </Row>
   <h1 className='text-center'>
   <Button type='submit'onClick={()=>setShowModal(true)} className='reset-button mr-2' style={{paddingLeft:"200px",paddingRight:"210px"}} >Buy our MemberShip!</Button>
   </h1>
   </Col>    // <h3  className='ml-lg-5'>Please become eroxr member by buying our member ship!</h3>
    
     
      }
      {
      userData?.eroxrFee===true&&
      userData?.creator===false&&
      
   <Col xl={10} className=''>  
   <Row className='justify-content-center mt-5'>
    <lottie-player className="mr-lg-5"  src="https://assets7.lottiefiles.com/private_files/lf30_pljwgbzs.json"  background="transparent"  speed="1"  style={{width: "150px", height: "150px"}}  loop  autoplay></lottie-player>
    
   </Row>
   <h1 className='text-center'>
   <Button type='submit'onClick={()=>history.push('/admin/memberShip')} className='reset-button mr-2' style={{paddingLeft:"200px",paddingRight:"210px"}} >Become a creator!</Button>
   </h1>
   </Col>    // <h3  className='ml-lg-5'>Please become eroxr member by buying our member ship!</h3>
    
     
      }
       {
      userData?.creator===true&&
      userData?.eroxrFee===true&&
      <>
    <DashboardSection/>
    
     

    <Row className='ml-lg-4'>
    
    <Col xl={4} xs={9} md={4} className="ml-lg-5" >
    <h2 className='text-white ml-lg-2' style={{fontStyle:"Roboto",fontWeight:"600"}}>Welcome back {userData?.username?userData?.username:userData?.firstName}!</h2>
  <Card className='mt-4' style={{backgroundColor:"#161616",borderRadius:"20px",width:"80%"}}>
     
 <h3 className='text-white ml-3 mt-3' style={{fontWeight:"600"}}>Your account</h3> 
 <h3 className='text-white text-center mt-3 mb-5' style={{fontWeight:"600"}}>$ {total}</h3> 
 
  {
//   <CardBody>
    
//     <ButtonGroup className="d-flex justify-content-between align-items-end">
//       <Button className="dash-send-button">Send</Button>
//       <Button className="dash-add-button ml-1">Add</Button>
//     </ButtonGroup>
    
    
// </CardBody>
  }
  
  <CardBody>
    
    <ButtonGroup className="d-flex justify-content-between align-items-end">
      <Button className="dash-send-button" onClick={withdraw}>Request Withdrawal</Button>
     
    </ButtonGroup>
    
    
</CardBody>
  
  
</Card>
 <Card className='mt-4 tip-card' >
    <Row>
    <Col>
 <h3 className='text-white ml-3 mt-3 mb-0' style={{fontWeight:"600"}}>Recent Tips</h3> 
 </Col>
 <Col className='text-right mr-lg-5'>
 <AiOutlineDollar className=' mt-4' style={{color:"white",fontSize:"30px"}}/>
</Col>
 </Row> 

 
  
{
  tipUsers?.length?
  tipUsers?.map((data)=>(
    <Row>
    <Col>
    <Media className=' mt-3 ml-2 mb-2 chat-media'>
      <Media left>
        <img object style={{width:"40px",height:"40px"}} src={data?.paymentData?.senderData?.profilePic?data?.paymentData?.senderData?.profilePic:TipsOne} alt="jannan" className="rounded-circle" />
      </Media>
      <Media body className="ml-2 mt-2 ">
   
        <p className='text-white 'style={{fontWeight:"600",fontSize:"12px"}}>{data?.paymentData?.senderData?.username?data?.paymentData?.senderData?.username:data?.paymentData?.senderData?.firstName}</p>
        </Media>
      
    </Media>
    </Col>
    <Col className='text-right'>
    
         <p className='text-white mt-3 mr-lg-5 'style={{color:"white",fontSize:"15px"}}>$ {data?.paymentData?.tip}</p>
         </Col>
         
         </Row>
        
       
      
    ))
    :
    <h2 className='text-center text-white mt-2'>No tips!</h2>
}

    {
    // <Media className=' mt-2 ml-1 chat-media'>
    //   <Media left>
    //     <img object style={{width:"40px",height:"40px"}} src={TipsTwo} alt="jannan" className="rounded-circle" />
    //   </Media>
    //   <Media body className="ml-2 mt-2">
    //    <div style={{display:"flex"}}>
    //     <p className='text-white 'style={{fontWeight:"600",fontSize:"12px"}}>Lorem ispum</p>
    //      <p className='text-white 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$5</p>
    //     </div>
       
    //   </Media>
      
    // </Media>
    // <Media className=' mt-2 ml-1 chat-media'>
    //   <Media left>
    //     <img object style={{width:"40px",height:"40px"}} src={TipsThree} alt="jannan" className="rounded-circle" />
    //   </Media>
    //   <Media body className="ml-2 mt-2">
    //     <div style={{display:"flex"}}>
    //     <p className='text-white 'style={{fontWeight:"600",fontSize:"12px"}}>Lorem ispum</p>
    //      <p className='text-white mb-4 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$5</p>
    //     </div>
       
    //   </Media>
      
    // </Media>
    }
    
    
    
    

  
</Card>
    
    </Col>
    <Progress className="vertical-progress-bar-whole" now={10} />
    <Col xl={4} xs={9} md={4} className="bar-col" > 
    

  <Card className='mt-4 bar-card' style={{backgroundColor:"#161616",borderRadius:"20px"}}>
     
 
 
  
  <CardBody  className="bar-card-body">
  <Row className='justify-content-center mt-5'>
    <div className='mt-2'  style={{height:"50%",width:"50%"}}>
<Circle percent={0} strokeWidth={4} strokeColor="white" trailColor="black" /> 
</div>
  <div style={{height:"40%",width:"40%",marginLeft:"-40%"}}>

<Circle style={{marginTop:"14%",marginRight:"10%",marginLeft:"-12%"}} percent={80} strokeWidth={4} strokeColor="white" trailColor="black" /> 
<div style={{marginTop:"-60%",marginLeft:"25%"}}>
<h3 className='text-white mb-0'>${subscriptions}</h3>
<h4 className='ml-2' style={{color:"grey"}}>${tips}</h4>
</div>
</div>
</Row>
<h3 className='text-white mb-0 mt-3' style={{fontStyle:"Roboto",fontWeight:"600"}}>Weekly Tips</h3>
<div style={{display:"inline"}}>
<span style={{color:"grey",fontWeight:"600"}}>Rate</span>
<hr style={{backgroundColor:"white",marginTop:"-10px"}} className="ml-5"/>
</div>
 
<Row>

{
tipUsers?.length?  
tipUsers?.map((data,index)=>(
 index<6&&
  <> 
  <Col xl={2}>
<Progress className="vertical-progress-bar" now={10} />
<p className='' style={{}} >$ {data?.paymentData?.tip}</p>
</Col>
</> 
))
:
<Row className='justify-content-center'>
<h2 className='text-center text-white  ml-lg-5'>No tips!</h2>
</Row>

}
</Row>
    
    
</CardBody>
  
</Card>


    
    </Col>
    
    </Row>
    <Progress className="horizontal-progress-bar-whole" now={10} />
     <h3 className='text-white  mt-2' style={{fontWeight:"600",marginLeft:"6%"}}>Active Subscription</h3> 
    
   
 <Swiper
        effect={'coverflow'}
        grabCursor={true}
        // centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 2,
          modifier: 0,
          
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container mt-2"   
        style={{
          marginLeft:"3%"
   }}
           
        >
    {
       subscribedData?.length?
        subscribedData?.map((data)=>(
            <SwiperSlide style={{
                
            
            
           marginLeft:"3%",
           marginRight:"5%",
          
    
        }}
        className="dashboard-slider"
        >
        <Card className='mt-5 ' style={{backgroundColor:"#161616",borderRadius:"20px"}}>
      <h4 className='text-white ml-3 mt-4 mb-0' style={{fontWeight:"600"}}>{data?.userData?.username?data?.userData?.username:data?.userData?.firstName}</h4> 
      <CardBody className='mt-5'>
     
     <div style={{display:"flex"}}>
        <p className=' mb-0'style={{color:"grey",fontSize:"10px",fontWeight:"700"}}>{data?.userData?.email?data?.userData?.email:"dummyMail@gmail.com"}</p>
         <p className='text-white 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$ {data?.paymentData?.payment}</p>
        </div>
  
  
  <img src={data?.userData?.profilePic?data?.userData?.profilePic:TipsOne} alt="" className='dash-profile'/>
  
 
  
  
  </CardBody>
  
</Card>
          
        </SwiperSlide>

        ))
        :
        <h2 className='text-center text-white '>No subscriptions!</h2>
    }
        
     

        
      </Swiper>
      </>
  }
    <ToastContainer/>
    </div>
  )
}

export default Dashboard