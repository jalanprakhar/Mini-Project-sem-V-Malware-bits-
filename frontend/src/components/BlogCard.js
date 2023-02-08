/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { api } from "../api";

export default function BlogCardDash({ blog }) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const params = {
    username: cookies["UserId"],
    requested_id: blog.username,
  };
  const blogContent =
    blog.content.length > 400
      ? blog.content.substring(0, 400) + "..."
      : blog.content;

  const [author, setAuthor] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const data = await api.getSelf(params);

      if (isSubscribed) {
        setAuthor(data.data);
      }
    };
    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, []);

  const handleClick = (_id) => {
    // TODO
    // navigate(`/dashboard/${username}`);
  };

  return (
    <div className="card bg-[#DDE8F0] drop-shadow-xl max-w-[340px] md:max-w-[400px] lg:max-w-[650px] h-[85vh] lg:h-[450px] mt-10 lg:mt-0 flex flex-row rounded-3xl">
      <div className="card-text">
        <div className="title-total lg:pt-10 pb-6 pr-4 pl-4">
          <div className="title p-4 text-right text-[#028ABE] font-semibold text-lg">
            {author.name}
          </div>
          <h2 className="m-0 pr-4 pl-4 text-2xl font-bold md:mt-3">
            {blog.title}
          </h2>
          <h3 className="m-0 pr-4 pl-4 text-base font-semibold text-[#787878] md:mt-1">
            {blog.hashes.length > 0 &&
              blog.hashes.map((hash, _index) => (
                <span key={_index} className="mr-2">
                  #{hash}
                </span>
              ))}
          </h3>
          <div className="desc pt-2 pb-2 pr-4 pl-4 text-sm break-words">
            {blogContent}
          </div>
          <div className="actions flex flex-row justify-center align-center mt-3 lg:mt-6">
            {/* <button
                className="bg-[#028ABE] pt-2 pb-2 lg:pl-4 lg:pr-4 pl-3 pr-3 text-white lg:text-lg rounded-xl lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#028ABE]"
                onClick={() => handleClick(blog._id)}
              >
                View
              </button> */}
            <Link to="/viewblog" state={{ blog: blog }}>
              <button className="bg-[#028ABE] pt-2 pb-2 lg:pl-4 lg:pr-4 pl-3 pr-3 text-white lg:text-lg rounded-xl lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#028ABE]">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
