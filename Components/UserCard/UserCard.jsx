import React from "react";
import Image from "next/image";
//Internal imports
import image from "../../Assets";
import Styles from "./UserCard.module.css";
const UserCard = ({ el, i, addFriends }) => {
  console.log("in usercard");
  //using below clg we get all users
  console.log(el);
  //console.log(el.name)
  return (
    <div className={Styles.UserCard}>
      <div className={Styles.UserCard_box}>
        <Image
          className={Styles.UserCard_box_img}
          src={image.images}
          alt="user"
          width={100}
          height={100}
        />

        <div className={Styles.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0, 25)}</p>
          <button
            onClick={() => {
              console.log(el.name, el.accountAddress);
              addFriends(el.name, el.accountAddress);
            }}
          >
            Add Friend
          </button>
        </div>
      </div>
      <small className={Styles.number}>{i + 1}</small>
    </div>
  );
};

export default UserCard;
