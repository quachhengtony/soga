import Avatar from "@atlaskit/avatar";
import Comment, { CommentAuthor, CommentTime } from "@atlaskit/comment";
import { memo } from "react";
import "../styles/Message.css";

function Message({ message, user, timestamp, userImage, date }) {
  const placeholderAvatarSrc =
    "https://lh3.googleusercontent.com/-2ZYyK77daes/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnSUcxLbijDSWB5DBVajOI35wfFZQ/s96-c/photo.jpg";
  return (
    <div className="message">
      <Comment
        avatar={
          <Avatar
            src={userImage ? userImage : placeholderAvatarSrc}
            appearance="square"
            presence="online"
            size="medium"
          />
        }
        author={<CommentAuthor>{user ? user : "..."}</CommentAuthor>}
        content={<p><div dangerouslySetInnerHTML={{__html: message}} /></p>}
        time={
          <CommentTime>
            {date} - {timestamp?.toDate().getHours()}:
            {timestamp?.toDate().getMinutes()}:
            {timestamp?.toDate().getSeconds()}
          </CommentTime>
        }
      />
    </div>
  );
}

export default memo(Message);
