import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { login } from "Api/Api";
import ForgetModal from "components/Modals/ForgetModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import GoogleLogin from 'react-google-login';
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import "./Views.css";

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
  Row,
} from "reactstrap";
import { motion } from "framer-motion";
import { googleReg } from "Api/Api";
import { googleLogin } from "Api/Api";

// import { User } from "../backend-sdk/user.sdk";

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [animationCheck, setAnimationCheck] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const slideVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.6 } },
  };

  const Glogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      googleLogin(tokenResponse).then((res) => {
        console.log(res.data);
        if (res.data.message === "Login Successfull") {
          
          toast.success("Login Successful", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,

            theme: "dark",
          });
          const id = res?.data?.data?._id;
          localStorage.setItem("keys", JSON.stringify({ id }));
          setTimeout(() => {
            history.push("/admin/home");
          }, 2000);
        }
        if (res.data.message === "incorrect password") {
          toast.error("Incorrect Password", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,

            theme: "dark",
          });
        }

        if (res.data.message === "user not registered") {
          toast.warning("Email not exists", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,

            theme: "dark",
          });
        }
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const log = async (e) => {
     setAnimationCheck(true)
    e.preventDefault();

    const values = {
      email: email,
      password: password,
    };

    await login(values).then((res) => {
      console.log(res.data);
     
      if (res.data.message === "Login Successfull") {

        toast.success("Login Successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,

          theme: "dark",
        });
        const id = res?.data?.data?._id;
        localStorage.setItem("keys", JSON.stringify({ id }));
        if(res?.data?.data?.key==="admin"){
        setTimeout(() => {
          history.push("/user/dashboard");
        }, 2000);
      }
      else{
        setTimeout(() => {
          history.push("/admin/home");
        }, 2000);
      }
      }
      if (res.data.message === "incorrect password") {
        setAnimationCheck(false)
        toast.error("Incorrect Password", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      }

      if (res.data.message === "user not registered") {
        setAnimationCheck(false)
        toast.warning("User not registered", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      }
    });
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={slideVariants}>
      <div>
        <Col className="ml-auto mr-auto  col-lg-4  ">
          <Card className="login-card mb-5">
            <Form onSubmit={log}>
              <CardHeader>
                <CardTitle>
                  <h2 className=" text-white mb-2 text-center login-logo">
                    Login To Your Account
                  </h2>
                  <p className="login-text text-center ">
                    Your Own Digital Compaign
                  </p>
                </CardTitle>
                <Row className="mt-2 mb-2">
                  <Col className="">
                    <Button
                      color="dark"
                      className="google-btn pt-3 pb-3 "
                      onClick={Glogin}
                    >
                      <FaGoogle size={18} className="mr-2" />
                      <small>Login with Google</small>
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      color="dark"
                      className="google-btn   pt-3 pb-3 ml-1"
                    >
                      <AiFillApple size={20} className="mr-2" />
                      <small>Login with Apple</small>
                    </Button>
                  </Col>
                </Row>
                <div className="d-flex align-items-center mb-3 mt-3">
                  <div
                    className="col-2 pt-1 mr-0 border-bottom login-barss"
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
                    className="col-2 pt-1 ml-0 border-bottom  login-barss"
                    style={{ height: "1px", width: "30%", margin: "auto" }}
                  ></div>
                </div>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Input
                    defaultValue=""
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    className=" login-inputs"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    defaultValue=""
                    placeholder="Password"
                    type="password"
                    autoComplete="password"
                    required
                    className="mt-4  login-inputs"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Row>
                {
                  // <Col>
                  //   <FormGroup check className="ml-4">
                  //     <Input type="radio" />{" "}
                  //     <Label style={{ color: "#615E5E" }}>Remeber me</Label>
                  //   </FormGroup>
                  // </Col>
                }
                  <Col>
                    <ForgetModal />
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
                    className="btn-fill login-btn"
                    color="primary"
                    type="submit"
                  >
                    Login to Your Account
                    {isSubmitting ? "..." : ""}
                  </Button>
                 }
                </h1>
                <p className="text-center login-register-btn mt-4">
                  Not a member yet?{" "}
                  <Link
                    to="/register"
                    style={{ color: "white", fontWeight: "600" }}
                  >
                    {" "}
                    Register Now
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
    </motion.div>
  );
}
export default function WrappedLogin() {
  return (
    <GoogleOAuthProvider clientId="1037622976419-o2srr2rvkm94nlh8s7oqgcl04pb8bc9p.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
}
