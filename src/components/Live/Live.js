import React, { useState } from 'react'
import './Live.css'
import { Carousel, CarouselItem, CarouselControl, Row, Col } from "reactstrap";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import LiveSection from './LiveSection/LiveSection';
import { AiFillHeart } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa';
import liveOne from './j32.png'
import liveTwo from './j33.png'
import liveThree from './j34.png'
import liveFour from './j35.png'
import liveFive from './j36.png'
import liveSix from './j37.png'



const Live = () => {
const streams=[
    {
    pic:liveFour,
},
  {
    pic:liveFive,
},
  {
    pic:liveSix,
},
   {
    pic:liveFour,
},
  {
    pic:liveFive,
},
  {
    pic:liveSix,
},
 

 
]
const carouselStreams=[
    {
    pic:liveOne,
},
  {
    pic:liveTwo,
},
  {
    pic:liveSix,
},
    {
    pic:liveOne,
},
  {
    pic:liveTwo,
},
  {
    pic:liveSix,
},
 
]
  return (
    <div className='content'  style={{zoom:"0.75"}} >
   
   
     <LiveSection/>
      <div className='main-live' >
    
   
   <h1 className='text-white mt-1' style={{fontStyle:"Roboto",fontWeight:"600"}}>Live Streaming</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container" 
        
           
        >
    {
        carouselStreams.map((data)=>(
            <SwiperSlide style={{
            width:"40%"
        }}>
          <img src={data.pic} alt="slide_image" style={{borderRadius:"40px",width:"1000px",height:"300px"}} />
           <div style={{display:"flex",justifyContent:"end",marginRight:"20px"}} className="ml-4">
  <AiFillHeart className='heart-live-pic'/>
  <FaShare className='share-live-pic'/>
  
  </div>
        </SwiperSlide>

        ))
    }
        
     

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"  style={{color:"white"}}>
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow" style={{color:"white"}}>
            <ion-icon name="arrow-forward-outline"  ></ion-icon>
          </div>
         
        </div>
      </Swiper>

      <h3 className='text-white mt-2' style={{fontStyle:"Roboto"}}>Streams You Might Be Like</h3>
      <Row >
      {
        streams.map((data)=>(

       
      <Col xl={4}>
      <img className=' streams-image-two mt-2' src={data.pic}/>
      
  
  
  <p alt="" className='stream-live ml-4 text-center'>Live</p>
      </Col>

       ))
      }
      </Row>
      
      
      </div>

    </div>
   
  )
}

export default Live