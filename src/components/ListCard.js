import { Button, Card, H5 } from '@blueprintjs/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './ListCard.css';

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
            {cards.map(card => (
                <Card className="listCard_card nbr">
                    <p>{card.body}</p>
                </Card>
            ))}
        </div>
    );
}

export default ListCard;
