import React, { useEffect, useState } from 'react'
import {Avatar} from '@material-ui/core'
import './SideBarChat.css'
import DB from '../../../firebase';
import { Link } from 'react-router-dom'

function SideBarChat({addNewChat,name, id}) {
      
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("")

    useEffect(()=>{
      setSeed(Math.floor(Math.random() * 5000))   
    }, [])
    useEffect(() => {
         if(id){
             DB.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc')
             .onSnapshot(snapshot => 
                 setMessages(snapshot.docs.map((doc) => doc.data()))
             );
         }
    },[id])

    const createChat = () => {
        const roomName= prompt('Please enter room name for chat');
        if(roomName){
         ///do some database shit over here.
          DB.collection('rooms').add({
              name : roomName,
              seed: seed
          })
        }
    }


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChats">
           <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
           <div className="sidebarChats__info">
              <h2>{name}</h2>
              <p>{messages[0]?.message}</p>
           </div>
        </div>
        </Link>

    ) : (
    
        <div className="sidebarChats" onClick={createChat}>
           <h2>Add new chat</h2>
        </div>

    )
}

export default SideBarChat
