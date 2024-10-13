import React from "react";
import "./App.scss";
import { useAppContext } from "./AppContext";
import Comment from "./components/Comment";

const App = () => {
  const {
    user,
    comments,
    activeTab,
    setComment,
    comment,
    handleComment,
    isloading,
    handleTabClick,
  } = useAppContext();

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{comments.length}</span>
          </li>

          <li className="nav-sort">
            <span
              className={`nav-item ${activeTab === "hot" ? "active" : ""}`}
              onClick={() => handleTabClick("hot")}
            >
              Top
            </span>
            <span
              className={`nav-item ${activeTab === "newest" ? "active" : ""}`}
              onClick={() => handleTabClick("newest")}
            >
              Newest
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={user.avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="tell something..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="reply-box-send" onClick={handleComment}>
              <div className="send-text">post</div>
            </div>
          </div>
        </div>

        {isloading ? (
          <div>Loading comments...</div>
        ) : (
          comments.map(({ user: usr, ctime, like, content }) => (
            <Comment key={ctime} time={ctime} like={like} content={content} username={usr.uname} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
