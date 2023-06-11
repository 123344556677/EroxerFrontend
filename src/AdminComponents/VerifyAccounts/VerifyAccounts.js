import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'reactstrap'
import './VerifyAccounts.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCreatorRequest } from 'components/redux/actions/creatorActions'
import { changeCreatorStatus } from 'Api/Api'
import { toast,ToastContainer } from 'react-toastify'

const VerifyAccounts = () => {
  const [request,setRequest]=useState([])
  const dispatch=useDispatch()
  useEffect(() => {
     
      dispatch(getAllCreatorRequest())
    
        
    }, [dispatch])
    
    const getAllUser= useSelector(state => state?.getAllCreatorRequest);
    const AllRequest=getAllUser?.creatorRequest
useEffect(() => {
    setRequest(AllRequest?.filter(data=>data?.status==="pending"))
},[AllRequest])

const changeVideoStatus=async(e)=>{
  const values={
   id:e,
   status:"approved"
  }
  await changeCreatorStatus(values)
  .then((res)=>{
     console.log(res,"status updated")
    if(res?.data?.message==="updated"){
       toast.success('Status updated', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
    setTimeout(() => {
          window.location.reload(false) 
        }, 2000);
   

     }
  })

}
const changeVideoStatusTwo=async(e)=>{
  const values={
   id:e,
   status:"rejected"
  }
  await changeCreatorStatus(values)
  .then((res)=>{
    console.log(res,"status updated")
    if(res?.data?.message==="status updated"){
       toast.success('Status updated', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setTimeout(() => {
          window.location.reload(false) 
        }, 2000);

     }
  })

}
    

  return (
     <>
      <div className="content">
      {
        request?.length?
      <>
       <h2 className="ml-lg-3">Verify Accounts</h2>
        <Row>
        {
        request?.map((data)=>(

        
       
          <Col xs="4">
            <Card className="card-chart">
            <h4 className='ml-lg-3 mt-3'>{data?.userData?.firstName} {data?.userData?.lastName}</h4>
            <video controls muted className='ml-lg-2 mr-lg-2 verify-video' src={data?.videoUrl}/>
            <Button className='video-accept-btn ml-lg-3 mr-lg-3 mt-3' onClick={()=>changeVideoStatus(data?._id)}>Accept</Button>
             <Button className='video-reject-btn ml-lg-3 mr-lg-3 mb-4'onClick={()=>changeVideoStatusTwo(data?._id)}>Reject</Button>
            </Card>
            </Col>
            ))
        }
            </Row>
            </>
            :
            <h2 className="text-center">No Accounts to verify!</h2>
      }
            <ToastContainer/>
            </div>
            </>
  )
}

export default VerifyAccounts