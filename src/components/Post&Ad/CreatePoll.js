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
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes,uploadString, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { createPoll } from 'Api/Api'
import { useHistory } from 'react-router-dom'
import { getUserById } from 'components/redux/actions/userActions'








const CreatePoll = () => {
  const [postPic, setPostPic] = useState();
  const [postCheck, setPostCheck] = useState(false);
  const [commentsCheck, setCommentsCheck] = useState(false);
  const [price, setPrice] = useState(0);
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem('keys')))
  // const [userData, setUserData] = useState()
  const [options, setOptions] = useState([{ option:'',counter:0 }])
  const [question, setQuestion] = useState()
   const [animationCheck, setAnimationCheck] = useState(false)
   const getUser= useSelector(state => state?.getUserById);
  const userData=getUser?.userData

//   let options=[]
 let pollId=0
 const history=useHistory()

  
  const dispatch=useDispatch()
    const Values={
        userId:userId.id
      }
    //  useEffect(()=>{
      
    //    getUsersById(Values)
    //    .then(res => {
    //      console.log(res.data);
    //       if (res?.data?.message === "User Exist") {
    //        setUserData(res?.data?.data)
    //       } 
     
    // });
    //  },[])
    useEffect(()=>{
      
        dispatch(getUserById(Values))
     },[])

    const handleInputChange=(index, event)=>{
        const { value } = event.target;
  console.log(event.target,"---------->event array")
  const updatedOptions = [...options];
  updatedOptions[index] = { value,counter:0};
  setOptions(updatedOptions);
   
   
 
    console.log(options,"---------->option chnge array")
  }
  const addValueToOptions = () => {
  setOptions([...options, { option: '',counter:0 }]);
   console.log(options,"---------->option array")
};
const removeValueFromOptions = () => {
  const updatedOptions = options.filter((option, index) => index !== options.length - 1);
  setOptions(updatedOptions);
};
const poll=async(e)=>{
  setAnimationCheck(true)
    e.preventDefault()
    const values={
        userId:userId.id,
        question:question,
        options:options,
        userData:userData,
        key:"poll"
    } 
    await createPost(values)
    .then((res)=>{
      if (res.data.message === "post Generated") {
      toast.success('Poll Created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    dispatch(getPosts())
     setTimeout(() => {
          history.push("/admin/home");
        }, 2000);
    
  }
  else{
    toast.error('Server Error', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setAnimationCheck(false)
  }
  
   

}).catch((error) => {
  console.error('Failed to upload file:', error);
});
}
  

  

  
  
  
  return (
    <div className='content'>
    <Row>
    {
      userData?.creator===true&&
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
     <Row className='justify-content-end mr-lg-2 mt-2'>
      <a className='option-poll' onClick={removeValueFromOptions}>- remove option</a>
      </Row>
    
   
    
    
     
      
       
    <Row className='justify-content-center mt-3'>
    {
      animationCheck?
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      :
    <Button type='submit' className='reset-button mr-2' style={{paddingLeft:"200px",paddingRight:"210px"}} >Create</Button>
    }
    </Row>
    </Form>
    </Col>
    

   
    
    </Row>
    
    </Col>
  }
  {
      userData?.creator===false&&
     
      <h3 className='ml-lg-5' >Please become eroxr member by buying our member ship!</h3>
      
          }
    
    
    <Col xl={1}>
     <ChatPortion/>
     </Col>
     </Row>
    
    <ToastContainer/>
    </div>
  )
}

export default CreatePoll;