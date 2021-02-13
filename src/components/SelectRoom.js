import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function SelectRoom({ text, id }) {
  const { workspaceId } = useParams();
  const [checkRoom, setCheckRoom] = useState();
  const history = useHistory();

  const selectRoom = () => {
    if (id) {
      history.push(`/workspace/${workspaceId}/room/${id}/chat`);
    } else {
      history.push(text);
    }
    setCheckRoom(true);
    history.listen(() => {
      setCheckRoom(false);
    });
  };

  useEffect(() => {
    let myBtns = document.querySelectorAll(".room-dropdwon-item");
    myBtns.forEach(function (btn) {
      btn.addEventListener("click", () => {
        myBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }, [])

  return (
    <a
      href="javascript:void(0)"
      className="dropdown-item room-dropdwon-item"
      id={id}
      onClick={selectRoom}
      isSelected={checkRoom}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon dropdown-item-icon"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="5" y1="9" x2="19" y2="9" />
        <line x1="5" y1="15" x2="19" y2="15" />
        <line x1="11" y1="4" x2="7" y2="20" />
        <line x1="17" y1="4" x2="13" y2="20" />
      </svg>
      {text || "..."}
      <span class="badge bg-primary ms-auto">n</span>
    </a>
  );
}

export default SelectRoom;
