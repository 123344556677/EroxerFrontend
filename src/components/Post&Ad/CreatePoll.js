import ChatPortion from 'components/ChatPortion/ChatPortion'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Button, Card, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import postOne from './j46.png'
import FileBase64 from "react-file-base64";
import './post.css'
import { createPost } from 'Api/Api'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsersById } from 'Api/Api'
import { getPosts } from 'components/redux/actions/postActions'
import { useDispatch } from 'react-redux'
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { createPoll } from 'Api/Api'








const CreatePoll = () => {
  const [postPic, setPostPic] = useState();
  const [postCheck, setPostCheck] = useState(false);
  const [commentsCheck, setCommentsCheck] = useState(false);
  const [price, setPrice] = useState(0);
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  const [userData, setUserData] = useState()
  const [options, setOptions] = useState([{ option:'',counter:0 }])
  const [question, setQuestion] = useState()

//   let options=[]
 let pollId=0

  
  const dispatch=useDispatch()
    const Values={
        userId:userId.id
      }
     useEffect(()=>{
      
       getUsersById(Values)
       .then(res => {
         console.log(res.data);
          if (res?.data?.message === "User Exist") {
           setUserData(res?.data?.data)
          } 
     
    });
     },[])

    const handleInputChange=(index, event)=>{
        const { value } = event.target;
  console.log(event.target,"---------->event array")
  const updatedOptions = [...options];
  updatedOptions[index] = { value};
  setOptions(updatedOptions);
   
   
 
    console.log(options,"---------->option chnge array")
  }
  const addValueToOptions = () => {
  setOptions([...options, { option: '',counter:0 }]);
   console.log(options,"---------->option array")
};
const poll=(e)=>{
    e.preventDefault()
    const values={
        userId:userId.id,
        question:question,
        options:options,
        userData:userData,
        key:"poll"
    } 
    createPost(values)
}
  

  

  
  
  
  return (
    <div className='content'>
    <Row>
    <Col xl={10}>
    
    <Row className='justify-content-center mr-lg-5'>
    <Col xl={6} className="">
    <h2 className='text-center text-white' style={{fontWeight:"600"}}>Create poll <br/>
For your Audience</h2>
<Form onSubmit={poll}>

<Input
        id="exampleEmail"
        placeholder="Ask Question......"
        type="text"
        className='post-input'
        onChange={(e)=>setQuestion(e.target.value)}
        required
       
      />
      <Row className='justify-content-end mr-lg-2 mt-2'>
      <a className='option-poll' onClick={addValueToOptions}>+ add option</a>
      </Row>
    

    {
        options?.map((data,index)=>(
            <div key={index}>
            <Input
         id={`data-${index}`}
        placeholder="Enter Option"
        type="text"
        className='post-input mt-2'
        value={data.option}
        onChange={(e) => handleInputChange(index, e)}
        
       
      />
      </div>

        ))
    }
    
   
    
    
     
      
       
    <Row className='justify-content-end mt-3'>
    <Button type='submit' className='reset-button mr-2' >Submit</Button>
    </Row>
    </Form>
    </Col>
    

   
    
    </Row>
    
    </Col>
    
    
    <Col xl={1}>
     <ChatPortion/>
     </Col>
     </Row>
    
    <ToastContainer/>
    </div>
  )
}

export default CreatePoll;