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
      <button onClick={addCard} className="btn btn-sm --create-card-btn">
        New card
      </button>
  );
}

export default CreateCard;
