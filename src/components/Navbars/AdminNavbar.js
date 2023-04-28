
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import './Navbar.css'
import {BsFillBellFill } from 'react-icons/bs';

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const history = useHistory();
  
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
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  // this function handles the logout button
  
  return (
    <>
    {
              // props.brandText!=="Home"&&
               props.brandText!=="Chat"&&
              
             
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
       
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
           
            {
            // <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            //   {props.brandText}
            // </NavbarBrand>
            }
            
            
          
          </div>
          
              
          {
             props.brandText!=="Profile"&&
             props.brandText!=="Dasboard"&&
            props.brandText!=="Home"&&
            props.brandText!=="Authentication"&&
            props.brandText!=="PasswordReset"&&
             props.brandText!=="AccountManagement"&&
             props.brandText!=="Membership"&&
              props.brandText!=="createPost"&&
              props.brandText!=="createAd"&&
               props.brandText!=="AdDescription"&&
               props.brandText!=="editProfile"&&
            
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          }
          
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto mt-3" navbar>
            {
              // <InputGroup className="search-bar">
              //   <Button color="link" onClick={toggleModalSearch}>
              //     <i className="tim-icons icon-zoom-split" />
              //     <span className="d-lg-none d-md-block">Search</span>
              //   </Button>
              // </InputGroup>
            }
            {
               props.brandText!=="Profile"&&
                props.brandText!=="Dashboard"&&
               props.brandText!=="Home"&&
                props.brandText!=="Authentication"&&
                 props.brandText!=="PasswordReset"&&
                  props.brandText!=="AccountManagement"&&
                  props.brandText!=="Membership"&&
                  props.brandText!=="Help & Support"&&
                  props.brandText!=="createPost"&&
                  props.brandText!=="createAd"&&
                   props.brandText!=="AdDescription"&&
                   props.brandText!=="editProfile"&&
                 
               <>
            <div className="home-input-addon">
     <InputGroup style={{ borderRadius: '20px' }} className="navbar-search" >
      <InputGroupAddon addonType="prepend" className='home-search' style={{ background: 'black', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
        <InputGroupText style={{ borderColor: 'white',borderRadius:"20px 0 0 20px" }}>
          <FaSearch className="home-search" style={{ color: 'white' }} />
        </InputGroupText>
      </InputGroupAddon>
      <Input style={{ background: 'black', borderColor: 'white', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white' }} placeholder="Search" />
    </InputGroup>
    </div>
            
    <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo" >
                    <img alt="..." src={require("./j25.png")} />
                  </div>
                  <span className="text-white navbar-name ml-2" >Alex Rock</span>
                  {
                  // <b className="caret d-none d-lg-block d-xl-block" />
                  }
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      <Button  >
                        <span className="d-md-block">Logout</span>
                      </Button>
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <BsFillBellFill style={{fontSize:"20px"}}/>
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Mike John responded to your email
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      You have 5 more tasks
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Your friend Michael is in town
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another notification
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another one
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              
              <li className="separator d-lg-none" />
              </>
                }
            </Nav>
          </Collapse>
        
          
        </Container>
      </Navbar>
      
          }
      {
      // <Modal
      //   modalClassName="modal-search"
      //   isOpen={modalSearch}
      //   toggle={toggleModalSearch}
      // >
      //   <ModalHeader>
      //     <Input placeholder="SEARCH" type="text" />
      //     <button
      //       aria-label="Close"
      //       className="close"
      //       onClick={toggleModalSearch}
      //     >
      //       <i className="tim-icons icon-simple-remove" />
      //     </button>
      //   </ModalHeader>
      // </Modal>
      }
    </>
  );
}

export default AdminNavbar;
