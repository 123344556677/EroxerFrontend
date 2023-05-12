import React, { useState } from 'react'
import { BsFillBellFill } from 'react-icons/bs'
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'


 export function MyDropdownToggle() {
  return (
    <DropdownToggle >
     <BsFillBellFill className='mt-3 '  style={{marginLeft:"-80px",color:"white",fontSize:"25px"}}/>
      <Badge  style={{color:"white",backgroundColor:"red",marginLeft:"-10px"}} pill className="position-absolute mt-3 top-0 end-0">1</Badge>
    
    </DropdownToggle>
  );
}
const Notifications = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

   const toggle = () => setDropdownOpen((prevState) => !prevState);


function MyDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem divider />
      <DropdownItem>Logout</DropdownItem>
    </DropdownMenu>
  );
}
  return (
    <div>

      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="" style={{position:"absolute"}}>
       <MyDropdownToggle />
      <MyDropdownMenu />

       
          </Dropdown>
    
    
    </div>
  )
}

export default Notifications