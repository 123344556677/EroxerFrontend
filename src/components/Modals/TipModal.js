import React, { useEffect, useState } from 'react'
import { AiOutlineDollar, AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, FormGroup, Input, Label, Modal, Row } from 'reactstrap'
import modalOne from './j45.png'
import './Modals.css'
import memberFour from './j41.png'
import memberFive from './j42.png'
import memberSix from './j43.png'
import memberSeven from './j44.png'
// import memberEight from './j45.png'
import memberNine from './j46.png'
import memberTen from './j52.png'

const TipModal = (props) => {
  console.log(props,"in modal")
    const history=useHistory()
    const [showModal, setShowModal] = useState(false);
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

  return (
   <div className='content'>
            <div>
               <span onClick={toggleModal}  style={{fontSize:"20px",color:"white",cursor:"pointer"}}>Tip</span> <AiOutlineDollar style={{fontSize:"20px",color:"white",cursor:"pointer"}} onClick={toggleModal} className='ml-2'/>
                

                <Modal  isOpen={showModal} toggle={toggleModal} className="main-modal" style={{maxWidth:"400px",borderRadius:"10px"}}  >
                    
                     <div className="modal-header" >
                    

  </div>
  <div className="modal-body home-modal">
   <Row className='' style={{marginTop:"-20px"}}>
    <Col className=''>
    <h4 className='text-white' style={{fontWeight:"600"}}>Send some dollars</h4>
    </Col>
    <Col className='text-right' >
     <h4 className='text-white' style={{fontWeight:"600"}}>$1.22</h4>
    
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
    <Label for="exampleEmail" style={{color:"white",fontWeight:""}}>
     Card number
    </Label>
  <Input className='' type='number' placeholder='card number' style={{color:"#1E1E1E",border:"1px solid white"}}/>
<Row className='mt-2'>
<Col>
<FormGroup className=''>
    <Label for="exampleEmail" style={{color:"white",fontWeight:""}}>
      Expiry Date
    </Label>
   <Input
      id="exampleSelect"
      name="select"
      type="select"
      className=''
      placeholder='United States of America'
      style={{color:"#1E1E1E",border:"1px solid white"}}
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
</Col>
<Col>
  
  <FormGroup className=''>
    <Label for="exampleEmail" style={{color:"white"}}>
      Security code
    </Label>
   <Input
      id="exampleSelect"
      name=""
      type="number"
      className=''
      placeholder='code..'
      style={{color:"#1E1E1E",border:"1px solid white"}}
      
    />
     
  </FormGroup>
   </Col>

</Row>
 <FormGroup check className="ml-4" >
    <Input type="radio" className='mt-2'  />
    {' '} <Label style={{color:"#615E5E"}} >I agree to the
    <a className="register-end mb-3 ml-2" href="">
              Terms and Conditions
              </a>
    </Label>
    
  </FormGroup>


<h1 className='text-center mb-0'>
<Button className='pay-btn reset-button' onClick={toggleModal}>Submit</Button></h1>
<h1 className='text-center mb-0'>
 <Button type="button" className="pay-cancel-btn" onClick={toggleModal}>
      Cancel
    </Button>
    </h1>
           
    </Col>
   
   
    </Row>
    
    
  </div>
  
                </Modal>
               

            </div>
        </div>
  )
}

export default TipModal