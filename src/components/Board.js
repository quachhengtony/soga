import { memo, useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import firebase from "firebase";

import db from "../adapters/firebase";
import "../styles/Board.css";
import ListCard from "./ListCard";
import { useHistory, useParams } from "react-router-dom";
import CreateCardModal from "./CreateCardModal";
import ViewCardModal from "./ViewCardModal";

function Board() {
  const [columns, setColumns] = useState([]);
  const { workspaceId, roomId } = useParams();
  // const [cardBody, setCardBody] = useState("");
  const history = useHistory();
  const [columnId, setColumnId] = useState("");

  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardPriority, setCardPriority] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [cardDeadline, setCardDeadline] = useState("");
  const [cardAssignee, setCardAssignee] = useState("");
  const [cardReporter, setCardReporter] = useState("");
  const [cardDocumentGroup, setCardDocumentGroup] = useState("");

  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedCardsColumnId, setSelectedCardsColumnId] = useState("");

  const handleChangeCardStatus = (destinationColumn) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .doc(selectedCardsColumnId)
      .collection("cards")
      .doc(selectedCard.id)
      .delete()
      .then((doc) => {
        console.log("Card deleted");

        db.collection("workspaces")
          .doc(workspaceId)
          .collection("rooms")
          .doc(roomId)
          .collection("columns")
          .doc(destinationColumn)
          .collection("cards")
          .add({
            cardTitle: selectedCard.title,
            cardBody: selectedCard.body,
            cardPriority: selectedCard.priority,
            cardAssignee: selectedCard.assignee,
            cardDeadline: selectedCard.deadline,
            cardColor: selectedCard.color,
            cardReporter: selectedCard.reporter,
            cardDocumentGroup: selectedCard.documentGroup,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => console.log("Card added"))
          .catch(error => console.log(error))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addColumn = () => {
    const columnName = prompt("Enter column name:");
    if (workspaceId && roomId && columnName !== "") {
      db.collection("workspaces")
        .doc(workspaceId)
        .collection("rooms")
        .doc(roomId)
        .collection("columns")
        .add({
          name: columnName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log("column added"))
        .catch((error) => console.error(error));
    }
  };

  // const onDragStart = (result) => {
  //   db.collection("workspaces")
  //     .doc(workspaceId)
  //     .collection("rooms")
  //     .doc(roomId)
  //     .collection("columns")
  //     .doc(result.source.droppableId)
  //     .collection("cards")
  //     .doc(result.draggableId)
  //     .get()
  //     .then((doc) => {
  //       setCardBody(doc.data().body);
  //       console.log("Card copied");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const onDragEnd = (result) => {
  //   var cardPromise = new Promise((resolve, reject) => {
  //     if (result.destination.droppableId != result.source.droppableId) {
  //       resolve();
  //     } else if (result.destination.droppableId == result.source.droppableId) {
  //       return;
  //     } else {
  //       return;
  //     }
  //   });

  //   cardPromise
  //     .then(() => {
  //       db.collection("workspaces")
  //         .doc(workspaceId)
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("columns")
  //         .doc(result.source.droppableId)
  //         .collection("cards")
  //         .doc(result.draggableId)
  //         .delete()
  //         .then(() => {
  //           console.log("Card deleted");
  //         })
  //         .catch((err) => console.log(err));
  //     })
  //     .then(() => {
  //       db.collection("workspaces")
  //         .doc(workspaceId)
  //         .collection("rooms")
  //         .doc(roomId)
  //         .collection("columns")
  //         .doc(result.destination.droppableId)
  //         .collection("cards")
  //         .add({
  //           body: cardBody,
  //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //         })
  //         .then(() => console.log("Card added"))
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setColumns(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      );
  }, []);

  return (
    <div className="board">
      <div className="card card-sm --board-chat">
        <ul class="nav nav-tabs nav-tabs-alt" data-bs-toggle="tabs">
          <li class="nav-item">
            <a
              onClick={() =>
                history.push(`/workspace/${workspaceId}/room/${roomId}/chat`)
              }
              class="nav-link"
              data-bs-toggle="tab"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon me-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
              </svg>
              Chat
            </a>
          </li>
          <li class="nav-item">
            <a
              onClick={() =>
                history.push(`/workspace/${workspaceId}/room/${roomId}/board`)
              }
              class="nav-link active"
              data-bs-toggle="tab"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon me-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="4" x2="10" y2="4" />
                <line x1="14" y1="4" x2="20" y2="4" />
                <rect x="4" y="8" width="6" height="12" rx="2" />
                <rect x="14" y="8" width="6" height="6" rx="2" />
              </svg>
              Board
            </a>
          </li>
          <li class="nav-item">
            <a href="#tabs-profile-ex6" class="nav-link" data-bs-toggle="tab">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon me-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="4" y="5" width="16" height="16" rx="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="4" y1="11" x2="20" y2="11" />
                <rect x="8" y="15" width="2" height="2" />
              </svg>
              Event
            </a>
          </li>
        </ul>
      </div>
      <DragDropContext
      // onDragStart={(result) => onDragStart(result)}
      // onDragEnd={(result) => onDragEnd(result)}
      >
        <div className="board__columnsContainer">
          {columns.map((column, index) => (
            <div className="column__container" key={index}>
              <div className="column__header">
                <div className="columnHeader__name">
                  <p>{column.name ? column.name : "..."}</p>
                </div>
                <div className="columnHeader__button">
                  <button
                    className="btn btn-sm --create-card-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-card"
                    onClick={() => setColumnId(column.id)}
                  >
                    New item
                  </button>
                </div>
              </div>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ListCard
                      columnId={column.id}
                      setCardTitle={setCardTitle}
                      setCardBody={setCardBody}
                      setCardPriority={setCardPriority}
                      setCardColor={setCardColor}
                      setCardDeadline={setCardDeadline}
                      setCardAssignee={setCardAssignee}
                      setCardReporter={setCardReporter}
                      setCardDocumentGroup={setCardDocumentGroup}
                      setSelectedCard={setSelectedCard}
                      setSelectedCardsColumnId={setSelectedCardsColumnId}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          <div>
            <button
              className="btn btn-primary btn-sm --new-column-btn"
              onClick={addColumn}
            >
              New list
            </button>
          </div>
        </div>
      </DragDropContext>

      <ViewCardModal
        cardTitle={cardTitle}
        cardBody={cardBody}
        cardPriority={cardPriority}
        cardColor={cardColor}
        cardDeadline={cardDeadline}
        cardAssignee={cardAssignee}
        cardReporter={cardReporter}
        cardDocumentGroup={cardDocumentGroup}
        columns={columns}
        handleChangeCardStatus={handleChangeCardStatus}
      />
      <CreateCardModal columnId={columnId} />
    </div>
  );
}

export default Board;
