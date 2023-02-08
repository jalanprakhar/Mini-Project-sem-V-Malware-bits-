/* eslint-disable */
import React from "react";
import maleUser from "../img/profuser.svg";

export default function Chat({ descendingOrderMessages, user }) {
  const id = user.username;
  return (
    <div className="h-[80%] w-[90%] md:w-[60%] overflow-y-auto p-4 border-slate-700 border-opacity-20 border-b-2 border-l-2 border-r-2">
      {descendingOrderMessages.map((message, _index) => {
        return (
          <div key={_index}>
            {message.id !== id && (
              <div className="flex flex-row items-center justify-start mt-4">
                <img
                  src={message.img ? message.img : maleUser}
                  className="h-8 rounded-full"
                />
                <div className="ml-2">
                  <h2 className="text-xs opacity-70">{message.email}</h2>
                  <div className=" text-sm md:text-base pt-1 pb-1 pl-2 pr-2 bg-[#0287BF] rounded text-white break-words max-w-[10rem] sm:max-w-[15rem] lg:max-w-sm">
                    {message.message}
                  </div>
                </div>
              </div>
            )}
            {message.id === id && (
              <div className="flex flex-row items-center justify-end mt-4">
                <div className="mr-2">
                  <h2 className="text-xs opacity-70 text-right">
                    {message.email}
                  </h2>
                  <h4 className=" text-sm md:text-base text-left pt-1 pb-1 pl-2 pr-2 bg-[#97CBDC] rounded break-words max-w-[10rem] sm:max-w-[15rem] lg:max-w-sm">
                    {message.message}
                  </h4>
                </div>
                <img
                  src={message.img ? message.img : maleUser}
                  className="h-8 rounded-full"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
