/* eslint-disable */
import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import Chat from "./Chat";
import { api } from "../api";
import maleUser from "../img/profuser.svg";
import { useNavigate } from "react-router-dom";

export default function ChatDisplay({ user, clickedUser }) {
  const [userMessages, setUserMessages] = useState(null);
  const [clickedUserMessages, setClickedUserMessages] = useState(null);
  const getUserMessages = async () => {
    try {
      const params = {
        username: user.username,
        client_username: clickedUser.username,
      };
      const data = await api.getAllMessages(params);

      setUserMessages(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getClickedUserMessages = async () => {
    try {
      const params = {
        username: clickedUser.username,
        client_username: user.username,
      };
      const data = await api.getAllMessages(params);

      setClickedUserMessages(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserMessages();
    getClickedUserMessages();
  }, []);
  const messages = [];
  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.name;
    formattedMessage["img"] = user?.img_url;
    formattedMessage["message"] = message.message_data;
    formattedMessage["timestamp"] = message.timestamp;
    formattedMessage["id"] = user.username;
    messages.push(formattedMessage);
  });
  clickedUserMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.name;
    formattedMessage["img"] = clickedUser?.img_url;
    formattedMessage["message"] = message.message_data;
    formattedMessage["timestamp"] = message.timestamp;
    formattedMessage["id"] = clickedUser.username;
    messages.push(formattedMessage);
  });
  const descendingOrderMessages = messages.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  const navigate=useNavigate();

  return (
    <div className="h-[75%] overflow-y-auto w-[100vw] flex flex-col justify-center items-center mt-4">
      <div 
        className="flex flex-row justify-start items-center w-[90%] md:w-[60%] pt-2 pb-2 rounded-tl-xl rounded-tr-xl bg-white border-slate-700 border-opacity-20 border-2 cursor-pointer"
        onClick={() => {
          navigate(`/profile/${clickedUser.username}`);
        }}
      >
        <img
          src={clickedUser.img_url ? clickedUser.img_url : maleUser}
          className="h-12 ml-8 rounded-full"
        />
        <div className="ml-5">
            <h2 className="text-base">{clickedUser.name}</h2>
            <h4 className=" text-xs opacity-70">{clickedUser.professional_title}</h4>
          </div>
      </div>
      <Chat
        descendingOrderMessages={descendingOrderMessages}
        clickedUser={clickedUser}
        user={user}
      />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={getUserMessages}
        getClickedUserMessages={getClickedUserMessages}
      />
    </div>
  );
}
