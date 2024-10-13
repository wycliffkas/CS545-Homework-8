import React from "react";
import { useAppContext } from "../AppContext";

interface CommentProps {
  username: string;
  content: string;
  time: string;
  like: number;
}

const Comment = ({ username, time, like, content }: CommentProps) => {
  const { user } = useAppContext();

  return (
    <div className="reply-list">
      <div className="reply-item">
        <div className="root-reply-avatar">
          <div className="bili-avatar">
            <img className="bili-avatar-img" alt="" />
          </div>
        </div>

        <div className="content-wrap">
          <div className="user-info">
            <div className="user-name">{username}</div>
          </div>

          <div className="root-reply">
            <span className="reply-content">{content}</span>
            <div className="reply-info">
              <span className="reply-time">{time}</span>
              <span className="reply-time">Like: {like}</span>
              {user.uname === username && <span className="delete-btn">Delete</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
