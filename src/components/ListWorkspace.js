import { useHistory } from "react-router-dom";

function ListWorkspace({ id, name, date, author }) {
  const history = useHistory();

  return (
    <tr>
      <td onClick={() => history.push(`/workspace/${id}/room/undefined/chat`)}>
        <a href="javascript:void(0)" class="text-reset">
          {name ? name : "..."}
        </a>
      </td>
      <td className="text-muted">{date ? date : "..."}</td>
      <td className="text-muted">{author ? author : "..."}</td>
      <td>
        <a href="javascript:void(0)">Settings</a>
      </td>
    </tr>
  );
}

export default ListWorkspace;
