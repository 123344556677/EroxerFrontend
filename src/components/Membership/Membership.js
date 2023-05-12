import React from 'react'
import { useState } from 'react'
import { BsFillCartFill } from 'react-icons/bs'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import memberOne from './j38.png'
import memberTwo from './j39.png'
import memberThree from './j40.png'
import memberFour from './j41.png'
import memberFive from './j42.png'
import memberSix from './j43.png'
import memberSeven from './j44.png'
import memberEight from './j45.png'
import memberNine from './j46.png'
import Tesseract from "tesseract.js";
import FileBase64 from "react-file-base64";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MembershipSection from './MembershipSection'
import './Memebrship.css'
import { updateUser } from 'Api/Api'
import { FaHandPointRight } from 'react-icons/fa'
const Membership = () => {
  const [step,setStep]=useState(true)
  const [cnicFront,setCnicFront]=useState()
  const [cnicBack,setCnicBack]=useState()
  const [checkCnic,setCheckCnic]=useState(false)
  const [checkCnicTwo,setCheckCnicTwo]=useState(false)
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const history=useHistory();
  
  const handleCnicFrontPic=(e)=>{
        setCnicFront(e.selectedFile.base64);
         
      Tesseract.recognize(e.selectedFile.base64,'eng')
      .then((result) => {
      
        const text = result.data.text;
         console.log("coming",text)
         
        const cnicRegex = /\d{5}-\d{7}-\d/g; // CNIC number regex
        const cnic = text.match(cnicRegex);

        if (cnic && cnic.length > 0) {
          setCheckCnic(true);
         
          
          
        } else {
        setCheckCnic(false);
         toast.error('Please upload correct picture', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
         
        }
      })
        
    
        
    }
    const handleCnicBackPic=(e)=>{
        setCnicBack(e.selectedFile.base64);
      setCheckCnicTwo(true)
        
    
        
    }
  // const backFromMember=()=>{
  //  if(step===true){
  //   history.push('/admin/home')
  //  }
  //  else{
  //   setStep(true)
  //  }
  // }
    const verifyCnic=async()=>{
      if(checkCnic&&checkCnicTwo){
      const values={
        userId:userId.id,
        cnicFront:cnicFront,
        cnicBack:cnicBack,
        cnicValidation:true
      }
      await updateUser(values)
    .then((res)=>{
      if (res.data.message === "user updated") {
        toast.success('CNIC verified', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setStep(false)
  }
  else{
    toast.error('Server Error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
  }
    })
    }
    else{
         toast.error('Please verify CNIC', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    }

    }

  const cartItems=[
    {
      title:"Lorem Ipsum dummy Text",
      textOne:"If we notice an attempted login from a device or  ",
      textTwo:"browser we don't recognize.",
      
      price:"$48.2",

    },
    {
      title:"Lorem Ipsum dummy Text",
      textOne:"If we notice an attempted login from a device or browser ",
      textTwo:"browser we don't recognize.",
      
      price:"$48.2",

    },
    {
      title:"Lorem Ipsum dummy Text",
      textOne:"If we notice an attempted login from a device or browser ",
      textTwo:"browser we don't recognize.",
      
      price:"$48.2",

    },
   {
      title:"Lorem Ipsum dummy Text",
      textOne:"If we notice an attempted login from a device or browser ",
      textTwo:"browser we don't recognize.",
      
      price:"$48.2",

    },{
      title:"Lorem Ipsum dummy Text",
      textOne:"If we notice an attempted login from a device or browser ",
      textTwo:"browser we don't recognize.",
      
      price:"$48.2",

    },
   
  ]
  return (
    <div className='content '>
     <span className='' style={{color:"white",fontSize:"10px"}}   ><Link to='/admin/home'
     style={{color:"white",fontSize:"40px",marginTop:"-80px",position:"absolute"}}><IoMdArrowRoundBack/></Link></span>
    <Row className='' >
    {
      step===true&&
     
    <Col xl={8} className="ml-lg-5">
    <Row className=''>
    <Col className='text-center'>
    
    <img src={memberOne} style={{color:"white",width:"60px",marginTop:"-20px"}}/>
    <h3 className='text-white mb-0 mt-3' style={{fontWeight:"600"}}>Become A content Creator</h3>
    <p className="" style={{color:"grey",fontSize:"10px"}}>
If we notice an attempted login from a device or browser we don't
 <br/> recognize, we'll ask for your password and a verification code.</p>
    </Col>
    
    </Row>
   <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-3"/>
   <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"15px"}}><span ><FaHandPointRight style={{fontSize:"20px"}} className='mr-4'/></span>Verify CNIC</Label>
    </FormGroup>
    <Row>
    
    <Col xl={5} sm={5} md={6}>
    <Card className="member-card  mt-2" >
    <h4 className='text-center mb-0'>
    <div  style={{opacity:"0",position:"absolute",zIndex:"10",marginTop:"15%"}}>
    <FileBase64
        type="file"
        className="text-center"
        onDone={(base64) => handleCnicFrontPic({ selectedFile: base64 })}
       style={{cursor:"pointer"}}


    />
    </div>
    <img src={cnicFront?cnicFront:memberTwo} style={{width:"50%",height:"80%"}}className="ml-2 mr-2 mt-4 mb-2"/></h4>
    <p className='text-center mt-2 mb-1' style={{color:" #BFB8B8"}}>Front Copy</p>

    </Card>
    </Col>
    <Col xl={5} sm={5} md={6}>
    <Card className="member-card mt-2 ml-md-5 mb-0" >
    <h4 className='text-center mb-0'>
    <div  style={{opacity:"0",position:"absolute",zIndex:"10",marginTop:"15%"}}>
    <FileBase64
        type="file"
        className="text-center"
        onDone={(base64) => handleCnicBackPic({ selectedFile: base64 })}
       style={{cursor:"pointer"}}


    />
    </div>
    <img src={cnicBack?cnicBack:memberTwo} style={{width:"50%",height:"80%"}}className="ml-2 mr-2 mt-4 mb-2"/></h4>
    <p className='text-center mt-2 mb-1' style={{color:" #BFB8B8"}}>Back Copy</p>

    </Card>
    </Col>
    
    </Row>
    <FormGroup check className="" >
    <Input type="radio" className=''  />
    {' '} <Label style={{color:"#BFB8B8",fontWeight:"600",fontSize:"8px"}}>
     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </Label>
    </FormGroup>
    <Row>
    
<Col className="text-right">
    <Button className="reset-button " onClick={verifyCnic} >
    
    Next
    </Button >
    </Col>
    </Row>
    </Col>
    }
    {
    step===false&&
    <Col xl={10} style={{zoom:"0.85"}}>
    <Row className='justify-conten-center'>
    <Col className='text-center'>
    <img src={memberOne} style={{color:"white"}}/>
    <h2 className='text-white mb-0 mt-4' style={{fontWeight:"600"}}>Become A content Creator</h2>
    <p className="" style={{color:"grey",fontSize:"13px"}}>
If we notice an attempted login from a device or browser we don't
 <br/> recognize, we'll ask for your password and a verification code.</p>
    </Col>
    
    </Row>
   <hr style={{backgroundColor:"#555555"}} className="mr-3 ml-5"/>
    <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"18px"}}>Verify CNIC</Label>
    </FormGroup>
   <Row>
   <Col xl={5}>
    <FormGroup className='mt-3'>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      First and last name
    </Label>
    <Input
      
      placeholder='Name...'
      className='post-input'
    />
  </FormGroup>
   <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      Email adress
    </Label>
    <Input
      type="email"
      placeholder='Email adress'
      className='post-input'
    />
  </FormGroup>
   <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      Country
    </Label>
   <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='United States of America'
    >
      <option>
       United States of America
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
  <Row>
  <Col>
   <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      State/Country
    </Label>
    <Input
      type="number"
      placeholder='state/country'
      className='post-input'
    />
  </FormGroup>
  </Col>
  <Col>
  <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      Zip/Postal Code
    </Label>
    <Input
      type="number"
      placeholder='zip/postal code'
      className='post-input'
    />
  </FormGroup>
  </Col>
  </Row>
   <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-1'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"15px"}}>Payment method</Label>
    </FormGroup>

    <div class="input-group mt-2">
    
      <input type="radio" name="radio-group" className='radio-input' aria-label="Radio button"/>
   
 
  <input type="text" class="form-control pay-input" placeholder="Credit card..."/>
  <div class="input-group-append pay-inner-two-input" className='pay-inner-two-input'>
    <span class="pay-inner" id="input-group-addon">
      <img src={memberFour} class="img-fluid mr-2" alt="Image 1"/>
      <img src={memberFive}  class="img-fluid mr-2" alt="Image 2"/>
      <img src={memberSix}  class="img-fluid mr-2" alt="Image 3"/>
      <img src={memberSeven} class="img-fluid mr-2" alt="Image 1"/>
      <img src={memberEight}  class="img-fluid mr-2" alt="Image 2"/>
      
    </span>
  </div>
</div>
  <div class="input-group mt-4">
    
    
   
 
  <input type="text" class="form-control pay-input" placeholder="Card number..."/>
  <div class="input-group-append pay-inner-two-input" className='pay-inner-two-input'>
    <span class="pay-inner" id="input-group-addon">
      <img src={memberFour} class="img-fluid mr-2" alt="Image 1"/>
     
      
    </span>
  </div>
</div>
<div className='mt-3' style={{display:"flex"}}>
<FormGroup className='mr-3'>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"",fontSize:"11px"}}>
      Expectation Date
    </Label>
   <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='United States of America'
    >
      <option>
       Month
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>

  <FormGroup className='mr-3 '>
    
   <Input
      id="exampleSelect"
      name="select"
      type="select"
      className='post-input'
      placeholder='United States of America'
      style={{marginTop:"34%"}}
    >
      <option>
       Year
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
  <FormGroup className=''>
    <Label for="exampleEmail" style={{color:"white",fontSize:"11px"}}>
      Security code
    </Label>
   <Input
      id="exampleSelect"
      name=""
      type="number"
      className='post-input'
      placeholder='code..'
      style={{width:"100px"}}
    />
      
  </FormGroup>

</div>
<div class="input-group mt-3">
    
      <input type="radio" name="radio-group" className='radio-input' aria-label="Radio button"/>
   
 
  <input type="text" class="form-control pay-pal-input" placeholder="payPal"/>
  <div class="input-group-append pay-inner-two-input" className='pay-inner-two-input'>
    <span class="pay-pal-inner" id="input-group-addon">
      <img src={memberNine} class="img-fluid mr-2" alt="Image 1"/>
      
      
    </span>
  </div>
</div>


<h1 className='text-center'>
<Button className='pay-btn reset-button'>Sumbit</Button></h1>
  </Col>
  {
//     <Row>
    
// <Col className="text-right">
//     <Button className="reset-button " >
    
//     Save
//     </Button >
//     </Col>
//     </Row>
  }
  <Col xl={5} className="ml-lg-5">
  <Card style={{backgroundColor:"#161616", borderRadius:"10px"}}>
  <h4 className='text-white ml-4 mt-3'><span className='mr-1'  style={{fontSize:"30px"}}><BsFillCartFill/></span> 
  Cart Summary <span className='ml-2' style={{fontSize:"10px"}}>($48.2)</span></h4>
  <ul>
  
  {
    cartItems.map((data)=>(
<li>
<h4 className='mb-0 mt-3' style={{fontSize:"12px"}}>{data.title}<span className='' style={{marginLeft:"50%"}}>{data.price}</span></h4>
<p className='chat-designation mt-1 mb-0' style={{fontSize:"7px"}}>{data.textOne}</p>
<p className='chat-designation ' style={{fontSize:"7px"}}>{data.textTwo}</p>
</li>
))
  }
  </ul>
  <h5 className='text-right mr-4'>Sub Total $48.2</h5>
  </Card>
  </Col>
    </Row>
    </Col>
   
    }
    <Col xl={2}>
    <MembershipSection/>
    </Col>
    </Row>
    <ToastContainer/>
    </div>
  )
}

export default Membership