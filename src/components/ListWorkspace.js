import { useHistory } from 'react-router-dom';
import Button, { ButtonGroup } from '@atlaskit/button';

import './ListWorkspace.css';
import db from '../firebase';

function ListWorkspace({ text, id }) {

    const history = useHistory();

    const goToWorkspace = () => {
        if (id) {
            history.push(`/workspace/${id}/room/undefined/chat`)
        } else {
            console.log('No workspace id')
        }
    }

    const deleteWorkspace = () => {
        db.collection('workspaces').doc(id)
            .delete()
            .then(function() {
                console.log("Workspace successfully deleted!");
            })
            .catch(function(error) {
                console.error("Error removing workspace: ", error);
            });
    }
    
    return (
        <div className="listWorkspace">
            <p><a>{text}</a></p>
            <p>Rooms: ##</p>
            <p>People: ##</p>
            <p>Created at: ##/##/##</p>
            <ButtonGroup>
                <Button id={id} onClick={goToWorkspace} spacing='compact'>Open workspace</Button>
                <Button id={id} onClick={deleteWorkspace} spacing='compact'>Delete</Button>
                <Button spacing='compact'>Settings</Button>
            </ButtonGroup>
        </div>
    );
}

export default ListWorkspace;

