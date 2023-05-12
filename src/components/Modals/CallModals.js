import React, { useEffect, useRef, useState } from "react";
import { Button,  Col, Container, Modal, Row } from "reactstrap";
import modalTwo from "./j52.png";
import "./Modals.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { AiFillPhone } from "react-icons/ai";
import Peer from "peerjs";
import { useDispatch, useSelector } from "react-redux";
import { makeCall } from "Api/Api";
import Pusher from "pusher-js";
import { BsFillTelephoneFill } from "react-icons/bs";
import AgoraRTC from "agora-rtc-sdk"
import { getUserById } from "components/redux/actions/userActions";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { makeAlert } from "Api/Api";
import { useHistory } from "react-router-dom";




// const agoraAppId = '1d319f5977ce41b5914f96935337ca44';
// const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
 

const CallModals = (props) => {
  const [showModal, setShowModal] = useState(false);
  // const videoRef = useRef(null);
  // const photoRef = useRef(null);
  // const [localStream, setLocalStream] = useState(null);
  // const [remoteStream, setRemoteStream] = useState(null);
  // const [callState, setCallState] = useState('idle');
  // const [otherUserId, setOtherUserId] = useState(null);
  // // const [peer, setPeer] = useState(null);
  // const [callActive, setCallActive] = useState(false);
  // const [callDuration, setCallDuration] = useState(0);
  // const [audioContext, setAudioContext] = useState(null);
  // const [audioSource, setAudioSource] = useState(null);
  // const [secondAudioSource, setSecondAudioSource] = useState(null);
  // const [audioStream, setAudioStream] = useState(null);
  // const [secondAudioStream, setSecondAudioStream] = useState(null);
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  console.log(props,"call modal data")
  // const [call, setCall] = useState(null);
  const history=useHistory()
  const getUser = useSelector((state) => state?.getUserById);
  const userData = getUser?.userData;
  const roomId=userId?.id

  const AudioCall=(element)=>{
    const appID =1853841837 ;
      const serverSecret = "04509cb03d706e9bbd4b7058d955943f";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,roomId , Date.now().toString(),userData?.firstName);
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
       sharedLinks: [
          {
            name: 'Copy Link link',
            url:`http://localhost:3000/admin/chat/${roomId}`
             
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        turnOnCameraWhenJoining:false
      });
  }
   const sendAlert=()=>{
   
   
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });
  
    const values={
      message: "alert is coming",
      roomId: props?.userData?._id,
      userId: userId?.id,
      name:userData?.firstName
    }
    makeAlert(values)
     toggleModal()

    
  }


 
  // const OneAudioRef = useRef(null);
  // const SecondaudioRef = useRef(null);
//   let options = 
// {
//     // Pass your App ID here.
//     appId: '1d319f5977ce41b5914f96935337ca44',
//     // Set the channel name.
//     channel: "call",
//     // Pass your temp token here.
//     token: '007eJxTYDD4U7COezOrVHekWwfnEtMbYm5nenT5ojgzzniGLTPt4FFgMEwxNrRMM7U0N09ONTFMMrU0NEmzNLM0NjU2Nk9ONDH58C4mpSGQkWHr5QJWRgYIBPFZGJITc3IYGAA4Bhxg',
//     // Set the user ID.
//     uid: userData?._id,
// };

// let channelParameters =
// {
//   // A variable to hold a local audio track.
//   localAudioTrack: OneAudioRef,
//   // A variable to hold a remote audio track.
//   remoteAudioTrack: SecondaudioRef,
//     // A variable to hold the remote user id.
//   remoteUid: props?.userData?._id,
// };

//  useEffect(() => {
//     agoraClient.init(agoraAppId);

//     return () => {
//       // agoraClient.release();
//     };
//   }, []);

  // const handleCall = async () => {
  //   const token ='007eJxTYDD4U7COezOrVHekWwfnEtMbYm5nenT5ojgzzniGLTPt4FFgMEwxNrRMM7U0N09ONTFMMrU0NEmzNLM0NjU2Nk9ONDH58C4mpSGQkWHr5QJWRgYIBPFZGJITc3IYGAA4Bhxg'
  //   const channel = 'call'
  //   const uid = userData?._id
  //   await agoraClient.join(token, channel, uid)
  //   setCallState('calling');
   
  //   setOtherUserId(props?.userData?._id);

  //   // Create a local audio stream
  //   const stream = AgoraRTC.createStream({
  //     audio: true,
  //     video: false,
  //   });
  //   await stream.init();

  //   // Publish the local stream
  //   await agoraClient.join(null, 'test', null);
  //   agoraClient.publish(stream);
  //   setLocalStream(stream);

  //   // Notify the other user
  //   // You can use a backend API to send a push notification
  //   // or WebSocket to send the user ID to the other client
  //   // Here we're using a simple alert box
  //   alert('Call incoming from user ');

  //   // Subscribe to the other user's stream
  //   agoraClient.on('stream-added', async (evt) => {
  //     console.log("calling---------->")
  //     if (evt.stream.getId() !== stream.getId()) {
  //       await agoraClient.subscribe(evt.stream);
  //       setRemoteStream(evt.stream);
  //       setCallState('active');
  //     }
  //   });
  // };

  // const handleAccept = async () => {
  //   // Create a local audio stream
  //   const stream = AgoraRTC.createStream({
  //     audio: true,
  //     video: false,
  //   });
  //   await stream.init();

  //   // Publish the local stream
  //   await agoraClient.join(null, 'test', null);
  //   agoraClient.publish(stream);
  //   setLocalStream(stream);

  //   // Notify the other user that the call has been accepted
  //   // You can use a backend API to send a push notification
  //   // or WebSocket to send the user ID to the other client
  //   // Here we're using a simple alert box
  //   alert('Call accepted by user ');

  //   // Subscribe to the other user's stream
  //   agoraClient.on('stream-added', async (evt) => {
  //     if (evt.stream.getId() !== stream.getId()) {
  //       await agoraClient.subscribe(evt.stream);
  //       setRemoteStream(evt.stream);
  //       setCallState('active');
  //     }
  //   });
  // };

  // const handleReject = async () => {
  //   setCallState('idle');

  //   // Notify the other user that the call has been rejected
  //   // You can use a backend API to send a push notification
  //   // or WebSocket to send the user ID to the other client
  //   // Here we're using a simple alert box
  //   alert(`Call rejected by user`);
  // };

  function toggleModal() {
    setShowModal(!showModal);
  }
  // const AccepterFunction=()=>{

  //   // toast.warn(
  //   //   <div>
  //   //     <p> {getRequests[0][0]?.firstName} sent you friend Request</p>
  //   //     <button onClick={()=>changeRequestStatus(getRequests[0][0]?._id)}>Accept</button>
  //   //     <button >Reject</button>
  //   //   </div>,
  //   //   {
  //   //     position: toast.POSITION.TOP_CENTER,
  //   //     autoClose: false,
  //   //     closeOnClick: false,
  //   //     draggable: false,
  //   //     theme:'dark'
        
  //   //   }
  //   // );
  // }
  console.log(props,"modal call data=====>")
  // const calls = "call";
  // useEffect(() => {
  //   const pusher = new Pusher("78bfd9bc497cd883c526", {
  //     cluster: "ap1",
  //     useTLS: true,
  //   });
  //   const initPusher = async () => {
  //     const channel = pusher.subscribe(calls);

  //     channel.bind("new-call", async (data) => {
  //       const { callerId,accepterId } = data;
  //       console.log("caller ID:", data);
  //        const peer = new Peer();

    
  //       // if (accepterId === userId?.id) {
  //       //   AccepterFunction()
  //       //   const SecondAudioStream = await navigator.mediaDevices.getUserMedia({
  //       //     audio: true,
  //       //   });
  //       //   setSecondAudioStream(SecondAudioStream);
  //       //   const audioCtx = new AudioContext();
  //       //   setAudioContext(audioCtx);
  //       //   const secondSource = audioCtx.createMediaStreamSource(SecondAudioStream );
  //       //   setSecondAudioSource(secondSource);
  //       // }

  //       if (callerId !== peer.id) {
  //         const outgoingCall = peer.call(callerId, audioStream);
  //         setCall(outgoingCall);

  //         outgoingCall.on("stream", (remoteStream) => {

  //           console.log(remoteStream,"stream values------------>")
  //         });
  //       }
  //     });
  //   };

  //   initPusher();
  // }, [peer, audioStream, calls]);

  // const handleStartCall = async () => {
  //   // Get the local audio stream
  //   toggleModal()
  //   const pusher = new Pusher("78bfd9bc497cd883c526", {
  //     cluster: "ap1",
  //     useTLS: true,
  //   });
  //   const values = {
  //     callerId: userId?.id,
  //     accepterId: props?.userData?._id
  //   };
  //   makeCall(values);
  //   const FirstAudioStream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //   });
  //   setAudioStream(FirstAudioStream);
  //   const audioCtx = new AudioContext();
  //   setAudioContext(audioCtx);
  //   const source = audioCtx.createMediaStreamSource(FirstAudioStream);
  //   setAudioSource(source);

  //   // Broadcast the new call event to Pusher

  //   const channel = pusher.subscribe(calls);
  //   channel.trigger("new-call", { callerId: peer.id });
  // };
  // useEffect(() => {
  //   if (audioSource && audioContext) {
  //     audioSource.connect(audioContext.destination);
  //   }
  // }, [audioSource, audioContext]);

  //  const answerCall = () => {
  //   call.answer(audioStream);
  //   call.on("stream", (remoteStream) => {
  //     // Do something with the remote stream, such as attaching it to an HTML audio element
  //   });
  // };
 
//  const values={
//   userId:userId.id
//  }
//   const dispatch=useDispatch()
//   useEffect(()=>{
//  dispatch(getUserById(values))
//  },[])



  return (
    <div className="content">
      <div>
        <AiFillPhone onClick={sendAlert} className="top-icons" />
        <br />
        <Modal isOpen={showModal} toggle={sendAlert} className="call-modal">
         
          <div className="modal-body ">
          
            <div ref={AudioCall}></div>
          




        

          {
//            <Row className='justify-content-center' style={{marginTop:"-20px"}}>
//     <Col>
//     <h1 className='text-center mb-0'>
//     <img src={props?.userData?.profilePic?props?.userData?.profilePic:modalTwo} alt="" style={{width:"20%",height:"20%",borderRadius:"200px"}}/></h1>
//     <h3 className='text-white mb-0 text-center' style={{fontWeight:"600"}}>{props?.userData?.firstName} {props?.userData?.lastName} </h3>
//     <p className="text-center"style={{color:"#BFB8B8",fontSize:"10px"}}>Ringing</p>
//       <Row className="ml-lg-4 mt-4">
      
//           <Col  className="ml-lg-3">
//           <Button className="accept-btn">
//     <BsFillTelephoneFill/>
    
//     </Button>
//     </Col>
// <Col  className="ml-lg-3">
//     <Button className="decline-btn">
//     <BsFillTelephoneFill/>
//      </Button>
//     </Col>
  
   
//     </Row>
          
//           </Col>
//           </Row>


          }
        
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CallModals;
