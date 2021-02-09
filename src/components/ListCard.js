import { memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../adapters/firebase";
import { Draggable } from "react-beautiful-dnd";
import { useStateValue } from "../contexts/StateProvider";
import "../styles/ListCard.css";

function ListCard(props) {
  const [cards, setCards] = useState([]);
  const { workspaceId, roomId } = useParams();

  const handleChangeCardData = (
    cardTitle,
    cardBody,
    cardPriority,
    cardColor,
    cardDeadline,
    cardAssignee,
    cardReporter,
    cardDocumentGroup
  ) => {
    props.setCardTitle(cardTitle);
    props.setCardBody(cardBody);
    props.setCardPriority(cardPriority);
    props.setCardColor(cardColor);
    props.setCardDeadline(cardDeadline);
    props.setCardAssignee(cardAssignee);
    props.setCardReporter(cardReporter);
    props.setCardDocumentGroup(cardDocumentGroup);
  };

  const handleSetSelectedCard = (card, columnId) => {
    props.setSelectedCard(card);
    props.setSelectedCardsColumnId(columnId);
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
            reporter: doc.data().cardReporter,
            documentGroup: doc.data().cardDocumentGroup,
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
                    onClick={() => {
                      handleChangeCardData(
                        card.title,
                        card.body,
                        card.priority,
                        card.color,
                        card.deadline,
                        card.assignee,
                        card.reporter,
                        card.documentGroup
                      );
                      handleSetSelectedCard(card, props.columnId);
                    }}
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
    </>
  );
}

export default ListCard;
