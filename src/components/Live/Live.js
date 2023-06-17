import React from "react";
import "./Live.css";
import { Row, Col, Button } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import LiveSection from "./LiveSection/LiveSection";
import { AiFillHeart } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import liveOne from "./j32.png";
import liveTwo from "./j33.png";
import liveFour from "./j39.jpg";
import liveFive from "./j40.jpg";
import liveSix from "./j41.jpg";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LiveThumbModal from "components/Modals/LiveThumbModal";
import { useEffect } from "react";
import { getAllUsers } from "components/redux/actions/userActions";
import { BsCameraVideoFill } from "react-icons/bs";
import EroxrFeeModal from 'components/Modals/EroxrFeeModal'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');

const Live = () => {
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const [streamThumb, setStreamThumb] = useState([]);
   const [showModal, setShowModal] = useState(false);
  // const streams = [
  //   {
  //     pic: liveFour,
  //   },
  //   {
  //     pic: liveFive,
  //   },
  //   {
  //     pic: liveSix,
  //   },
  //   {
  //     pic: liveFour,
  //   },
  //   {
  //     pic: liveFive,
  //   },
  //   {
  //     pic: liveSix,
  //   },
  // ];
  const carouselStreams = [
    {
      pic: liveOne,
    },
    {
      pic: liveTwo,
    },
    {
      pic: liveSix,
    },
    {
      pic: liveOne,
    },
    {
      pic: liveTwo,
    },
    {
      pic: liveSix,
    },
  ];
const getUser = useSelector((state) => state?.getUserById);
const userData = getUser?.userData;
 const getAllUser= useSelector(state => state?.getAllUsers);
  const AllUser=getAllUser?.allUsers

const history=useHistory()
const dispatch=useDispatch()
const checkBackgroundImage=(e)=>{
  const check=e?.backgroundImage?.includes("video")
   if(check){
   return <video controls autoplay muted className=" streams-image-two mt-2" src={e?.backgroundImage} style={{ height: "210px",cursor:"pointer" }} alt="" onClick={()=>history.push(`/admin/liveStreaming/${e?._id}`)} />
   }
   else{
    return <img className=" streams-image-two mt-2" src={e?.backgroundImage?e?.backgroundImage:liveFive} style={{ height: "210px",cursor:"pointer" }} alt="" onClick={()=>history.push(`/admin/liveStreaming/${e?._id}`)}/>
   }


}
const checkSliderImage=(e)=>{
  const check=e?.backgroundImage?.includes("video")
   if(check){
   return <video controls autoplay muted className=" " src={e?.backgroundImage} style={{borderRadius: "40px",width: "500px",  height: "300px", cursor:"pointer"}} alt="" onClick={()=>history.push(`/admin/liveStreaming/${e?._id}`)} />
   }
   else{
    return <img className="" style={{borderRadius: "40px",width: "1000px",  height: "300px", cursor:"pointer"}} src={e?.backgroundImage?e?.backgroundImage:liveFive} alt="" onClick={()=>history.push(`/admin/liveStreaming/${e?._id}`)}/>
   }


}
useEffect(()=>{
           
        setStreamThumb(AllUser?.filter(data=>data?.liveStreamStatus==="live"&&data?._id!==userId.id))
        },[])

    //     useEffect(() => {
     
    //   dispatch(getAllUsers())
   
        
    // }, [dispatch])
    const makeLiveStream = () => {
     history.push(`/admin/liveStreaming/${userId?.id}`);
   
  };

  




const closeModal = () => {
    setShowModal(false);
  };




  return (
    <div className="content" style={{ zoom: "0.90" }}>
      <LiveSection />
      <Elements stripe={stripePromise} className="" >
    <EroxrFeeModal isOpen={showModal} toggle={closeModal}/>
    </Elements>
      <div className="main-live">
      {
      userData?.creator===true&&
      userData?.eroxrFee===true&&
      <>
      <Row>
      <Col>
        <h1
          className="text-white mt-3"
          style={{ fontStyle: "Roboto", fontWeight: "600" }}
        >
          Live Streaming
        </h1>
        </Col>
        <Col className="text-right mr-3">
       <Button className="reset-button" style={{fontSize:"22px"}} onClick={makeLiveStream}>
 <BsCameraVideoFill className="mr-lg-3" style={{fontSize:"25px"}}/>  Go live</Button>
        
          
          
       
          
        </Col>
        </Row>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={ "3"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {streamThumb?
            streamThumb?.map((data) => (
            <SwiperSlide
              style={{
                width: "40%",
              }}
            >
               {checkSliderImage(data)}
              {
              // <div
              //   style={{
              //     display: "flex",
              //     justifyContent: "end",
              //     marginRight: "20px",
              //   }}
              //   className="ml-4"
              // >

              //   <AiFillHeart className="heart-live-pic" />
              //   <FaShare className="share-live-pic" />
              // </div>
              }
            </SwiperSlide>
          ))
        :
        <h3 className="text-center ml-lg-3 mt-5">No one streaming!</h3>
        }
          

          <div className="slider-controler">
            <div
              className="swiper-button-prev slider-arrow"
              style={{ color: "white" }}
            >
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div
              className="swiper-button-next slider-arrow"
              style={{ color: "white" }}
            >
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </Swiper>

        <h3 className="text-white mt-2" style={{ fontStyle: "Roboto" }}>
          Streams You Might Be Like
        </h3>
        <Row>
          {
            streamThumb?
            streamThumb?.map((data) => (
            <Col xl={4}>
            {checkBackgroundImage(data)}
              

              <p alt="" className="stream-live ml-4 text-center">
                Live
              </p>
            </Col>
           
          ))
           :
            <h3 className="text-center ml-lg-3 mt-5">No one streaming!</h3>
            }
        </Row>
        </>
          }
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
      userData?.eroxrFee===true&&
      userData?.creator===false&&
      
   <Col xl={10} className=''>  
   <Row className='justify-content-center mt-5'>
    <lottie-player className="mr-lg-5"  src="https://assets7.lottiefiles.com/private_files/lf30_pljwgbzs.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
    
   </Row>
   <h1 className='text-center'>
   <Button type='submit'onClick={()=>history.push('/admin/memeberShip')} className='reset-button mr-2' style={{paddingLeft:"200px",paddingRight:"210px"}} >Become a creator!</Button>
   </h1>
   </Col>    // <h3  className='ml-lg-5'>Please become eroxr member by buying our member ship!</h3>
    
     
      }

      </div>

      
    </div>
  );
};

export default Live;
