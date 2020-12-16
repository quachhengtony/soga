import { memo, useState, useEffect } from "react";
import Button from "@atlaskit/button";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import firebase from "firebase";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";

import db from "../firebase";
import "./Board.css";
import CreateCard from "./CreateCard";
import ListCard from "./ListCard";
import { useParams } from "react-router-dom";

function Board() {
  const [columns, setColumns] = useState([]);
  const { workspaceId, roomId } = useParams();
  const [cardBody, setCardBody] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [roomName, setRoomName] = useState("");

  const addColumn = () => {
    const columnName = prompt("Enter column name:");
    if (workspaceId && roomId && columnName) {
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
        .catch((err) => console.log(err));
    }
  };

  const onDragStart = (result) => {
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .collection("columns")
      .doc(result.source.droppableId)
      .collection("cards")
      .doc(result.draggableId)
      .get()
      .then((doc) => {
        setCardBody(doc.data().body);
        console.log("Card copied");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDragEnd = (result) => {
    var cardPromise = new Promise((resolve, reject) => {
      if (result.destination.droppableId != result.source.droppableId) {
        resolve();
      } else if (result.destination.droppableId == result.source.droppableId) {
        return;
      } else {
        return;
      }
    });

    cardPromise
      .then(() => {
        db.collection("workspaces")
          .doc(workspaceId)
          .collection("rooms")
          .doc(roomId)
          .collection("columns")
          .doc(result.source.droppableId)
          .collection("cards")
          .doc(result.draggableId)
          .delete()
          .then(() => {
            console.log("Card deleted");
          })
          .catch((err) => console.log(err));
      })
      .then(() => {
        db.collection("workspaces")
          .doc(workspaceId)
          .collection("rooms")
          .doc(roomId)
          .collection("columns")
          .doc(result.destination.droppableId)
          .collection("cards")
          .add({
            body: cardBody,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => console.log("Card added"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    db.collection("workspaces")
    .doc(workspaceId)
    .get()
    .then((doc) => {
      setWorkspaceName(doc.data().workspaceName);
    });
    db.collection("workspaces")
      .doc(workspaceId)
      .collection("rooms")
      .doc(roomId)
      .get()
      .then((doc) => {
        setRoomName(doc.data().roomName);
      });
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
  }, [columns]);

  return (
    <div className="board">
      <div className="board__header">
        <Breadcrumbs>
          <BreadcrumbsItem text={workspaceName ? workspaceName : "..."} />
          <BreadcrumbsItem text={roomName ? roomName : "..."} />
          <BreadcrumbsItem text="Board" />
        </Breadcrumbs>
      </div>
      <DragDropContext
        onDragStart={(result) => onDragStart(result)}
        onDragEnd={(result) => onDragEnd(result)}
      >
        <div className="board__columnsContainer">
          {columns.map((column) => (
            <div className="column__container">
              <div className="column__header">
                <div className="columnHeader__name">
                  <Button spacing="compact" appearance="subtle-link">
                    {column.name ? column.name : "..."}
                  </Button>
                </div>
                <div className="columnHeader__button">
                  <CreateCard columnId={column.id} />
                </div>
              </div>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <ListCard columnId={column.id} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
          <div>
            <Button
              className="board_addButton"
              appearance="primary"
              onClick={addColumn}
            >
              New column
            </Button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default memo(Board);
