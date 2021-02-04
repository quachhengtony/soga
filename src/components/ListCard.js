import { memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import "./ListCard.css";
import { Draggable } from "react-beautiful-dnd";
import { useStateValue } from "../StateProvider";
import ViewCardModal from "./ViewCardModal";

function ListCard(props) {
  const [cards, setCards] = useState([]);
  const { workspaceId, roomId } = useParams();
  // const [cardTitle, setCardTitle] = useState("");
  // const [cardBody, setCardBody] = useState("");
  // const [cardPriority, setCardPriority] = useState("");
  // const [cardColor, setCardColor] = useState("");
  // const [cardDeadline, setCardDeadline] = useState("");
  // const [cardAssignee, setCardAssignee] = useState("");

const handleChangeCardData = (cardTitle) => {
  props.setCardTitle(cardTitle);
}


  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .doc(props.columnId)
      .collection("cards")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setCards(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().cardTitle,
            body: doc.data().cardBody,
            priority: doc.data().cardPriority,
            color: doc.data().cardColor,
            deadline: doc.data().cardDeadline,
            assignee: doc.data().cardAssignee,
          }))
        )
      );
  }, []);

  return (
    <>
      {cards.map((card, index) => (
        <>
        <div key={index}>
          <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div
                  className="card --listcard-card"
                  onClick={() => handleChangeCardData(card.title)}
                  data-bs-toggle="modal"
                  data-bs-target="#modal-card-details"
                  style={{ border: `2px solid ${card.color}` }}
                >
                  <div className="card-body">
                    <p>{card.title}</p>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        </div>
        </>
      ))}
      {/* <ViewCardModal cardTitle={cardTitle} /> */}
    </>
  );
} 

export default ListCard;
