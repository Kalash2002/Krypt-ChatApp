import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//Internal imports
import Styles from "./Chat.module.css";
import images from "../../../Assets";
import { convertTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendmsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  //readUser
}) => {
  console.log("in chat");
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  console.log("Get friendMessage", friendmsg);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    // console.log("router query",router.query);
    setChatData(router.query);

    readMessage(router.query.address);
    //readUser(router.query.address);
  }, [router.isReady]);




  //console.log("after useEffect");
  //console.log(chatData);
  //console.log("CuurentUser", currentUserName);
  //console.log("CurrentAddress", currentUserAddress);


  return (
    <div className={Styles.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Styles.Chat_user_info}>
          <Image src={images.username} alt="image" width={70} height={70} />
          <div className={Styles.Chat_user_info_box}>
            <h4>{chatData.name}</h4>
            <p className={Styles.show}>{chatData.address}</p>
          </div>
        </div>
      ) : (
        "hey"
      )}

      <div className={Styles.Chat_box_box}>
        <div className={Styles.Chat_box}>
          <div className={Styles.Chat_box_left}>

            {friendmsg.map((el, i) => (
              <div>
                {el.sender == chatData.address ? (
                  <div className={Styles.Chat_box_left_title}>
                    <Image
                      src={images.account}
                      alt="image"
                      width={50}
                      height={50}
                    />

                    <span>
                      {chatData.name} {""}
                      <small>Time : {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                ) : (
                  <div className={Styles.Chat_box_left_title}>
                    <Image
                      src={images.account}
                      alt="image"
                      width={50}
                      height={50}
                    />

                    <span>
                      {userName} {""}
                      <small>Time : {convertTime(el.timestamp)}</small>
                    </span>
                  </div>
                )}
                <p key={i+1}>{el.msg}{""}{""}</p>
              </div>
            ))}
          </div>
        </div>

        {currentUserAddress && currentUserAddress ? (
          <div className={Styles.Chat_box_send}>
            <div className={Styles.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="send"
                  width={50}
                  height
                  onClick={() =>{console.log(message)
                    functionName({ msg: message, address: chatData.address })
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          "hey"
        )}
      </div>
    </div>
  );
};

export default Chat;
