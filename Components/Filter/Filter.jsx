import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//Internal imports
import Styles from "./Filter.module.css";
import Style from "./Filter.module.css";
import images from "../../Assets";
import { ChatAppContent } from "../../Context/ChatAppContext";
import { Model } from "../index";
const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContent);
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Styles.Filter}>
      <div className={Styles.Filter_box}>
        <div className={Styles.Filter_box_left}>
          <div className={Styles.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input type="text" placeholder="Seach..." />
          </div>
        </div>
        <div className={Styles.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            Clear Chat
          </button>

          <button onClick={() => setAddFriend(true)}>
            <Image src={images.add} alt="clear" width={20} height={20} />
            Add Friend
          </button>
        </div>
      </div>
      {/* Model Component */}
      {addFriend && (
        <div className={Styles.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="Welcome TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore atque quia inventore placeat molestias iste beatae voluptas expedita nemo labore nam non architecto libero obcaecati nobis quidem, vero odio cupiditate."
            smallInfo="Kindely Select Your Friend Name and Address.."
            image={images.hero}
            functionName={addFriend}
          />
        </div>
      )}
      <p></p>
    </div>
  );
};

export default Filter;
