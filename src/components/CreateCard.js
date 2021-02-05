import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../adapters/firebase";
import "../styles/CreateCard.css";
import { useStateValue } from "../contexts/StateProvider";

function CreateCard() {
  
  return (
    <>
      <button
        className="btn btn-sm --create-card-btn"
        data-bs-toggle="modal"
        data-bs-target="#modal-card"
      >
        New item
      </button>
      
    </>
  );
}

export default CreateCard;
