import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChatAppABI } from "./Constants";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
//Internal import
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";
export const ChatAppContent = React.createContext();

export const ChatAppProvider = ({ children }) => {
  //UseState
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendmsg, setFriendmsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState(null);

  //Chat user data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  //Fetch data time of page load

  useEffect(() => {
    fetchData();
    console.log(userLists);
  }, []);

  const fetchData = async () => {
    try {
      console.log("in try");
      //get contract
      // const contract = await connectingWithContract();
      //get account address
      const connectAccountt = await connectWallet();
      setAccount(connectAccountt);
      setCurrentUserAddress(connectAccountt);
      console.log("wallet connected", connectAccountt);
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      console.log(signer);
      console.log("dfdfdf", provider);

      const contract = new ethers.Contract(
        "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
        ChatAppABI,
        signer
      );
      console.log("4");
      console.log("completed connection");
      const check = await contract.test();
      console.log(check);

      const userNamee = await contract.getUsername(connectAccountt);
      setUserName(userNamee);
      setCurrentUserName(userNamee);
      console.log(userNamee);


      //Get friend list

      const friendListss = await contract.geyMyFreind();
      setFriendLists(friendListss);
      console.log("getting friend", friendListss);

      // // //get all app users
      const userListt = await contract.getAllAppUsers();
      setUserLists(userListt);
      console.log("userlist", userListt);



      //use effect when someone reload the page
    } catch (error) {
      // console.log(error);
      // setError(error);
    }
  };

  //function to read message
  const readMessage = async (friendaddress) => {
    try {
       console.log("in reading message")
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
        ChatAppABI,
        signer
      );

      console.log("completed connection");
      const check = await contract.test();
      console.log(check);

      const read = await contract.readMessage(friendaddress);
      setFriendmsg(read);
      console.log("succesfuuly getting messages");
    } catch (error) {
      // setError("Currently no messages");
    }
  };

  //create account
  const createAccount = async ({ name, accountAddress }) => {
    console.log("in Create account fn");
    try {
      // if (name || account) return setError("Name and account, cant be empty");
      console.log("in create account");
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
        ChatAppABI,
        signer
      );

      console.log("completed connection");
      const check = await contract.test();
      console.log(check);

      const getCreatedUser = await contract.createAccount(name.toString());
      console.log("user created");
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      // setError("Error while creating your account please reload");
    }
  };

  //Add your friend
  const addFriends = async (name, accountAddress) => {
    try {
      // if (name || accountAddress)
      //   return setError("Please provide name and address of friend");
      console.log("In addfriend");
      console.log(name, accountAddress);
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(
        "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
        ChatAppABI,
        signer
      );

      console.log("completed connection");
      console.log(contract);
      const check = await contract.test();
      console.log(check);
      const addmyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      console.log("Freind added");
      await addmyFriend.wait();
      setLoading(false);
      //after adding friend land on home page
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Error while adding your friend");
    }
  };

  //send Message to your friend
  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("Please type your message");
      console.log("In send message function")
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(
        "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
        ChatAppABI,
        signer
      );

      console.log("completed connection");
      console.log(contract);
      const check = await contract.test();
      console.log(check);
      console.log("This is sendMessage",address,msg);
      const addMessage = await contract.sendMessage(address, msg.toString());
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
      console.log("message sent");

    } catch (error) {
      // setError("Please reload and try agian");
    }
  };

  //Read user info
  const userInfo = async (userAddress) => {
    console.log("in chatAppContext userinfo")
    const web3modal = new Web3Modal();
      const connection = await web3modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
        ChatAppABI,
        provider
      );

      console.log("completed connection");
      const check = await contract.test();
      console.log(check);
    const userName = await contract.getUsername(userAddress);

    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  const testing = async (useraaddress) => {
    console.log("In addfriend");
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(
      "0x0E71261245A3399F11fB49f8aa94D22d0c29B21D",
      ChatAppABI,
      signer
    );

    console.log("completed connection");
    console.log(contract);
    const check = await contract.test();
    console.log("fsdfdfde", check);
    const chect = await contract.geyMyFreind();
    console.log("ffee", chect);
  };

  return (
    <ChatAppContent.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        userInfo,
        connectWallet,
        CheckIfWalletConnected,
        testing,
        account,
        userName,
        friendLists,
        friendmsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContent.Provider>
  );
};
