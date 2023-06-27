
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  
  NavbarBrand,
  Navbar,
  Container,
  Row,
  Col,
  Button,
 
} from "reactstrap";
import Logo from './logo5.png'
import { useHistory } from "react-router-dom";
import './Navbar.css'

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [animationCheck, setAnimationCheck] = useState(false);
  const history=useHistory()
  // const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  console.log(props?.brandText,"brand ------=>")
  // this function opens and closes the collapse on small devices
  // const toggleCollapse = () => {
  //   if (collapseOpen) {
  //     setcolor("navbar-transparent");
  //   } else {
  //     setcolor("bg-white");
  //   }
  //   setcollapseOpen(!collapseOpen);
  // };
  // this function is to open the Search modal
  // const toggleModalSearch = () => {
  //   setmodalSearch(!modalSearch);
  // };
     useEffect(() => {
    setTimeout(() => {
      setAnimationCheck(true)
    },15000);
},[])

  return (
    <>
      <Navbar className={classNames("", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
          {
            // <div
            //   className={classNames("navbar-toggle d-inline", {
            //     toggled: props.sidebarOpened,
            //   })}
            // >
            //   <NavbarToggler onClick={props.toggleSidebar}>
            //     <span className="navbar-toggler-bar bar1" />
            //     <span className="navbar-toggler-bar bar2" />
            //     <span className="navbar-toggler-bar bar3" />
            //   </NavbarToggler>
            // </div>
          }
          <br/><br/><br/>
           { props.brandText === "Brand" ?
           <NavbarBrand className="" style={{marginTop:"40%",width:"85%"}}  href="#pablo" onClick={(e) => e.preventDefault()}>
           <Row className="justify-content-center">
           <Col xl={6} className="text-right">
           
            
             <img src={Logo} alt="" className="mt-3 mr-lg-5" style={{width:"60%"}}/>
           </Col>
            </Row>
             </NavbarBrand>
            :

            
            <NavbarBrand className=""  href="#pablo" onClick={(e) => e.preventDefault()}>
             <img src={Logo} alt="" className="mt-5" style={{width:"30%"}}/>
            </NavbarBrand>
        }
          </div>
          <br/>
          {
            animationCheck&&
            props.brandText === "Brand" &&
            <>
            <h1 className="text-right ">
          <Button className="auth-anim-btn" onClick={()=>history.push('/login')} >Login To Continue..</Button><br/>
           </h1>
          </>
          }
          {
          // <NavbarToggler onClick={toggleCollapse}>
          //   <span className="navbar-toggler-bar navbar-kebab" />
          //   <span className="navbar-toggler-bar navbar-kebab" />
          //   <span className="navbar-toggler-bar navbar-kebab" />
          // </NavbarToggler>
          // <Collapse navbar isOpen={collapseOpen}>
          //   <Nav className="ml-auto" navbar>
          //     <InputGroup className="search-bar"></InputGroup>
          //     <li className="separator d-lg-none" />
          //   </Nav>
          // </Collapse>
          }
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
