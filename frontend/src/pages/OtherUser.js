/* eslint-disable */
import React, { useEffect, useState } from "react";
import ListCreatedPosts from "../components/ListCreatedPosts";
import maleUser from "../img/profuser.svg";
import { BsPersonPlusFill } from "react-icons/bs";
import { SiGithub, SiIeee, SiGmail } from "react-icons/si";
import { api } from "../api";
import { useCookies } from "react-cookie";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const [account, setAccount] = useState([]);
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [checkProfile, setCheckProfile] = useState(false);

  const navigate = useNavigate();

  const handleMatch = async () => {
    try {
      const params = {
        username: cookies["UserId"],
        clicked_username: account.username,
      };
      const data = await api.matchUser(params);
      setUser(data.data);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const param = useParams();
  useEffect(() => {
    // console.log('here');

    let isSubscribed = true;
    const fetchData = async () => {
      const params = {
        username: cookies["UserId"],
        requested_id: param.id,
      };
      const data = await api.getSelf(params);
      // console.log('here');
      // console.log(data);

      if (isSubscribed) {
        setAccount(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, []);


  return (
    <div className="flex mt-32 ml-auto mb-20 mr-auto max-w-[720px] w-[560px] md:w-[500px] lg:w-[640px]">
      <div className="justify-center">
        <div className="border-0">
          <div style={{ alignItems: "center", display: "flex" }}>
            <img
              className="float-left mr-2 rounded-full border border-gray-100 shadow-sm h-26 w-[25%] "
              floated="left"
              src={account.img_url ? account.img_url : maleUser}
              alt="user image"
            />

            <div className="ms-3 ml-6">
              {cookies["UserId"]!==account.username && (<button
                className="text-[#018ABD] bg-white hover:bg-[#018ABD] hover:text-[#FFFFFF]"
                style={{
                  float: "right",
                  border: "1px solid #018ABD",
                  borderRadius: "50%",
                  padding: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleMatch}
              >
                <BsPersonPlusFill />
              </button>)}

              <div className="text-[#018ABD] text-3xl text-bold">
                {account.name}
              </div>

              <div className="text-[#004581] mt-2 text-semibold text-base">
                {account.professional_title}
              </div>

              <div className="mt-4 flex flex-row text-base">
                <div className=" me-4 mr-2">45 Followers</div>
                <div>43 Following</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-semibold text-xl">{account.about}</div>
        </div>

        <div className="mt-4 text-semibold text-xl">Areas of expertise</div>
        <div className="mt-3 flex align-center">
          <div className="align-center me-2">
            <span className="bg-[#97CBDC] p-2 font-semibold rounded-xl">
              {" "}
              Lorem ipsum{" "}
            </span>
          </div>
        </div>
        {/* 
            <div className = "mt-5 text-semibold text-xl" >
                Published Papers
            </div> */}

        <div className="mt-3 align-center space-y-4 divide-[#97CBDC] divide-y-2 ">
          <div className="my-3"></div>
        </div>

        <div className="mt-5 text-semibold text-xl">Personal Links</div>
        <div className="mt-4">
          <ul>
            {account.show_email && (
              <li className="m-2 no-underline inline-flex text-black font-semibold">
                <SiGmail size="1.8rem" />
                <span className="ms-2">Email: {account.email}</span>
              </li>
            )}
            {account.github_username && (
              <li>
                <a
                  href="https://github.com`/${account.github_username}`"
                  className="m-2 inline-flex no-underline text-black  font-semibold"
                >
                  <SiGithub size="2.0rem" />{" "}
                  <span className="ms-2">
                    Github profile: {account.github_username}
                  </span>{" "}
                </a>
              </li>
            )}
            {account.ieee_id && (
              <li>
                <a
                  href=""
                  className="m-2 inline-flex no-underline text-black font-semibold"
                >
                  <SiIeee size="2.8rem" />
                  <span className="ms-2 mt-2 mr-2">
                    <span className="ml-2 mr-2">IEE ID: </span>
                    {account.ieee_id}
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <ListCreatedPosts profile_id={account.username} />
      </div>
    </div>
  );
}
