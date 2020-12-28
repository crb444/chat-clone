import "./App.css";
import ChatModal from "./ChatModal";
import { useContext } from "react";
import Login from "./Login";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useContext(UserContext);

  return <div className="app">{!user ? <Login /> : <ChatModal />}</div>;
}

export default App;
