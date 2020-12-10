import Button  from '@atlaskit/button';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import db from '../firebase';
import './CreateCard.css';

function CreateCard({ columnId }) {

    const { workspaceId, roomId } = useParams();

    // Will cause an infinite loop in the DB
    const addCard = () => {
        const cardContent = prompt('Enter card content:');
        if (cardContent) {
            db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').doc(columnId).collection('cards').add({
                body: cardContent,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
    }

    return (
        <div className="createCard">
            <Button className="createCard_button" onClick={addCard} spacing="compact">New card</Button>
        </div>
    );
}

export default CreateCard;
