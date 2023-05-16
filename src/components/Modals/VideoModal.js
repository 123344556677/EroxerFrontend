import React, { useRef, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Modal, Progress, Row } from 'reactstrap'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import videoOne from './j53.png'
import './Modals.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { applyForCreator } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';


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


const VideoModal = () => {
    const history=useHistory()
    const [showModal, setShowModal] = useState(false);
 const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [timer, setTimer] = useState(15);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);
const [blob, setBlob] = useState();
const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  
  function toggleModal() {
  setShowModal(!showModal);
}
const gotoPost=()=>{
    history.push('/admin/createPost');
    toggleModal();
}
const gotoAd=()=>{
    history.push('/admin/createAd');
    toggleModal();
}

  



  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }) // Enable audio by setting audio: true
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        const chunks = [];
        mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });

        mediaRecorderRef.current.addEventListener('stop', () => {
          const blob = new Blob(chunks, { type: 'video/mp4' });
          const videoURL = URL.createObjectURL(blob);
          setRecordedVideoURL(videoURL); // Set the recorded video URL
        //   uploadVideo(blob);
        setBlob(blob);
          stopCamera(); // Stop the camera stream
        });

        mediaRecorderRef.current.start();
        startTimer(); // Start the timer
        setTimeout(stopRecording, 15000); // Stop recording after 15 seconds
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      resetTimer(); // Reset the timer
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 15000);
  };

  const resetTimer = () => {
    setTimer(15);
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  const uploadVideo = () => {

    const videoRef = 'recorded-videos/' + Date.now();
    const storageRef = ref(storage, videoRef);

    uploadBytes(storageRef,blob)
      .then((snapshot) => {
        console.log('Video uploaded successfully');
        getDownloadURL(snapshot.ref).then((url)=> {
          setRecordedVideoURL(url); // Set the download URL of the uploaded video
          console.log(url,"video url")
         const values={
            userId:userId.id,
            videoUrl:url,
        }
        applyForCreator(values)
        .then((res)=>{
            if(res.data.message==="applied"){
                 toast.success('you application is on pending, we will let you know once it is approved', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    
      theme: 'dark',
     
    });
            }
        })
        });
      })
      .catch((error) => {
        console.error('Error uploading video:', error);
      });
      setBlob(null)
  };
  return (
   <div className='content'>
            <div>
                <h1 className='text-center'>
        <Button onClick={toggleModal} disabled={timer !== 15} className=" mt-4 modal-recording-button">
            Record a 15 seconds video
          </Button></h1>

                <Modal  isOpen={showModal} toggle={toggleModal} className="main-modal" style={{marginTop:"-50px"}} >
                <Row className='justify-content-center'>
                <Col xl={10} className="text-center">
                    
                     <div className="  mb-0" >
                     <img src={videoOne}  style={{width:"60px"}}alt=""/>
                      <h3 className='text-white  mb-0 mt-2' style={{fontWeight:"600"}}>Become A content Creator</h3>
                     
                      

  </div>
   </Col>
                      </Row>
    <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
  <div className="modal-body home-modal ">

  {!recordedVideoURL ? (
        <>
          <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
           <div style={{ width: '50px', height: '50px',marginLeft:"46%" }}>
          {timer > 0 ?
         

           <CircularProgressbar
        value={(timer / 15) * 100}
        text={`${timer}s`}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: '16px',
          pathTransitionDuration: 0.5,
          pathColor: `purple ${timer / 100})`,
          textColor: 'white',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
     
         : 
         'Recording finished'
      }
     </div>
     <h1 className='text-center'>
          <Button onClick={startRecording} disabled={timer !== 15} className=" mt-2 modal-recording-button">
            {timer === 15 ? 'Start Recording' : 'Recording in progress'}
          </Button></h1>
        </>
      ) : (

        <>
        <video controls src={recordedVideoURL} style={{ width: '100%', height: 'auto' }} />
       <h1 className='text-center'>
        <Button onClick={uploadVideo} disabled={timer !== 15} className=" mt-2 modal-recording-button">
            Become a creator
          </Button></h1>
        </>
      )}
    
    
  </div>
  
                </Modal>

            </div>
            <ToastContainer/>
        </div>
  )
}

export default VideoModal