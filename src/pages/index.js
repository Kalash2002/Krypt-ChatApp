import React,{useEffect,useState,useContext} from 'react'

//internal import
import { ChatAppContent } from '../../Context/ChatAppContext'
import { Filter,Friend } from '../../Components/index'

const ChatApp = () => {
  // const {} = useContext(ChatAppContent);

  return (
    <div>
       <Filter/>
       <Friend/>
    </div>
  )
}

export default ChatApp;
