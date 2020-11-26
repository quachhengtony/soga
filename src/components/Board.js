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

    return (
        <div className='container'>
        <div className='board_header'>
            <Button spacing="compact" appearance="subtle-link">{roomId}'s Board</Button>
        </div>
        <DragDropContext onDragEnd={() => console.log("Drag end")}>
            <div className='board'>
                {columns.map(column => (
                    <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? '#4285F4' : '#FFF' }}
                            {...provided.droppableProps}
                            >
                                <div className="board_column">
                                    <h5>{column.name}</h5>
                                    <ListCard columnId={column.id} />
                                    <CreateCard columnId={column.id} />
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            <div>
                <Button className="board_addButton" onClick={addColumn}>Create Board</Button>
            </div>
            </div>
        </DragDropContext>
        </div>
    );
}

export default Board;