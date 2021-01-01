import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Loading({ URL, duration }) {
  // const history = useHistory();
  // useEffect(() => {
  //   setTimeout(() => {
  //     var loading = document.querySelector(".loading");
  //     loading.style.display = "none";
  //     // history.push(URL);
  //   }, duration);
  // }, []);

  return (
    <div className="loading" style={{ position: "relative" }}>
      <div class="spinner-border" role="status"></div>
    {/* <div className="progress progress-sm">
      <div className="progress-bar progress-bar-indeterminate"></div>
    </div>
    Loading... */}
    </div>
  );
}
