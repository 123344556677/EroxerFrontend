import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineDollar,AiOutlineUserAdd,  AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts as posts } from 'components/redux/actions/postActions';
import { getAds as ads } from 'components/redux/actions/adsActions';
import './Home.css'
import { Carousel, CarouselItem } from 'reactstrap';
import Pusher from "pusher-js";
import streamOne from './j20.png'
import streamThree from './j21.png'
import streamFour from './j23.png'
import streamFive from './j24.png'
import streamSix from './j25.png'
import streamSeven from './j26.png'
import profilePic from './j27.png'
import streamEight from './j38.png'


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
} from "reactstrap";
import Sidebar from 'components/Sidebar/Sidebar';
import Logo from './logo.png'
import ChatPortion from 'components/ChatPortion/ChatPortion';
import PaymentModal from 'components/Modals/PaymentModal';
import LockModal from 'components/Modals/LockModal';
import { getUsersById } from 'Api/Api';
import { getAllPosts } from 'Api/Api';
import { getUserById } from 'components/redux/actions/userActions';
import { getAllUsers } from 'components/redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { getRequestById } from 'components/redux/actions/requestActions';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changeStatus } from 'Api/Api';
import { getAllAcceptedUsers } from 'components/redux/actions/requestActions';
import { getRequestBySenderId } from 'components/redux/actions/requestActions';
import Swal from 'sweetalert2';
import { addList } from 'Api/Api';
import { getListById } from 'components/redux/actions/listActions';
import Poll from 'components/Poll/Poll';

const images = [
  'https://picsum.photos/id/1015/300/200',
  'https://picsum.photos/id/1025/300/200',
  'https://picsum.photos/id/1035/300/200'
];

let chats=[
    {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
     {
      pic:"https://picsum.photos/id/1015/300/200",
      name:"Alyan",
      lastText:"hy!"
    },
]


const Home = () => {
  const history=useHistory()
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
      // const [userData, setUserData] = useState()
      const [postData, setPostData] = useState()
      const [lockModal,setLockModal]=useState(false)
      const [search,setSearch]=useState(false)
      const [filterePosts,setFilterePosts]=useState()
      const [streamPics,setStreamPics]=useState([])
      const dispatch=useDispatch()
      const getPost = useSelector(state => state?.getPosts);
    
      const getRequests = useSelector(state => state?.getAllRequestReducer?.userRequests);
      const [hoveredImage, setHoveredImage] = useState(false);
        const getUser= useSelector(state => state?.getUserById);
        const userData=getUser?.userData
        const getAllUser= useSelector(state => state?.getAllUsers);
        const AllUser=getAllUser?.allUsers
        
        // let streamPics=[
        //   {

        //   }
    // {
    //     pic:streamOne
    // },
    
    //  {
    //     pic:streamThree
    // },
    //  {
         
    //     pic:streamFour
    // },

    // {
    //     pic:streamFive
    // },
    //  {
    //     pic:streamSix
    // },
    // {
    //     pic:streamSeven
    // },
    //  {
    //     pic:streamOne
    // },
    
    //  {
    //     pic:streamThree
    // },
    //  {
         
    //     pic:streamFour
    // },

    // {
    //     pic:streamFive
    // },
    //  {
    //     pic:streamSix
    // },
    // {
    //     pic:streamSeven
    // },
    //  {
    //     pic:streamOne
    // },
    
    //  {
    //     pic:streamThree
    // },
    //  {
         
    //     pic:streamFour
    // },

    // {
    //     pic:streamFive
    // },
    //  {
    //     pic:streamSix
    // },
    // {
    //     pic:streamSeven
    // },
    // {
    //     pic:streamFive
    // },
    //  {
    //     pic:streamSix
    // },
    // {
    //     pic:streamSeven
    // },
    
    
     

   
// ]

        useEffect(()=>{
           
        setStreamPics(AllUser?.filter(data=>data?.liveStreamStatus==="live"))
        },[])


        console.log(streamPics,"live user------>")
    
       
        
    // const { posts, error } = getPosts
    console.log(getPost,"post----------->data")
    const values={
        userId:userId.id
      }
    
    //  useEffect(()=>{
    //   useEffec(() => {
    //     dispatch(posts())
    //     dispatch(ads())
        
    // }, [dispatch])
    //    getUsersById(values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res.data.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //       } 
     
    // });
    // getAllPosts()
    // .then(res => {
    //      console.log(res.data);
         
    //        setPostData(res?.data)
          
     
    // });
     
    //  },[])
     useEffect(() => {
      dispatch(getUserById(values))
      dispatch(posts())
      dispatch(ads())
      dispatch(getAllUsers())
      dispatch(getRequestById(values))
      dispatch(getRequestBySenderId(values))
      dispatch(getAllAcceptedUsers(values))
       dispatch(getListById(values))
        
    }, [dispatch])
      console.log(streamPics,"All user---->")

    useEffect(() => {
      setFilterePosts( getPost?.posts)
        
    }, [getPost])

    const filteringBySearch=(e)=>{
      setFilterePosts( getPost?.posts?.filter(item=>item.userData?.firstName.includes(e.target.value)))

    }

    useEffect(() => {
    const pusher = new Pusher("78bfd9bc497cd883c526", {
      cluster: "ap1",
      useTLS: true,
    });
  
    

    const channel = pusher.subscribe(`request${userId?.id}`);
    channel.bind("request", (data) => {
       Swal.fire({
          title: `<p style="color:white;" font-size:15px">${data?.name} has sent you a request<p/>`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
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
            changeRequestStatus(data?.userId)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked the cancel button
           
          }
        });
      
    })
  },[])
    // if(getRequests?.length>=0){
    //  toast.warn(
    //   <div>
    //     <p> {getRequests[0][0]?.firstName} sent you friend Request</p>
    //     <button onClick={()=>changeRequestStatus(getRequests[0][0]?._id)}>Accept</button>
    //     <button >Reject</button>
    //   </div>,
    //   {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: false,
    //     closeOnClick: false,
    //     draggable: false,
    //     theme:'dark'
        
    //   }
    // );
    // }
    // useEffect(() => {
    //   
        
    // }, [dispatch])
 const checkPost=(post)=>{
   const fileExtension = post?.substring(post?.lastIndexOf('.') + 1);
   if (fileExtension === 'mp4') {
    console.log("coming here")
        return <video control src={post}  />
      }
     else  {
        return  <img alt="" src={post?post:"https://picsum.photos/id/1015/1200/800"} style={{width:"850px",height:"450px",borderRadius:"40px"}}/>
        // Handle image URL
      }

 }
   
const changeRequestStatus=(id)=>{
  const values={
    recieverId:userId.id,
    senderId:id,
    status:"accepted"
  }
  changeStatus(values)
  toast.success("Request Accepted", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });

}

    //  console.log(getRequests[0][0]?.firstName,"=========>noti home Data")
    const addToList=(id)=>{
      console.log(id,"---------->list id")
    const values={
     otherId:id,
     userId:userId.id
    }

   addList(values)
   .then((data)=>{
     if(data?.data?.message==="user added"){
       toast.success('Added to list', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });

     }
   })
}
const handleImageHover = () => {
    setHoveredImage(true);
  };
  return (

    
     <div className="content home-div">
     
      
     
     <Row className='justify-conten-center ml-lg-4'>
     <Col xl={8} className="ml-lg-5">
     <Row>
     <Col>
     <h2 className='home-title'>{userData?.firstName} {userData?.lastName}</h2>
     </Col>
     <Col  xl={8} className="">
     <div className="home-input-addon">
     <InputGroup style={{ borderRadius: '20px' }} >
      <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
        <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
          <FaSearch className="home-search" style={{ color: 'white' }} />
        </InputGroupText>
      </InputGroupAddon>
      <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white' }} placeholder="Search" onChange={(e)=>filteringBySearch(e)} />
    </InputGroup>
    </div>
     </Col>

     </Row>
    
    
<div style={{position: 'relative'}}>
  <span style={{color:"white",fontWeight:"600",fontSize:"15px"}}>Live </span>
  <span style={{position: 'absolute', top: '0.1em', }}>
    <span style={{display: 'inline-block', width: '0.5em', marginBottom:"0.3em", height: '0.5em', borderRadius: '50%', backgroundColor: 'red'}}></span>
  </span>
</div>

<div class="container mt-2 mb-3"  style={{zoom:"0.80"}}>
  <div class="row">
    <div class="col">
      <ul 
      className={ hoveredImage ? 'live-img ' : 'image-list'}
      >
      
      {
        streamPics?
streamPics?.map((data,index)=>(


        <li>
        {
          hoveredImage===false&&
        <img src={data?.profilePic?data?.profilePic:streamFour} alt=""
        
        
        onMouseOver={ () => setHoveredImage(true)}
          onMouseOut={() => setHoveredImage(false)}
        onClick={()=>history.push(`/admin/liveStreaming/${data?._id}`)}
        
        />
        }
        {
          hoveredImage===true&&
        <video controls src={data?.backgroundImage}
        style={{borderRadius:"80px",width:"70px",height:"70px"}}
        
         autoPlay
         loop
        onMouseOver={ () => setHoveredImage(true)}
          onMouseOut={() => setHoveredImage(false)}
        onClick={()=>history.push(`/admin/liveStreaming/${data?._id}`)}
        
        />
        }
        
        </li>
        
        
        ))
        :
        <h1>Go Live!</h1>
}
        
        
      </ul>
    </div>
  </div>
</div>

  <span style={{color:"white",fontWeight:"600",fontSize:"18px"}} >Lets Discover </span>
 
  {
     filterePosts?
   filterePosts?.map((data,index)=>(
    <>
    {data.key==="post"&&
 <div class={index>0?"card second-card-main":"card card-main"} style={{zoom:"0.80"}}>

 
 
  <img src={data?.postProfilePic?data?.postProfilePic:profilePic}  class="card-img-top rounded-circle" alt="..." onClick={()=>history.push(`/admin/profile/${data.userId}`)}/>
 
  <div class="card-body">
   {
    // checkPost(data?.postPic)
  }
   
   <img alt="" src={data?.postPic?data?.postPic:"https://picsum.photos/id/1015/1200/800"} style={{width:"850px",height:"450px",borderRadius:"40px", filter: data?.postCheck===true?"blur(20px)":""}}/>
   
   
   {data?.postCheck===true&&
      <LockModal open={lockModal}/>
    
    }
  </div>
    
  <div class="card-footer bg-transparent d-flex justify-content-end mb-1" >
 
 {
    //  <AiOutlineHeart className='' style={{color:"white",fontSize:"35px",marginTop:"-60px",background:"#1e1e26",borderRadius:"20px 0 0 0",paddingTop:"10px",marginRight:"-8px",cursor:"pointer"}} />
 }
    <AiOutlineUserAdd className='ml-2' style={{color:"white",fontSize:"35px",marginTop:"-60px",background:"#1e1e26",borderRadius:"20px 0 0 0",paddingTop:"10px",marginRight:"-8px",cursor:"pointer"}} onClick={()=>addToList(data?.userId)}/>
   <PaymentModal  />
  </div>
</div>
    }
 {data.key==="poll"&&
<Poll data={data}/>
  }
</>
))
:
<h1 className="text-center text-white mt-4">No posts available!</h1>
  }
  


     </Col>
     
    
{
    <ChatPortion/>
//    <div className='home-chats '>
//    <Row>
//    <Col className='text-center '>
//     <img src="https://picsum.photos/id/237/300/200" class="chat-img-top rounded-circle img-fluid" alt="Your Image"/>
//     <p className='chat-text mt-2'>Alex Rock</p>
//     <p className='chat-designation'>Student</p>
//     </Col>
   
//    </Row>
//     <h2 className='home-title ml-3 mt-3 mb-0'>Recent Chats</h2>
//     <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
//     {
//     chats.map((data,index)=>(
//         <Row>
//         <Col>
      
//   <img src={data.pic} class="rounded-circle chat-img mt-3 mb-4 " alt="Your Image"/>
//   <span style={{position: 'absolute', top: '0.1em' , }}>
//     <span style={{display: 'inline-block', width: '0.7em',marginLeft:"6em", height: '0.7em', marginBottom:"-1em", borderRadius: '50%', backgroundColor: 'green'}}></span>
//   </span>
//   </Col>
//    <Col className="chat-text-col mt-3 mb-4">
//   <p class="mt-3 chat-text-inner">{data.name}</p>
//   <p class="text-muted chat-msg-inner">{data.lastText}</p>
//   </Col>

// </Row>

//     ))
//    }

//    </div>
}
     
     
     
     
     
     </Row>
     
  
  <ToastContainer/>
       
      </div>
      
    
  )
}

export default Home