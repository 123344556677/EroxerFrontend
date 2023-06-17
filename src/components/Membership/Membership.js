import React from 'react'
import { useState } from 'react'
import { BsFillCartFill } from 'react-icons/bs'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
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
import VideoModal from 'components/Modals/VideoModal'
import { useDispatch, useSelector } from 'react-redux'
import { getReduxCreatorById } from 'components/redux/actions/creatorActions'
import { useEffect } from 'react'
import { getAllCreatorRequest } from 'components/redux/actions/creatorActions'
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {loadStripe} from '@stripe/stripe-js';
import { createPayment } from 'Api/Api'
import { applyForCreator } from 'Api/Api'
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#6A097D",
            color: "white",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "white" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}
const firebaseConfig = {
  apiKey: "AIzaSyCnY9bzvS6ZiF0wn1_kDGp_ljWGo3sZSxA",
  authDomain: "images-7611f.firebaseapp.com",
  projectId: "images-7611f",
  storageBucket: "images-7611f.appspot.com",
  messagingSenderId: "410713197024",
  appId: "1:410713197024:web:f4cb6a922d309976c38385",
  measurementId: "G-ENS46GYQRS",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
function Membership () {
  const [step,setStep]=useState(true)
  const [cnicFront,setCnicFront]=useState()
  const [cnicBack,setCnicBack]=useState()
  const [checkCnic,setCheckCnic]=useState(false)
  const [checkCnicTwo,setCheckCnicTwo]=useState(false)
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [country,setCountry]=useState()
  const [state,setState]=useState()
  const [postalCode,setPostalCode]=useState()
  const [videoUrl,setVideoUrl]=useState(null)
  const [animationCheck, setAnimationCheck] = useState(false)
  const [frontUrl, setFrontUrl] = useState()
   const [backUrl, setBackUrl] = useState()
  const history=useHistory();
  const stripe = useStripe()
  const elements = useElements()
  const creator = useSelector((state) =>
    getReduxCreatorById(state?.getAllCreatorRequest, userId?.id)
  );
  const getUser = useSelector((state) => state.getUserById);

  const userData = getUser?.userData;
  
  const handleCnicFrontPic=(e)=>{
        setCnicFront(e.selectedFile.base64);
        setCheckCnic(true)
        uploadImageToFirebaseOne(e.selectedFile.base64)
         
    //   Tesseract.recognize(e.selectedFile.base64,'eng')
    //   .then((result) => {
      
    //     const text = result.data.text;
    //      console.log("coming",text)
         
    //     const cnicRegex = /\d{5}-\d{7}-\d/g; // CNIC number regex
    //     const cnic = text.match(cnicRegex);

    //     if (cnic && cnic.length > 0) {
    //       setCheckCnic(true);
         
          
          
    //     } else {
    //     setCheckCnic(false);
    //      toast.error('Please upload correct picture', {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 3000,
    
    //   theme: 'dark',
     
    // });
         
    //     }
    //   })
        
    
        
    }
    const uploadImageToFirebaseOne = (base64Video) => {
  const fileName = Date.now() + '.jpg';
const fileRef = ref(storage,  fileName);
uploadString(fileRef, base64Video, 'data_url').then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);

  // Get the URL of the uploaded image location
  getDownloadURL(fileRef).then(async(url) => {
    console.log('Image URL:', url);
    setFrontUrl(url)
  })
})
  
};
    const handleCnicBackPic=(e)=>{
        setCnicBack(e.selectedFile.base64);
      setCheckCnicTwo(true)
      uploadImageToFirebaseTwo(e.selectedFile.base64)
        
    
        
    }
        const uploadImageToFirebaseTwo = (base64Video) => {
  const fileName = Date.now() + '.jpg';
const fileRef = ref(storage,  fileName);
uploadString(fileRef, base64Video, 'data_url').then((snapshot) => {
  console.log('Uploaded a blob or file!', snapshot);

  // Get the URL of the uploaded image location
  getDownloadURL(fileRef).then(async(url) => {
    console.log('Image URL:', url);
   setBackUrl(url)
  })
})
  
};
    const handlePayment=async(e)=>{
      e.preventDefault()
      setAnimationCheck(true)
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        


        if (!error) {
            try {
                
          const { id } = paymentMethod
                const values={
                  userId:userId.id,
     name:name,
     emai:email,
     postalCode:postalCode,
     state:state,
     paymentId:id
      }
      createPayment(values)
      .then((res)=>{
      if (res.data.message === "payment Successfull") {
          toast.success('payment Successful', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setTimeout(() => {
          history.push("/admin/home");
        }, 2000);

      }
      else {
        setAnimationCheck(false)
          toast.error('server error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });

      }
      
            })
          }
              catch (error) {
                console.log("Error", error)
            }
            }
          }
          catch (ex){
      console.log(ex)
    }
          
      
    }
    const handleVideoValue=(data)=>{
      setVideoUrl(data)
    }

    const dispatch=useDispatch()
    useEffect(() => {
      
      dispatch(getAllCreatorRequest())
        
    }, [dispatch])
  // const backFromMember=()=>{
  //  if(step===true){
  //   history.push('/admin/home')
  //  }
  //  else{
  //   setStep(true)
  //  }
  // }
    const verifyCnic=async()=>{
      setAnimationCheck(true)
  //     if(creator?.status==="pending"){
  //       toast.warn('Your request is pending', {
  //     position: toast.POSITION.TOP_CENTER,
  //     autoClose: 3000,
    
  //     theme: 'dark',
     
  //   });
        
  // }
  // if(creator?.status==="approved"){
  //       setStep(false)
        
  // }

      if(checkCnic&&checkCnicTwo){
      const values={
        userId:userId.id,
        videoUrl:videoUrl,
        userData:userData,
        cnicFront:frontUrl,
        cnicBack:backUrl,


      }
          applyForCreator(values)
        .then((res)=>{
            if(res.data.message==="applied"){
                 toast.success('you application is pending, it will be approved in 1-3 business days', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
    
      theme: 'dark',
     
    });
    setTimeout(() => {
          history.push("/admin/home");
        }, 3000);
            }
        })
    
    }
    else{
         toast.error('Please verify Cnic', {
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
     style={{color:"white",fontSize:"40px",marginTop:"-4%",position:"absolute"}}><IoMdArrowRoundBack/></Link></span>
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
   {
      userData?.creator!==true&&
      creator?.status!=="pending"&&
      creator?.status!=="approved"&&
      
      
   <FormGroup check className="mt-4">
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"15px"}}><span ><FaHandPointRight style={{fontSize:"20px"}} className='mr-4'/></span>Verify Your self</Label>
    </FormGroup>
   }
    <Row className='justify-content-center'>
  
    {
      creator?
      <>
      {
       creator?.status==="pending"&&
      <h3>Your request is pending for approval!</h3>
      }
      
      {
      userData?.creator===true&&
      <h3>Your are now a member of eroxr!</h3>
      }
      </>
      :
      
        videoUrl?
         <h3>Video uploaded!</h3>
    
     :
      <VideoModal dataVideoValue={handleVideoValue}/>
    

      
     
    }
    
 </Row>
 {
       creator?.status!=="pending"&&
       creator?.status!=="approved"&&
       <>
  <FormGroup check className="mt-4">
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"15px"}}><span ><FaHandPointRight style={{fontSize:"20px"}} className='mr-4'/></span>Verify CNIC</Label>
    </FormGroup>
    
    <Row>
    
    <Col xl={5} sm={8} md={8}>
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
    </>
    }
    
   
    {
      userData?.creator===false&&
      creator?.status!=="pending"&&
      creator?.status!=="approved"&&
      <>
    <FormGroup check className="" >
    <Input type="radio" className=''  />
    {' '} <Label style={{color:"#BFB8B8",fontWeight:"600",fontSize:"8px"}}>
     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </Label>
    </FormGroup>
    <Row>
    
<Col className="text-right">
{
      animationCheck?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
    <Button className="reset-button " onClick={verifyCnic} >
    
    
  submit
    </Button >
}
    </Col>
    </Row>
    </>
    }
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
   <Form onSubmit={handlePayment}>
    <FormGroup check className="mt-4" >
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"18px"}} className='mt-1'>Information</Label>
    </FormGroup>
   <Row>
   
   <Col xl={5}>
    <FormGroup className='mt-3'>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      First and last name
    </Label>
    <Input
      required
      placeholder='Name...'
      className='post-input'
      onChange={(e)=>setName(e.target.value)}
    />
  </FormGroup>
   <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      Email adress
    </Label>
    <Input
     required
      type="email"
      placeholder='Email adress'
      className='post-input'
      onChange={(e)=>setEmail(e.target.value)}
    />
  </FormGroup>
  {
  //  <FormGroup>
  //   <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
  //     Country
  //   </Label>
  //  <Input
  //     id="exampleSelect"
  //     name="select"
  //     type="select"
  //     className='post-input'
  //     placeholder='United States of America'
  //   >
  //     <option>
  //      United States of America
  //     </option>
  //     <option>
  //       2
  //     </option>
  //     <option>
  //       3
  //     </option>
  //     <option>
  //       4
  //     </option>
  //     <option>
  //       5
  //     </option>
  //   </Input>
  // </FormGroup>
  }
  <Row>
  <Col>
   <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      State
    </Label>
    <Input
      required
      type="text"
      placeholder='state'
      className='post-input'
      onChange={(e)=>setState(e.target.value)}
    />
  </FormGroup>
  </Col>
  <Col>
  <FormGroup>
    <Label for="exampleEmail" style={{color:"white",fontWeight:"600"}}>
      Zip/Postal Code
    </Label>
    <Input
      required
      type="number"
      placeholder='zip/postal code'
      className='post-input'
      onChange={(e)=>setPostalCode(e.target.value)}
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
   
 
  <input type="text" class="form-control pay-input" disabled placeholder="Credit card..."/>
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

<CardElement options={CARD_OPTIONS} className='mt-4' />

{
//   <div class="input-group mt-4">
    
    
   
 
//   <input type="text" class="form-control pay-input" placeholder="Card number..."/>
//   <div class="input-group-append pay-inner-two-input" className='pay-inner-two-input'>
//     <span class="pay-inner" id="input-group-addon">
//       <img src={memberFour} class="img-fluid mr-2" alt="Image 1"/>
     
      
//     </span>
//   </div>
// </div>
// <div className='mt-3' style={{display:"flex"}}>
// <FormGroup className='mr-3'>
//     <Label for="exampleEmail" style={{color:"white",fontWeight:"",fontSize:"11px"}}>
//       Expectation Date
//     </Label>
//    <Input
//       id="exampleSelect"
//       name="select"
//       type="select"
//       className='post-input'
//       placeholder='United States of America'
//     >
//       <option>
//        Month
//       </option>
//       <option>
//         2
//       </option>
//       <option>
//         3
//       </option>
//       <option>
//         4
//       </option>
//       <option>
//         5
//       </option>
//     </Input>
//   </FormGroup>

//   <FormGroup className='mr-3 '>
    
//    <Input
//       id="exampleSelect"
//       name="select"
//       type="select"
//       className='post-input'
//       placeholder='United States of America'
//       style={{marginTop:"34%"}}
//     >
//       <option>
//        Year
//       </option>
//       <option>
//         2
//       </option>
//       <option>
//         3
//       </option>
//       <option>
//         4
//       </option>
//       <option>
//         5
//       </option>
//     </Input>
//   </FormGroup>
//   <FormGroup className=''>
//     <Label for="exampleEmail" style={{color:"white",fontSize:"11px"}}>
//       Security code
//     </Label>
//    <Input
//       id="exampleSelect"
//       name=""
//       type="number"
//       className='post-input'
//       placeholder='code..'
//       style={{width:"100px"}}
//     />
      
//   </FormGroup>

// </div>
// <div class="input-group mt-3">
    
//       <input type="radio" name="radio-group" className='radio-input' aria-label="Radio button"/>
   
 
//   <input type="text" class="form-control pay-pal-input" placeholder="payPal"/>
//   <div class="input-group-append pay-inner-two-input" className='pay-inner-two-input'>
//     <span class="pay-pal-inner" id="input-group-addon">
//       <img src={memberNine} class="img-fluid mr-2" alt="Image 1"/>
      
      
//     </span>
//   </div>
// </div>
}
{
      animationCheck?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :

<h1 className='text-center mt-3'>
<Button className='pay-btn reset-button mt-2' type="submit">Sumbit</Button></h1>
}
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
  {
//   <Col xl={5} className="ml-lg-5">
//   <Card style={{backgroundColor:"#161616", borderRadius:"10px"}}>
//   <h4 className='text-white ml-4 mt-3'><span className='mr-1'  style={{fontSize:"30px"}}><BsFillCartFill/></span> 
//   Cart Summary <span className='ml-2' style={{fontSize:"10px"}}>($48.2)</span></h4>
//   <ul>
  
//   {
//     cartItems.map((data)=>(
// <li>
// <h4 className='mb-0 mt-3' style={{fontSize:"12px"}}>{data.title}<span className='' style={{marginLeft:"50%"}}>{data.price}</span></h4>
// <p className='chat-designation mt-1 mb-0' style={{fontSize:"7px"}}>{data.textOne}</p>
// <p className='chat-designation ' style={{fontSize:"7px"}}>{data.textTwo}</p>
// </li>
// ))
//   }
//   </ul>
//   <h5 className='text-right mr-4'>Sub Total $48.2</h5>
//   </Card>
//   </Col>
}
    </Row>
     </Form>
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

export default function WrappedMemberShip() {
  return (
    <Elements stripe={stripePromise} className="" >
      <Membership />
    </Elements>
   
  );
}