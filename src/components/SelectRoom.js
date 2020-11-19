// import React, { useState } from 'react';
// import { MenuItem } from '@blueprintjs/core';
// import { useHistory, useParams } from 'react-router-dom';
// import './SelectRoom.css'

// function SelectRoom({ text, id }) {

//     const { workspaceId } = useParams();
//     const [checkRoom, setCheckRoom] = useState();
//     const history = useHistory();

//     const selectRoom = () => {
//         if (id) {
//             history.push(`/workspace/${workspaceId}/room/${id}`);
//         } else {
//             history.push(text)
//         }
//         setCheckRoom(true);
//         history.listen(() => {
//             setCheckRoom(false);
//         })
//     }

//     return (
//         <div className="selectRoom">
//             <MenuItem text={`${text}`} id={id} onClick={selectRoom} icon="dot" className='nbr' active={checkRoom} />
//         </div>
//     );
// }

// export default SelectRoom;

import React, { useState } from 'react';
// import { MenuItem } from '@blueprintjs/core';
import { ButtonItem } from '@atlaskit/side-navigation';
import { useHistory, useParams } from 'react-router-dom';
import './SelectRoom.css'

function SelectRoom({ text, id }) {

    const { workspaceId } = useParams();
    const [checkRoom, setCheckRoom] = useState();
    const history = useHistory();

    const selectRoom = () => {
        if (id) {
            history.push(`/workspace/${workspaceId}/room/${id}/chat`);
        } else {
            history.push(text)
        }
        setCheckRoom(true);
        history.listen(() => {
            setCheckRoom(false);
        })
    }

    return (
        <div className="selectRoom">
            <ButtonItem id={id} onClick={selectRoom} isSelected={checkRoom}>{text}</ButtonItem>
        </div>
    );
}

export default SelectRoom;
