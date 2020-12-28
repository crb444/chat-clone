import React, { useEffect, useState, useContext } from "react";
import "./Chats.css";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import { ContactSupportOutlined, More } from "@material-ui/icons";
import InsertSmileyIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router";
import db from "./firebase";
import Message from "./Message";
import firebase from "firebase";
import { UserContext } from "./UserContext";
import RoomMenu from "./RoomMenu";

const Chats = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [user, setUser] = useContext(UserContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (value) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          sender: user.user.displayName,
          message: value,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      setValue("");
    }
  };

  useEffect(() => {
    console.log("this in chats ", roomId);
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("time", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chats">
      <div className="chats__roomInfo">
        <div className="chats__roomInfoAvatar">
          <Avatar />
        </div>
        <div className="chats__roomInfoDetails">
          <h3>{roomName}</h3>
          <p>
            {" "}
            Last online at{" "}
            {new Date(
              messages[messages.length - 1]?.time?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chats___roomInfoOptions">
          <RoomMenu id={roomId} />
        </div>
      </div>
      <div className="chats__conversation">
        {messages.map((message) => {
          return (
            <Message
              sender={message.sender}
              content={message.message}
              time={new Date(message?.time?.toDate()).toUTCString()}
            />
          );
        })}
      </div>
      <div className="chats__newMessage">
        <InsertSmileyIcon />
        <div className="chats__newMessageBox">
          <form>
            <input
              placeholder="Type a message here"
              type="text"
              value={value}
              onChange={handleChange}
            />
            <button type="submit" onClick={sendMessage} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chats;
