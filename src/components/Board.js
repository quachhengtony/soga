import React, { useState, useEffect } from 'react';
import { Card, H3, Button } from '@blueprintjs/core';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').onSnapshot(snapshot => (
                setColumns(snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                })))
        ))
    }

    const addColumn = () => {
        const columnName = prompt('Enter column name:');
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').add({
            name: columnName
        })
    }

    const onEnd = (result) => {
        console.log(result);
    }

    return (
        <div className='board'>
            {columns.map(column => (
                <Card className="board_column" elevation={1}>
                    <H3 className="bp3-text-muted">{column.name}</H3>
                    <ListCard columnId={column.id} />
                    <CreateCard columnId={column.id} />
                </Card>
            ))}
            <div>
                <Button className="board_addButton" text="Add column" icon='plus' onClick={addColumn} minimal outlined />
            </div>
        </div>
    );
}

export default Board;
