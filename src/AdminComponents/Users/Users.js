import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import './Users.css'
import { AiFillDelete } from 'react-icons/ai';
import { useEffect } from 'react';
import { getAllUsers } from 'components/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from 'Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import {  } from 'react-bootstrap';

const Users = () => {
  const dispatch=useDispatch()
  useEffect(() => {
     
      dispatch(getAllUsers())
    
        
    }, [dispatch])
    const getAllUser= useSelector(state => state?.getAllUsers);
    const AllUser=getAllUser?.allUsers

    const deleteUser=async(e)=>{
      const values={
        userId:e,

      }
      await deleteAccount(values)
      .then((res)=>{
    console.log(res,"status updated")
    if(res?.data?.message==="Account deleted successfully"){
       toast.success('user deleted', {
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
       <h2 className="ml-lg-3">Active Users</h2>
        <Row>
          <Col md="12">
            <Card>
             
              <CardBody>
                <Table className="tablesorter user-table" >
                  <thead className="text-primary">
                    <tr>
                      <th className='text-center'>First Name</th>
                      <th className='text-center'>Last Name</th>
                      <th className='text-center'>Username</th>
                      <th className='text-center'>Phone Number</th>
                      <th className='text-center' >Email</th>
                      <th className='text-center' >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    AllUser?.map((data)=>(

                    
                    <tr>
                      <td className='text-center'>{data?.firstName}</td>
                      <td className='text-center'>{data?.lastName}</td>
                      <td className='text-center'>{data?.username?data?.username:"-"}</td>
                      <td className='text-center'>{data?.phoneNumber?data?.phoneNumber:"-"}</td>
                      <td className='text-center'>{data?.email}</td>
                      <td className='text-center' onClick={()=>deleteUser(data?._id)}><AiFillDelete className='user-delete' /></td>
                    </tr>
                    ))
                  }
                   
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <ToastContainer/>
      </div>
    </>
  )
}

export default Users