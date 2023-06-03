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

const Live = () => {
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const [streamThumb, setStreamThumb] = useState([]);
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
  const check=e?.backgroundImage.includes("video")
   if(check){
   return <video controls autoplay muted className=" streams-image-two mt-2" src={e?.backgroundImage} style={{ height: "210px", width: "550px",cursor:"pointer" }} alt="" onClick={()=>history.push(`/admin/liveStreaming/${e?._id}`)} />
   }
   else{
    return <img className=" streams-image-two mt-2" src={e?.backgroundImage} style={{ height: "210px", width: "550px",cursor:"pointer" }} alt="" onClick={()=>history.push(`/admin/liveStreaming/${e?._id}`)}/>
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

  









  return (
    <div className="content" style={{ zoom: "0.90" }}>
      <LiveSection />
      <div className="main-live">
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
              <img
                src={data.thumbPic}
                alt="slide_image"
                style={{
                  borderRadius: "40px",
                  width: "1000px",
                  height: "300px",
                  cursor:"pointer"
                }}
                onClick={()=>history.push(`/admin/liveStreaming/${data?._id}`)}
              />
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
      </div>
    </div>
  );
};

export default Live;
