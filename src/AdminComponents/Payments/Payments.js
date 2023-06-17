import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";

import { AiFillDelete } from 'react-icons/ai';
import { useEffect } from 'react';
import { getAllUsers } from 'components/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import {  } from 'react-bootstrap';
import { getPayments } from 'components/redux/actions/paymentAction';
import Moment from 'react-moment';
import { getAllTip } from 'components/redux/actions/paymentAction';
import { getAllSubscriptions } from 'components/redux/actions/requestActions';
import { getPaymentsRequest } from 'components/redux/actions/paymentAction';
import { updatePaymentRequest } from 'Api/Api';

const Payments = () => {
  const dispatch=useDispatch()
  const [color,setColor]=useState("payments")
  const [pendingPayment,setPendingPayment]=useState([])
  const [approvedPayment,setApprovedPayment]=useState([])
  useEffect(() => {
     
      
      dispatch(getPayments())
      dispatch(getAllSubscriptions())
      dispatch(getAllTip())
      dispatch(getPaymentsRequest())
    
        
    }, [dispatch])
    const getAllPayment= useSelector(state => state?.getPaymentReducer);
    const payment=getAllPayment?.payment
    const getAllSubscription= useSelector(state => state?.getAllSubscriptionsReducer);
    const subscriptions=getAllSubscription?.allSubscriptions
    const getAllTips= useSelector(state => state?.getAllTip);
    const tips=getAllTips?.recieverTip
    const getAllRequest= useSelector(state => state?.getPaymentRequestReducer);
    const request=getAllRequest?.paymentRequest

    console.log(request,"---------->request")
   useEffect(()=>{
    setPendingPayment(request.filter(data=>data.status===false))
    setApprovedPayment(request.filter(data=>data.status===true))
   },[request,color])
    



    const handleColor=(e)=>{
      setColor(e)
    }
    const approveRequest=(e)=>{
      const values={
        id:e,
        status:true
      }
      updatePaymentRequest(values)
      .then((res)=>{
        if(res?.data?.message==="updated"){
       toast.success('Status updated', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    
      theme: 'dark',
     
    });
     setTimeout(() => {
          setPendingPayment(pendingPayment?.filter(data=>data._id!==e))
          
        }, 2000);

     }
      })
    }

   
  return (
    <>
      <div className="content">
      <Row>
      <Col xl={7}>
       <h2 className="ml-lg-3" >Payments</h2>
      </Col>
      <Col xl={5}>
      <Row className='mt-1 '>
      <h5 onClick={()=>handleColor("payments")} style={{color: color==="payments"&&"white",cursor:"pointer"}}>Payments</h5>
      <h5 onClick={()=>handleColor("subscriptions")} className='ml-lg-4' style={{color:color==="subscriptions"&&"white",cursor:"pointer"}}>Subscriptions</h5>
      <h5 onClick={()=>handleColor("Tip")} className='ml-lg-4' style={{color:color==="Tip"&&"white",cursor:"pointer"}}>Tips</h5>
      <h5 onClick={()=>handleColor("request")} className='ml-lg-4' style={{color:color==="request"&&"white",cursor:"pointer"}}>Requested ({pendingPayment?.length}) </h5>
      <h5 onClick={()=>handleColor("approved")} className='ml-lg-3' style={{color:color==="approved"&&"white",cursor:"pointer"}}>Approved ({approvedPayment?.length}) </h5>

      </Row>
      
      </Col>
       </Row>
        <Row>
          <Col md="12">
            <Card>
             
              <CardBody>
              {
                color==="payments"&&
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>Name</th>
                      <th className='text-center'>Email</th>
                      <th className='text-center'>State</th>
                      <th className='text-center'>Payment</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                    payment?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.name}</td>
                      <td className='text-center'>{data?.email?data?.email:"-"}</td>
                      <td className='text-center'>{data?.state}</td>
                      <td className='text-center'>SEK 100</td>
                      
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              }
              {
                color==="subscriptions"&&
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>Sender name</th>
                      <th className='text-center'>Sender email</th>
                      <th className='text-center'>Reciever name</th>
                      <th className='text-center'>Reciever email</th>
                      <th className='text-center'>payment</th>
                      <th className='text-center'>Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                    subscriptions?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.paymentData?.userData?.username?data?.paymentData?.userData?.username:data?.paymentData?.userData?.firstName}</td>
                      <td className='text-center'>{data?.paymentData?.userData?.email}</td>
                      <td className='text-center'>{data?.recieverData?.username?data?.recieverData?.username:data?.recieverData?.firstName}</td>
                      <td className='text-center'>{data?.recieverData?.email}</td>
                      <td className='text-center'>SEK {data?.paymentData?.payment}</td>
                      <td className='text-center'><Moment format="MM/DD/YYYY">{data?.paymentData?.timestamp}</Moment></td>
                      
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              }
              {
                color==="Tip"&&
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>Sender name</th>
                      <th className='text-center'>Sender email</th>
                      <th className='text-center'>Reciever name</th>
                      <th className='text-center'>Reciever email</th>
                      <th className='text-center'>payment</th>
                      <th className='text-center'>Date</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                    tips?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.paymentData?.senderData?.username?data?.paymentData?.senderData?.username:data?.paymentData?.senderData?.firstName}</td>
                      <td className='text-center'>{data?.paymentData?.senderData?.email}</td>
                      <td className='text-center'>{data?.recieverData?.username?data?.recieverData?.username:data?.recieverData?.firstName}</td>
                      <td className='text-center'>{data?.recieverData?.email}</td>
                      <td className='text-center'>SEK {data?.paymentData?.tip}</td>
                      <td className='text-center'><Moment format="MM/DD/YYYY">{data?.paymentData?.timestamp}</Moment></td>
                      
                    </tr>
                    ))
                  }
                
                   
                    
                  </tbody>
                </Table>
              }
                {
                color==="request"&&
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>Name</th>
                      <th className='text-center'>Email</th>
                      <th className='text-center'>Phone number</th>
                      <th className='text-center'>Payment</th>
                      <th className='text-center'>Date</th>
                      <th className='text-center'>Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                    pendingPayment?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.userData?.username?data?.userData?.username:data?.userData?.firstName}</td>
                      <td className='text-center'>{data?.userData?.email?data?.userData?.email:"-"}</td>
                      <td className='text-center'>{data?.userData?.phoneNumber?data?.userData?.phoneNumber:"-"}</td>
                      <td className='text-center'>SEK {data?.payment}</td>
                      <td className='text-center'><Moment format="MM/DD/YYYY">{data?.timestamp}</Moment></td>
                      <td className='text-center'><Button className="reset-button" onClick={()=>approveRequest(data?._id)}>Approve</Button></td>
                      
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              }
              {
                color==="approved"&&
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>Name</th>
                      <th className='text-center'>Email</th>
                      <th className='text-center'>Phone number</th>
                      <th className='text-center'>Payment</th>
                      <th className='text-center'>Date</th>
                      
                      
                    </tr>
                  </thead>
                  <tbody>
                  {
                    approvedPayment?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.userData?.username?data?.userData?.username:data?.userData?.firstName}</td>
                      <td className='text-center'>{data?.userData?.email?data?.userData?.email:"-"}</td>
                      <td className='text-center'>{data?.userData?.phoneNumber?data?.userData?.phoneNumber:"-"}</td>
                      <td className='text-center'>SEK {data?.payment}</td>
                      <td className='text-center'><Moment format="MM/DD/YYYY">{data?.timestamp}</Moment></td>
                      
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              }
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <ToastContainer/>
      </div>
    </>
  )
}

export default Payments