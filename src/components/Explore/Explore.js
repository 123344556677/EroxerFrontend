import React, { useEffect, useState } from 'react'
import { IoIosMore } from 'react-icons/io'
import { HiLocationMarker } from 'react-icons/hi'
import { AiFillDelete, AiFillEye } from 'react-icons/ai'


import cardOne from './dummy.jpg'
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
import { useDispatch, useSelector } from 'react-redux'
import { deleteListDataById } from 'Api/Api'
import { toast,ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { getListById } from 'components/redux/actions/listActions'
import { FaSearch } from 'react-icons/fa'
const Explore = () => {
    const history=useHistory()
    const dispatch=useDispatch()
    const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
     const [filtereList, setFiltereList] = useState()
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
     const getList = useSelector(state => state?.getListByIdReducer?.list);
     const Values={
      userId:userId.id,
     }
     useEffect(() => {
      
       dispatch(getListById(Values))
        
    }, [dispatch])
    useEffect(() => {
      
      setFiltereList(getList)
        
    }, [getList])

      const deleteProfile=(id)=>{
        console.log("delete----------->",id)
        const values={
           listDataId:id
        }
        deleteListDataById(values)
        .then((data)=>{
          console.log(data,"deleted-------->")
          if(data?.data?.message==="Data deleted"){
             toast.success('Removed from list', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
      window.location.reload(false)
    // dispatch(deleteListDataById(values))
          }

        })

      }
      const filteringBySearch=(e)=>{
      setFiltereList( getList.filter(item=> item.otherData?.firstName.includes(e.target.value)))

    }
      
       
    
  return (
    <div className="content ">
    <Row>
    <Col xl={5}>
    </Col>
     <Col xl={5}>
     <div className="home-input-addon" style={{marginTop:"-50px"}}>
     <InputGroup style={{ borderRadius: '20px' }} >
      <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
        <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
          <FaSearch className="home-search" style={{ color: 'white' }} />
        </InputGroupText>
      </InputGroupAddon>
      <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white',zIndex:"8000" }} placeholder="Search" onChange={(e)=>filteringBySearch(e)} />
    </InputGroup>
    </div>
     
                        </Col>
                        </Row>
    <div  className="mr-lg-4">
    <Row className='mt-3 justify-content-center'>

    <Col xl={8}>
    <h1 className='text-white' style={{fontStyle:"Roboto",fontSize:"50px"}}>Custom List</h1>
    {
        filtereList?.map((data)=>(

       
     <Card style={{backgroundColor:"#161616",borderRadius:"10px"}}>
     <Row>
     
  
  <img
    alt="Card cap"
    src={data?.backgroundPic?data?.backgroundPic:"https://picsum.photos/318/180"}
    width="20%"
    
    className='ml-4 mt-3 mb-3'
    style={{borderRadius:"20px"}}
  />
  <CardBody>
  
    <CardText className='ml-1' style={{fontSize:"15px",fontWeight:"600",color:"white"}}>
     {data?.otherData?.about?data?.otherData?.about:"Hello how are i am a photograher and also doing some yoga"}
     <span>
    <AiFillEye className='ml-lg-5 ml-md-5'  style={{color:"white",fontSize:"30px",cursor:"pointer"}}  onClick={()=>history.push(`/admin/profile/${data?.otherData?._id}`)}/><AiFillDelete className='ml-2' onClick={()=>deleteProfile(data?._id)}  style={{color:"white",fontSize:"25px",cursor:"pointer"}}/>
     </span>
    </CardText>
    <CardText  className='ml-1' href="#" style={{color:"white",fontWeight:"500"}}>
      classes for make body more attractive.
    </CardText>
    <Row>
    <Col>
      <Media className='mt-4 ml-3 mb-4'>
      <Media left>
        <img object  src={data?.otherData?.profilePic?data?.otherData?.profilePic:cardOne} style={{height:"50px",width:"50px"}}alt="jannan" className="rounded-circle" />
      </Media>
      <Media body className="ml-2 mt-1">
        <h4 className='text-white mb-0'style={{fontWeight:"600"}}>{data?.otherData?.firstName}</h4>
        <p className="chat-designation ml-0 mb-0">http://{data?.otherData.website?data?.otherData.website:"@example.com"}</p>
        {
        // <span className='mr-0' style={{color:"white"}}><HiLocationMarker/><span style={{fontSize:"10px"}}>England</span></span>
        }
      </Media>
     
    </Media>
    </Col>
    {
  //   <Col className='mt-5'>
  //   <div style={{textAlign:"end",marginRight:"30px",marginTop:"30px"}}>
  //  <AiFillEye className='' style={{color:"white",fontSize:"20px"}}/>
  //  <p className=''  style={{color:"white",fontSize:"10px"}}>10k</p>

  //   </div>
  //   </Col>
    }
    </Row>
    
  </CardBody>
  </Row>
</Card>
        ))
    }
    </Col>
    </Row>
    <ToastContainer/>
    </div>
    </div>
    
  )
}

export default Explore