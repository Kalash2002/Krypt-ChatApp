import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import images from "../../Assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";
import Styles from "./Friend.module.css";

import { ChatAppContent } from "../../Context/ChatAppContext";
const Friend = () => {
  // const array =[1,2,34,5,6];

  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    readUser,
    friendmsg,
  } = useContext(ChatAppContent);

  console.log(friendLists);

  return (
    <div className={Styles.Friend}>
      <div className={Styles.Friend_box}>
        <div className={Styles.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div className={Styles.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendmsg={friendmsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            //readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};
export default Friend;
