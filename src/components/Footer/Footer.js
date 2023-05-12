import React from "react";
import footerOne from './j4.png'
import footerTwo from './j5.png'
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillSetting, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineTwitter, AiOutlineUnlock, AiTwotoneSecurityScan } from "react-icons/ai";
// reactstrap components
import { Col, Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer" style={{padding:"7px",backgroundColor:"#161616",zIndex:"100"}}>
      <Container fluid>
      
        <Nav className="w-100">
        <p style={{color:"#CFCFCF",fontSize:"8px"}}>Download our mobile app</p>
          <NavItem>
            <NavLink href="https://www.creative-tim.com/?ref=bdr-user-archive-footer">
            <img src={footerOne}/>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.creative-tim.com/presentation?ref=bdr-user-archive-footer">
              <img src={footerTwo}/>
            </NavLink>
          </NavItem>
          <NavItem style={{marginLeft:"20%"}}>
            <NavLink href="https://www.creative-tim.com/presentation?ref=bdr-user-archive-footer">
               <span className="" style={{color:"#CFCFCF",fontSize:"8px" ,marginBottom:"-60px",fontWeight:"600"}}>All rights reserved.Erroxer 2022.
            By visiting this page you agree to our <span style={{color:"#229ED9"}}>Privacy policy </span> and <span style={{color:"#229ED9"}}> Terms and Conditions</span></span>
            </NavLink>
          </NavItem>
          <NavItem style={{marginLeft:"20%"}}>
            <NavLink href="https://www.creative-tim.com/presentation?ref=bdr-user-archive-footer">
              <span className="ml-1" style={{fontSize:"18px"}}><AiFillFacebook/></span>
            <span className="ml-1"><AiFillInstagram style={{fontSize:"18px"}}/></span>
            <span className="ml-1"><AiFillLinkedin style={{fontSize:"18px"}}/></span>
             <span className="ml-1"><AiOutlineTwitter style={{fontSize:"18px"}}/></span>
            </NavLink>
          </NavItem>
          
          
          

         
         
        </Nav>
       
        
      </Container>
    </footer>
  );
}

export default Footer;
