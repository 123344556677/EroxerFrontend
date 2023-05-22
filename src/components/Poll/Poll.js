import React, { useState } from 'react';
import { Progress } from 'reactstrap';
import './Poll.css';

const Poll = () => {
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

  return (
    <div className="">
    <div class="card second-card-main" style={{zoom:"0.80"}}>
 
  <img src="https://picsum.photos/id/1015/1200/800"  class="card-img-top rounded-circle" alt="..." />
 
  <div class="card-body">
  <Progress
  animated
  value={50}
  className="progress-bars"

/>
  
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