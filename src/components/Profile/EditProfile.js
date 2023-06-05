import ProfileModal from "components/Modals/ProfileModal";
import React, {  useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Media, Row } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profilSeven from "./j27.png";
import { updateUser } from "Api/Api";
import MembershipSection from "components/Membership/MembershipSection";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "components/redux/actions/userActions";
const EditProfile = () => {
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.getUserById);

  const userData = getUser?.userData;
  const [username, setUsername] = useState(userData?.username);
  const [about, setAbout] = useState(userData?.about);

  const [website, setWebsite] = useState(userData?.website);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
  const [Gender, setGender] = useState(userData?.Gender);
  const [profileName, setProfileName] = useState(userData?.profileName);
  const [profileWishlist, setProfileWishlist] = useState();
  const [userId, setuserId] = useState(
    JSON.parse(localStorage.getItem("keys"))
  );
  const [profilePic, setProfilePic] = useState(userData?.profilePic);
  const [animationCheck, setAnimationCheck] = useState(false)
  //   const [userData, setUserData] = useState()
  
  const Values = {
    userId: userId.id,
  };
  //  useEffect(()=>{

  //   getUsersById(Values)
  //    .then(res => {
  //      console.log(res.data);
  //       if (res?.data?.message === "User Exist") {
  //        setUserData(res?.data?.data)
  //       }

  // });
  //  },[])

  const updation = async () => {
    const values = {
      userId: userId.id,
      username: username,
      about: about,
      profilePic: profilePic,
      website: website,
      phoneNumber: phoneNumber,
      Gender: Gender,
      profileName: profileName,
      profileWishlist: profileWishlist,
    };
    await updateUser(values).then((res) => {
      if (res.data.message === "user updated") {
        toast.success("Profile updated", {
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
       dispatch(getUserById(Values));
       setAnimationCheck(true)
    });
  };
 

  return (
    <div className="content" style={{ zoom: "0.90" }}>
      <span
        className=""
        style={{ color: "white", fontSize: "10px", marginLeft: "50px" }}
      >
        <Link
          to="/admin/profile/:id"
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
      <Row className="">
        <Col xl={8}>
          <Row className="justify-content-center">
            <Col xl={8}>
              <Media className=" ml-lg-3 chat-media">
                <Media left>
                  <img
                    object
                    src={
                      userData?.profilePic ? userData?.profilePic : profilSeven
                    }
                    alt="jannan"
                    className="upper-profile rounded-circle"
                  />
                </Media>
                <Media body className="ml-3 mt-3">
                  <h3 className="text-white mb-0" style={{ fontWeight: "600" }}>
                    {userData?.firstName}
                  </h3>
                  <ProfileModal />
                </Media>
              </Media>
              <FormGroup row className="mt-3">
                <Label
                  for="exampleEmail"
                  sm={2}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Name
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    defaultValue={userData?.profileName}
                    placeholder=""
                    type="text"
                    className="reset-input"
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mt-1">
                <Label
                  for="exampleEmail"
                  sm={2}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Username
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    defaultValue={userData?.username}
                    placeholder=""
                    type="text"
                    className="reset-input"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <p
                    className=""
                    style={{ color: "#BFB8B8", fontSize: "10px" }}
                  >
                    In most cases, you will be able to change your username back
                    to umair_rafiii for another 14 days.
                  </p>
                </Col>
              </FormGroup>
              <FormGroup row className="mt-3">
                <Label
                  for="exampleEmail"
                  sm={2}
                  xl={3}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Website
                </Label>
                <Col sm={8} xl={9}>
                  <Input
                    id="exampleEmail"
                    defaultValue={userData?.website}
                    placeholder=""
                    type="text"
                    className="reset-input"
                    style={{ marginLeft: "-11%", width: "111%" }}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <p
                    className=""
                    style={{
                      color: "#BFB8B8",
                      fontSize: "10px",
                      marginLeft: "-10%",
                    }}
                  >
                    Editing your links is only available onmobile. Visit the
                    Erroxer app and edit your profile to change the websites in
                    your bio.
                  </p>
                </Col>
              </FormGroup>
              <FormGroup row className="mt-3">
                <Label
                  for="exampleEmail"
                  sm={2}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Bio
                </Label>
                <Col sm={10} xl={10}>
                  <Input
                    id="exampleText"
                    defaultValue={userData?.about}
                    type="textarea"
                    placeholder=""
                    className="reset-input "
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <h5
                    className="mb-0 mt-3"
                    style={{ color: "#BFB8B8", fontWeight: "600" }}
                  >
                    Personal Information{" "}
                  </h5>
                  <p
                    className=""
                    style={{ color: "#BFB8B8", fontSize: "10px" }}
                  >
                    Provide your personal information, even if the account is
                    used for a business, a pet or something else. This wont be a
                    part of your public profile.
                  </p>
                </Col>
              </FormGroup>

              <FormGroup row className="mt-3">
                <Label
                  for="exampleEmail"
                  sm={2}
                  xl={3}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Wishlist
                </Label>
                <Col sm={8} xl={9}>
                  <Input
                    id="exampleEmail"
                    placeholder=""
                    type="text"
                    className="reset-input"
                    style={{ marginLeft: "-11%", width: "111%" }}
                    onChange={(e) => setProfileWishlist(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mt-3">
                <Label
                  for="exampleEmail"
                  sm={2}
                  xl={3}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  Phone Number
                </Label>
                <Col sm={8} xl={9}>
                  <Input
                    id="exampleEmail"
                    defaultValue={userData?.phoneNumber}
                    placeholder=""
                    type="number"
                    className="reset-input"
                    style={{ marginLeft: "-11%", width: "111%" }}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mt-3">
                <Label
                  for="exampleEmail"
                  sm={2}
                  xl={3}
                  style={{
                    color: "white",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Gender
                </Label>
                <Col sm={8} xl={9}>
                  <Input
                    id="exampleEmail"
                    defaultValue={userData?.Gender}
                    placeholder=""
                    type="text"
                    className="reset-input"
                    style={{ marginLeft: "-11%", width: "111%" }}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <h1 className="text-center" style={{ marginLeft: "20%" }}>
                {
      animationCheck?
      <lottie-player  src="https://assets4.lottiefiles.com/packages/lf20_lp7qD9RDx1.json"  background="transparent"  speed="1"  style={{width: "100px", height: "100px"}}  loop  autoplay></lottie-player>
      :
                <Button className="reset-button" onClick={updation}>
                  Submit
                </Button>
                }
              </h1>
            </Col>
          </Row>
        </Col>
        <Col xl={4}>
          <MembershipSection />
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
