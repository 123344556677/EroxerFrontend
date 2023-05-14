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
import streamThirteen from "./logo.png"
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
  Modal,
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
import { useDispatch, useSelector } from "react-redux";
import { makeCall } from "Api/Api";
import PictureModals from "components/Modals/PictureModals";
import ChatImageModal from "components/Modals/ChatImageModals";
import CallModals from "components/Modals/CallModals";
import { makeAlert } from "Api/Api";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { getUserById } from "components/redux/actions/userActions";


const Chat = () => {
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [chatUserData, setChatUserData] = useState();
  const [attachmentCheck, setAttachmentCheck] = useState(false);
  const [intervalActive, setIntervalActive] = useState(false);


  const [chatPic, setChatPic] = useState(false);

  const getUser = useSelector((state) => state?.getUserById);
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
  setShowModal(!showModal);
}
  const userData = getUser?.userData;
  const dispatch = useDispatch();
  const userIdforPusher=userId?.id

  const history = useHistory();
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
// useEffect(() => {
//     let interval;
//     if (intervalActive) {
//       interval = setInterval(() => {
//         setMessages((prevMessages) => {
//           const timestamp = Date.now();
//           const updatedMessages = prevMessages.map((msg) => {
//             if (typeof msg.message === 'string' && msg.message.includes("firebasestorage.googleapis.com")) {
//               // If message is an image, update it to show "No message available"
//               return {
//                 ...msg,
//                 message: "No message available"
//               }
//             }
//             // Message is not an image, keep it
//             return msg;
//           });
//           return updatedMessages;
//         });
//       }, 15000);
//     }

  //   return () => clearInterval(interval);
  // }, [intervalActive]);

//   return () => clearInterval(interval);
// }, [messages]);

  useEffect(() => {
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });

    const channel = pusher.subscribe(userIdforPusher);
    channel.bind("client-alert", (data) => {
      if (data.message === "audio alert is coming") {
        Swal.fire({
          title: `<p style="color:white;" font-size:15px">${data?.name} is calling for audio call<p/>`,
          html: `<P style="color:white; font-size:10px">End-to-end encrypted Call</P>`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Answer",
          cancelButtonText: "Reject",
          reverseButtons: true,
          customClass: {
            confirmButton: "btn ml-2 btn-primary",
            cancelButton: "btn btn-danger",
          },
          background: "#000000",
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked the confirm button
            history.push(`/admin/chatCall/${data?.username}`);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked the cancel button
            Swal.fire("Cancelled", "Your action was cancelled :)", "error");
          }
        });
      }
      if (data.message === "video alert is coming") {
        Swal.fire({
          title: `<p style="color:white;" font-size:15px">${data?.name} is calling for video call<p/>`,
          html: `<P style="color:white; font-size:10px">End-to-end encrypted Call</P>`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Answer",
          cancelButtonText: "Reject",
          reverseButtons: true,
          customClass: {
            confirmButton: "btn ml-2 btn-primary",
            cancelButton: "btn btn-danger",
          },
          background: "#000000",
        }).then((result) => {
          if (result.isConfirmed) {
            // User clicked the confirm button
            history.push(`/admin/chatVideoCall/${data?.username}`);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked the cancel button
            Swal.fire("Cancelled", "Your action was cancelled :)", "error");
          }
        });
      }
    });

    return () => {
      channel.unbind("client-alert");
      pusher.unsubscribe(userIdforPusher);
      pusher.disconnect();
    };
  }, [userIdforPusher]);

  
  useEffect(() => {
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });
   
    const channel = pusher.subscribe(`chat${chatUserData?._id}${userId?.id}`);
    channel.bind("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    
    return () => {
      channel.unbind("message");
      pusher.unsubscribe(`chat${chatUserData?._id}${userId?.id}`);
      pusher.disconnect();
    };
    
  }, [userId?.id,chatUserData?._id]);

  // useEffect(() => {
  //   const pusher = new Pusher("78bfd9bc497cd883c526", {
  //     cluster: "ap1",
  //     useTLS: true,
  //   });
   
  //   const channel = pusher.subscribe(`chat${userId?.id}${chatUserData?._id}`);
  //   channel.bind("message", (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //   });

    
  //   return () => {
  //     channel.unbind("message");
  //     pusher.unsubscribe(`chat${userId?.id}${chatUserData?._id}`);
  //     pusher.disconnect();
  //   };
    
  // }, []);
AOS.init();
  const handleChatPic = (e) => {
    setChatPic(e.selectedFile.base64);
  };

  console.log(messages, "messages");
  const sendAlert = () => {
  

    const values = {
      message: "audio alert is coming",
      roomId: chatUserData?._id,
      userId: userId?.id,
      name: userData?.firstName,
    };
    makeAlert(values);
  };
  const sendVideoAlert = () => {
  

    const values = {
      message: "video alert is coming",
      roomId: chatUserData?._id,
      userId: userId?.id,
      name: userData?.firstName,
    };
    makeAlert(values);
  };

  const sendingMessage = () => {
    const values = {
      message: message,
      roomId: chatUserData?._id,
      userId: userId?.id,
      timeStamp:Date.now()
    };

    sendMessage(values);
    setMessage("");
    if(message){

    messages.push({
      username:userId?.id,
      message:message,
      timeStamp:Date.now()
    })
  }
  };
  const changingAttachmentState = () => {
    setAttachmentCheck(false);
  };
  const handleUserData = (data) => {
    console.log(data, "sending chat data");
    setChatUserData(data);
  };
  const handleImageUrl = (data) => {
     setTimeout(() => {
            messages.push({
      username:userId?.id,
      message:data,
      timeStamp:Date.now()
    
    })
          }, 10000);
   
  
    const values = {
      message: data,
      roomId: chatUserData?._id,
      userId: userId?.id,
      timeStamp:Date.now()
    };

    sendMessage(values)
    
setMessage("");
    
  
  };
  const settingInterval=(data)=>{
    setInterval(() => {
  setMessages((prevMessages) => {
  const timestamp = Date.now();
  const updatedMessages = prevMessages.map((msg) => {
    if (msg.message === data) { // Replace yourMsg with the actual message you want to match
      return {
        ...msg,
        message: "No message available"
      } // Return null for the message that matches yourMsg
    }
    
    // Message is not an image and doesn't match yourMsg, keep it
    return msg;
  }).filter(msg => msg !== null); // Filter out the null messages
  return updatedMessages;
});
 }, 15000);
  }
  function renderImageTag(imageString) {
    let blobUrlPattern =/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    const url = blobUrlPattern.test(imageString);

    if (url) {
      return <img src={imageString} alt="" />;
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
        <>
        {
        // <img src={imageString}  className="chat-second-img" alt="" />
        }
        <ChatImageModal   image={{imageString,settingInterval}}/>
        </>
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


  const makeVideoCall = () => {
    sendVideoAlert();
    history.push(`/admin/chatVideoCall/${userId?.id}`);
  };
  const makeAudioCall = () => {
    sendAlert();
    history.push(`/admin/chatCall/${userId?.id}`);
  };
  useEffect(() => {
    const values = {
      userId: userId?.id,
    };
    dispatch(getUserById(values));
  },[]);

  return (
    <div className="content">
      <Row>
        <ChatSection dataValue={handleUserData} />

        <Col xl={8} className="ml-lg-5">
        {
         chatUserData? 
         <>
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
                <AiFillPhone
                  onClick={makeAudioCall}
                  className="top-icons"
                  style={{ cursor: "pointer" }}
                />

                <BsCameraVideoFill
                  onClick={makeVideoCall}
                  className="top-icons"
                  style={{ cursor: "pointer" }}
                />

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
                  <div className="attachment-div" data-aos="fade-down">
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
          </>
          :
          <Row className="mt-5">
          <Col className="text-center mt-5">
          <img className="mt-5" src={streamThirteen} style={{width:"50%",height:"50%"}} alt=""/>
          </Col>
      
          
          
          </Row>
          }
        </Col>
        <Col xl={4}>
          <ChatProfile profileData={chatUserData} />
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
