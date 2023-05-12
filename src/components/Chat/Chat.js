import ChatSection from "components/ChatSection/ChatSection";
import React, { useEffect, useRef, useState } from "react";
import streamOne from "./j20.png";
import streamThree from "./j21.png";
import streamFour from "./j23.png";
import streamFive from "./j24.png";
import streamSix from "./j25.png";
import streamSeven from "./j26.png";
import streamEight from "./j27.png";
import streamNine from "./j29.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Chat.css";
import { socketUrl } from "Api/Api";
import FileBase64 from "react-file-base64";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Media,
} from "reactstrap";
import { AiFillPhone } from "react-icons/ai";
import { BsCameraVideoFill, BsFillSendFill } from "react-icons/bs";
import { IoIosAttach, IoMdMore } from "react-icons/io";
import ChatProfile from "components/ChatProfile/ChatProfile";
import { io } from "socket.io-client";
import Pusher from "pusher-js";
import axios from "axios";
import { sendMessage } from "Api/Api";
import { getAllChatsById } from "Api/Api";
import { useSelector } from "react-redux";
import { makeCall } from "Api/Api";
import PictureModals from "components/Modals/PictureModals";
import CallModals from "components/Modals/CallModals";
import { makeAlert } from "Api/Api";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

const Chat = () => {
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const [call, setCall] = useState(null);
 
  const [chatUserData, setChatUserData] = useState();
  const [attachmentCheck, setAttachmentCheck] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [checkVideo, setCheckVideo] = useState(false);
  const [chatPic, setChatPic] = useState(false);
  

  const getUser = useSelector((state) => state?.getUserById);
  const userData = getUser?.userData;

  // useEffect(() => {
  //   const initPeer = async () => {
  //     const peer = new Peer();
  //     setPeer(peer);

  //     peer.on('open', () => {
  //       console.log('Peer ID:', peer.id);
  //     });

  //     peer.on('call', incomingCall => {
  //       setCall(incomingCall);
  //       incomingCall.answer(audioStream);
  //       incomingCall.on('stream', remoteStream => {
  //         // Do something with the remote stream, such as attaching it to an HTML audio element
  //       });
  //     });
  //   }

  //   initPeer();
  // }, [audioStream]);
  

  // const handleEndCall = () => {
  //   call.close();
  //   setCall(null);
  //   audioStream.getTracks().forEach((track) => track.stop());
  //   setAudioStream(null);
  // };
  // const answerCall = () => {
  //   call.answer(audioStream);
  //   call.on("stream", (remoteStream) => {
  //     // Do something with the remote stream, such as attaching it to an HTML audio element
  //   });
  // };

  // useEffect(() => {
  //   const pusher = new Pusher('78bfd9bc497cd883c526', {
  //     cluster: 'ap1',
  //     useTLS: true,
  //   });
  //   const channel = pusher.subscribe('call');
  //   channel.bind('client-start-call', () => {
  //     setCallActive(true);
  //   });
  //   channel.bind('client-end-call', () => {
  //     setCallActive(false);
  //     setCallDuration(0);
  //   });
  //   channel.bind('client-update-call-duration', (duration) => {
  //     setCallDuration(duration);
  //   });

  //   return () => {
  //     pusher.unsubscribe('call');
  //   };
  // }, []);

  // const handleStartCall = () => {
  //   const pusher = new Pusher('78bfd9bc497cd883c526', {
  //     cluster: 'ap1',
  //     useTLS: true,
  //   });
  //   pusher.trigger('call', 'server-start-call');
  //   const values={
  //     callerId:userData?.id,
  //     otherId:chatUserData?.id
  //   }
  //   makeCall(values)
  // };

  // const handleEndCall = () => {
  //   const pusher = new Pusher('78bfd9bc497cd883c526', {
  //     cluster: 'ap1',
  //     useTLS: true,
  //   });
  //   pusher.trigger('private-call-channel', 'server-end-call');
  // };
  const history=useHistory();
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
 
useEffect(() => {
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });

    const channel = pusher.subscribe(userId?.id);
    channel.bind("client-alert", (data) => {
      if(data.message==="audio alert is coming"){
        Swal.fire({
  title: `<p style="color:white;" font-size:15px">${data?.name} is calling for audio call<p/>`,
  html: `<P style="color:white; font-size:10px">End-to-end encrypted Call</P>`,
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Answer',
  cancelButtonText: 'Reject',
  reverseButtons: true,
  customClass: {
    confirmButton: 'btn ml-2 btn-primary',
    cancelButton: 'btn btn-danger',
  },
  background: '#000000',
}).then((result) => {
  if (result.isConfirmed) {
    // User clicked the confirm button
    history.push(`/admin/chatCall/${data?.username}`)
    
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // User clicked the cancel button
    Swal.fire(
      'Cancelled',
      'Your action was cancelled :)',
      'error'
    );
  }
});
      }
      if(data.message==="video alert is coming"){
        Swal.fire({
  title: `<p style="color:white;" font-size:15px">${data?.name} is calling for video call<p/>`,
  html: `<P style="color:white; font-size:10px">End-to-end encrypted Call</P>`,
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Answer',
  cancelButtonText: 'Reject',
  reverseButtons: true,
  customClass: {
    confirmButton: 'btn ml-2 btn-primary',
    cancelButton: 'btn btn-danger',
  },
  background: '#000000',
}).then((result) => {
  if (result.isConfirmed) {
    // User clicked the confirm button
    history.push(`/admin/chatVideoCall/${data?.username}`)
    
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    // User clicked the cancel button
    Swal.fire(
      'Cancelled',
      'Your action was cancelled :)',
      'error'
    );
  }
});
      }
    });

    
    return () => {
      channel.unbind("message");
      pusher.unsubscribe(medium);
      pusher.disconnect();
    };
  }, [userId?.id]);
  
  

  const medium = "chat";
  useEffect(() => {
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });

    const channel = pusher.subscribe(medium);
    channel.bind("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    AOS.init();
    return () => {
      channel.unbind("message");
      pusher.unsubscribe(medium);
      pusher.disconnect();
    };
  }, [medium]);

  const handleChatPic = (e) => {
    setChatPic(e.selectedFile.base64);
  };
  // useEffect(() => {
  // const values={
  //   recieverId:"644e89f4551d4f1cb45c64cf",
  //    senderId:userId.id
  // }
  // getAllChatsById(values)
  // .then((res)=>{
  //   console.log(res,"all chats==========>")
  //   setMessages(res?.data)

  // })

  // }, []);

  console.log(messages, "messages");
  const sendAlert=()=>{
   
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });
  
    const values={
      message: "audio alert is coming",
      roomId: chatUserData?._id,
      userId: userId?.id,
      name:userData?.firstName
    }
    makeAlert(values)

    
  }
 const sendVideoAlert=()=>{
   
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });
  
    const values={
      message: "video alert is coming",
      roomId: chatUserData?._id,
      userId: userId?.id,
      name:userData?.firstName
    }
    makeAlert(values)

    
  }

  const sendingMessage = () => {
    const values = {
      message: message,
      roomId: chatUserData?._id,
      userId: userId?.id,
    };

    sendMessage(values);
    setMessage("");
  };
  const changingAttachmentState = () => {
    setAttachmentCheck(false);
  };
  const handleUserData = (data) => {
    console.log(data, "sending chat data");
    setChatUserData(data);
  };
  const handleImageUrl = (data) => {
    const values = {
      message: data,
      roomId: chatUserData?._id,
      userId: userId?.id,
    };

    sendMessage(values);
    setMessage("");
  };
  function renderImageTag(imageString) {
    let blobUrlPattern =
      /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    const url = blobUrlPattern.test(imageString);

    if (url) {
      return <img src={imageString} alt="My Image" />;
    } else {
      console.log("no url");
      return (
        <Input
          defaultValue=""
          placeholder="Type your message here..."
          type="text"
          value={imageString}
          className="chat-inputs mt-3 "
        />
      );
    }
  }
  function renderImageSecondTag(imageString) {
    let blobUrlPattern =
      /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    // Test if the string contains a Blob URL
    const url = blobUrlPattern.test(imageString);

    if (url) {
      return (
        <img src={imageString} className="chat-second-img" alt="My Image" />
      );
    } else {
      console.log("no url");
      return (
        <Input
          defaultValue=""
          placeholder="Type your message here..."
          type="text"
          value={imageString}
          className="chat-second-inputs mt-3 "
        />
      );
    }
  }

  const makeVideoCall=()=>{
      sendVideoAlert();
      history.push(`/admin/chatVideoCall/${userId?.id}`)
  }
  const makeAudioCall=()=>{
      sendAlert();
      history.push(`/admin/chatCall/${userId?.id}`)
  }
  //  useEffect(() => {
  //     dispatch(getUserById(values))})

  return (
    <div className="content">
      <Row>
        <ChatSection dataValue={handleUserData} />

        <Col xl={8} className="ml-lg-5">
          <Row className="" style={{ marginTop: "-50px" }}>
            <Col>
              <Media className=" ml-3">
                <Media left>
                  <img
                    src={
                      chatUserData?.profilePic
                        ? chatUserData?.profilePic
                        : streamFour
                    }
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle "
                    alt=""
                  />
                  <span style={{ position: "absolute" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "0.5em",
                        marginLeft: "-1em",
                        height: "0.5em",
                        marginBottom: "-1.8em",
                        borderRadius: "50%",
                        backgroundColor: "green",
                      }}
                    ></span>
                  </span>
                </Media>
                <Media body className="ml-2">
                  <h4 className="text-white mb-0">{chatUserData?.firstName}</h4>
                  <p className="chat-designation">nice yo meet you</p>
                </Media>
              </Media>
            </Col>
            <Col className="text-left">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <AiFillPhone onClick={makeAudioCall} className="top-icons" style={{cursor:"pointer"}} />

                <BsCameraVideoFill onClick={makeVideoCall}  className="top-icons"  style={{cursor:"pointer"}} />

                <IoMdMore className="top-icons" />
              </div>
            </Col>
          </Row>
          <hr
            style={{
              backgroundColor: "#555555",
              height: "3px",
              borderRadius: "50px",
            }}
            className="mr-2 ml-3"
          />
          <div className="message-div">
            {messages?.map((data, index) => (
              <div>
                {data?.username === userId?.id ? (
                  <Media className=" ml-3 mt-2" data-aos="fade-up">
                    <Media left>
                      <img
                        src={
                          userData.profilePic ? userData.profilePic : streamFour
                        }
                        style={{ widht: "40px", height: "40px" }}
                        class="rounded-circle "
                        alt=""
                      />
                    </Media>

                    <Media body className="ml-2 message-media mt-3">
                      {renderImageTag(data?.message)}
                    </Media>
                  </Media>
                ) : (
                  <Row
                    className=""
                    style={{ marginLeft: "380px" }}
                    data-aos="fade-up"
                  >
                    <Media className="">
                      <Media body className="ml-2 message-media mt-1">
                        {renderImageSecondTag(data?.message)}
                      </Media>
                      <Media right>
                        <img
                          src={
                            chatUserData?.profilePic
                              ? chatUserData?.profilePic
                              : streamFive
                          }
                          style={{ widht: "40px", height: "40px" }}
                          class="rounded-circle "
                          alt=""
                        />
                      </Media>
                    </Media>
                  </Row>
                )}
              </div>
            ))}
          </div>
          <div className="chat-below-div">
            <hr
              style={{
                backgroundColor: "#555555",
                height: "3px",
                borderRadius: "50px",
              }}
              className="mr-2 ml-3 mt-5 mb-0"
            />
            <InputGroup className="">
              <InputGroupAddon addonType="prepend">
                {attachmentCheck && (
                  <div className="attachment-div" data-aos="fade-up">
                    <PictureModals dataImageValue={handleImageUrl} />
                    <div
                      style={{
                        position: "absolute",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    >
                      <FileBase64
                        type="file"
                        className="text-center"
                        onDone={(base64) =>
                          handleChatPic({ selectedFile: base64 })
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <img
                      src={streamNine}
                      onClick={handleImageClick}
                      className="gallery-img"
                      alt=""
                    />
                  </div>
                )}
                <Button
                  color="secondary"
                  className="btn-sm chat-attach"
                  onClick={() => setAttachmentCheck(!attachmentCheck)}
                  style={{ marginTop: "10px" }}
                >
                  <i
                    className="fa fa-paperclip"
                    aria-hidden="true"
                    style={{ fontSize: "15px" }}
                  ></i>
                </Button>
              </InputGroupAddon>
              <Input
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="chat-thired-inputs"
                style={{ marginTop: "0" }}
              />
              <InputGroupAddon style={{ border: "none" }} addonType="append">
                <Button
                  className="chat-attach btn-sm"
                  style={{ marginTop: "" }}
                  onClick={sendingMessage}
                >
                  <BsFillSendFill style={{ fontSize: "15px" }} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Col>
        <Col xl={4}>
          <ChatProfile />
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
