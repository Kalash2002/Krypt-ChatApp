// deploying and initialiazing blockchains first node wee need to do this in Constants.js
//this file from artifact/contract/ChatApp.json(or we can say contracts json ) is now tranfered to context file
import chatAppJSON from "./ChatApp.json";
//address of 0th block :  0x0E71261245A3399F11fB49f8aa94D22d0c29B21D

export const ChatAppAddress = " 0x0E71261245A3399F11fB49f8aa94D22d0c29B21D";
export const ChatAppABI = chatAppJSON.abi;
