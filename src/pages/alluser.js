import React, { useState, useEffect, useContext } from "react";

//Internal Imports
import { UserCard } from "../../Components/index";
import Styles from "../styles/alluser.module.css";
import { ChatAppContent } from "../../Context/ChatAppContext";

const alluser = () => {
  const { userLists, addFriends } = useContext(ChatAppContent);
  return <div>
     <div className={Styles.alluser_info}>
        <h1>Find your Friend</h1>
    </div>

    <div className={Styles.alluser}>
        {console.log("in")}
        {

        userLists.map((el,i)=>(
            <UserCard key={i+1} el={el} i={i} addFriends={addFriends }/>
        ))}

    </div>
  </div>;
};

export default alluser;
