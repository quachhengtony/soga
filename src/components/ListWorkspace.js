import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card } from '@blueprintjs/core';

import './ListWorkspace.css';

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
            <Card className="listWorkspace_card">
                <p className="bp3-text-large"><a>{text}</a></p>
                <p>Rooms: ##</p>
                <p>People: ##</p>
                <p>Created at: ##/##/##</p>
                <Button className="listWorkspace_openButton" text="Open workspace" id={id} onClick={goToWorkspace} minimal outlined small />
                <Button className="listWorkspace_settingsButton" text="Settings" minimal outlined small />
        
            </Card>
        </div>
    );
}

export default ListWorkspace;
