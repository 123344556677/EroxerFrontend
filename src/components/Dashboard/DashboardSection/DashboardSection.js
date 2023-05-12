import React from 'react'
import { AiFillInstagram, AiOutlineWechat } from 'react-icons/ai'
import './DashboardSection.css'
import dashboardProfile  from'./j27.png'
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
    <img style={{marginLeft:"10%",marginTop:"-2%",width:"60px",height:"60px"}} src={dashboardProfile}/>
</div>
  
   
    <div className='dashboard-cards'>
    {
        Ads.map((data)=>(


     
   
     
  <div className='mt-4'>
  <img
    alt="Card cap"
    src={data.pic}

   
    className='ml-3  mt-2 mb-3'
    style={{borderRadius:"20px",height:"250px",width:"350px"}}
  />
  <div style={{display:"flex",marginTop:"-15px"}} className="ml-4">
  <img src="https://picsum.photos/100/100" alt="" className='contact-profile ' style={{height:"40px",width:"40px"}}/>
  <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one ' style={{height:"40px",width:"40px"}}/>
  <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one' style={{height:"40px",width:"40px"}}/>
  </div>
 <div style={{backgroundColor:"#292929",borderRadius:"10px",display:"flex", marginLeft:"5%",marginTop:"-2%",width:"340px"}}>
 <div>
 <p className='ml-3 mt-3 mb-0' style={{fontSize:"22px",fontWeight:"600",color:"white"}}>
     Alex dee
    
    </p>
    <p  className='ml-3 mb-3' href="#" style={{color:"grey",fontWeight:"500"}}>
      Lorem ispum
    </p>
    </div>
    <AiOutlineWechat style={{color:"white",fontSize:"40px",marginLeft:"50%",marginTop:"8%"}}/>
 
 </div>
  </div>
  
 
   ))
    }

 </div>

 
 
 
 
  
 
</div>
 

  )
}

export default DashboardSection