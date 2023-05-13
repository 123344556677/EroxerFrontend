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

const ChatImageModal = (props) => {
  console.log(props,"in image modal")
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

const settingInterval=()=>{
  toggleModal()
  props?.image?.settingInterval(props?.image?.imageString)
}


  return (
   <div className='content'>
            <div>
                
                <p className="msg-blur-text" onClick={settingInterval}> Click to open</p>

                <Modal  isOpen={showModal} toggle={toggleModal}   style={{maxWidth:"500px",borderRadius:"10px",marginTop:"100px"}}  >
                    
                     <div className="modal-header" >
                    

  </div>
  <div className="modal-body ">
  <h5 className='text-center text-white'>This image is visible for only 15 seconds</h5>
  <h1 className='text-center'>
  <img className="" src={props?.image?.imageString} style={{width:"500px",height:"300px"}} alt=""/>
  </h1>
   
     
    
    
    
  </div>
  
                </Modal>
               

            </div>
        </div>
  )
}

export default ChatImageModal;