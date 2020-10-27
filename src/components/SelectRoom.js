import React from 'react';
import { MenuItem } from '@blueprintjs/core';
import { useHistory, useParams } from 'react-router-dom';

function SelectRoom({ text, id }) {

    const { workspaceId } = useParams();

    // When click on channel, useHistory will push/force a redirect
    const history = useHistory();
    const selectRoom = () => {
        if (id) {
            history.push(`/workspace/${workspaceId}/room/${id}`)
        } else {
            history.push(text)
        }
    }

    return (
        <MenuItem text={text} id={id} onClick={selectRoom} />
    );
}

export default SelectRoom;
