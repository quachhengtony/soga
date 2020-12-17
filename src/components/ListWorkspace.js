import { useHistory } from 'react-router-dom';
import './ListWorkspace.css';

function ListWorkspace({ id, name, date }) {
    const history = useHistory();
    
    return (
        <div className="listWorkspace" onClick={() => history.push(`/workspace/${id}/room/undefined/chat`)}>
            <p>{name ? name : "..."}</p>
            <p>Created at: {date ? date : "..."}</p>
        </div>
    );
}

export default ListWorkspace;

