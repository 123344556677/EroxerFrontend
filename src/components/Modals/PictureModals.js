import React, { useRef, useState } from "react";

import { Button,  Col, Modal, Row } from "reactstrap";
import modalTwo from "./j28.jpg";
import "./Modals.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCnY9bzvS6ZiF0wn1_kDGp_ljWGo3sZSxA",
  authDomain: "images-7611f.firebaseapp.com",
  projectId: "images-7611f",
  storageBucket: "images-7611f.appspot.com",
  messagingSenderId: "410713197024",
  appId: "1:410713197024:web:f4cb6a922d309976c38385",
  measurementId: "G-ENS46GYQRS",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const PictureModals = ({ dataImageValue }) => {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  function toggleModal() {
    setShowModal(!showModal);
  }
  function handleButtonClick() {
    toggleModal();

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = videoRef.current;

        if (video) {
          video.srcObject = stream;
          let width = 200;
          let height = width / (12 / 9);
          video.width = width;
          video.height = height;
          video.play();
        }
      })
      .catch((error) => {
        console.log("Error accessing camera:", error);
      });
  }

  function handleCaptureClick() {
    let video = videoRef.current;
    let photo = photoRef.current;
    let width = 200;
    let height = width / (12 / 9);
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, photo.width, photo.height);

    // let image = photo.toBlob((blob) => {
    //   let url = URL.createObjectURL(blob);
    //   console.log(url);
    //   dataImageValue(url)
    //   return url;

    // }, 'image/png');
    photo.toBlob((blob) => {
      // Upload the blob to Firebase Storage
      const storageRef = ref(storage, "path/to/image.jpg");
      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);

          // Get the download URL of the uploaded photo
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("Download URL:", url);
            dataImageValue(url); // Set the image URL to your state or variable
          });
        })
        .catch((error) => {
          console.error("Failed to upload file:", error);
        });
    }, "image/jpeg");
  }

  return (
    <div className="content">
      <div>
        <img
          src={modalTwo}
          onClick={handleButtonClick}
          className="camera-img mb-3"
          alt=""
        />
        <br />
        <Modal isOpen={showModal} toggle={toggleModal} className="">
          <div className="modal-header"></div>
          <div className="modal-body ">
            <Row className="justify-content-center">
              <Col className="text-center">
                <video ref={videoRef}></video>
                <br />
                <canvas ref={photoRef}></canvas>
              </Col>
              <Col xl={12} className="text-center">
                <Button
                  type="button"
                  className=" modal-capture-button"
                  onClick={handleCaptureClick}
                >
                  Capture
                </Button>
                <br />
                <Button
                  type="button"
                  className=" modal-cancel-button"
                  onClick={toggleModal}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PictureModals;
