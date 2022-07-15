import { useRef, useState } from "react";
import Card from "../../action/Card";
import classes from "./EditProfileForm.module.css";
import db from "../../firebase";
import firebase from "firebase/app";

function EditProfileForm(props) {
  const [DisplayName, setDisplayName] = useState("");
  const [ContactInfo, setContactInfo] = useState("");
  const [DisplayInfo, setDisplayInfo] = useState("");
  const [DisplayPicture, setDisplayPicture] = useState("");
  const [NewDisplayName, setNewDisplayName] = useState("");
  const [NewContactInfo, setNewContactInfo] = useState("");
  const [NewDisplayInfo, setNewDisplayInfo] = useState("");
  const userUID = props.userUID;

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

  //console.log(props)

  function submitHandler(event) {
    event.preventDefault();
    console.log(NewDisplayName);
    console.log(NewContactInfo);
    console.log(NewDisplayInfo);
    console.log(DisplayName);
    console.log(ContactInfo);
    console.log(DisplayInfo);
    console.log(NewDisplayName == "");

    if (NewDisplayName === "") {
      setNewDisplayName(DisplayName);
    }
    if (NewDisplayInfo === "") {
      setNewDisplayInfo(DisplayInfo);
    }
    if (NewContactInfo === "") {
      setNewContactInfo(ContactInfo);
    }

    const displayData = {
      Actor: {
        display_name: NewDisplayName,
        contact_info: NewContactInfo,
        display_picture: DisplayPicture,
        display_info: NewDisplayInfo,
      },
    };

    //console.log(displayData);
    props.onAddData(displayData);
  }

  function handleNameChange(event) {
    setNewDisplayName(event.target.value);
    //console.log(event.target.value);
  }

  function handleContactInfoChange(event) {
    setNewContactInfo(event.target.value);
    //console.log(event.target.value);
  }

  function handleDisplayInfoChange(event) {
    setNewDisplayInfo(event.target.value);
    //console.log(event.target.value);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <br />
        <div className={classes.control}>
          <label htmlFor="name">Display Name: {DisplayName}</label>
          <input
            type="text"
            onChange={handleNameChange}
            placeholder="New Name"
          />
        </div>
        <br />
        <div className={classes.control}>
          <label htmlFor="email">Contact Info: {ContactInfo}</label>
          <input
            type="text"
            onChange={handleContactInfoChange}
            placeholder="New Email/ Telehandle/ Phone number"
          />
        </div>
        <br />
        <div className={classes.control}>
          <label htmlFor="displayinfo">Display Info: {DisplayInfo}</label>
          <textarea
            id="displayinfo"
            rows="3"
            onChange={handleDisplayInfoChange}
            placeholder="New Display Info"
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default EditProfileForm;