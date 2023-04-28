import React from "react";
import { useHistory,Link } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from 'react-icons/fa';
import {AiFillApple} from 'react-icons/ai';

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
  Row,
  Col,
  Alert
} from "reactstrap";

import { User } from "../backend-sdk/user.sdk";

function Register(props) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);
    event.preventDefault();
    if (
      !email ||
      !password1 ||
      !gender ||
      !name ||
      !phoneNumber ||
      !city ||
      !country
    ) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }
    if (password1 !== password2) {
      setError("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }
    setIsSubmitting(true);

    // The userType propriety can be changed later once it is established what are the userTypes and what privileges each userType has
    const res = await User.create(
      name,
      email,
      password1,
      "Admin",
      gender,
      phoneNumber,
      city,
      country
    ).catch(err => {
      setError(err.msg);
      console.log(err.error);
      setIsSubmitting(false);
      return;
    });
    setIsSubmitting(false);
    if (!res) {
      setError("Unknown error, please try again later");
      console.log("Error at the Database");
      return;
    }
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      console.log(res);
      return;
    } else {
      history.push("/auth/login");
    }
  }
  return (
    <div>
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card className="reg-card">
          <Form>
            <CardHeader>
              <CardTitle>
              <h2 className=" text-white mb-2 text-center login-logo">Register to Your Account</h2>
              <p className="login-text text-center ">Your Own Digital Compaign</p>
              </CardTitle>
     

              
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <Row>
              <Col>
               <FormGroup>
               
                <Input
                  defaultValue="Write your Email here"
                  placeholder="First Name"
                  type="email"
                  autoComplete="email"
                   className=" login-inputs"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              </Col>
              <Col>
               <FormGroup>
               
                <Input
                  defaultValue="Write your Email here"
                  placeholder="Last Name"
                  type="email"
                  autoComplete="email"
                  className=" login-inputs"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormGroup>
              </Col>
              </Row>
              <FormGroup>
               
                <Input
                  defaultValue="Write your Email here"
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                   className=" login-inputs mt-4"
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
                  
                  className="mt-4  login-inputs"
                 
                />
              </FormGroup>
              <Row>
              <Col>
             <FormGroup check className="ml-4" >
    <Input type="radio"  />
    {' '} <Label style={{color:"#615E5E"}} >I agree to the
    <a className="register-end mb-3 ml-2" href="">
              Terms and Conditions
              </a>
    </Label>
    
  </FormGroup>
  </Col>
 
  </Row>

             
            </CardBody>
            <CardFooter>
            <h1 className="text-center mb-1">
              <Button
                className="btn-fill register-btn"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Register
                {isSubmitting ? "..." : ""}
              </Button>
              <div className="d-flex align-items-center mb-3 mt-3">
  <div className="col-4 pt-1 mr-0 border-bottom login-barss" style={{height: "1px", width: "30%", margin: "auto"}}></div>
  <div className="text-secondary orFont small" ><span style={{fontWeight:"600", padding: "0 10px"}} className="login-bars">OR</span></div>
  <div className="col-4 pt-1 ml-0 border-bottom  login-barss" style={{ height: "1px", width: "30%", margin: "auto"}}></div>
</div>
              <Row className="mt-2 mb-2">
              <Col >
              <Button color="dark" className="google-btn pt-3 pb-3  ">
  <FaGoogle size={20} className="mr-2" />
 <small className="">Login with Google</small>
</Button>
</Col>
 <Col >
              <Button color="dark" className="google-btn pt-3 pb-3 ">
  <AiFillApple size={20} className="mr-2" />
<small>Login with Apple</small>
</Button>
</Col>
</Row>
              
              </h1>
               <p className="text-center login-register-btn mt-4">
                Already have account? <Link to="/auth/login" style={{color:"white",fontWeight:"600"}}> Login</Link>
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

export default Register;
