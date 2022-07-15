import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { storage } from "../../firebase";
import db from "../../firebase";
//import { Card } from "@mui/material";
import Card from "../../action/Card";
import firebase from "firebase/app";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1128px;
  margin: auto;
`;

const Section = styled.section`
  min-height: 50px;
  margin: 16px 0 -30px;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    margin-block-start: 0;
    margin-block-end: 0;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin: 16px 0;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "left main ";
  grid-template-columns: minmax(0, 5fr) minmax(0, 17fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const Portrait = styled.div`
  img {
    margin-top: 5px;
    width: 830px;
    border-radius: 100px;
    float: left;
    margin-right: 10px;
    object-fit: cover;
  }
`;

const InputBox = styled.div`
  input,
  textarea {
    display: block;
    font: inherit;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0.25rem;
    width: 100%;
  }
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const Photo = styled.div`
  box-shadow: none;
  background: url(${(props) => props.photoUrl});
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: #fff;
  background-position: center;
  /* background-size: 60%; */
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
`;

// for uploading new profile picture

//for changing your name

//for changing contact info

//home page upon signing in
function MyProfileEdit(props) {
  const userUID = props.user.uid;
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");

  function renderDoc(doc) {
    setContactInfo(doc.data().Actor.contact_info);
    setDisplayInfo(doc.data().Actor.display_info);
    setDisplayName(doc.data().Actor.display_name);
    setDisplayPicture(doc.data().Actor.display_picture);
    //console.log(DisplayPicture);
  }

  const Set_Values = db
    .collection("DPDB")
    .where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderDoc(doc);
        }
      )
    );
  //console.log(userUID);
  const ReactFirebaseImageUpload = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    const handleUpload = () => {
      const uploadTask = storage
        .ref(`${userUID}/images/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`${userUID}/images`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setUrl(url);
              db.collection("DPDB").doc(userUID).update({
                "Actor.display_picture": url,
              });
            });
        }
      );
    };

    return (
      <div>
        <br />
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload Picture</button>
        <br />
      </div>
    );
  };

  const NameUpload = () => {
    //need to link front end to backend, upload the new name to the db and query it
    const [NewName, setNewName] = useState(null);

    function handleChange(event) {
      setNewName(event.target.value);
      //console.log(event.target.value);
    }

    const handleNameUpload = () => {
      //console.log("works");
      db.collection("DPDB").doc(userUID).update({
        "Actor.display_name": NewName,
      });
    };

    return (
      <div>
        <br />
        <InputBox>
          <input type="text" placeholder="New Name" onChange={handleChange} />
          <button onClick={handleNameUpload}>Change Name</button>
        </InputBox>
        <br />
      </div>
    );
  };

  const ContactUpload = () => {
    const [NewName, setNewName] = useState(null);

    function handleChange(event) {
      setNewName(event.target.value);
      //console.log(event.target.value);
    }

    const handleNameUpload = () => {
      //console.log("works");
      db.collection("DPDB").doc(userUID).update({
        "Actor.contact_info": NewName,
      });
    };

    return (
      <div>
        <br />
        <InputBox>
          <input
            type="text"
            placeholder="New Email / Telehandle / Phone Number"
            onChange={handleChange}
          />
        </InputBox>
        <button onClick={handleNameUpload}>Change Contact Info</button>
        <br />
      </div>
    );
  };

  const InfoUpload = () => {
    const [NewName, setNewName] = useState(null);

    function handleChange() {
      return (event) => setNewName(event.target.value);
      //console.log(event.target.value);
    }

    const handleNameUpload = () => {
      //console.log("works");
      db.collection("DPDB").doc(userUID).update({
        "Actor.display_info": NewName,
      });
    };

    return (
      <div>
        <br />
        <InputBox>
          <textarea
            id="displayinfo"
            placeholder="New Display Info"
            required
            rows="3"
            onChange={handleChange}
          ></textarea>
        </InputBox>
        <button onClick={handleNameUpload}>Change Display Info</button>
        <br />
      </div>
    );
  };

  let photoUrl = props.user.photoURL ? DisplayPicture : "/images/photo.svg";

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/" />}
      <Content>
        <Card>
          <button>
            <Link to="/myprofile">
              <a href="/myprofile">
                <span>Back</span>
              </a>
            </Link>
          </button>
          <Photo photoUrl={DisplayPicture} />
          <h3>Add a new photo</h3>
          <ReactFirebaseImageUpload />
          {
            //<button onClick={DPupload}>DISPLAY INFO UPLOAD</button>
          }
          <br />

          <h3>Display Name: {DisplayName}</h3>
          <NameUpload />

          <br />
          <h3>Contact Info: {ContactInfo}</h3>
          <ContactUpload />

          <br />
          <h3>Display Info: {DisplayInfo}</h3>
          <InfoUpload />
          <br />
        </Card>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(MyProfileEdit);