import React from 'react';
import { MenuItem } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';
import './SelectRoom.css'

function SelectRoom({ text, id }) {

    const { workspaceId } = useParams();

    const history = useHistory();
    const selectRoom = () => {
        if (id) {
            history.push(`/workspace/${workspaceId}/room/${id}`)
        } else {
            history.push(text)
        }
    }

    return (
        <div className="selectRoom">
            <MenuItem text={`${text}`} id={id} onClick={selectRoom} icon="dot" intent="success" />
        </div>
    );
}

export default SelectRoom;
