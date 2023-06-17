import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPayment } from 'Api/Api';
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import memberFour from './j41.png'
import memberFive from './j42.png'
import memberSix from './j43.png'
import memberSeven from './j44.png'
import memberEight from './j45.png'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
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

const EroxrFeeModal = ({ isOpen, toggle }) => {
    const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
    const [animationCheck, setAnimationCheck] = useState(false)
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [country,setCountry]=useState()
  const [state,setState]=useState()
  const [postalCode,setPostalCode]=useState()
   const [showModal,setShowModal]=useState(isOpen)
  const history=useHistory();
  const stripe = useStripe()
  const elements = useElements()
  const handlePayment=async(e)=>{
      e.preventDefault()
      setAnimationCheck(true)
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        


        if (!error) {
          console.log("coming here")
            try {
                
          const { id } = paymentMethod
                const values={
                  userId:userId.id,
     name:name,
     email:email,
     postalCode:postalCode,
     state:state,
     paymentId:id
      }
      console.log(values)
      createPayment(values)
      .then((res)=>{
      if (res.data.message === "payment Successfull") {
          toast.success('payment Successful', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setTimeout(() => {
          history.push("/");
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
      console.log(ex,"=========>error")
    }
          
      
    }
    
  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{marginTop:"-60px"}}>
      
      <h3 className='text-center text-white mb-0 mt-2'>Buy Our premium features!</h3>
  
      <ModalBody>
        <Form onSubmit={handlePayment}>
    <FormGroup check className="" >
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"white",fontWeight:"600",fontSize:"18px"}} className='mt-1'>Information</Label>
    </FormGroup>
   <Row>
   
   <Col xl={12}>
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
<>
<h1 className='text-center mt-3 mb-0'>
<Button className='pay-btn reset-button mt-2' type="submit">Sumbit</Button></h1>

</>
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
      </ModalBody>
    </Modal>
  );
}

export default EroxrFeeModal