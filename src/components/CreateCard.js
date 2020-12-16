import Button from "@atlaskit/button";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../firebase";
import "./CreateCard.css";

function CreateCard({ columnId }) {
  const { workspaceId, roomId } = useParams();

  const addCard = () => {
    const cardContent = prompt("Enter card content:");
    if (workspaceId && roomId && cardContent != "") {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("columns")
        .doc(columnId)
        .collection("cards")
        .add({
          body: cardContent,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log("Card added"))
        .catch(err => console.log(err))
    }
  };

  return (
    <div className="createCard">
      <Button className="createCard_button" onClick={addCard} spacing="compact">
        New card
      </Button>
    </div>
  );
}

export default CreateCard;
