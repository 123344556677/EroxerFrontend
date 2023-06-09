import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  Container
} from "reactstrap";
import { AiFillDelete } from 'react-icons/ai';
import { useEffect } from 'react';
import { getAllUsers } from 'components/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import { getCallById } from 'components/redux/actions/callActions';
import { getAllAcceptedUsers } from 'components/redux/actions/requestActions';
import { getAllChatsById } from 'Api/Api';


const Chats = () => {
  const dispatch=useDispatch()
  const [friendsCheck,setFriendsCheck]=useState(false)
  const [messages, setMessages] = useState([]);
  const [senderId,setSenderId]=useState()
  const [senderName,setSenderName]=useState()
  const [recieverName,setRecieverName]=useState()
  const [recieverId,setRecieverId]=useState()
  const [chatCheck,setChatCheck]=useState(false)
   const [filterUser,setFilterUser]=useState([])
  useEffect(() => {
     
      dispatch(getAllUsers())
    
        
    }, [dispatch])
    const getAllUser= useSelector(state => state?.getAllUsers);
    const AllUser=getAllUser?.allUsers

    const getAllAcceptedRequests = useSelector(
    (state) => state?.getAllAcceptedRequestReducer?.accpetedRequests
  );
 let readChats =getAllAcceptedRequests;

    const deleteUser=async(e)=>{
      const values={
        userId:e,

      }
      await deleteAccount(values)
      .then((res)=>{
    console.log(res,"status updated")
    if(res?.data?.message==="Account deleted successfully"){
       toast.success('user deleted', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setTimeout(() => {
          window.location.reload(false) 
        }, 2000);

     }
  })
      

    }
    const getFriends=(e,name)=>{
      const values={
        userId:e
      }
       dispatch(getAllAcceptedUsers(values))
       setSenderName(name)
       setFriendsCheck(true)
       setSenderId(e)

    }
    const getChats=(e,name)=>{
      setRecieverName(name)
       setRecieverId(e)
       const values={
        senderId:senderId,
        recieverId:e
       }
       getAllChatsById(values)
 .then((res)=>{
  console.log(res,"chat response----->")
  setMessages(res?.data)
 })
 setChatCheck(true)
 }
 function renderImageTagSecond(imageString) {
    let blobUrlPattern =/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    const url = blobUrlPattern.test(imageString);

    if (url) {
      return <img src={imageString} alt="" />;
    } else {
      console.log("no url");
      return (
        <>
       
         
        <Input
          defaultValue=""
          placeholder="Type your message here..."
          type="text"
          value={imageString}
          className="chat-second-inputs mt-3 "
        />
        </>
      );
    }
  }
  function renderImageTag(imageString) {
    let blobUrlPattern =/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    const url = blobUrlPattern.test(imageString);

    if (url) {
      return <img src={imageString} alt="" />;
    } else {
      console.log("no url");
      return (
        <>
       
         
        <Input
          defaultValue=""
          placeholder="Type your message here..."
          type="text"
          value={imageString}
          className="chat-inputs mt-3 "
        />
        </>
      );
    }
  }
   useEffect(()=>{
   setFilterUser(AllUser?.filter(user=>user?.key!=="admin"))
    },[AllUser])
 console.log(messages,"============>")
  return (
    <>
      <div className="content">
      
      {
        
      
        chatCheck===false&&
        friendsCheck?

        
        <>
        <h3 className="ml-lg-3">{senderName+"'s"}  Friends</h3>
        <Row>
          <Col md="12">
            <Card>
             
              <CardBody>
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>First Name</th>
                      <th className='text-center'>Last Name</th>
                      <th className='text-center'>Username</th>
                      <th className='text-center'>Phone Number</th>
                      <th className='text-center' >Email</th>
                      <th className='text-center' >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    readChats?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.firstName}</td>
                      <td className='text-center'>{data?.lastName}</td>
                      <td className='text-center'>{data?.username?data?.username:"-"}</td>
                      <td className='text-center'>{data?.phoneNumber?data?.phoneNumber:"-"}</td>
                      <td className='text-center'>{data?.email}</td>
                      <td className='text-center' ><span onClick={()=>getChats(data?._id,data?.firstName)} style={{color:"blue",cursor:"pointer"}}>view chats</span> </td>
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
       
        </>
        :
         chatCheck===false&&
        <>
        <h2 className="ml-lg-3">Chats</h2>
        <Row>
          <Col md="12">
            <Card>
             
              <CardBody>
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>First Name</th>
                      <th className='text-center'>Last Name</th>
                      <th className='text-center'>Username</th>
                      <th className='text-center'>Phone Number</th>
                      <th className='text-center' >Email</th>
                      <th className='text-center' >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    filterUser?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.firstName}</td>
                      <td className='text-center'>{data?.lastName}</td>
                      <td className='text-center'>{data?.username?data?.username:"-"}</td>
                      <td className='text-center'>{data?.phoneNumber?data?.phoneNumber:"-"}</td>
                      <td className='text-center'>{data?.email}</td>
                      <td className='text-center' ><span onClick={()=>getFriends(data?._id,data?.firstName)} style={{color:"blue",cursor:"pointer"}}>view friends</span> </td>
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
         
        </>

        

     }
      {
        chatCheck===true&&
        <>
        <h3 className='text-center'>{senderName+"'s"} chat with {recieverName}</h3>
      <div className="ml-lg-5">
      <Container>
      <Row className='ml-lg-5'>
      <Col className='ml-lg-5'>
            { messages?
              messages?.map((data, index) => (
              <div>
                {data?.senderId === senderId ? (
                  
                    <>
                        {renderImageTag(data?.message)}
                    </>
                ) : (
                  <>
                  <Row
                    className=""
                    style={{ marginLeft: "380px" }}
                    data-aos="fade-up"
                  >
                    
                       
                        {renderImageTagSecond(data?.message)}
                     
                  </Row>
                  </>
                )}
              </div>
            ))
           :
            <div className="loading">Loading chats...</div>
          }
          </Col>
          </Row>
          </Container>
          </div>
          </>
      
      }
      
     
        <ToastContainer/>
      </div>
    </>
  )
}

export default Chats