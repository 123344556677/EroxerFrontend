import React from "react";
import { useHistory,Link } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from 'react-icons/fa';
import {AiFillApple} from 'react-icons/ai';

import './Views.css'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Alert,
  CustomInput,
  Row
} from "reactstrap";

import { User } from "../backend-sdk/user.sdk";
import ForgetModal from "components/Modals/ForgetModal";

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);

    event.preventDefault();
     history.push("/admin/home");
    // if (!email || !password) {
    //   setError("All fields are mandatory");
    //   console.log("All fields are mandatory");
    //   return;
    // }

    setIsSubmitting(true);

    // const res = await User.login(email, password).catch(err => {
    //   setError(err.msg);
    //   console.log(err.error);
    //   setIsSubmitting(false);
    //   return;
    // });
    setIsSubmitting(false);
    // if (!res.success) {
    //   setError(res.msg);
    //   console.log(res.msg);
    //   return;
    // } else {
    //   localStorage.setItem("apiToken", res.token);
    //   localStorage.setItem("user", JSON.stringify(res.user));
    //   history.push("/admin/dashboard");
    // }
  }

  return (
    <div>
      <Col className="ml-auto mr-auto  col-lg-4">
        <Card className="login-card mb-5">
          <Form>
            <CardHeader>
              <CardTitle>
              <h2 className=" text-white mb-2 text-center login-logo">Login to Your Account</h2>
              <p className="login-text text-center ">Your Own Digital Compaign</p>
              </CardTitle>
              <Row className="mt-2 mb-2">
              <Col className="ml-5">
              <Button color="dark" className="google-btn pt-3 pb-3  ">
  <FaGoogle size={20} className="mr-2" />
 <small>Login with Google</small>
</Button>
</Col>
 <Col>
              <Button color="dark" className="google-btn   pt-3 pb-3 ml-1">
  <AiFillApple size={20} className="mr-2" />
<small>Login with Apple</small>
</Button>
</Col>
</Row>
<div className="d-flex align-items-center mb-3 mt-3">
  <div className="col-2 pt-1 mr-0 border-bottom login-barss" style={{height: "1px", width: "30%", margin: "auto"}}></div>
  <div className="text-secondary orFont small" ><span style={{fontWeight:"600", padding: "0 10px"}} className="login-bars">OR</span></div>
  <div className="col-2 pt-1 ml-0 border-bottom  login-barss" style={{ height: "1px", width: "30%", margin: "auto"}}></div>
</div>
              
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
               
                <Input
                  defaultValue="Write your Email here"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                   className=" login-inputs"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
               
                <Input
                  defaultValue="Write your password here"
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  className="mt-4  login-inputs"
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>
              <Row>
              <Col>
             <FormGroup check className="ml-4" >
    <Input type="radio"  />
    {' '} <Label style={{color:"#615E5E"}}>Remeber me</Label>
    
  </FormGroup>
  </Col>
   <Col>
           
               <ForgetModal/>
  </Col>
  </Row>

             
            </CardBody>
            <CardFooter>
            <h1 className="text-center mb-1">
              <Button
                className="btn-fill login-btn"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Login to Your Account
                {isSubmitting ? "..." : ""}
              </Button>
              
              </h1>
               <p className="text-center login-register-btn mt-4">
                Not a member yet? <Link to="/auth/register" style={{color:"white",fontWeight:"600"}}> Register Now</Link>
              </p>
              <Row className="mt-4">
              <Col>
              <a className="login-end mb-3 ml-2" href="">
              Privacy Policy
              </a>
              </Col>
               <Col className="">
               <p  className="login-end text-right mb-3 mr-2">
              Copyright 2022
               </p>
              </Col>
              </Row>

            </CardFooter>
          </Form>
        </Card>
       
      </Col>
      
    </div>
  );
}

export default Login;
