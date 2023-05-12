import React, { useState } from "react";

import profilFive from "./j15.png";
import profilSix from "./j33.png";
import profilSeven from "./j27.png";
import profileEight from "./j35.png";
import profileNine from "./j36.png";
import profileTen from "./j40.jpg";
import profileEleven from "./j41.jpg";
import profileTwelve from "./j42.jpg";
import "./Profile.css";
import { MdExpandMore } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { HiOutlineWifi } from "react-icons/hi";
import { AiFillInstagram, AiFillFacebook, AiOutlineEye } from "react-icons/ai";
import FileBase64 from "react-file-base64";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button, Row, Col, CustomInput } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
// import { getUsersById } from 'Api/Api'
import { updateUser } from "Api/Api";
// import { useDispatch, useSelector } from "react-redux";
import { getReduxUserById } from "components/redux/actions/userActions";
import { sendRequest } from "Api/Api";
import { useSelector } from "react-redux";

const Profile = () => {
  const history = useHistory();
  const { id } = useParams();
  // const dispatch = useDispatch();
  console.log(id, "profile id=========>");
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  // const [userData, setUserData] = useState()
  const [isHovered, setIsHovered] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState();
  //  const getUser= useSelector(state => state.getUserById);
  let sendingId = "";
  if (id === ":id") {
    sendingId = userId.id;
  } else {
    sendingId = id;
  }
  const user = useSelector((state) =>
    getReduxUserById(state?.getAllUsers, sendingId)
  );

  const userData = user;
  console.log(userData, "==========>userData");

  // const Values = {
  //   userId: userId.id,
  // };

  //    useEffect(()=>{

  //   getUsersById(Values)
  //    .then(res => {
  //      console.log(res.data);
  //       if (res?.data?.message === "User Exist") {
  //        setUserData(res?.data?.data)
  //        setBackgroundImage(res?.data?.data?.backgroundImage)
  //       }

  // });
  //  },[])

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  //  useEffect(()=>{

  //   dispatch(getReduxUserById())

  //  },[dispatch])
  const makeRequest = () => {
    const values = {
      senderId: userId.id,
      recieverId: id,
      status: "pending",
    };
    sendRequest(values);
  };

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  const handleBackgroundPic = (e) => {
    console.log(e, "pic");
    setBackgroundImage(e.selectedFile.base64);

    const values = {
      backgroundImage: e.selectedFile.base64,
      userId: userId.id,
    };
    updateUser(values).then((res) => {
      if (res.data.message === "user updated") {
        toast.success("Cover photo upated", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      } else {
        toast.error("Server Error", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,

          theme: "dark",
        });
      }
    });
  };
  return (
    <div className="content profile-div " style={{ zoom: "0.80" }}>
      <div
        style={{
          backgroundImage: `url(${
            backgroundImage ? backgroundImage : profilSix
          })`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "350px",
          width: "1060px",
          //  maxWidth:"104%",
          position: "relative",
        }}
        className="profileBackground"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <br />
        <h1 className="text-center mt-5">
          <BsFillImageFill
            className="background-upload"
            style={{ opacity: isHovered ? "1" : "0" }}
          />
        </h1>
        <div
          style={{
            opacity: "0",
            position: "absolute",
            zIndex: "10",
            align: "center",
            marginLeft: "45%",
            marginTop: "-8%",
            fontSize: "30px",
            paddingTop: "15px",
          }}
        >
          <FileBase64
            type="file"
            className="text-center"
            onDone={(base64) => handleBackgroundPic({ selectedFile: base64 })}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            transform: "translate(50%, 50%)",
          }}
        >
          <img
            src={userData?.profilePic ? userData?.profilePic : profilSeven}
            alt="Profile"
            className="rounded-circle"
            style={{
              border: "3px solid white",
              height: "100px",
              width: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <Row className="profile-user-row">
        <Col>
          <Row className="mb-0">
            <h3 className="mt-3 user-name mb-0 ">
              {userData?.username ? userData?.username : "@ alexrock"}
            </h3>

            <CustomInput
              type="switch"
              id="exampleCustomSwitch"
              name="customSwitch"
              checked={isChecked}
              onChange={toggleSwitch}
              className="mt-4 ml-2"
            />
            <Button
              className="btn-sm mt-4 mr-2 profile-button"
              onClick={() => history.push("/admin/editProfile")}
            >
              Edit Profile
            </Button>

            <Button
              className="add-button btn-sm btn-dark mt-4"
              onClick={makeRequest}
            >
              <i className="fas fa-user" style={{ marginRight: "10px" }} />
              <img alt="" src={profilFive} style={{ color: "white" }} />
            </Button>
            <MdExpandMore
              className="mt-4"
              style={{ fontSize: "30px", color: "white" }}
            />
            <IoIosMore
              className="mt-4"
              style={{ fontSize: "30px", color: "white" }}
            />
          </Row>

          <p className=" profile-designation mt-0 ">software Engineer</p>
          <Row>
            <Button className="btn-sm mt-3 ml-2 profile-button">
              <HiOutlineWifi
                className="mr-2 "
                style={{ fontSize: "20px", color: "white" }}
              />
              subscribe
            </Button>
            <Button
              className="add-button btn-sm  mt-3 p-1"
              style={{ border: "2px solid white" }}
            >
              1K
            </Button>
          </Row>
          <h4 className="text-white mt-1 mb-0" style={{ fontWeight: "600" }}>
            About
          </h4>
          <p>
            {userData?.about
              ? userData?.about
              : "Im A professional engeenier and also a Designer i want to met someone thats why i here"}
          </p>
          <a href="www.erroxr.com/web/alexrock" style={{ color: "blue" }}>
            {userData?.website
              ? userData?.website
              : "www.erroxr.com/web/alexrock"}
          </a>
          <Row>
            <AiFillInstagram
              className="ml-3"
              style={{ color: "white", fontSize: "20px" }}
            />
            <AiFillFacebook
              className="ml-2"
              style={{ color: "white", fontSize: "20px" }}
            />
          </Row>
        </Col>
      </Row>
      <hr
        style={{ backgroundColor: "#555555", height: "2px" }}
        className="mr-3 ml-5"
      />

      <div
        className=""
        style={{ marginTop: "-10px", marginLeft: "10%", display: "flex" }}
      >
        <img
          src={profileEight} alt=""
          style={{ color: "white", width: "18px", height: "18px" }}
          className="ml-5"
        />
        <span className="ml-2" style={{ color: "white", fontWeight: "600" }}>
          Posts
        </span>

        <img
          src={profileNine} alt=""
          style={{ color: "white", width: "18px", height: "18px" }}
          className="ml-lg-5"
        />
        <span className="ml-2" style={{ fontWeight: "600" }}>
          Tagged
        </span>

        <AiOutlineEye
          style={{ color: "grey", fontSize: "20px" }}
          className="ml-lg-5"
        />
        <span className="ml-2" style={{ fontWeight: "600" }}>
          Private
        </span>
      </div>

      <Row className=" mt-2 ml-lg-4">
        <Col xl={4} className="">
          <img src={profileTen} alt="" className="mt-2  ml-lg-4 profile-posts" />
        </Col>
        <Col xl={4}>
          <img src={profileEleven} alt="" className="mt-2 ml-lg-4 profile-posts" />
        </Col>
        <Col xl={4}>
          <img src={profileTwelve} alt="" className="mt-2 ml-lg-4 profile-posts" />
        </Col>
        {
          // <Col xl={3}>
          // <img src={profilFour} className="mt-2 "/>
          // </Col>
        }
      </Row>

      <ToastContainer />
    </div>
  );
};

export default Profile;
