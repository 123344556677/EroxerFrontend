import React, { useEffect, useState } from "react";
import { Media } from "reactstrap";
import "./ChatSection.css";
import streamOne from "./j20.png";
import streamThree from "./j21.png";
import streamFour from "./j23.png";
import streamFive from "./j24.png";
import streamSix from "./j25.png";
import streamSeven from "./j26.png";
import { IoMdMailUnread, IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chat from "components/Chat/Chat";
import { getAllAcceptedUsers } from "components/redux/actions/requestActions";
import { getLastMessage } from "Api/Api";
import { AiFillCiCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { updateReadStatus } from "Api/Api";

const ChatSection = ({ dataValue }) => {
  const dispatch=useDispatch()
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const getAllAcceptedRequests = useSelector(
    (state) => state?.getAllAcceptedRequestReducer?.accpetedRequests
  );
  const [chatData, setChatData] = useState();
  const [readCheck, setReadCheck] = useState(false);
  const [lastMessages, setLastMessages] = useState();
  const getUser= useSelector(state => state?.getUserById);
  const userData=getUser?.userData
  let readChats = [];
  readChats.push(getAllAcceptedRequests);
  console.log(readChats, "Accepted users");
  // let pinChats=[
  //     {
  //         pic:streamFive
  //     },
  //      {
  //         pic:streamSix
  //     },
  //      {
  //         pic:streamSeven
  //     },

  // ]
  // let recentChats=[
  //     {
  //         pic:streamOne
  //     },
  //      {
  //         pic:streamThree
  //     },
  //      {
  //         pic:streamFour
  //     },

  // ]
  // let unreadChats=[
  //     {
  //         pic:streamSeven
  //     },
  //      {
  //         pic:streamThree
  //     },
  //      {
  //         pic:streamFour
  //     },

  // ]
  let arrayforLastMessage=[]
    readChats?.map((data)=>{
    data?.map((datas, item) => {
      datas?.map((datass, items) => {
        arrayforLastMessage.push(
          {
            senderId:userId.id,
            recieverId:datass?._id

          }
        )

      })

    })

  })
  let unreadChats=[]
  let simpleChats=[]

  useEffect(()=>{
   

   
    getLastMessage(arrayforLastMessage)
    .then((res)=>{
      setLastMessages(res?.data)
      console.log(res,"last message")
    })
    
  },[userId])

  //  readChats?.map((data)=>{
  //   data?.map((datas, item) => {
  //     datas?.map((datass, items) => {
  //       lastMessages?.map((msg)=>{
  //            if( msg.senderId===datass?._id|| msg.recieverId===datass?._id)
  //            {
  //             if(msg.readStatus===false){
  //               unreadChats.push(datass)
  //             }
  //             if(msg.readStatus===true){
  //              simpleChats.push(datass)
  //             }


  //            }})
        

  //     })

  //   })

  // })

  const sendDataToChat = (data) => {
    const value={
      senderId:userId.id,
      // recieverId:data?._id
    }
    updateReadStatus(value)
    .then((res)=>{
      if(res?.data?.message==="updated"){
        setReadCheck(false)
      }
    })
    dataValue(data);
    



  };
  const values={
    userId:userId.id
  }
   useEffect(() => {
    dispatch(getAllAcceptedUsers(values))
    
   }, [])
   
     

  return (
    <div className="chat-chats ">
      <div style={{ display: "flex" }} className="mt-3">
        <span
          className="mt-3 ml-3"
          style={{ color: "white", fontSize: "30px" }}
        >
          <Link to="/admin/home" style={{ color: "white", fontSize: "30px" }}>
            <IoMdArrowRoundBack />
          </Link>
        </span>
        <h2
          className="text-white text-center mt-4 ml-4"
          style={{ fontStyle: "Roboto", fontWeight: "600" }}
        >
          Chats
        </h2>
      </div>
      <div className="chat-main-chats">
        {
          // <h4 className='text-white mt-1'> <span className="mr-2 ml-4"><BsFillChatSquareFill/></span>Read chats</h4>
        }
        {readChats?.map((data, index) => (
          <div key={index}>
            {data?.map((datas, item) => (
              <div key={item}>
                {datas?.map((datass, items) => (
                  <Media
                    className="mt-2 ml-3 chat-media"
                    style={{ cursor: "pointer" }}
                    key={items}
                    onClick={() => sendDataToChat(datass)}
                  >
                    <Media left>
                      <img
                        src={
                          datass?.profilePic ? datass?.profilePic : streamFour
                        }
                        style={{ widht: "60px", height: "60px" }}
                        class="rounded-circle  mt-3 mb-4 "
                        alt=""
                      />
                      {
                        userData.onlineStatus===true&&
                      <span style={{ position: "absolute" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "0.7em",
                            marginLeft: "-1em",
                            height: "0.7em",
                            marginBottom: "-1em",
                            borderRadius: "50%",
                            backgroundColor: "green",
                          }}
                        ></span>
                      </span>
                        }
                    </Media>
                    <Media body className="ml-2 mt-4">
                      <h3 className="text-white mb-0">{datass?.firstName} </h3>
                      {
                        lastMessages?.map((msg)=>(
                       msg.senderId===datass?._id|| msg.recieverId===datass?._id?
                         <p className="chat-designation" onClick={() => sendDataToChat(msg)} style={{fontSize:"16px",fontWeight: msg.readStatus===false?"700":""}}>{msg?.message}
                         {
                         msg.recieverId===userId.id&&
                         msg.readStatus===false&&
                         <span className="ml-3"><BsDot style={{fontSize:"30px",color:"red",fontWeight:"700",height:"30px",width:"30px"}}/></span>
                          
                         }
                         </p>
                         :
                          <p className="chat-designation">nice to meet you</p>

                        ))
                        
                      
                      }
                    </Media>
                  </Media>
                ))}
              </div>
            ))}
          </div>
        ))}
        {
          // <h4 className='text-white mt-1'> <span className="mr-2 ml-4"><BsFillPinAngleFill/></span>Pinned chats</h4>
          //   pinChats?.map((data)=>(
          //    <Media className='mt-2 ml-3 chat-media'>
          //     <Media left>
          //       <img src={data?.pic} style={{widht:"60px",height:"60px"}}class="rounded-circle  mt-3 mb-4 " alt="Your Image"/>
          // <span style={{position: 'absolute'}}>
          //   <span style={{display: 'inline-block', width: '0.7em', marginLeft:"-1em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
          // </span>
          //     </Media>
          //     <Media body className="ml-2 mt-4">
          //       <h3 className='text-white mb-0'>Assi</h3>
          //       <p className="chat-designation">nice yo meet you</p>
          //     </Media>
          //   </Media>
          //   ))
          // <h4 className='text-white mt-1'> <span className="mr-2 ml-4"><BsFillChatSquareDotsFill/></span>Recent chats</h4>
          //   recentChats?.map((data)=>(
          //    <Media className='mt-2 ml-3 chat-media'>
          //     <Media left>
          //       <img src={data?.pic} style={{widht:"60px",height:"60px"}}class="rounded-circle  mt-3 mb-4 " alt="Your Image"/>
          // <span style={{position: 'absolute'}}>
          //   <span style={{display: 'inline-block', width: '0.7em', marginLeft:"-1em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
          // </span>
          //     </Media>
          //     <Media body className="ml-2 mt-4">
          //       <h3 className='text-white mb-0'>Assi</h3>
          //       <p className="chat-designation">nice yo meet you</p>
          //     </Media>
          //   </Media>
          //   ))
          // <h4 className='text-white mt-1'> <span className="mr-2 ml-4"><IoMdMailUnread/></span>Unread chats</h4>
          //   unreadChats?.map((data)=>(
          //    <Media className='mt-2 ml-3 chat-media'>
          //     <Media left>
          //       <img src={data?.pic} style={{widht:"60px",height:"60px"}}class="rounded-circle  mt-3 mb-4 " alt="Your Image"/>
          // <span style={{position: 'absolute'}}>
          //   <span style={{display: 'inline-block', width: '0.7em', marginLeft:"-1em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
          // </span>
          //     </Media>
          //     <Media body className="ml-2 mt-4">
          //       <h3 className='text-white mb-0'>Assi</h3>
          //       <p className="chat-designation">nice yo meet you</p>
          //     </Media>
          //   </Media>
          //   ))
        }
      </div>
    </div>
  );
};

export default ChatSection;
