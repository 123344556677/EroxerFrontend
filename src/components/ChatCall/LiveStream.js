import LiveSection from 'components/Live/LiveSection/LiveSection'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { liveStreamStatus } from 'Api/Api';
import { getAllUsers } from 'components/redux/actions/userActions';
import { Button } from 'reactstrap';
import TipModal from 'components/Modals/TipModal';
import { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pusher from 'pusher-js';
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');
const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const LiveStream = () => {
    const getUser = useSelector((state) => state?.getUserById);
const userData = getUser?.userData;
const {id}=useParams()
 const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );

    const roomID = getUrlParams().get('roomID') || randomID(5);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
//   if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
//     sharedLinks.push({
//       name: 'Join as co-host',
//       url:
//         window.location.protocol + '//' + 
//         window.location.host + window.location.pathname +
//         '?roomID=' +
//         roomID +
//         '&role=Cohost',
//     });
//   }
  sharedLinks.push({
    name: 'Join as audience',
    url:`https://eroxr.hybsoltech.com/admin/liveStreaming/${id}`
    //  window.location.protocol + '//' + 
    //  window.location.host + window.location.pathname +
    //   '?roomID=' +
    //   id +
    //   '&role=Audience',
  });
  const dispatch=useDispatch()

  const updateLiveStreamStatus=(status)=>{
    const values={
        userId:userData?._id,
        status:status
    }
    liveStreamStatus(values)
    //  getAllUsers()


  }
    const liveStreaming=(element)=>{
      const appID =1361106244 ;
      const serverSecret = "ec77d76d2136c0e705f7fa692b31433f";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,id, Date.now().toString(),userData?.firstName);
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
       container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks,
        onLiveStart: () =>{
            updateLiveStreamStatus("live")
        },
        onLiveEnd: () => {
           updateLiveStreamStatus("false")

        },
        showPreJoinView: false,
      });
  
     

}
const channel = pusher.subscribe(`tip${userId?.id}`);
    channel.bind('live-tip', (data) => {
       toast.success(`${data?.senderData?.firstName} sent you ${data?.tip}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
      
    })
  return (
    <div className='content'>
    
    <LiveSection />
    

    <div ref={liveStreaming}
     
     className=''
     style={{height:"100vh", width:"100%",marginTop:"-80px",zIndex:"10000"}}
     >
     
    </div>
    { 
      id!==userId.id&&
      <Elements stripe={stripePromise} className="" >
    <TipModal recieverId={id}/>
    </Elements>
    }
    {
    // <Button className='reset-button'>Tip</Button>
    }
    <ToastContainer/>


    
    </div>
  )
}

export default LiveStream