/* eslint-disable */
import { api } from "../api";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import maleUser from "../img/profuser.svg";

export default function List({ user, pending, setCurUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleMatch = async () => {
    try {
      const params = {
        username: cookies["UserId"],
        clicked_username: user.username,
      };
      const data = await api.matchUser(params);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handleReject = async () => {
    try {
      const params = {
        username: cookies["UserId"],
        clicked_username: user.username,
      };
      const data = await api.rejectUser(params);
      // console.log(data);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnreject = async () => {
    try {
      const params = {
        username: cookies["UserId"],
        clicked_username: user.username,
      };
      const data = await api.unrejectUser(params);
      // console.log(data);
      setCurUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-between h-24 w-[290px] md:h-16 md:w-[420px] bg-[#E1E9F4] rounded-lg">
        <div
          className="h-[100%] flex flex-row items-center justify-center cursor-pointer ml-4"
          onClick={() => {
            navigate(`/profile/${user.username}`);
          }}
        >
          <img
            src={user.img_url ? user.img_url : maleUser}
            className="h-[50%] md:h-[70%] rounded-full"
          />
          <div className="ml-2">
            <h2 className="text-base">{user.name}</h2>
            <h4 className=" text-xs opacity-70">{user.professional_title}</h4>
          </div>
        </div>
        <div className="justify-end">
          {pending && (
            <button
              className="bg-[#0287BF] pt-1 pb-1 md:pl-3 md:pr-3 pl-2 pr-2 text-white md:text-base text-xs rounded-full mr-1 hover:bg-white hover:text-[#0287BF]"
              onClick={handleMatch}
            >
              Accept
            </button>
          )}
          {pending && (
            <button
              className="bg-[#0287BF] pt-1 pb-1 md:pl-3 md:pr-3 pl-2 pr-2 md:mr-4 mr-2 text-white md:text-base text-xs rounded-full hover:bg-white hover:text-[#0287BF]"
              onClick={handleReject}
            >
              Delete
            </button>
          )}
          {!pending && (
            <button
              className="bg-[#0287BF] pt-1 pb-1 pl-3 pr-3 text-white text-base rounded-full mr-6 hover:bg-white hover:text-[#0287BF]"
              onClick={handleUnreject}
            >
              Revert
            </button>
          )}
        </div>
      </div>
      <div className=" h-[1px] bg-slate-700 mt-2 mb-2 opacity-20 w-[290px] md:w-[420px]"></div>
    </div>
  );
}
