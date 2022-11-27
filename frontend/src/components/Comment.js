import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { div,Image } from "react-bootstrap";

export default function Comment ({comment}){
    return(
        <div className="mb-4">
            
            <div className="border-0">
            <div style={{ alignItems: "center", display: "flex"}} >
            <img className="float-left mr-2 rounded-full border border-gray-100 shadow-sm h-12 w-[10%]" floated="left"  src={account.img_url ? account.img_url : maleUser} alt="user image" />
            
                <div className = "ms-3">
                <div className ="text-lg font-bold"> John</div>
                <div >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos.
                </div>
                </div>
            </div>  
            </div>
        </div>
    )
}