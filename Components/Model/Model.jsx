import React, { useState, useContext } from "react";
import Image from "next/image";

//Internal Imports
import images from "../../Assets";
import { ChatAppContent } from "../../Context/ChatAppContext";
import Styles from "./Model.module.css";
import { Loader } from "../../Components/index";
import { ST } from "next/dist/shared/lib/utils";

const Model = ({
  openBox,
  address,
  title,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  // Use states
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContent);

  return (
    <div className={Styles.Model}>
      <div className={Styles.Model_box}>
        <div className={Styles.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Styles.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
          <small>{smallInfo}</small>

           {loading==true?(<Loader/>):(<div className={Styles.Model_box_right_name}>
            <div className={Styles.Model_box_right_name_info}>
              <Image src={images.username} alt="user" width={30} height={30} />
              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={Styles.Model_box_right_name_info}>
              <Image src={images.account} alt="user" width={30} height={30} />
              <input
                type="text"
                placeholder={address || "Enter Address ...."}
                onChange={(e) => setAccountAddress(e.target.value)}
              />
            </div>

            <div className={Styles.Model_box_right_name_btn}>
              <button onClick={()=>functionName({name,accountAddress})}>
                {""}
                <Image src={images.send} alt="send" width={30} height={30}/>
                {""}
                Submit
              </button>

              <button onClick={()=>openBox(false)}>
                {""}
                <Image src={images.close} alt="send" width={30} height={30}/>
                {""}
                Cancel
              </button>
            </div>
          </div>)}


        </div>
      </div>
    </div>
  );
};

export default Model;
