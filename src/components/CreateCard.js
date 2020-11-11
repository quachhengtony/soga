import { Button } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';

function CreateCard({ columnId }) {

    const { workspaceId, roomId } = useParams();

    // Will cause an infinite loop in the DB
    const addCard = () => {
        const cardContent = prompt('Enter card content:');
        if (cardContent) {
            db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').doc(columnId).collection('cards').add({
                body: cardContent
            })
        }
    }

    return (
        <div className="addCard">
            <Button text="Add card" onClick={addCard} minimal outlined />
        </div>
    );
}

export default CreateCard;
