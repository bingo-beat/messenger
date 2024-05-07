import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { seedList } from "./data";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "./reducer";

const ChatRoom = () => {
  const [seed, setSeed] = useState("");
  const [msg, setMsg] = useState("");
  const { roomId } = useParams();
  const [rooomName, setRooomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRooomName(snapshot.data().name));
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 21));
  }, [roomId]);

  const sendMessages = (e) => {
    e.preventDefault();
    console.log("i typed ", msg);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: msg,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  };

  return (
    <div className="chat">
      <div className="chat_Header">
        <img
          src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${seedList[seed]} `}
        />
        <div className="chat__HeaderInfo">
          <h3>{rooomName}</h3>
          <p>
            Last Seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}{" "}
          </p>
        </div>
        <div className="chat__HeaderRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_Body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_Reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_Footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message"
          />
          <IconButton className="sendButton">
            <button onClick={sendMessages} type="submit">
              <SendIcon />
            </button>
          </IconButton>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatRoom;
