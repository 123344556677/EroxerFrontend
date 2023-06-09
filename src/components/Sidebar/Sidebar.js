
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import './sidebar.css'
// import PerfectScrollbar from "perfect-scrollbar";


// reactstrap components
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
 
} from "contexts/BackgroundColorContext";
import {Row} from "reactstrap";
import Logo from './logo5.png'
import apple from './j4.png'
import playstore from './j5.png'
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillSetting, AiOutlineLogout, AiOutlineTwitter, AiOutlineUnlock, AiTwotoneSecurityScan } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdManageAccounts, MdPrivacyTip } from "react-icons/md";
import HomeModals from "components/Modals/HomeModals";
import { Accordion } from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import AOS from "aos";





function Sidebar(props) {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [live, setLive] = useState(false);
   const [openList, setOpenList] = useState(false);
   const toggle = () => setDropdownOpen((prevState) => !prevState);
  const location = useLocation();
  const sidebarRef = React.useRef(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const history=useHistory();
  const logOut=()=>{
    localStorage.clear();
    history.push('/')
  }
  AOS.init()
  
  
  // const toggleAccordion = (id) => {
  //   if (open === id) {
  //     setOpen();
  //   } else {
  //     setOpen(id);
  //   }
  // };
  
  
  // const linkOnClick = () => {
  //   document.documentElement.classList.remove("nav-open");
  // };
  const { routes, rtlActive, logo } = props;
  // let logoImg = null;
  // let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      // logoImg = (
      //   <a
      //     href={logo.outterLink}
      //     className="simple-text logo-mini"
      //     target="_blank"
      //     onClick={props.toggleSidebar}
      //   >
      //     <div className="logo-img">
      //       <img src={logo.imgSrc} alt="react-logo" />
      //     </div>
      //   </a>
      // );
      // logoText = (
      //   <a
      //     href={logo.outterLink}
      //     className="simple-text logo-normal"
      //     target="_blank"
      //     onClick={props.toggleSidebar}
      //   >
      //     {logo.text}
      //   </a>
      // );
    } else {
      // logoImg = (
      //   <Link
      //     to={logo.innerLink}
      //     className="simple-text logo-mini"
      //     onClick={props.toggleSidebar}
      //   >
      //     <div className="logo-img">
      //       <img src={logo.imgSrc} alt="react-logo" />
      //     </div>
      //   </Link>
      // );
      // logoText = (
      //   <Link
      //     to={logo.innerLink}
      //     className="simple-text logo-normal"
      //     onClick={props.toggleSidebar}
      //   >
      //     {logo.text}
      //   </Link>
      // );
    }
  }
   useEffect(() => {
    // Check if the user has an active session
    const userId = JSON.parse(localStorage.getItem("keys"));
    if (userId?.id) {
      // Start the session timeout
      startSessionTimeout();
    }
  }, []);

  const startSessionTimeout = () => {
    // Clear the previous timeout if exists
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    // Set a new timeout for 15 seconds
    const timeout = setTimeout(() => {
      // Display the alert when the session is about to expire
      const timeoutPrompt = setTimeout(() => {
        // If the user doesn't click "OK" within 30 seconds, expire the session
        expireSession();
      }, 30000); // 30 seconds

      const response = window.confirm("Your session is about to expire. Do you want to extend it?");
      clearTimeout(timeoutPrompt);
      if (response) {
        // If the user chooses to extend the session, reset the timeout and continue
        startSessionTimeout();
      } else {
        // If the user chooses not to extend the session, clear the userId from localStorage and refresh the page
        expireSession();
      }
    }, 15000); // 15 seconds

    setSessionTimeout(timeout);
  };

  const expireSession = () => {
    clearTimeout(sessionTimeout);
    localStorage.clear();
    history.push("/");
  };

  
   
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className={live?"no-sidebar":"sidebar user-sidebar ml-0 mt-0"} >
          <div className="sidebar-wrapper sid-rap" ref={sidebarRef}>
         
              <div className="sidebar-logo mt-2 ">
             
                <img src={Logo} alt="" className=""/>
             
              </div>
            
           
            <Nav style={{marginTop:"-5px"}}>
            
              {routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  
                    
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                  {
                      prop.name==="Live"?
                      setLive(true)
                      :
                      
                      setLive(false)
                    }
                  {
                  prop.name!=="Authentication"&&
                  prop.name!=="PasswordReset"&&
                  prop.name!=="AccountManagement"&&
                  prop.name!=="privacy"&&
                  prop.name!=="Login"&&
                  prop.name!=="Register"&&
                  prop.name!=="createPost"&&
                  prop.name!=="createAd"&&
                  prop.name!=="createPoll"&&
                  prop.name!=="AdDescription"&&
                  prop.name!=="editProfile"&&
                  prop.name!=="ChatCall"&&
                  prop.name!=="ChatVideoCall"&&
                  prop.name!=="Live Streaming"&&
                  
                     
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link sidebar-links ml-lg-5"
                      activeClassName={prop.name==="Settings"||prop.name==="Subscription"?"":"links-active"}
                      onClick={props.toggleSidebar}
                      isOpen={props.name==="Settings"?dropdownOpen:""}
                      toggle={props.name==="Settings"?toggle:""}
                      
                       
                    >
                    
                    
                      <i className={prop.icon} style={{marginTop:"6px"}}></i> 
                     
                      <p onClick={prop.name==="Subscription"?()=>setOpenList(!openList):()=>setOpenList(false)} className={prop.name==="Home"?"links-name links-home-name":"links-name"}>{rtlActive ? prop.rtlName : prop.name}
                      {
                        prop.name==="Home"&&
                        <HomeModals/>
                        
                        
                      }
                      {
                        prop.name==="Subscription"&&
                        openList===false&&
                      <IoMdArrowDropdown className='ml-2' style={{fontSize:"30px"}}/>
                      }
                      {
                        prop.name==="Subscription"&&
                        openList===true&&
                      <IoMdArrowDropup className='ml-2' style={{fontSize:"30px"}}/>
                      }
                      {
                        prop.name==="Subscription"&&
                        openList===true&&
                        <div className="ml-3 mt-1 accordian-div" data-aos="fade-right">
                        <p className="accordian-text"  ><span className="accordian-dot"><BsDot className="accordian-icon" style={{color:""}}/></span> All</p>
                        <p className="accordian-text"><span className="accordian-dot"><BsDot className="accordian-icon" style={{color:"green"}}/></span> Active</p>
                        <p className="accordian-text"><span className="accordian-dot"><BsDot className="accordian-icon" style={{color:"red"}}/></span> Expired</p>
                        <p className="accordian-text"><span className="accordian-dot"><BsDot className="accordian-icon" style={{color:"yellow"}}/></span> Attention Required</p>
                        
                        </div>

                      }
                      {
                        // prop.name==="Subscription"&&
    //                     <Accordion>
    //   <Accordion.Item eventKey="0">
    //     <Accordion.Header>Accordion Item #1</Accordion.Header>
    //     <Accordion.Body>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
         
    //     </Accordion.Body>
    //   </Accordion.Item>
    //   <Accordion.Item eventKey="1">
    //     <Accordion.Header>Accordion Item #2</Accordion.Header>
    //     <Accordion.Body>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          
    //     </Accordion.Body>
    //   </Accordion.Item>
    // </Accordion>
                        
                      }
                      {
                        prop.name==="Settings"&&
                      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="" style={{position:"absolute"}}>
        <DropdownToggle onClick={(e)=>e.preventDefault()} className="dropDown-sidebar"><IoMdArrowDropdown className='' style={{fontSize:"30px"}}/></DropdownToggle>
        <DropdownMenu style={{backgroundColor:"#161616",marginLeft:"400%",marginTop:"-90%",borderRadius:"20px"}}  >
          <DropdownItem className="drop-item" header >
          <span className="mr-2  drop-icons">
          <AiFillSetting/>
          </span>
          Settngs and Privacy
          </DropdownItem>
          
          <DropdownItem className="drop-item" header onClick={()=>history.push('/admin/authentication')}>
          <span className="mr-2 drop-icons" onClick={()=>history.push('/admin/authentication')}>
          <AiTwotoneSecurityScan/>
          </span><span onClick={()=>history.push('/admin/authentication')}>Two Factor Authentication</span></DropdownItem>
          <DropdownItem className="drop-item" header>
          <span className="mr-2  drop-icons">
          <MdManageAccounts/>
          </span><span onClick={()=>history.push('/admin/management')}>Account Management</span></DropdownItem>
          <DropdownItem className="drop-item" header>
          <span className="mr-2  drop-icons">
        <AiOutlineUnlock/>
          </span><span onClick={()=>history.push('/admin/reset')}>Password</span></DropdownItem>
          <DropdownItem className="drop-item" header>
          <span className="mr-2  drop-icons">
          <MdPrivacyTip/>
          </span><span onClick={()=>history.push('/admin/privacy')}>Privacy Policy</span></DropdownItem>
          <DropdownItem className="drop-item" header>
          <span className="mr-2  drop-icons" >
          <AiOutlineLogout/>
          </span><span onClick={logOut}>Log Out</span></DropdownItem>
         
        </DropdownMenu>
      </Dropdown>
                      }
                      </p>
                    </NavLink>
                  }
                  
                  </li>
                 
                );
              })}
              <div style={{marginTop:"10px"}}>
              <p className="mb-2 footer-main ml-4">Download our mobile app</p>
            <Row className="mb-3 ml-3">
            <img src={apple} className="ml-4"  alt=""/>
            <img src={playstore}  className="ml-2"  alt=""/>
            </Row>
            <p className="footer-text text-center ">All right reserved. &copy; Erroxer 2022</p>
            <p className=" footer-textt  text-center ">By visting this page you agreeing to our </p>
            <p className=" footer-policy mb-1 ml-2  mr-1 text-center">Privacy Policy and  Terms and Conditions</p>
            
            <Row className="justify-content-center">
            <AiFillInstagram className="footer-icons ml-1"/>
            <AiFillLinkedin className="footer-icons ml-1"/>
            <AiOutlineTwitter className="footer-icons ml-1"/>
            <AiFillFacebook className="footer-icons ml-1"/>
            </Row>
            
            </div>
            </Nav>
            
            
            
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
