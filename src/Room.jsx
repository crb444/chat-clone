import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Room.css";
import db from "./firebase";

const Room = ({ name, id }) => {
  const seed = Math.floor(Math.random() * 5000);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div className="room">
      <div className="room__avatar">
        <Avatar
          src={`https://avatars.dicebear.com/4.5/api/bottts/${seed}.svg`}
        />
      </div>
      <div className="room__details">
        <h3>{name}</h3>
        <p> {messages[messages.length - 1]?.message} </p>
      </div>
    </div>
  );
};

export default Room;
