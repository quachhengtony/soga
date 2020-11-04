import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

function ListWorkspace({ text, id }) {

    const history = useHistory();

    const goToWorkspace = () => {
        if (id) {
            history.push(`/workspace/${id}/room/undefined`)
        } else {
            console.log('No id')
        }
    }
    
    return (
        <div className="listWorkspace">
            <ul>
                <Button text={text} id={id} onClick={goToWorkspace} minimal outlined/>
            </ul>
        </div>
    );
}

export default ListWorkspace;
