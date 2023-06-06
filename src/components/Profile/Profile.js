import React, { useEffect, useState } from "react";

import profilFive from "./j15.png";
import profilSix from "./j33.png";
import profilSeven from "./j27.png";
import profileEight from "./j35.png";
import profileNine from "./j36.png";
import profileTen from "./j40.jpg";
import profileEleven from "./j41.jpg";
import profileTwelve from "./j42.jpg";

import "./Profile.css";
import { MdExpandMore } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { HiOutlineWifi } from "react-icons/hi";
import { AiFillInstagram, AiFillFacebook, AiOutlineEye, AiOutlineLineChart } from "react-icons/ai";
import FileBase64 from "react-file-base64";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Row, Col, CustomInput } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
// import { getUsersById } from 'Api/Api'
import { updateUser } from "Api/Api";
// import { useDispatch, useSelector } from "react-redux";
import { getReduxUserById } from "components/redux/actions/userActions";
import { sendRequest } from "Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { getReduxPostsById } from "components/redux/actions/postActions";
import { changeOnlineStatus } from "Api/Api";
import Poll from "components/Poll/Poll";
import { getUserById } from "components/redux/actions/userActions";
import { getAllUsers } from "components/redux/actions/userActions";
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { updateUserCover } from "Api/Api";


const firebaseConfig = {
  apiKey: "AIzaSyCnY9bzvS6ZiF0wn1_kDGp_ljWGo3sZSxA",
  authDomain: "images-7611f.firebaseapp.com",
  projectId: "images-7611f",
  storageBucket: "images-7611f.appspot.com",
  messagingSenderId: "410713197024",
  appId: "1:410713197024:web:f4cb6a922d309976c38385",
  measurementId: "G-ENS46GYQRS",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const Profile = () => {
  const history = useHistory();
  const { id } = useParams();
  // const dispatch = useDispatch();
  console.log(id, "profile id=========>");
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  // const [userData, setUserData] = useState()
  const [isHovered, setIsHovered] = useState(false);
 
  const [privateCheck, setPrivateCheck] = useState("posts");
  const [requestCheck, setRequestCheck] = useState("none");
  const [backgroundVideoCheck, setBackgroundVideoCheck] = useState(false);
   const [backgroundImage, setBackgroundImage] = useState();
   const getUser= useSelector(state => state.getUserById);
  let sendingId = "";
  if (id === ":id") {
    sendingId = userId.id;
  } else {
    sendingId = id;
  }
  const user = useSelector((state) =>
    getReduxUserById(state?.getAllUsers, sendingId)
  );
  const AllUserPosts = useSelector((state) =>
    getReduxPostsById(state?.getPosts, sendingId)
  );
 
  const userData = user;
  useEffect(()=>{
   const check=userData?.backgroundImage?.includes("video")
   if(check){
    setBackgroundVideoCheck(true)
    setBackgroundImage(userData?.backgroundImage)
   }
   else{
     setBackgroundVideoCheck(false)
    setBackgroundImage(userData?.backgroundImage)
   }
  },[userData])
 
  console.log(userData, "==========>userData");
 const getRecieverId = useSelector(state => state?.getAllSenderRequestReducer);
 const requestUser=getUser?.userData
 const dispatch=useDispatch();
  const values={
        userId:userId.id
      }
 


 let posts=[];
 let privat=[];
 let poll=[];
  
AllUserPosts?.map((data)=>{
    if(data?.postCheck===true){
       privat.push(data)
       console.log("private posts===========>",data)
    }
    if(data?.key==="post"&&data?.postCheck!==true){
   posts.push(data)
    }
    if(data?.key==="poll"){
   poll.push(data)
    }
     
   })
   console.log(getRecieverId,"reciever Id")
useEffect(()=>{
 getRecieverId?.senderAllRequests?.map((data)=>{
   
    if(data?.recieverId===id&&data?.status==="pending"){
      console.log("coming in it------->")
      setRequestCheck("sent")
    }
     if(data?.recieverId===id&&data?.status==="accepted"){
      setRequestCheck("accept")
    }
   
   })
},[requestCheck])
useEffect(() => {
dispatch(getAllUsers())
dispatch(getUserById(values))

},[dispatch])


  
 


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  //  useEffect(()=>{

  //   dispatch(getReduxUserById())

  //  },[dispatch])
  const makeRequest = () => {
    const values = {
      senderId: userId.id,
      recieverId: id,
      status: "pending",
      name:requestUser?.firstName
    };
    sendRequest(values);
    setRequestCheck("sent")
    toast.success("Request sent", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    const values={
      onlineStatus:isChecked,
      userId:userId.id
    }

    changeOnlineStatus(values)
    .then((res)=>{
      if(res.data.message==="updated"){
        toast.success(`Online status turned ${isChecked}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
        
      }
    })
  };
  const handleBackgroundPic = (e) => {
    console.log(e, "pic");
    setBackgroundImage(e.selectedFile.base64);
   
   const type = e.selectedFile.base64.substring(5, 10);
  if (type === 'image') {
    setBackgroundVideoCheck(false)
    
    uploadImageToFirebase(e.selectedFile.base64);
    return 'image';
  } else if (type === 'video') {
    setBackgroundVideoCheck(true)
    uploadVideoToFirebase(e.selectedFile.base64)
  
   console.log("video url============>")
     
  
  }


   
  };
       const uploadVideoToFirebase = (base64Video) => {
  const videoRef = ref(storage, 'videos/' + Date.now() + '.mp4');

  // Upload the base64 video string to Firebase Storage
  uploadString(videoRef, base64Video, 'data_url').then((snapshot) => {
    console.log('Uploaded a video!', snapshot);

    // Get the download URL of the uploaded video
    getDownloadURL(videoRef).then((url) => {
      console.log('Video URL:', url);
      const values = {
      backgroundImage: url,
      userId: userId.id,
    };
    updateUserCover(values).then((res) => {
      if (res.data.message === "user updated") {
        toast.success("Cover photo upated", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      } else {
        toast.error("Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      }
    });
      // Use the video URL as needed (e.g., save to state, display to the user, etc.)
    });
  });
};
 const uploadImageToFirebase = (base64Video) => {
  const fileName = Date.now() + '.jpg';
const fileRef = ref(storage,  fileName);
uploadString(fileRef, base64Video, 'data_url').then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);

  // Get the URL of the uploaded image location
  getDownloadURL(fileRef).then(async(url) => {
    console.log('Image URL:', url);
   const values = {
      backgroundImage: url,
      userId: userId.id,
    };
    updateUserCover(values).then((res) => {
      if (res.data.message === "user updated") {
        toast.success("Cover photo upated", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      } else {
        toast.error("Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      }
    });
  })
})
  
};
const checkPost=(post)=>{
  const check=post?.includes("video")
   if(check){
    return <video loop muted controls autoPlay src={post} className="profile-posts" />
   }
   else{
    console.log(post,"--------------->profile post")
      return   <img src={post} alt="" className="mt-2  ml-lg-4 profile-posts" />
   }
  

 }
  return (
    <div className="content profile-div " style={{ zoom: "0.80" }}>
    {
      backgroundVideoCheck===false&&
      <div
        style={{
          backgroundImage: `url(${
            backgroundImage ? backgroundImage : profilSix
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "350px",
          width: "1060px",
          //  maxWidth:"104%",
          position: "relative",
        }}
        className="profileBackground"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <br />
        <h1 className="text-center mt-5">
          <BsFillImageFill
            className="background-upload"
            style={{ opacity: isHovered ? "1" : "0" }}
          />
        </h1>
        <div
          style={{
            opacity: "0",
            position: "absolute",
            zIndex: "10",
            align: "center",
            marginLeft: "45%",
            marginTop: "-8%",
            fontSize: "30px",
            paddingTop: "15px",
          }}
        >
          <FileBase64
            type="file"
            className="text-center"
            onDone={(base64) => handleBackgroundPic({ selectedFile: base64 })}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            transform: "translate(50%, 50%)",
          }}
        >
          <img
            src={userData?.profilePic ? userData?.profilePic : profilSeven}
            alt="Profile"
            className="rounded-circle"
            style={{
              border: "3px solid white",
              height: "100px",
              width: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    }
    {
      backgroundVideoCheck===true&&
      <div
      style={{
        position: 'relative',
        height: '350px',
        width: '1060px',
      }}
      className="profileBackground"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <video
        
        src={backgroundImage}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // objectFit: 'cover',
        }}
        loop
        muted
        controls
        autoPlay
      />
      <br />
        <h1 className="text-center mt-5">
          <BsFillImageFill
            className="background-upload"
            style={{ opacity: isHovered ? "1" : "0" }}
          />
        </h1>
        <div
          style={{
            opacity: "0",
            position: "absolute",
            zIndex: "10",
            align: "center",
            marginLeft: "45%",
            marginTop: "-8%",
            fontSize: "30px",
            paddingTop: "15px",
          }}
        >
          <FileBase64
            type="file"
            className="text-center"
            onDone={(base64) => handleBackgroundPic({ selectedFile: base64 })}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            transform: "translate(50%, 50%)",
          }}
        >
          <img
            src={userData?.profilePic ? userData?.profilePic : profilSeven}
            alt="Profile"
            className="rounded-circle"
            style={{
              border: "3px solid white",
              height: "100px",
              width: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    }
      <Row className="profile-user-row">
        <Col>
          <Row className="mb-0">
            <h3 className="mt-3 user-name mb-0 ">
              {userData?.username ? userData?.username : "@ alexrock"}
            </h3>
{
              id===':id'&&
              <>
            <CustomInput
              type="switch"
              id="exampleCustomSwitch"
              name="customSwitch"
              checked={isChecked}
              onClick={toggleSwitch}
              className="mt-4 ml-2"
            />
            <Button
              className="btn-sm mt-4 mr-2 profile-button"
              onClick={() => history.push("/admin/editProfile")}
            >
              Edit Profile
            </Button>
</>
}
            <Button
              className={id===':id'?"add-button btn-sm btn-dark mt-4":" add-button btn-sm btn-dark ml-3 mt-3"}
              onClick={makeRequest}
            >
            {
              requestCheck==="sent"&&
              <span style={{color:"white"}}>Request sent</span>

            }
            {
              requestCheck==="none"&&
              <i className="fas fa-user" style={{ marginRight: "10px" }} />

            }
            {
              requestCheck==="accept"&&
              <>
              <i className="fas fa-user" style={{ marginRight: "10px" }} />
              <img alt="" src={profilFive} style={{ color: "white" }} />
              </>
            }
            </Button>
            {
            //   id===':id'&&
            //   {
            //   // <>
            // // <MdExpandMore
            // //   className="mt-4"
            // //   style={{ fontSize: "30px", color: "white" }}
            // // />
            // // <IoIosMore
            // //   className="mt-4"
            // //   style={{ fontSize: "30px", color: "white" }}
            // // />
            // // </>
            //   }
            }
          </Row>

          <p className=" profile-designation mt-0 ">software Engineer</p>
          <Row>
            <Button className="btn-sm mt-3 ml-2 profile-button">
              <HiOutlineWifi
                className="mr-2 "
                style={{ fontSize: "20px", color: "white" }}
              />
              subscribe
            </Button>
            <Button
              className="add-button btn-sm  mt-3 p-1"
              style={{ border: "2px solid white" }}
            >
              1K
            </Button>
          </Row>
          <Row>
          <Col xl={3}>
          <h4 className="text-white mt-1 mb-0" style={{ fontWeight: "600" }}>
            About
          </h4>
          <p>
            {userData?.about
              ? userData?.about
              : "Im A professional engeenier and also a Designer i want to met someone thats why i here"}
          </p>
          </Col>
          <Col xl={3}>
          <h4 className="text-white mt-1 mb-0" style={{ fontWeight: "600" }}>
            Wishlist
          </h4>
          {
            userData?.profileWishlist?.map((data,index)=>(

            <p style={{ color: "blue",cursor:"pointer" }} key={index}>
            { data?data:"Wish list Empty!"}
          </p>
            ))
            }
          </Col>
          </Row>
          <a href="www.erroxr.com/web/alexrock" style={{ color: "blue" }}>
            {userData?.website
              ? userData?.website
              : "www.erroxr.com/web/alexrock"}
          </a>
          <Row>
            <AiFillInstagram
              className="ml-3"
              style={{ color: "white", fontSize: "20px" }}
            />
            <AiFillFacebook
              className="ml-2"
              style={{ color: "white", fontSize: "20px" }}
            />
          </Row>
        </Col>
      </Row>
      <hr
        style={{ backgroundColor: "#555555", height: "2px" }}
        className="mr-3 ml-5"
      />

      <div
        className=""
        style={{ marginTop: "-10px", marginLeft: "10%", display: "flex" }}
      >
        <img
          src={profileEight} alt=""
          style={{ color: "white", width: "18px", height: "18px" }}
          className="ml-5"
        />
        <span className="ml-2" onClick={()=>setPrivateCheck("posts")} style={{ color:privateCheck==="posts"&&"white", fontWeight: "600",cursor:"pointer" }}>
          Posts
        </span>

        <img
          src={profileNine} alt=""
          style={{ color: "white", width: "18px", height: "18px",cursor:"pointer" }}
          className="ml-lg-5"
        />
        <span className="ml-2" style={{ fontWeight: "600",cursor:"pointer" }}>
          Tagged
        </span>
         {
              id===':id'&&
         <>
        <AiOutlineEye
          style={{ color: "grey", fontSize: "20px",cursor:"pointer" }}
          className="ml-lg-5"
        />
         
        <span className="ml-2"onClick={()=>setPrivateCheck("private")} style={{ fontWeight: "600",cursor:"pointer", color:privateCheck==="private"&&"white" }}>
          Private
        </span>
        </>
        }
        <AiOutlineLineChart
          style={{ color: "grey", fontSize: "20px",cursor:"pointer" }}
          className="ml-lg-5"
        />
         
        <span className="ml-2"onClick={()=>setPrivateCheck("poll")} style={{ fontWeight: "600",cursor:"pointer", color:privateCheck==="poll"&&"white" }}>
          Poll
        </span>
      </div>

      <Row className=" mt-2 ml-lg-4">
      {
        privateCheck==="posts"&&
        posts?.map((data)=>(
        <Col xl={4} className="">
          {
          // <img src={data.postPic} alt="" className="mt-2  ml-lg-4 profile-posts" />
        checkPost(data?.postPic)
        }
        
        </Col>
        ))
      }
      {
          privateCheck==="private"&&
      
        privat?.map((data)=>(
        <Col xl={4} className="">
        {
          // <img src={data.postPic} alt="" className="mt-2  ml-lg-4 profile-posts" />
       checkPost(data?.postPic)
        }
        </Col>
        ))
      }
      {
          privateCheck==="poll"&&
      
        poll?.map((data)=>(
        <Col xl={6} className=" mt-5">
          <Poll data={data}/>
        </Col>
        ))
      }
       
        {
          // <Col xl={3}>
          // <img src={profilFour} className="mt-2 "/>
          // </Col>
        }
      </Row>

      <ToastContainer />
    </div>
  );
};

export default Profile;
