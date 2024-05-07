import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { seedList } from "../data";
import db from "../firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 21));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter Name For Chat Room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_Chats">
        <img
          src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${seedList[seed]} `}
        />

        <div className="sidebar_ChatsInfo">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar_Chats">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
