import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { register } from "Api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  Alert,
} from "reactstrap";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { googleReg } from "Api/Api";
import EroxrFeeModal from "components/Modals/EroxrFeeModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');

function Register(props) {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkFirst, setCheckFirst] = useState(false);
  const [checkLast, setCheckLast] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassowrd] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [animationCheck, setAnimationCheck] = useState(false)
  const [modalCheck, setModalCheck] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] = useState();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const Greg = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      googleReg(tokenResponse).then((res) => {
        if (res.data.message === "Email already exist") {
          toast.warning("Email already exist", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            // hideProgressBar: true,
            theme: "dark",
            // bodyClassName: 'dark-toast',
          });
        } else {
          toast.success("Registered Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            // hideProgressBar: true,
            theme: "dark",
            // bodyClassName: 'dark-toast',
          });
          setTimeout(() => {
            history.push("/login");
          }, 2000);
         
        }
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const reg = async (e) => {
     setAnimationCheck(true)
    e.preventDefault();
    const values = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    if(isChecked===true){
    await register(values).then((res) => {
      console.log(res)
      if (res.data.message === "Email already exist") {
         setAnimationCheck(false)
        toast.warning("Email already exist", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          // hideProgressBar: true,
          theme: "dark",
          // bodyClassName: 'dark-toast',
        });
      } else {
        toast.success("Registered Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          // hideProgressBar: true,
          theme: "dark",
          // bodyClassName: 'dark-toast',
        });
       
        // setTimeout(() => {
        //   history.push("/");
        // }, 2000);
        setModalUser(res?.data?.data)
        
         setShowModal(true);
          setAnimationCheck(false)
        
       
      }
    });
  }
  else{
    setAnimationCheck(false)
    toast.warning("Please agree to terms and policy", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          // hideProgressBar: true,
          theme: "dark",
          // bodyClassName: 'dark-toast',
        });
        
  }
  };
const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
    <Elements stripe={stripePromise} className="" >
    <EroxrFeeModal isOpen={showModal} toggle={closeModal} userData={modalUser}/>
    </Elements>
    
      <Col className="ml-auto mr-auto col-md-6 col-lg-5">
        <Card className="reg-card">
          <Form onSubmit={reg}>
            <CardHeader>
              <CardTitle>
                <h2 className=" text-white mb-2 text-center login-logo">
                  Register To Your Account
                </h2>
                <p className="login-text text-center ">
                  Your Own Digital Compaign
                </p>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="First Name"
                      type="text"
                      autoComplete=""
                      className=" login-inputs"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Input
                      defaultValue=""
                      placeholder="Last Name"
                      type="text"
                      autoComplete=""
                      className=" login-inputs"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              
              <FormGroup>
                <Input
                  defaultValue=""
                  placeholder="Email"
                  type="email"
                  autoComplete=""
                  className=" login-inputs mt-3"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  defaultValue=""
                  placeholder="Password"
                  type="password"
                  autoComplete=""
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-4  login-inputs"
                />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup check className="ml-4">
                    <Input
                      type="radio"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />{" "}
                    <Label style={{ color: "#615E5E" }}>
                      I agree to the
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
              {
      animationCheck?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <lottie-player  src="https://assets6.lottiefiles.com/packages/lf20_vpxae5vy.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      </div>
      :
                <Button
                  className="btn-fill register-btn"
                  color="primary"
                  type="submit"
                >
                  Register
                  {isSubmitting ? "..." : ""}
                </Button>
              }
                <div className="d-flex align-items-center mb-3 mt-3">
                  <div
                    className="col-4 pt-1 mr-0 border-bottom login-barss"
                    style={{ height: "1px", width: "30%", margin: "auto" }}
                  ></div>
                  <div className="text-secondary orFont small">
                    <span
                      style={{ fontWeight: "600", padding: "0 10px" }}
                      className="login-bars"
                    >
                      OR
                    </span>
                  </div>
                  <div
                    className="col-4 pt-1 ml-0 border-bottom  login-barss"
                    style={{ height: "1px", width: "30%", margin: "auto" }}
                  ></div>
                </div>
                <Row className="mt-2 mb-2">
                  <Col>
                    <Button
                      color="dark"
                      className="google-btn pt-3 pb-3"
                      onClick={Greg}
                    >
                      <FaGoogle size={18} className="mr-2" />
                      <small className="">Login with Google</small>
                    </Button>
                  </Col>
                  <Col>
                    <Button color="dark" className="google-btn pt-3 pb-3 ">
                      <AiFillApple size={20} className="mr-2" />
                      <small>Login with Apple</small>
                    </Button>
                  </Col>
                </Row>
              </h1>
              <p className="text-center login-register-btn mt-4">
                Already have account?{" "}
                <Link to="/login" style={{ color: "white", fontWeight: "600" }}>
                  {" "}
                  Login
                </Link>
              </p>
              <Row className="mt-4">
                <Col>
                  <a className="login-end mb-3 ml-2" href="">
                    Privacy Policy
                  </a>
                </Col>
                <Col className="">
                  <p className="login-end text-right mb-3 mr-2">
                    Copyright 2022
                  </p>
                </Col>
              </Row>
            </CardFooter>
          </Form>
        </Card>
      </Col>
      <ToastContainer />
    </div>
  );
}

export default function WrappedRegister() {
  return (
    <GoogleOAuthProvider clientId="1037622976419-o2srr2rvkm94nlh8s7oqgcl04pb8bc9p.apps.googleusercontent.com">
      <Register />
    </GoogleOAuthProvider>
  );
}
