/* eslint-disable */
import React,{useState,useEffect} from "react";
// import Comment from "../components/Comment";
import { GrAttachment } from "react-icons/gr";
import { AiFillDelete,AiFillWechat } from "react-icons/ai";
import { BiDownvote,BiUpvote, } from "react-icons/bi";
import { api } from "../api";
import { useLocation,Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export default function ViewBlog({user}){
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const id = cookies["UserId"];
  
    const location = useLocation()
    const {blog} = location.state?location.state:null;

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [upvotes,setUpvotes] = useState(blog.upvotes);
    

    const handleUpvote = () => {
        setUpvotes(upvotes+1);
    }

    const handleDownvote = () => {
        if(upvotes !== 0) setUpvotes(upvotes-1);
        else setUpvotes(0);
    }
   const handleDelete = async() => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
    
        try {
            setLoading(true);
             const _id = blog._id;
            const res = await api.deleteblog({_id});

            setLoading(false);
            navigate("/profile");
            window.location.reload();
        } catch (e) {
            console.log(e.response.message);
        }
    }
   }
  
    return(
        <div className=" mt-32 mb-20 ml-auto mr-auto mr-automax-w-[640px] w-[420px] md:w-[480px] lg:w-[560px]">
            <div className="m-auto mt-5 max-w-[580px] w-[360px] md:w-[420px] lg:w-[540px]">
                <div className = "justify-center">
                <h2 className = "text-bold text-3xl">{blog.title}</h2>
                <h3 className="text-base text-[#808080] text-semibold md:mt-1">
              {blog.hashes.length > 0 &&
                blog.hashes.map((hash, _index) => (
                  <span key={_index} className="mr-2">
                    #{hash}
                  </span>
                ))}
            </h3>
                <p className = "mb-2">{blog.content}</p>
                <p style = {{color: "#004581",fontWeight: "500"}}>{upvotes} Upvotes</p>
                <div className="mb-2 mt-2">
                    <button  onClick={() =>handleUpvote()} className='inline-flex bg-[#004581] pt-2 pb-2 lg:pl-3 lg:pr-2 pl-2 pr-2 text-white lg:text-md rounded-lg lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#028ABE]'><BiUpvote />Upvote</button>
                    <button  onClick = {() => handleDownvote()} className='inline-flex bg-[#004581] pt-2 pb-2 lg:pl-2 lg:pr-2 pl-2 pr-2 text-white lg:text-md rounded-lg lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#028ABE]'> <BiDownvote />Downvote</button>
                </div>
                {id != blog.username ? 
                  <Link to = {`/profile/${blog.username}`} state = {{search_id: blog.username}} className='inline-flex bg-[#018ABD] no-underline pt-2 pb-2 lg:pl-3 lg:pr-2 pl-2 pr-2 text-white lg:text-md rounded-lg lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#028ABE]'><AiFillWechat/>Collaborate</Link>
                  : <button onClick={() =>handleDelete()} className='inline-flex bg-[#cc0000] no-underline pt-2 pb-2 lg:pl-3 lg:pr-2 pl-2 pr-2 text-white lg:text-md rounded-lg lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#cc0000]'><AiFillDelete/>Delete Post</button>
                }
                 
                </div>
            </div>
            {/* <div  className="flex flex-row justify-center pt-1 pb-1 items-center bg-white w-[90%]" >
            <input
                id = "comment_input"
                value = {comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder = "New Comment..."
                className="p-2 w-[100%] my-5 resize-none focus:outline-none h-10 border-slate-700 border-opacity-20 border"
            />
            <button
                onClick={addComment}
                className='inline-flex bg-[#808080] ml-2 pt-2 pb-2 lg:pl-2 lg:pr-2 pl-2 pr-2 text-white lg:text-md rounded-lg lg:mr-4 mr-3 text-base hover:bg-white hover:text-[#808080]'
            >Comment</button>
            </div> */}
            {/* <Comment />  */}
        </div>
    );
}