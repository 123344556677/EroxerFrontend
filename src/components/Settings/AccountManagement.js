import { deleteAccount } from "Api/Api";
import { getUsersById } from "Api/Api";
import ChatPortion from "components/ChatPortion/ChatPortion";
import AccountModal from "components/Modals/AccountModal";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import manageOne from "./j39.png";
const AccountManagement = () => {
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );

  const [userData, setUserData] = useState();
  const [checked, setChecked] = useState(false);
  const name = "name";
  const username = "username";
  const phoneNumber = "phoneNumber";
  const website = "website";
  const values = {
    userId: userId.id,
  };
  useEffect(() => {
    getUsersById(values).then((res) => {
      console.log(res.data);
      if (res.data.message === "User Exist") {
        setUserData(res?.data?.data);
      }
    });
  });
  const history=useHistory()
const permanentlyDelete=()=>{
  deleteAccount(values)
  .then((res)=>{
        if(res.data.message==="Account deleted successfully"){
            toast.success('Account deleted', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    
      theme: 'dark',
     
    });
    localStorage.clear();
    setTimeout(() => {
          history.push("/");
        }, 2000);
  }
  });


}
  return (
    <div className="content" style={{ zoom: "0.95" }}>
      <span
        className=""
        style={{ color: "white", fontSize: "10px", marginLeft: "50px" }}
      >
        <Link
          to="/admin/home"
          style={{
            color: "white",
            fontSize: "40px",
            marginTop: "-80px",
            position: "absolute",
          }}
        >
          <IoMdArrowRoundBack />
        </Link>
      </span>
      <Row>
        <Col xl={10}>
          <Row className="">
            <Col xl={8} className="text-center" style={{ marginLeft: "14%" }}>
              <h1 className="  mt-1">
                <img
                  src={manageOne}
                  className="mb-0"
                  style={{ width: "50px" }}
                  alt=""
                />
              </h1>

              <h3
                className="text-white  mb-0 "
                style={{ fontWeight: "600", marginTop: "-20px" }}
              >
                Account Management
              </h3>
              <p className="" style={{ color: "grey", fontSize: "10px" }}>
                Manage you account an deactivating your account
              </p>
            </Col>
          </Row>
          <FormGroup check className="mt-4">
            <Input type="radio" className="mt-2" />{" "}
            <Label
              style={{ color: "white", fontWeight: "600", fontSize: "17px" }}
            >
              General Profile Settings
            </Label>
          </FormGroup>
          <Row className="justify-content-center mt-4">
            <Col xl={9}>
              <Table striped>
                <tbody>
                  <tr>
                    <th scope="row" className="manage-table-heading">
                      Name
                    </th>
                    <td className="manage-table-content">
                      {userData?.firstName} {userData?.lastName}
                    </td>
                    <td>
                      <AccountModal props={name} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="manage-table-heading">
                      User Name
                    </th>
                    <td className="manage-table-content">
                      {userData?.username
                        ? userData?.username
                        : "https://www.erroxr.com/web/alexrock"}
                    </td>
                    <td>
                      <AccountModal props={username} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="manage-table-heading">
                      Contact
                    </th>
                    <td className="manage-table-content">
                      {userData?.phoneNumber
                        ? "+" + userData?.phoneNumber
                        : " +123457899963"}
                    </td>
                    <td>
                      <AccountModal props={phoneNumber} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="manage-table-heading">
                      Ad account contact
                    </th>
                    <td className="manage-table-content">
                      {userData?.website
                        ? "www." + userData?.website
                        : "www.alexrock@gmail.com"}
                    </td>
                    <td>
                      <AccountModal props={website} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <FormGroup check className="mt-4">
            <Input type="radio" className="mt-2" />{" "}
            <Label
              style={{ color: "white", fontWeight: "600", fontSize: "17px" }}
            >
               Deleting Your Accont
            </Label>
            <p className="" style={{ color: "grey", fontSize: "13px" }}>
              If you want to permanently delete  your Erroxer
              acconut .let us know
            </p>
          </FormGroup>
          <Row>
            <Col xl={10}>
            {
              // <Card className="manage-card mt-3">
              //   <CardHeader>
              //     <FormGroup check className="">
              //       <Input type="radio" className="mt-2 ml-2 mb-0" />{" "}
              //       <Label
              //         className="ml-4"
              //         style={{
              //           color: "white",
              //           fontWeight: "600",
              //           fontSize: "17px",
              //         }}
              //       >
              //         Deactivate Your Accont
              //       </Label>
              //       <p
              //         className="ml-4"
              //         style={{
              //           color: "#625F5F",
              //           fontWeight: "600",
              //           fontSize: "10px",
              //         }}
              //       >
              //         Deactivating your accont temporary
              //       </p>
              //     </FormGroup>
              //     <p
              //       className="mb-3 mt-2 ml-4"
              //       style={{
              //         color: "grey",
              //         fontWeight: "600",
              //         fontSize: "12px",
              //       }}
              //     >
              //       Your profile will be disabled and your name and photos will
              //       be <br /> removed from most things you have shared.
              //     </p>
              //   </CardHeader>
              // </Card>
                  }
              <Card className="manage-card mt-3">
                <CardHeader>
                  <FormGroup check className="">
                    <Input type="radio" checked={checked} className="mt-2 ml-2 mb-0" onChange={()=>setChecked(true)} />{" "}
                    <Label
                      className="ml-4"
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: "17px",
                      }}
                    >
                      Permanently Delete account
                    </Label>
                    <p
                      className="ml-4"
                      style={{
                        color: "#625F5F",
                        fontWeight: "600",
                        fontSize: "10px",
                      }}
                    >
                      Delete your account as permanent{" "}
                    </p>
                  </FormGroup>
                  <p
                    className="mb-3 mt-2 ml-4"
                    style={{
                      color: "grey",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  >
                    When you delete your Erroxer account, you want not be able
                    to <br />
                    retrive the content or information you have shared on
                    Erroxer.{" "}
                  </p>
                </CardHeader>
              </Card>
              <Row className="justify-content-end">
                <Button className="manage-cancel-btn" onClick={()=>history.push('/admin/home')}>cancel</Button>{" "}
                <Button className="reset-button" onClick={permanentlyDelete}>
                  Continue to delete
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <ChatPortion />
        </Col>
      </Row>
    </div>
  );
};

export default AccountManagement;
