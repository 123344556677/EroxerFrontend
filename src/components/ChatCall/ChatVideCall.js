import ChatProfile from 'components/ChatProfile/ChatProfile'
import ChatSection from 'components/ChatSection/ChatSection'
import React from 'react'
import { Col, Row } from 'reactstrap'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ChatVideoCall = () => {
const getUser = useSelector((state) => state?.getUserById);
  const userData = getUser?.userData;
  const history=useHistory()
    const {id}=useParams()
    const user = {
    userID: userData?._id,
    userName: userData?.firstName,
    avatar:userData?.profilePic// Replace with your own image URL
  };
     const VideoCall=(element)=>{
    const appID =1361106244 ;
      const serverSecret = "ec77d76d2136c0e705f7fa692b31433f";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret,id, Date.now().toString(),userData?.firstName);
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
       sharedLinks: [
          {
            name: 'Copy Link link',
            url:`https://hybsoltech.com/admin/chatVideoCall/${id}`
             
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        
         onLeaveRoom: () => {
           history.push('/admin/chat')
         },
         showLeavingView:false,
         showPreJoinView:true,
         turnOnCameraWhenJoining:true,
         
  
  
      });
  }
  return (
    <div className="content">
      <Row>
        <ChatSection />

        <Col xl={8} className="ml-lg-5 mt-4">
         <div ref={VideoCall}></div>
          
        </Col>
        <Col xl={4}>
          <ChatProfile />
        </Col>
      </Row>
    </div>
  )
}

export default ChatVideoCall