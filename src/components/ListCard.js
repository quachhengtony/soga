import { memo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import './ListCard.css';
import { Draggable } from 'react-beautiful-dnd';
// import ColorPicker from '@atlaskit/color-picker';

function ListCard({ columnId }) {

    const [cards, setCards] = useState([]);
    const { workspaceId, roomId } = useParams();

    // const [cardColor, setCardColor] = useState();

    useEffect(() => {
        renderCards();
    }, [])

    const renderCards = useCallback(() => {
        db.collection('workspaces').doc(workspaceId).collection('rooms').doc(roomId).collection('columns').doc(columnId).collection('cards').orderBy("timestamp", "asc").onSnapshot(snapshot => (
                setCards(snapshot.docs.map(doc => ({
                    id: doc.id,
                    body: doc.data().body
                })))
        ))
    }, [cards])

    // const simplePalette = 
    // [
    //     {
    //         label: "Purple",
    //         value: "#8777D9",
    //     },
    //     {
    //         label: "Blue",
    //         value: "#2684FF",
    //     },
    //     {
    //         label: "Green",
    //         value: "#57D9A3",
    //     },
    //     {
    //         label: "Light Blue",
    //         value: "#00C7E6",
    //     },
    //     {
    //         label: "Yellow",
    //         value: "#FFC400",
    //     },
    //     {
    //         label: "Red",
    //         value: "#FF7452",
    //     }
    // ]

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
                            {/* <div className="listCard_card" style={{borderLeft: `5px solid ${cardColor}`}}> */}
                            <div className="listCard__card">
                                <p>{card.body}</p>
                                {/* <ColorPicker
                                    label="Change color"
                                    palette={simplePalette}
                                    selectedColor={cardColor}
                                    onChange={(newColor) => {setCardColor(newColor)}}
                                /> */}
                            </div>
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default memo(ListCard);
