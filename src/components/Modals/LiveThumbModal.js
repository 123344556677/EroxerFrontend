import React, { useEffect, useState } from 'react'
import { AiOutlineDollar, AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import FileBase64 from "react-file-base64";
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { updateThumbPic } from 'Api/Api';
import { BsCameraVideoFill } from 'react-icons/bs';


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

const LiveThumbModal = (props) => {
  console.log(props,"in image modal")
    const history=useHistory()
    const [showModal, setShowModal] = useState(false);
    const [thumbPic, setThumbPic] = useState();
    const [thumbUrl, setThumbUrl] = useState();
    const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  function toggleModal() {
  setShowModal(!showModal);
}

const handleThumbPic=async(e)=>{
    setThumbPic(e.selectedFile.base64)
     const fileName = Date.now() + '.jpg';
const fileRef = ref(storage,  fileName);
uploadString(fileRef, e.selectedFile.base64, 'data_url').then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);

  // Get the URL of the uploaded image location
  getDownloadURL(fileRef).then(async(url) => {
    console.log('Image URL:', url);
    setThumbUrl(url)
    const values={
    userId:userId.id,
    thumbPic:url
}
await updateThumbPic(values)
.then((res)=>{
    if(res.data.message==="updated"){
 history.push(`/admin/liveStreaming/${userId?.id}`);
  

    }
    
})
  })
})



}



  const makeLiveStream = () => {
    toggleModal()
   
  };

  return (
   <div className='content'>
            <div>
            {
                
                // <p className="msg-blur-text" onClick={settingInterval}> Click to open</p>

            }

<div className="button-container chat-second-img">

  <Button className="reset-button" style={{fontSize:"22px"}} onClick={makeLiveStream}>
 <BsCameraVideoFill className="mr-lg-3" style={{fontSize:"25px"}}/>  Go live</Button>
</div>
                <Modal  isOpen={showModal} toggle={toggleModal}   style={{maxWidth:"500px",borderRadius:"10px",marginTop:"100px"}}  >
                    
                     <div className="modal-header" >
                    

  </div>
  <div className="modal-body ">
  <h3 className='text-center text-white'>Upload Picture for Thumbnail!</h3>
  <img src={thumbPic}></img>
  <div
                      style={{
                        position: "absolute",
                        marginLeft:"50px",
                        fontSize:"25px",
                        opacity: 0,
                        cursor: "pointer",
                        zIndex:"10"
                      }}
                    >
                      <FileBase64
                        type="file"
                        className="text-center"
                        onDone={(base64) =>
                          handleThumbPic({ selectedFile: base64 })
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
 <h1 className='text-center' style={{zIndex:"1"}}>
          <Button   className=" mt-2 modal-recording-button">
            Upload Photo
          </Button></h1>
   
     
    
    
    
  </div>
  
                </Modal>
               

            </div>
        </div>
  )
}

export default LiveThumbModal;