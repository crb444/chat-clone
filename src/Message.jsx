import React, { useContext } from "react";
import "./Message.css";
import { UserContext } from "./UserContext";

const Message = ({ sender, content, time }) => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div
      className={
        sender === user.user.displayName
          ? "message__normal"
          : "message__userSent"
      }
    >
      <div className="message__sender">
        <p>{sender}</p>
      </div>
      <div
        className={
          sender === user.user.displayName
            ? "message__contentsUserSent"
            : "message__contentsNormal"
        }
      >
        <h3>{content}</h3>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Message;
