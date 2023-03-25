import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//internal imports
import Styles from "./Navbar.module.css";
import { ChatAppContent } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import image from "../../Assets";

const Navbar = () => {
  const menuItems = [
    { menu: "All Users", link: "/alluser" },
    { menu: "Chat", link: "/" },
    { menu: "Setting", link: "/" },
    { menu: "Contact", link: "/" },
    { menu: "FAQ's", link: "/" },
    { menu: "Terms of use", link: "/" },
  ];

  //Usestates
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error, testing } =
    useContext(ChatAppContent);

  return (
    <div className={Styles.Navbar}>
      <div className={Styles.Navbar_box}>
        <div className={Styles.Navbar_box_left}>
          <Image src={image.logo} alt="logo" width={150} height={30} />
        </div>
        <div className={Styles.Navbar_box_right}>
          {/* Desktop  */}
          <div className={Styles.Navbar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Styles.Navbar_box_right_menu_items} ${
                  active == i + 1 ? Styles.active_btn : ""
                }`}
              >
                <Link
                  className={Styles.Navbar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>

          {/* for mobile devices */}
          {open && (
            <div className={Styles.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Styles.mobile_menu_items} ${
                    active == i + 1 ? Styles.active_btn : ""
                  }`}
                >
                  <Link
                    className={Styles.mobile_menu_items_link}
                    href={el.link}
                  >
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Styles.mobile_menu_btn}>
                <Image
                  src={image.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* Connect wallet component */}
          <div className={Styles.Navbar_box_right_connect}>
            {account == "" ? (
              <button
                onClick={() => {
                  let res = connectWallet();
                  console.log("fdf", res);
                }}
              >
                {""}
                <span> Connect Wallet</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  console.log("teri ma ki chut");
                  const res2 = testing();
                  console.log(res2);
                }}
              >
                {""}
                <Image
                  src={userName ? image.username : image.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                <small>{userName || "Create account"}</small>
              </button>
            )}
          </div>

          <div
            className={Styles.Navbar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={image.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* Model Compoment */}
      {openModel && (
        <div className={Styles.modelBox}>
          <Model
            openBox={setOpenModel}
            title="Welcome To"
            head="Chat Buddy"
            info="Random long messagepara"
            smallInfo="Kindley select your name"
            image={image.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}

      {error !== null ? <Error error={error} /> : null}
    </div>
  );
};

export default Navbar;
