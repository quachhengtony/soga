import { useHistory } from 'react-router-dom';
import Button, { ButtonGroup } from '@atlaskit/button';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import MediaServicesOpenMediaviewerIcon from '@atlaskit/icon/glyph/media-services/open-mediaviewer';

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
            <div className="listWorkspace__left">
                <div>
                    <p className="listWorkspace__text">{name? name : "No name"}</p>
                    <p className="listWorkspace__text">Created at: {date? date : "No date"}</p>
                </div>
            </div>
            <div className="listWorkspace__right">
                {/* <ButtonGroup> */}
                <div>
                    <Button className="listWorkspace__button" appearance="default" id={id} iconBefore={<MediaServicesOpenMediaviewerIcon />} onClick={goToWorkspace} shouldFitContainer={true}></Button>
                </div>
                <div>
                    <Button className="listWorkspace__button" appearance="default" iconBefore={<SettingsIcon />} shouldFitContainer={true}></Button>
                </div>
                {/* </ButtonGroup> */}
            </div>
        </div>
    );
}

export default ListWorkspace;

