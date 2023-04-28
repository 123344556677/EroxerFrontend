import React from 'react'
import { Button, ButtonGroup, Card, CardBody, CardImg, CardImgOverlay, CardSubtitle, CardText, CardTitle, Col, Media, Progress, Row } from 'reactstrap'
import DashboardSection from './DashboardSection/DashboardSection'
import './Dashboard.css'
import Tips from './j27.png'
import TipsOne from './j28.png'
import TipsTwo from './j29.png'
import TipsThree from './j30.png'
import { Circle } from 'rc-progress'
import { AiOutlineDollar } from 'react-icons/ai'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';



const Dashboard = () => {
 
  return (
    <div className='content' style={{zoom:"0.80"}}>
    <DashboardSection/>
     <h1 className='text-white' style={{fontStyle:"Roboto",fontWeight:"600"}}>Welcome back Alex</h1>

    <Row>
    
    <Col xl={4} xs={9} md={4}  >
  <Card className='mt-4' style={{backgroundColor:"#161616",borderRadius:"20px"}}>
     
 <h3 className='text-white ml-3 mt-3' style={{fontWeight:"600"}}>Your account</h3> 
 <h4 className='text-white text-center mt-3' style={{fontWeight:"600"}}>$27552</h4> 
 
  
  <CardBody>
    
    <ButtonGroup className="d-flex justify-content-between align-items-end">
      <Button className="dash-send-button">Send</Button>
      <Button className="dash-add-button ml-1">Add</Button>
    </ButtonGroup>
    
    
</CardBody>
  
</Card>
 <Card className='mt-4' style={{backgroundColor:"#161616",borderRadius:"20px"}}>
    <div style={{display:"flex"}}>
 <h3 className='text-white ml-3 mt-3 mb-0' style={{fontWeight:"600"}}>Recent Tips</h3> 
 <AiOutlineDollar className=' mt-4' style={{color:"white",fontSize:"30px",marginLeft:"39%"}}/>
 </div> 

 
  

    <Media className=' mt-3 ml-2 mb-2 chat-media'>
      <Media left>
        <img object style={{width:"40px",height:"40px"}} src={TipsOne} alt="jannan" className="rounded-circle" />
      </Media>
      <Media body className="ml-2 mt-2 ">
    <div style={{display:"flex"}}>
        <p className='text-white 'style={{fontWeight:"600",fontSize:"12px"}}>Lorem ispum</p>
         <p className='text-white 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$5</p>
        </div>
       
      </Media>
      
    </Media>
    <Media className=' mt-2 ml-1 chat-media'>
      <Media left>
        <img object style={{width:"40px",height:"40px"}} src={TipsTwo} alt="jannan" className="rounded-circle" />
      </Media>
      <Media body className="ml-2 mt-2">
       <div style={{display:"flex"}}>
        <p className='text-white 'style={{fontWeight:"600",fontSize:"12px"}}>Lorem ispum</p>
         <p className='text-white 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$5</p>
        </div>
       
      </Media>
      
    </Media>
    <Media className=' mt-2 ml-1 chat-media'>
      <Media left>
        <img object style={{width:"40px",height:"40px"}} src={TipsThree} alt="jannan" className="rounded-circle" />
      </Media>
      <Media body className="ml-2 mt-2">
        <div style={{display:"flex"}}>
        <p className='text-white 'style={{fontWeight:"600",fontSize:"12px"}}>Lorem ispum</p>
         <p className='text-white mb-4 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$5</p>
        </div>
       
      </Media>
      
    </Media>
    
    
    
    

  
</Card>
    
    </Col>
    <Progress className="vertical-progress-bar-whole" now={10} />
    <Col xl={4} xs={9} md={4} className="bar-col" > 
    

  <Card className='mt-4 bar-card' style={{backgroundColor:"#161616",borderRadius:"20px"}}>
     
 
 
  
  <CardBody  className="bar-card-body">
  <Row className='justify-content-center'>
    <div  style={{height:"70%",width:"70%"}}>
<Circle percent={0} strokeWidth={4} strokeColor="white" trailColor="black" /> 
</div>
  <div style={{height:"55%",width:"55%"}}>

<Circle style={{marginTop:"-140%",marginLeft:"2%"}} percent={80} strokeWidth={4} strokeColor="white" trailColor="black" /> 
<div style={{marginTop:"-90%",marginLeft:"38%"}}>
<h3 className='text-white mb-0'>5000$</h3>
<h4 className='ml-2' style={{color:"grey"}}>2000$</h4>
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
    
["5$","10$","100$","500$","100$"].map((data)=>(
  <> 
  <Col>
<Progress className="vertical-progress-bar" now={10} />
<p className='' style={{marginLeft:"-10%"}} >{data}</p>
</Col>
</> 
))
}
</Row>
    
    
</CardBody>
  
</Card>


    
    </Col>
    
    </Row>
    <Progress className="horizontal-progress-bar-whole" now={10} />
     <h3 className='text-white ml-3 mt-2' style={{fontWeight:"600"}}>Active Subscription</h3> 
    
   
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
        className="swiper_container mt-5"   
        style={{
   }}
           
        >
    {
        [1,2,3,4,5,6].map((data)=>(
            <SwiperSlide style={{
                
            width:"22%",
            
           marginLeft:"1%",
           marginRight:"5%",
          
    
        }}>
        <Card className='mt-5 ' style={{backgroundColor:"#161616",borderRadius:"20px"}}>
      <h4 className='text-white ml-3 mt-4 mb-0' style={{fontWeight:"600"}}>Lorem ispum</h4> 
      <CardBody className='mt-5'>
     
     <div style={{display:"flex"}}>
        <p className=' mb-0'style={{color:"grey",fontSize:"10px"}}>Lorem ipsum is dummy <br/>
text no more</p>
         <p className='text-white 'style={{color:"white",fontSize:"15px",marginLeft:"50%"}}>$5</p>
        </div>
  
  
  <img src="https://picsum.photos/100/100" alt="" className='dash-profile'/>
  
 
  
  
  </CardBody>
  
</Card>
          
        </SwiperSlide>

        ))
    }
        
     

        
      </Swiper>
    
    </div>
  )
}

export default Dashboard