import { useState, useEffect } from 'react';
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

    useEffect(() => {
        renderColumns();
    })

    const renderColumns = () => {
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').orderBy("timestamp", "asc").onSnapshot(snapshot => (
                setColumns(snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                })))
        ))
    }

    const addColumn = () => {
        const columnName = prompt('Enter column name:');
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').add({
            name: columnName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        // const { source, destination } = result;
        // const column = columns[source.droppableId];
        // const copiedItems = [...column.items];
        // console.log("copied Itesm", copiedItems);
        // console.log("Droppable Id >>>", result.destination.droppableId);
        // console.log("Draggable Id >>>", result.);
    }

    return (
        <div className='board'>
            <div className='board__header'>
                <Button spacing="compact" appearance="subtle-link">{roomId}'s board</Button>
            </div>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                <div className='board__columnsContainer'>
                    {columns.map(column => (
                        <Droppable droppableId={column.id}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? '#4285F4' : '#FFF' }}
                                {...provided.droppableProps}
                                >
                                    <div className="column">
                                        <div className="column__header">
                                            <div className="columnHeader__name">
                                                <Button spacing="compact" appearance="subtle-link">{column.name}</Button>
                                            </div>
                                            <div className="columnHeader__button">
                                                <CreateCard columnId={column.id} />
                                            </div>
                                        </div>
                                        <ListCard columnId={column.id} />
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                <div>
                    <Button className="board_addButton" appearance="primary" onClick={addColumn}>New column</Button>
                </div>
                </div>
            </DragDropContext>
        </div>
    );
}

export default Board;