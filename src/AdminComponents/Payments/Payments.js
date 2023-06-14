import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { AiFillDelete } from 'react-icons/ai';
import { useEffect } from 'react';
import { getAllUsers } from 'components/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import {  } from 'react-bootstrap';
import { getPayments } from 'components/redux/actions/paymentAction';

const Payments = () => {
  const dispatch=useDispatch()
  const [color,setColor]=useState(false)
  useEffect(() => {
     
      
      dispatch(getPayments())
    
        
    }, [dispatch])
    const getAllPayment= useSelector(state => state?.getPaymentReducer);
    const payment=getAllPayment?.payment

    const handleColor=(e)=>{
      setColor(e)
    }

   
  return (
    <>
      <div className="content">
      <Row>
      <Col xl={7}>
       <h2 className="ml-lg-3" >Payments</h2>
      </Col>
      <Col xl={5}>
      <Row className='mt-1'>
      <h5 onClick={()=>handleColor(false)} style={{color: color?"":"white",cursor:"pointer"}}>Payments</h5>
      <h5 onClick={()=>handleColor(true)} className='ml-lg-4' style={{color: color?"white":"",cursor:"pointer"}}>Subscriptions</h5>
      </Row>
      
      </Col>
       </Row>
        <Row>
          <Col md="12">
            <Card>
             
              <CardBody>
              {
                color===false&&
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
                color===true&&
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