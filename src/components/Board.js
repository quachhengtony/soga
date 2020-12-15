import { memo, useState, useEffect, useCallback } from 'react';
import Button from '@atlaskit/button';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import firebase from 'firebase';

import db from '../firebase';
import './Board.css'
import CreateCard from './CreateCard';
import ListCard from './ListCard';
import { useParams } from 'react-router-dom';

function Board() {

    const [columns, setColumns] = useState([]);
    const { workspaceId, roomId } = useParams();
    const [cardBody, setCardBody] = useState("");

    useEffect(() => {
        renderColumns();
    }, [])

    const renderColumns = useCallback(() => {
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').orderBy("timestamp", "asc").onSnapshot(snapshot => (
                setColumns(snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                })))
        ))
    }, [columns])

    const addColumn = () => {
        const columnName = prompt('Enter column name:');
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').add({
            name: columnName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const onDragStart = (result) => {
            db.collection("workspaces").doc(workspaceId).collection("rooms").doc(roomId).collection("columns").doc(result.source.droppableId).collection("cards").doc(result.draggableId)
                        .get()
                        .then(doc => {
                            setCardBody(doc.data().body);
                            console.log("Copy card: SUCCESS");
                        })
                        .catch(err => {
                            console.log(err);
                        })
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.droppableId != result.source.droppableId) {
            var cardPromise = new Promise((resolve, reject) => {
                if (cardBody != "") {
                    resolve("Success");
                } else {
                    reject("Failure")
                }
            })
        } else return;

        cardPromise
            .then(() => {
                db.collection("workspaces").doc(workspaceId).collection("rooms").doc(roomId).collection("columns").doc(result.source.droppableId).collection("cards").doc(result.draggableId)
                    .delete()
                    .then(() => {
                        console.log("Delete card: SUCCESS");
                    })
                    .catch(err => console.log(err))
            })
            .then(() => {
                db.collection("workspaces").doc(workspaceId).collection("rooms").doc(roomId).collection("columns").doc(result.destination.droppableId).collection("cards").add({
                        body: cardBody,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => console.log("Add card: SUCCESS"))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='board'>
            <div className='board__header'>
                <Button spacing="compact" appearance="subtle-link">{roomId}'s board</Button>
            </div>
            <DragDropContext onDragStart={result => onDragStart(result)} onDragEnd={result => onDragEnd(result)}>
                <div className='board__columnsContainer'>
                    {columns.map(column => (
                        <div className="column__container">
                            <div className="column__header">
                                <div className="columnHeader__name">
                                    <Button spacing="compact" appearance="subtle-link">{column.name}</Button>
                                </div>
                                <div className="columnHeader__button">
                                    <CreateCard columnId={column.id} />
                                </div>
                            </div>
                            {/* <Button spacing="compact" appearance="subtle-link">{column.name}</Button> */}
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                    className="column"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    >
                                        {/* <div className="column"> */}
                                            {/* <div className="column__header">
                                                <div className="columnHeader__name">
                                                    <Button spacing="compact" appearance="subtle-link">{column.name}</Button>
                                                </div>
                                                <div className="columnHeader__button">
                                                    <CreateCard columnId={column.id} />
                                                </div>
                                            </div> */}
                                            <ListCard columnId={column.id} />
                                        {/* </div> */}
                                            {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                <div>
                    <Button className="board_addButton" appearance="primary" onClick={addColumn}>New column</Button>
                </div>
                </div>
            </DragDropContext>
        </div>
    );
}

export default memo(Board);