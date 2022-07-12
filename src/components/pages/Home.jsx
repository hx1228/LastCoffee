import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import db from "../../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

const Container = styled.div`
  max-width: 100%;
`;

const Content = styled.div`
  margin: auto;
`;

const Homepage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  h1 {
    font-size: 5rem;
    text-align: center;
    font-family: "Montserrat";
    line-height: 1em;
    font-weight: 600;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    max-width: 53.125rem;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0;
    font-weight: lighter;
    line-height: 1.6em;
    letter-spacing: 0.01em;
    text-align: center;
    margin-bottom: 20px;
  }

  img {
    margin-top: 30px;
    width: 1100px;
    height: 549px;
    object-fit: cover;
  }

  button {
    border: 0.0625rem solid rgb(17, 109, 255);
    background-color: rgb(17, 109, 255);
    border-radius: 1.875rem;
    font-family: var(--main-text-font);
    width: 12.125rem;
    height: 3.5rem;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 0.625rem;
    align-items: center;
  }
`;

//home page upon signing in
function Home(props) {
  /*
  const [ContactInfo, setContactInfo] = useState(null);
  const [DisplayInfo, setDisplayInfo] = useState(null);
  const [DisplayName, setDisplayName] = useState(null);
  const [DisplayPicture, setDisplayPicture] = useState(null);

  function renderDoc(doc) {
    setContactInfo(doc.data().DPDB.contact_info);
    setDisplayInfo(doc.data().DPDB.display_info);
    setDisplayName(doc.data().DPDB.display_name);
    setDisplayPicture(doc.data().DPDB.photo_url);
    //console.log(DisplayPicture);
  }

  const set_values = db
    .collection("TEST")
    //.where(firebase.firestore.FieldPath.documentId(), "==", userUID)
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach(
        //(doc) => console.log(doc.data()),
        (doc) => {
          renderDoc(doc);
        }
      )
    );
  */

  // When the user first successfully logs in, we check if there is already an entry in the Users collection.
  // If there is an entry already, we do nothing. else, we follow the steps below

  // In the DB, we first have a main collection of users.
  // Upon logging in, we need to first create a document with the UID in the Users collection.
  // we then add the 5 subcollections, DPDB, TDLDB, CLDDB, SBDB, HSDB into the document with the UID

  // "get started" button used for creating all the DBs if the user is new.

  const userUID = props.user.uid;
  //console.log(userUID);
  const displayName = props.user.displayName;
  const photoUrl = props.user.photoURL
    ? props.user.photoURL
    : "/images/photo.svg";
  const contactInfo = props.user.email;
  //console.log(props.user.email)

  const createnewDB = () => {
    //console.log("yes");
    if (db.collection("TEST").doc(userUID)) {
      console.log("invoked");
      db.collection("DPDB")
        .doc(userUID)
        .set({
          Actor: {
            display_name: displayName,
            contact_info: contactInfo,
            display_picture: photoUrl,
            display_info: "",
          },
        });
    } else {
      console.log(null);
      return;
    }
  };

  /*
  const CreateAllDB = db
    .collection("TEST")
    .doc(userUID)
    .set({
      CLDDB: {},
      DPDB: {
        display_name: displayName,
        contact_info: contactInfo,
        photo_url: photoUrl,
        display_info: "",
      },
      SBDB: {},
      TDLDB: {},
    });
	*/

  return (
    <Container>
      <Header />
      {!props.user && <Redirect to="/home" />}
      <Content>
        <Homepage>
          <h1>
            The Ultimate <br></br>All-in-One <br></br>Student Website <br></br>
          </h1>
          <h2>
            Discover the platform that allows you to plan you schedule,{" "}
            <br></br> track your academic progress and connect with like-minded
            peers.
          </h2>
          <h2>
            New Users, what are you waiting for? <br></br>Click on the `Get
            Started` button below to kickstart your journey!
          </h2>

          {<button onClick={createnewDB}>Get Started</button>}
          <img src="/images/books.png" alt="Bookshelf" />
        </Homepage>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Home);