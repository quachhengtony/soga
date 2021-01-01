import { memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import "./ListCard.css";
import { Draggable } from "react-beautiful-dnd";
import { useStateValue } from "../StateProvider";

function ListCard({ columnId }) {
  const [cards, setCards] = useState([]);
  const { workspaceId, roomId } = useParams();
  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardPriority, setCardPriority] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [cardDeadline, setCardDeadline] = useState("");
  const [cardAssignee, setCardAssignee] = useState("");

  const handleChangeCardData = (cardTitle, cardBody) => {
    setCardTitle(cardTitle);
    setCardBody(cardBody);
    setCardPriority(cardPriority);
    setCardColor(cardColor);
    setCardDeadline(cardDeadline);
    setCardAssignee(cardAssignee);
  }

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .doc(columnId)
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
            assignee: doc.data().cardAssignee
          }))
        )
      );
  }, [cards]);

  return (
    <>
      {cards.map((card, index) => (
        <>
        <Draggable draggableId={card.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                className="card --list-card-card"
                onClick={() => handleChangeCardData(card.title, card.body, card.priority, card.color, card.deadline, card.assignee)}
                data-bs-toggle="modal"
                data-bs-target="#modal-card-details"
                style={{border: `2px solid pink`}}
              >
                <div className="card-body">
                  <p>{card.title}</p>
                </div>
              </div>
            </div>
          )}
        </Draggable>

        <div
        className="modal modal-blur fade"
        id="modal-card-details"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{cardTitle}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {cardBody}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
      ))}
    </>
  );
}

export default memo(ListCard);
