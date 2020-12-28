import { Chat } from "@material-ui/icons";
import React from "react";
import "./ChatModal.css";
import Sidebar from "./Sidebar";
import Chats from "./Chats";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const ChatModal = () => {
  return (
    <div className="chat">
      <BrowserRouter>
        <div className="chat__sidebar">
          <Sidebar />
        </div>
        <Switch>
          <Route path="/" exact>
            <div className="chat__chats">
              <Chats />
            </div>
          </Route>
          <Route path="/rooms/:roomId">
            <div className="chat__chats">
              <Chats />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default ChatModal;
