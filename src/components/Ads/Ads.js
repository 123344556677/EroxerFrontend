import React, { useEffect, useState } from 'react'
import { IoIosMore, IoMdArrowDropdown } from 'react-icons/io'
import { HiLocationMarker } from 'react-icons/hi'
import { AiFillEye } from 'react-icons/ai'
import './Ads.css'


// import cardOne from './j27.png'
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
  CardText,
  CardLink,
  CardSubtitle,
  Media,
  Dropdown,
  CardImg,
} from "reactstrap";
import { BsPersonFillAdd } from 'react-icons/bs'
import { data } from 'jquery'
import cardPic from './j30.png'
import { useHistory } from 'react-router-dom'
import { getAllAds } from 'Api/Api'
import { useDispatch, useSelector } from 'react-redux'

const Ads = () => {
  const history=useHistory()
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const [adData, setAdData] = useState([]);
      const toggle = () => setDropdownOpen((prevState) => !prevState);
      const dispatch=useDispatch()
        const getAds = useSelector(state => state.getAds);
     useEffect(()=>{
    //  getAllAds()
    // .then(res => {
    //      console.log(res.data);
         
    //        setAdData(res?.data)
          
     
    // });
    
    },[])
    console.log(adData,"adData===========>")
     let dropDowns=[
            {
                 name:"Most view"
            },   
             {
                 name:"Most recents"
            },
             {
                 name:"Most popular"
            },
             {
                 name:"Country"
            },
             {
                 name:"City"
            },
             {
                 name:"Gender"
            },
             {
                 name:"Age"
            },
           
    
    ]
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

console.log(adData)
  return (
    <div className='content' style={{zoom:"0.75"}}>
    <h1 className='text-white mt-1' style={{fontStyle:"Roboto"}}>Contact ads</h1>
    <Row className=''>
    { 
        dropDowns.map((data)=>(
     <Dropdown isOpen={dropdownOpen} toggle={toggle} className="" style={{marginLeft:"5%"}}>
        <DropdownToggle className="dropDown">{data.name}<IoMdArrowDropdown className='mr-1' style={{fontSize:"20px"}}/></DropdownToggle>
        <DropdownMenu key={data.name} >
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem text>Dropdown Item Text</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      ))
    }
      </Row>
      <Row>
      {
        getAds?.ads?.map((data)=>(
      <Col xl={4} >
      <Card className='mt-4' style={{backgroundColor:"#161616",borderRadius:"20px",width:"380px"}} onClick={()=>history.push(`/admin/adDescription/${data._id}`)}>
     
  
  <img
    alt="Card cap"
    src={data?.adPic?data?.adPic:cardPic}

   
    className='ml-2 mr-2 mt-2 mb-3'
    style={{borderRadius:"20px",height:"200px"}}
  />
  <div style={{display:"flex"}} className="ml-4">
  <img src="https://picsum.photos/100/100" alt="" className='contact-profile'/>
  <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one'/>
  <img src="https://picsum.photos/100/100" alt="" className='contact-profile-one'/>
  </div>
  
  <CardBody>
    <CardText className='ml-1 mb-0 ' style={{fontSize:"25px",fontWeight:"600",color:"white"}}>
     {data?.userData?.profileName?data?.userData?.profileName:data?.userData?.firstName}
    
    </CardText>
    <CardText  className='ml-1 mt-0' href="#" style={{color:"grey",fontWeight:"500"}}>
      {data?.description}
    </CardText>
    <Row className='mt-3'>
    <Col>
     <CardText  className='ml-2' href="#" style={{color:"#F34191",fontWeight:"500"}}>
      contact
    </CardText>
    </Col>
     <Col className='text-right'>
    <BsPersonFillAdd style={{fontSize:"25px",color:"white"}}/>
    </Col>
    </Row>
    
    
</CardBody>
  
</Card>
</Col>
        ))
      }
</Row>
    </div>
  )
}

export default Ads