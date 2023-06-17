import ChatPortion from 'components/ChatPortion/ChatPortion'
import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Card, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import postOne from './j46.png'
import FileBase64 from "react-file-base64";
import './post.css'
import { createPost } from 'Api/Api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsersById } from 'Api/Api'
import { getPosts } from 'components/redux/actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import RecordRTC from 'recordrtc';
import { getUserById } from 'components/redux/actions/userActions'
import { useHistory } from 'react-router-dom'
import EroxrFeeModal from 'components/Modals/EroxrFeeModal'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');



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

const CreateAd = () => {
  const [postPic, setPostPic] = useState();
  const [postCheck, setPostCheck] = useState(false);
  const [postVideoCheck, setPostVideoCheck] = useState(false);
  const [commentsCheck, setCommentsCheck] = useState(false);
  const [price, setPrice] = useState(0);
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const [showModal, setShowModal] = useState(false);

  // const [userData, setUserData] = useState()
  const [postUrl, setPostUrl] = useState()
  const [animationCheck, setAnimationCheck] = useState(false)
   const recorderRef = useRef(null);
  const videoRef = useRef(null);
   const getUser= useSelector(state => state?.getUserById);
  const userData=getUser?.userData
  
  const history=useHistory()
  const dispatch=useDispatch()
    const Values={
        userId:userId.id
      }
      useEffect(()=>{
      
        dispatch(getUserById(Values))
     },[])
    //  useEffect(()=>{
      
    //    getUsersById(Values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //       } 
     
    // });
    //  },[])
     let Url=''
   const handlePostPic=(e)=>{
        setPostPic(e.selectedFile.base64);
  const type = e.selectedFile.base64.substring(5, 10);
  if (type === 'image') {
    setPostVideoCheck(false)
    uploadImageToFirebase(e.selectedFile.base64);
    return 'image';
  } else if (type === 'video') {
    setPostVideoCheck(true)
  //  blobUrl=getBlobUrl(e.selectedFile.base64)
   uploadVideoToFirebase(e.selectedFile.base64);
   console.log("video url============>")
  
  }
  return 'unknown';

        
        
    }
    const uploadVideoToFirebase = (base64Video) => {
  const videoRef = ref(storage, 'videos/' + Date.now() + '.mp4');

  // Upload the base64 video string to Firebase Storage
  uploadString(videoRef, base64Video, 'data_url').then((snapshot) => {
    console.log('Uploaded a video!', snapshot);

    // Get the download URL of the uploaded video
    getDownloadURL(videoRef).then((url) => {
      console.log('Video URL:', url);
      setPostUrl(url)
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
    setPostUrl(url)
  })
})
  
};

  
//   const uploadVideoToFirebase = (base64Video) => {
//   const storageRef = storage().ref();
//   const videoBlob = base64ToBlob(base64Video);
//    const fileName = `video_${Date.now()}.mp4`;
//    const fileRef = ref(storage,  fileName);
  

//   const uploadTask = storageRef.child(fileRef).put(videoBlob);

//   uploadTask.then(() => {
//     storageRef.child(fileRef).getDownloadURL().then((url) => {
//       console.log('Firebase Video URL:', url);
//       // Use the Firebase download URL as needed (e.g., save to state, display to the user, etc.)
//     });
//   });
// };

//   const base64ToBlob = (base64String) => {
//   const byteCharacters = atob(base64String);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//     const slice = byteCharacters.slice(offset, offset + 512);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   const videoBlob = new Blob(byteArrays, { type: 'video/mp4' });
//   return videoBlob;
// };  
//  function getBlobUrl(base64String) {
//   const byteCharacters = atob(base64String);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//     const slice = byteCharacters.slice(offset, offset + 512);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, { type: 'video/mp4' });
//   const blobUrl = URL.createObjectURL(blob);
//   return blobUrl;
// }
     const handleCheckboxChange = () => {
    setPostCheck(!postCheck);
  };
  const handleCommentsChange = () => {
    setCommentsCheck(!postCheck);
  };

  // const decodeBase64 = (base64String) => {
  //   const binaryString = window.atob(base64String);
  //   const bytes = new Uint8Array(binaryString.length);
  //   for (let i = 0; i < binaryString.length; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return bytes.buffer;
  // };
  
  const post=async()=>{
    // const decodedPost = Buffer.from(postPic, 'base64').toString();
    // const decodedProfile = Buffer.from(userData?.profilePic, 'base64').toString();
  console.log(postUrl,"data========>")
   setAnimationCheck(true)
    

    // Use the image URL in an <img> tag
    const values={
      userId:userId.id,
      postPic:postUrl,
      postCheck:postCheck,
      commentsCheck:commentsCheck,
      price:price,
      postProfilePic:userData?.profilePic,
      userData:userData,
      key:"post"
    }
    console.log(values,"data========>")
    if(postCheck===true){
    if(price){
    await createPost(values)
    .then((res)=>{
      if (res.data.message === "post Generated") {
             toast.success('Post Created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    dispatch(getPosts())
   setTimeout(() => {
          history.push("/admin/home");
        }, 2000);
   
  }
  else{
    toast.error('Server Error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setAnimationCheck(false)
  }
    })
  }
  else{
    setAnimationCheck(false)
    toast.warn('Please add some price', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
    
      theme: 'dark',
     
    });

  }
}
else{
    await createPost(values)
    .then((res)=>{
      if (res.data.message === "post Generated") {
             toast.success('Post Created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    dispatch(getPosts())
   setTimeout(() => {
          history.push("/admin/home");
        }, 2000);
   
  }
  else{
    toast.error('Server Error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setAnimationCheck(false)
  }
    })

  }
   
 

       
    
    
  

  }
 


const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='content'>
    <Elements stripe={stripePromise} className="" >
    <EroxrFeeModal isOpen={showModal} toggle={closeModal}/>
    </Elements>
    <Row>
    {
      userData?.creator===true&&
      userData?.eroxrFee===true&&
    <Col xl={10}>
    {
    // <Row>
    
    // <Col xl={11}>
    // <Row>
    //  <Col>
    //  <h1 className='home-title'>Alex Rock</h1>
    //  </Col>
    //  <Col  xl={8} className="text-right">
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
    // </Col>
    // </Row>
    }
    <Row className='justify-content-center mr-lg-5'>
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
    {
      postVideoCheck===false&&
    
    <img src={postPic?postPic:postOne} alt="" style={{width:postPic&&"80%",zIndex:"5"}}/>
    }
    
    {
      postVideoCheck===true&&
    
    <video controls src={postPic} style={{width:postPic&&"80%",zIndex:"5"}}/>
    }
     
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
{
// <div class="input-group mt-3">
//   <input type="text" class="form-control ad-input" placeholder="Allow Comments"/>
//   <div class="input-group-append" className='switch-input'>
//     <label class="switch">
//       <input type="checkbox"  onChange={handleCommentsChange} />
//       <span class="slider round"></span>
//     </label>
//   </div>
// </div>
}

{
  postCheck===true&&
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
}

    

    
     
      
       
    <Row className='justify-content-end mt-3'>
    {
      animationCheck?
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      :
    
    
    <Button className='reset-button mr-2' onClick={post}>Submit</Button>
    }
    </Row>
    
    </Col>
    

   
    
    </Row>
    
    </Col>
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
    
    
    <Col xl={1}>
     <ChatPortion/>
     </Col>
     </Row>
    
    <ToastContainer/>
    </div>
  )
}

export default CreateAd;