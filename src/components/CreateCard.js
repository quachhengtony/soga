import { useParams } from "react-router-dom";
import firebase from "firebase";
import db from "../firebase";
import "./CreateCard.css";
import { useStateValue } from "../StateProvider";

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
