import React from 'react'
import { IoIosMore } from 'react-icons/io'
import { HiLocationMarker } from 'react-icons/hi'
import { AiFillEye } from 'react-icons/ai'


import cardOne from './j27.png'
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
} from "reactstrap";
const Explore = () => {
    let trends=[
        {
            pic:"https://picsum.photos/318/180"
        },
        {
            pic:"https://picsum.photos/318/180"
        },
        {
            pic:"https://picsum.photos/318/180"
        },
        {
            pic:"https://picsum.photos/318/180"
        },
    ]
    
  return (
    <div className="content mt-4" style={{zoom:"0.75"}}>
    <Row className='mt-4'>
    <Col xl={10}>
    <h1 className='text-white' style={{fontStyle:"Roboto",fontSize:"40px"}}>Trending</h1>
    {
        trends.map((data)=>(

       
     <Card style={{backgroundColor:"#161616",borderRadius:"10px"}}>
     <Row>
  
  <img
    alt="Card cap"
    src={data.pic}
    width="30%"
    className='ml-4 mt-3 mb-3'
    style={{borderRadius:"20px"}}
  />
  <CardBody>
    <CardText className='ml-1' style={{fontSize:"15px",fontWeight:"600",color:"white"}}>
     Hello how are i am a photograher and also doing some yoga
     <span>
     <IoIosMore className='' style={{color:"white",fontSize:"30px",marginLeft:"30%"}}/>
     </span>
    </CardText>
    <CardText  className='ml-1' href="#" style={{color:"white",fontWeight:"500"}}>
      classes for make body more attractive.
    </CardText>
    <Row>
    <Col>
      <Media className='mt-4 ml-3 mb-4'>
      <Media left>
        <img object  src={cardOne} alt="jannan" className="upper-profile rounded-circle" />
      </Media>
      <Media body className="ml-2 mt-1">
        <h4 className='text-white mb-0'style={{fontWeight:"600"}}>Shelby</h4>
        <p className="chat-designation ml-0 mb-0">Artist</p>
        <span className='mr-0' style={{color:"white"}}><HiLocationMarker/><span style={{fontSize:"10px"}}>England</span></span>
      </Media>
     
    </Media>
    </Col>
    <Col className='mt-5'>
    <div style={{textAlign:"end",marginRight:"40px",marginTop:"30px"}}>
   <AiFillEye className='' style={{color:"white",fontSize:"20px"}}/>
   <p className=''  style={{color:"white",fontSize:"10px"}}>10k</p>

    </div>
    </Col>
    </Row>
    
  </CardBody>
  </Row>
</Card>
        ))
    }
    </Col>
    </Row>
    </div>
    
  )
}

export default Explore