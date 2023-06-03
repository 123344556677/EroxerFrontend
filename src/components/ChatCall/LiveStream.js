import LiveSection from 'components/Live/LiveSection/LiveSection'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { liveStreamStatus } from 'Api/Api';
import { getAllUsers } from 'components/redux/actions/userActions';
import { Button } from 'reactstrap';
import TipModal from 'components/Modals/TipModal';

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
    url:`http://localhost:3000/admin/liveStreaming/${id}`
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
  const appID =1853841837 ;
      const serverSecret = "04509cb03d706e9bbd4b7058d955943f";
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
  return (
    <div className='content'>
    
    <LiveSection />
    

    <div ref={liveStreaming}
     
     className=''
     >
     
    </div>
    <TipModal/>
    {
    // <Button className='reset-button'>Tip</Button>
    }


    
    </div>
  )
}

export default LiveStream