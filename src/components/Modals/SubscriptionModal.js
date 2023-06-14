import React, { useEffect, useState } from 'react'
import { AiOutlineDollar, AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import modalOne from './j45.png'
import modalTwo from './j38.png'
import './Modals.css'
import memberFour from './j41.png'
import memberFive from './j42.png'
import memberSix from './j43.png'
import memberSeven from './j44.png'
// import memberEight from './j45.png'
import memberNine from './j46.png'
import memberTen from './j52.png'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { sendRequest } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import { HiOutlineWifi } from 'react-icons/hi';

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

const SubscriptionModal = (props) => {
  console.log(props,"in lock modal")
    const history=useHistory()
    const [showModal, setShowModal] = useState(false);
    const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
    const stripe = useStripe()
    const elements = useElements()
    const [animationCheck, setAnimationCheck] = useState(false)
  function toggleModal() {
  setShowModal(!showModal);
}
const gotoPost=()=>{
    history.push('/admin/createPost');
    toggleModal();
}
const gotoAd=()=>{
    history.push('/admin/createAd');
    toggleModal();
}

useEffect(() => {
 if(props?.open===true){
    toggleModal()
 }
  
}, [props])
const handlePayment=async()=>{
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
                senderId:userId.id,
                recieverId:props?.value?._id,
                payment:props?.value?.profilePrice,
                paymentId:id
     
      }
      sendRequest(values)
      .then((res)=>{
      if (res.data.message === "payment Successfull") {
          toast.success('payment Successful', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    toggleModal()
    window.location.reload(false)

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


  return (
   <div className='content'>
            <div>
        <Button className="btn-sm mt-3 ml-2 profile-button" onClick={toggleModal}>
              <HiOutlineWifi
                className="mr-2 "
                style={{ fontSize: "20px", color: "white" }}
              />
              subscribe
            </Button>
                

                <Modal  isOpen={showModal} toggle={toggleModal} className="main-modal" style={{maxWidth:"400px",borderRadius:"10px"}}  >
                    
                     <div className="modal-header" >
                    

  </div>
  <div className="modal-body home-modal">
   <Row className='' style={{marginTop:"-20px"}}>
    <Col className=''>
    <h4 className='text-white' style={{fontWeight:"600"}}>Pay for profile</h4>
    </Col>
    <Col className='text-right' >
     <h4 className='text-white' style={{fontWeight:"600"}}>$ {props?.value?.userData?.profilePrice}</h4>
    
    </Col>
    </Row>
    <Row>
    
                     <Col className=''>
                     {
//                      <div class="input-group mt-2">
    
//       <input type="radio" name="radio-group" className='radio-input' aria-label="Radio button"/>
   
 
//   <input type="text" class="form-control pay-input" styke={{backgroudColor:"#1E1E1E"}}placeholder="Credit card..."/>
//   <div class="input-group-append pay-inner-two-input" className='pay-inner-two-input'>
//     <span class="pay-inner" id="input-group-addon">
//       <img src={memberFour} class="img-fluid mr-2" alt="Image 1"/>
//       <img src={memberFive}  class="img-fluid mr-2" alt="Image 2"/>
//       <img src={memberSix}  class="img-fluid" alt="Image 3"/>
//       <img src={memberSeven} class="img-fluid mr-2" alt="Image 1"/>
//       {
//     //   <img src={memberEight}  class="img-fluid mr-2" alt="Image 2"/>
//       }
      
//     </span>
//   </div>
// </div>
    }
     
    <Row className=''>
   
    <Col>
    <input type="radio" name="radio-group" className='ml-3' aria-label="Radio button"/>
    <img src={memberTen} class="img-fluid ml-3" alt="Image 1"/>
    <span className='mt-2 ml-2' style={{color:"#8B8B8B"}}>Card</span>
    </Col>
    <Col>
     <img src={memberFour} class="img-fluid ml-3 mt-1 " alt="Image 1"/>
       <img src={memberFive}  class="img-fluid ml-3 mt-1 " alt="Image 2"/>
       <img src={memberSix}  class="img-fluid ml-3 mt-1" alt="Image 3"/>
       <img src={memberSeven} class="img-fluid ml-3 mt-1" alt="Image 1"/>
       </Col>
    
    </Row>
    <Label for="exampleEmail" className='mt-4' style={{color:"white",fontWeight:"700",fontSize:"15px"}}>
     Card number
    </Label>
     <CardElement options={CARD_OPTIONS} className='mt-2' />
    {
//   <Input className='' type='number' placeholder='card number' style={{color:"#1E1E1E",border:"1px solid white"}}/>
// <Row className='mt-2'>
// <Col>
// <FormGroup className=''>
//     <Label for="exampleEmail" style={{color:"white",fontWeight:""}}>
//       Expiry Date
//     </Label>
//    <Input
//       id="exampleSelect"
//       name="select"
//       type="select"
//       className=''
//       placeholder='United States of America'
//       style={{color:"#1E1E1E",border:"1px solid white"}}
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
// </Col>
// <Col>
  
//   <FormGroup className=''>
//     <Label for="exampleEmail" style={{color:"white"}}>
//       Security code
//     </Label>
//    <Input
//       id="exampleSelect"
//       name=""
//       type="number"
//       className=''
//       placeholder='code..'
//       style={{color:"#1E1E1E",border:"1px solid white"}}
      
//     />
     
//   </FormGroup>
//    </Col>

// </Row>
    }
    {
//  <FormGroup check className="ml-4" >
//     <Input type="radio" className='mt-2'  />
//     {' '} <Label style={{color:"#615E5E"}} >I agree to the
//     <a className="register-end mb-3 ml-2" href="">
//               Terms and Conditions
//               </a>
//     </Label>
    
//   </FormGroup>
    }

{
      animationCheck?
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
      <>
<h1 className='text-center mt-4 mb-0'>
<Button className='pay-btn reset-button' onClick={handlePayment}>Submit</Button></h1>
<h1 className='text-center mb-0'>
 <Button type="button" className="pay-cancel-btn" onClick={toggleModal}>
      Cancel
    </Button>
    </h1>
    </>
}
           
    </Col>
   
   
    </Row>
    
    
  </div>
  
                </Modal>
               

            </div>
            <ToastContainer/>
        </div>
  )
}
export default SubscriptionModal