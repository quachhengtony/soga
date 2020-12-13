import { useHistory } from 'react-router-dom';
import Button from '@atlaskit/button';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import MediaServicesOpenMediaviewerIcon from '@atlaskit/icon/glyph/media-services/open-mediaviewer';

import './ListWorkspace.css';

function ListWorkspace({ id, name, date }) {

    const history = useHistory();
    
    return (
        <div className="listWorkspace">
            <div className="listWorkspace__left" onClick={() => history.push(`/workspace/${id}/room/undefined/chat`)}>
                <div>
                    <p className="listWorkspace__text">{name? name : "No name"}</p>
                    <p className="listWorkspace__text">Created at: {date? date : "No date"}</p>
                </div>
            </div>
            <div className="listWorkspace__right" onClick={() => history.push(`/workspace/${id}/settings`)}>
                <Button className="listWorkspace__button" iconBefore={<SettingsIcon label="" />} shouldFitContainer={true}></Button>
            </div>
        </div>
    );
}

export default ListWorkspace;

