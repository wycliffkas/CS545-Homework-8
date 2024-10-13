import React, { createContext, useState, useEffect, useContext } from "react";
import avatar from "./images/bozai.png";
import _ from "lodash";
import { CommentType } from "./types";

interface UserType {
  uid: string;
  uname: string;
  avatar: string;
}

interface AppContextType {
  user: UserType;
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  isloading: boolean;
  handleTabClick: (type: string) => void;
  handleComment: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<null | string>(null);
  const [comments, setComments] = useState<[] | CommentType[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isloading, setIsLoading] = useState(true);

  const user = {
    uid: "30009257",
    uname: "John",
    avatar,
  };

  useEffect(() => {
    async function getList() {
      setIsLoading(true);
      const res = await fetch("http://localhost:3004/list");
      const data = await res.json();
      setComments(_.orderBy(data, ["like"], ["desc"]));
      setIsLoading(false);
    }
    getList();
  }, []);

  const handleComment = () => {
    if (comment.trim() === "") return;

    const newComment = {
      rpid: comments.length + 1,
      user,
      content: comment,
      ctime: new Date().toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      like: 0
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  const handleTabClick = (type: string) => {
    setActiveTab(type);
    if (type === "hot") {
      setComments(_.orderBy(comments, ["like"], ["desc"]));
    } else if (type === "newest") {
      setComments(_.orderBy(comments, ["ctime"], ["desc"]));
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        comments,
        setComments,
        activeTab,
        setActiveTab,
        comment,
        setComment,
        isloading,
        handleTabClick,
        handleComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
