import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { Button, Card, Col, Modal, Row } from 'reactstrap'
import modalOne from './j45.png'
import './Modals.css'

const HomeModals = () => {
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
  return (
   <div className='content'>
            <div>
                <span className="" onClick={toggleModal} style={{fontSize:"40px",marginLeft:"160px",position:"absolute",marginTop:"-38px"}}><AiOutlinePlusCircle/></span>

                <Modal  isOpen={showModal} toggle={toggleModal} className="main-modal" >
                    
                     <div className="modal-header" >
                     

  </div>
  <div className="modal-body home-modal">
    <Row>
                     <Col className='text-center'>
                     <h1 className='text-center mb-0'>
    <img src={modalOne}/>
    </h1>
    <h2 className='text-center text-white mt-3 mb-0' style={{fontWeight:"600"}}>
    Create Post
    </h2>
    <p className='chat-designation' style={{color:"#AAAAAA"}}>Lorem ipsum may be used as a placeholder before final copy is available.</p>
    </Col>
    </Row>
    <Row className="justify-content-center">
    <Col xl={6}>
     <Card className="modal-card mt-2"  >
    <p className='text-center text-white ml-2 mr-2 mt-4 mb-4' style={{cursor:"pointer"}} onClick={gotoPost}>
Create New Post
    </p>
   

    </Card>
    </Col>
     <Col xl={6}>
     <Card className="modal-card mt-2" >
    <p className='text-center text-white ml-2 mr-2 mt-4 mb-4' style={{cursor:"pointer"}}  onClick={gotoAd}>
Create New Ad
    </p>
   

    </Card>
    
   
  
    </Col>
    <Col xl={12} className="text-center">
     <Button type="button" className="  modal-ok-button" onClick={toggleModal}>
     Ok
    </Button> 
    <br/>
    <Button type="button" className=" modal-cancel-button" onClick={toggleModal}>
      Cancel
    </Button>
    </Col>
    </Row>
    
    
  </div>
  
                </Modal>

            </div>
        </div>
  )
}

export default HomeModals