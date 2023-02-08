/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Oval } from "react-loader-spinner";
import { api } from "../api";
import List from "../components/List";
import rejected from "../img/rejected_users.svg";

export default function RejectedUsers({ setCurUser }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // console.log('here');
    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        username: cookies["UserId"],
      };
      const data = await api.getRejectedUsers(params);
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setUsers(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [cookies["UserId"]]);

  // console.log(users)
  if (!users) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Oval color="#0287BF" height={80} width={80} />
      </div>
    );
  }

  // console.log(users);

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-25 h-[100vh]">
        <img src={rejected} className="w-60" alt="rejected_image" />
        <p className="text-xl mt-8 text-center">No Rejected Users Found..</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white overflow-y-auto relative h-[100vh]">
      <div className="text-center text-2xl pt-[6rem] pb-3 text-black font-semibold fixed w-[290px] md:w-[420px] z-10 border-b-2 border-[#d6d2d0]">
        Rejected Users
      </div>
      <div className="relative mt-[9.4rem]">
        {users.map((user, _index) => (
          <List
            user={user}
            key={_index}
            pending={false}
            setCurUser={setCurUser}
          />
        ))}
      </div>
    </div>
  );
}
