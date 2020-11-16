import { Button, Card, H5 } from '@blueprintjs/core';
import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './ListCard.css';
import { Draggable } from 'react-beautiful-dnd';

function ListCard({ columnId }) {

    const [cards, setCards] = useState([]);
    const { workspaceId, roomId } = useParams();

    useEffect(() => {
        renderCards();
    })

    const renderCards = () => {
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').doc(columnId).collection('cards').onSnapshot(snapshot => (
                setCards(snapshot.docs.map(doc => ({
                    id: doc.id,
                    body: doc.data().body
                })))
        ))
    }

    return (
        <div className="listCard">
            {cards.map((card, index) => (
                <Draggable draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                            <Card className="listCard_card nbr" elevation={1}>
                                <p>{card.body}</p>
                            </Card>
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default ListCard;
