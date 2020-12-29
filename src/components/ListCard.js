import { memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import "./ListCard.css";
import { Draggable } from "react-beautiful-dnd";

function ListCard({ columnId }) {
  const [cards, setCards] = useState([]);
  const { workspaceId, roomId } = useParams();

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
            body: doc.data().body,
          }))
        )
      );
  }, [cards]);

  return (
    <>
      {cards.map((card, index) => (
        <Draggable draggableId={card.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="card --list-card-card">
                <div className="card-body">
                <p>{card.body}</p>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
      </>
  );
}

export default memo(ListCard);