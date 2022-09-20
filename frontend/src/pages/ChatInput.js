/* eslint-disable */
import React, { useState } from "react";
import { api } from "../api";

export default function ChatInput({
  user,
  clickedUser,
  getUserMessages,
  getClickedUserMessages,
}) {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickUserId = clickedUser?.user_id;

  const addMessage = async () => {
    if (textArea.trim().length === 0) {
      return;
    }
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickUserId,
      message_data: textArea,
    };

    try {
      await api.postMessage(message);
      getUserMessages();
      getClickedUserMessages();
      setTextArea("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row justify-center pt-1 pb-1 items-center bg-white w-[90%] md:w-[60%] rounded-bl-xl rounded-br-xl border-slate-700 border-opacity-20 border-b-2 border-l-2 border-r-2">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
        className="rounded-xl text-sm w-[80%] resize-none focus:outline-none p-2 h-10 border-slate-700 border-opacity-20 border"
      />
      <button
        onClick={addMessage}
        className="text-white bg-gradient-to-r from-[#fd2f6e] to-[#fe5740] px-2 py-1 md:px-3 md:py-2 m-2 rounded-full font-semibold w-fit text-lg md:text-xl cursor-pointer hover:from-[#FFD9C0] hover:to-[#FFD9C0] hover:text-[#fe5740] border-1 border-[#fe5740]"
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
}
