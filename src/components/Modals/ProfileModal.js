import React, { useEffect, useState } from 'react'
import {  Col,  Modal, Row } from 'reactstrap'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import modalOne from './j51.png'
import FileBase64 from "react-file-base64";
import './Modals.css'
import { updateUser } from 'Api/Api';
import { getUsersById } from 'Api/Api';
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useSelector } from 'react-redux';


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


const ProfileModal = () => {
    
    const [showModal, setShowModal] = useState(false);
    const getUser = useSelector((state) => state.getUserById);

    const userData = getUser?.userData;
    const[profilePic,setProfilePic]=useState(userData?.profilePic);
    const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
    
   
       
      
    const Values={
        userId:userId.id
      }
    //  useEffect(()=>{
      
    //    getUsersById(Values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //     //    setProfilePic(res?.data?.data?.profilePic)
    //       } 
     
    // });
    //  })
    
  let dummyImage='data:image/jpeg;base64,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'
    function toggleModal() {
  setShowModal(!showModal);
}


const removePic=()=>{
    setProfilePic(dummyImage)

}
const changePic=async()=>{
      const fileName = Date.now() + '.jpg';
const fileRef = ref(storage,  fileName);
uploadString(fileRef, profilePic, 'data_url').then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);

  // Get the URL of the uploaded image location
  getDownloadURL(fileRef).then(async(url) => {
    console.log('Image URL:', url);
     const values={
      userId:userId.id,
      
      profilePic:url,
      
    }
    updateUser(values)
    .then((res)=>{
      if (res.data.message === "user updated") {
             toast.success('Profile photo updated', {
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

    // Use the image URL in an <img> tag
   
   
  });
}).catch((error) => {
  console.error('Failed to upload file:', error);
});
   

}

   const handleProfilePic=(e)=>{
        setProfilePic(e.selectedFile.base64);
        console.log(profilePic,"==============>photo")
        
    
        
    }
  return (
   <div className='content'>
            <div>
                <p onClick={toggleModal} className='' style={{color:"#229ED9",fontSize:"15px",marginTop:"-112px",cursor:"pointer"}}>Change profile photo</p>
                

                <Modal  isOpen={showModal} toggle={toggleModal} className="main-modal" style={{maxWidth:"400px",borderRadius:"10px"}}  >
                    
                     <div className="modal-header" >
                    

  </div>
  <div className="modal-body home-modal">
   <Row className='justify-content-center' style={{marginTop:"-20px"}}>
    <Col>
    <h1 className='text-center mb-0'>
    <img src={profilePic?profilePic:modalOne} alt="" style={{width:"20%",height:"20%",borderRadius:"200px"}}/></h1>
    <h4 className='text-white mb-0 text-center' style={{fontWeight:"600"}}>Synced Profile Photo</h4>
    <p className="text-center"style={{color:"#BFB8B8",fontSize:"10px"}}>Eroxer</p>
    <hr style={{backgroundColor:"#555555"}}/>
     <div  style={{opacity:"0",position:"absolute",zIndex:"10"}}>
    <FileBase64
        type="file"
        className="text-center"
        onDone={(base64) => handleProfilePic({ selectedFile: base64 })}
       style={{cursor:"pointer"}}


    />
    </div>
    <h4 className="text-center" style={{color:"#229ED9",cursor:"pointer"}}>Upload</h4>
    <hr style={{backgroundColor:"#555555"}}/>
    <h4 className="text-center" style={{color:"#ED4956",cursor:"pointer"}} onClick={removePic}>Remove Current Photo</h4>
    <hr style={{backgroundColor:"#555555"}}/>
    <p className="text-center" style={{color:"#229ED9",cursor:"pointer"}} onClick={changePic}>Confirm</p>

    
    
    </Col>
    
    </Row>
    
    
    
  </div>
  
                </Modal>
               

            </div>
            <ToastContainer/>
        </div>
  )
}

export default ProfileModal