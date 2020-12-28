import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Room from "./Room";
import db from "./firebase";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import RoomMenu from "./RoomMenu";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  // empty brackets - run once
  useEffect(() => {
    db.collection("rooms").onSnapshot((snap) =>
      setRooms(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [roomId]);

  const addNewRoom = () => {
    const newName = prompt("Add new room name");
    if (newName) {
      db.collection("rooms")
        .add({
          name: newName,
        })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__header">
          <Avatar src={user.user.photoURL} />
          <h3>{user.user.displayName}</h3>
        </div>
        <div className="sidebar__headerRight">
          <DonutLargeIcon />
          <ChatIcon />
          <MoreVertIcon />
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder="Search chats" type="text" />
        </div>
        <div className="sidebar__searchContainerAddButton">
          <IconButton onClick={addNewRoom}>
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__rooms">
        {rooms.map((room) => {
          return (
            <Link to={`/rooms/${room.id}`} style={{ textDecoration: "none" }}>
              <Room key={room.id} id={room.id} name={room.data.name} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
