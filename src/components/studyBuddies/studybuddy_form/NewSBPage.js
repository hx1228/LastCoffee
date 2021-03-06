import { useHistory } from "react-router-dom";
import NewSBForm from "./NewSBForm";
import db from "../../../firebase";

function NewSBPage(props) {
  const history = useHistory();
  const userUID = props.userUID;

  function addSBHandler(SBData) {
    console.log("sheesh");
    db.collection("SB Posts")
      .doc(userUID)
      .set(SBData)
      .then(() => {
        history.replace("/findstudybuddy");
      });
  }

  return (
    <section>
      <NewSBForm onAddSB={addSBHandler} userUID={userUID} />
    </section>
  );
}

export default NewSBPage;
