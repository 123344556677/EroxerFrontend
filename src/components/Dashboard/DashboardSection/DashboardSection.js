import React, { useState } from 'react'
import { AiFillDollarCircle, AiFillInstagram, AiOutlineWechat } from 'react-icons/ai'
import './DashboardSection.css'
import dashboardProfile  from'../dummy.jpg'
import cardPic from './J31.png'
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
  Container,
  CardText,
} from "reactstrap";
import { IoIosMoon } from 'react-icons/io';
import { BsFillBellFill } from 'react-icons/bs';
import { FaMoneyBillWaveAlt, FaUserShield } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getReduxSubscribedUser } from 'components/redux/actions/paymentAction'


const DashboardSection = () => {
     let Ads=[
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
        {
            pic:cardPic
        },
    ]
     const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const tipUsers = useSelector((state) =>
    getReduxSubscribedUser(state?.getAllTip, userId?.id)
  );
  const subscribedUsers= useSelector(state => state?.getAllSenderRequestReducer);
  const subscribedData=subscribedUsers?.senderAllRequests
  const getUser= useSelector(state => state?.getUserById);
  const userData=getUser?.userData
  let total = 0;

subscribedData?.map((data) => {
  total += data?.paymentData?.payment || 0;
});

tipUsers?.map((data) => {
  total += data?.tip || 0;
});
  return (
    <div className='dashboard' >
  <div style={{display:"flex",marginTop:"20%",marginLeft:"10%"}}>
  
<div className='dash-top-icons' style={{marginLeft:"10%"}}>
    <IoIosMoon className='mt-2 ml-2' style={{color:"white",fontSize:"30px"}}/>
</div>
<div className='dash-top-icons' style={{marginLeft:"10%"}}>
    <div>
        <BsFillBellFill className='mt-2 ml-2' style={{color:"white",fontSize:"30px"}}/>
      <Badge  style={{color:"white",backgroundColor:"red",marginLeft:"-10px",marginBottom:"10px"}} pill className="position-absolute mt-3 top-0 end-0">1</Badge>
      
    </div>
    </div>
    <img style={{marginLeft:"10%",marginTop:"-2%",width:"60px",height:"60px",borderRadius:"60px 60px 60px 60px"}} src={userData?.profilePic?userData?.profilePic:dashboardProfile}/>
</div>
  
   
    <div className='dashboard-cards'>
    {
//         Ads.map((data)=>(


     
   
     
//   <div className='mt-4'>
//   <img
//     alt="Card cap"
//     src={data.pic}

   
//     className='ml-3  mt-2 mb-3'
//     style={{borderRadius:"20px",height:"250px",width:"350px"}}
//   />
//   <div style={{display:"flex",marginTop:"-15px"}} className="ml-4">
//   <img src="https://picsum.photos/100/100" alt="" className='contact-profile ' style={{height:"40px",width:"40px"}}/>
//   <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one ' style={{height:"40px",width:"40px"}}/>
//   <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one' style={{height:"40px",width:"40px"}}/>
//   </div>
//  <div style={{backgroundColor:"#292929",borderRadius:"10px",display:"flex", marginLeft:"5%",marginTop:"-2%",width:"340px"}}>
//  <div>
//  <p className='ml-3 mt-3 mb-0' style={{fontSize:"22px",fontWeight:"600",color:"white"}}>
//      Alex dee
    
//     </p>
//     <p  className='ml-3 mb-3' href="#" style={{color:"grey",fontWeight:"500"}}>
//       Lorem ispum
//     </p>
//     </div>
//     <AiOutlineWechat style={{color:"white",fontSize:"40px",marginLeft:"50%",marginTop:"8%"}}/>
 
//  </div>
//   </div>
  
 
//    ))
    }
    <Card className='ml-lg-3 dash-cards' style={{borderRadius:"20px",height:"250px",width:"350px"}}>
    <h2 className='text-white mt-3 ml-lg-4 mb-1'>Total Subscriptions</h2>
    <hr className='ml-2 mr-2' style={{backgroundColor:"white"}}/>
    <Row className='ml-lg-4 mt-4'>
    <Col>
    <h3 className='dash-icons'>{subscribedData?.length}</h3>
    </Col>
    <Col>
    <FaUserShield className='dash-icons mt-1'/>
    </Col>
    </Row>
    </Card>
    <Card className='ml-lg-3 dash-cards' style={{borderRadius:"20px",height:"250px",width:"350px"}}>
    <h2 className='text-white mt-3 ml-lg-4 mb-1'>Total Tips</h2>
    <hr className='ml-2 mr-2 ' style={{backgroundColor:"white"}}/>
    <Row className='ml-lg-4 mt-4'>
    <Col>
    <h3 className='dash-icons'>{tipUsers?.length}</h3>
    </Col>
    <Col>
    <AiFillDollarCircle className='dash-icons mt-1'/>
    </Col>
    </Row>
    </Card>
    <Card className='ml-lg-3 dash-cards' style={{borderRadius:"20px",height:"250px",width:"350px"}}>
    <h2 className='text-white mt-3 mb-1 ml-lg-4'>Total Revenue</h2>
    <hr className='ml-2 mr-2 ' style={{backgroundColor:"white"}}/>
    <Row className='ml-lg-4 mt-4'>
    <Col>
    <h3 className='dash-icons'>{total}</h3>
    </Col>
    <Col>
    <FaMoneyBillWaveAlt className='dash-icons mt-1'/>
    </Col>
    </Row>
    </Card>

 </div>

 
 
 
 
  
 
</div>
 

  )
}

export default DashboardSection