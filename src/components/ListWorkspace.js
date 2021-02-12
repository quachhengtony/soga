import { useHistory } from "react-router-dom";

function ListWorkspace({ id, name, date, author, number }) {
  const history = useHistory();

  return (
    <tr>
      <td>{number+1}</td>
      <td onClick={() => history.push(`/workspace/${id}/overview`)}>
        <a href="javascript:void(0)" className="text-reset">
          {name ? name : "..."}
        </a>
      </td>
      <td className="text-muted">{date ? date : "..."}</td>
      <td className="text-muted">{author ? author : "..."}</td>
      <td>
        <a className="text-reset" href="javascript:void(0)">
          Settings
        </a>
      </td>
    </tr>
  );
}

export default ListWorkspace;
