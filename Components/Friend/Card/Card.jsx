import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

//Internal imports
import Styles from "./Card.module.css";
import images from "../../../Assets";

const Card = ({ key, el, i,readMessage, readUser }) => {
    console.log(el)
    console.log(key)
  return (
    <Link
     href={{ pathname: "/", query:{name: `${el.name}`, address: `${el.pubkey}` }}}
     >
       <div
         className={Styles.Card}
         onclick={() => (readMessage(el.pubkey), readUser(el.pubkey))}
       >
         <div className={Styles.Card_box}>
           <div className={Styles.Card_box_left}>
             <Image
               src={images.account}
               alt="username"
               width={50}
               height={50}
               className={Styles.Card_box_left_img}
             />
           </div>
           <div className={Styles.Card_box_right}>
             <div className={Styles.Card_box_right_middle}>
             <h4>{el.name}</h4>
             <small>{el.pubkey.slice(21)}...</small>
         </div>
         <div classNme={Styles.Card_box_right_end}>
             <small>{i+1}</small>
         </div>
          </div>
        </div>
   </div>
 </Link>

  );
};

export default Card;
