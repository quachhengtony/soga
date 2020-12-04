import { useHistory } from 'react-router-dom';
import Button, { ButtonGroup } from '@atlaskit/button';

import './ListWorkspace.css';
import db from '../firebase';

function ListWorkspace({ id, name, date }) {

    const history = useHistory();

    const goToWorkspace = () => {
        if (id) {
            history.push(`/workspace/${id}/room/undefined/chat`)
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
            <p><a>{name? name : "No name"}</a></p>
            <p>Created at: {date? date : "No date"}</p>
            <ButtonGroup>
                <Button id={id} onClick={goToWorkspace} spacing='compact'>Open workspace</Button>
                <Button id={id} onClick={deleteWorkspace} spacing='compact'>Delete</Button>
                <Button spacing='compact'>Settings</Button>
            </ButtonGroup>
        </div>
    );
}

export default ListWorkspace;

