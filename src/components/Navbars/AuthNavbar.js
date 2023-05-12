
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  
  NavbarBrand,
  Navbar,
  Container,
 
} from "reactstrap";
import Logo from './logo.png'

function AdminNavbar(props) {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
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
            <NavbarBrand className=""  href="#pablo" onClick={(e) => e.preventDefault()}>
             <img src={Logo} alt="" className="mt-5" style={{width:"70%"}}/>
            </NavbarBrand>
          </div>
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
