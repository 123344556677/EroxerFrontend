import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Progress, Row } from 'reactstrap';
import './Poll.css';

const Poll = (props) => {
  const [options, setOptions] = useState([
    { id: 1, text: 'Option 1', count: 0 },
    { id: 2, text: 'Option 2', count: 0 },
    { id: 3, text: 'Option 3', count: 0 },
  ]);

  const handleVote = (optionId) => {
    setOptions(prevOptions =>
      prevOptions.map(option => {
        if (option.id === optionId) {
          return { ...option, count: option.count + 1 };
        }
        return option;
      })
    );
  };
  console.log(props,"poll data-->")
  const history=useHistory()

  return (
    <div className="">
    <div class="card second-card-main ml-lg-3" style={{zoom:"0.80"}}>
 
   <img src={ props.data?.userData?.profilePic?props.data?.userData?.profilePic:"https://picsum.photos/id/1015/1200/800"}  class="card-img-top rounded-circle" alt="..." onClick={()=>history.push(`/admin/profile/${props?.data?.userId}`)}/>

  <div class="card-body poll-card">
  <h3 className="text-white ml-3 mt-5">
  {props?.data?.question} ?
  </h3>
  
  {
    props?.data?.options?.map((data)=>(
  <Row className='mt-4' key={data}>
  <Col xl={8}>

  <Progress
  animated
  value={50}
  className="progress-bars mt-2"

>
 {`${50}%`}
</Progress>

</Col>
<Col>
<h1 className='text-center'>
<Button className='reset-button'>
Vote

</Button></h1>
</Col>
</Row>
    ))
  }

  
  
  </div>
    
  <div class="card-footer bg-transparent d-flex justify-content-end mb-1" >
 
 {
    //  <AiOutlineHeart className='' style={{color:"white",fontSize:"35px",marginTop:"-60px",background:"#1e1e26",borderRadius:"20px 0 0 0",paddingTop:"10px",marginRight:"-8px",cursor:"pointer"}} />
 }
   
  </div>
</div>
     
    </div>
  );
};

export default Poll;