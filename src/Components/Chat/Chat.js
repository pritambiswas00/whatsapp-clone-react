import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodRoundedIcon from '@material-ui/icons/MoodRounded';
import MicNoneRoundedIcon from '@material-ui/icons/MicNoneRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useParams } from 'react-router-dom'
import './Chat.css'
import DB from '../../firebase'
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';

function Chat() {
    const [seed, setSeed] =  useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

   //  useEffect(() => {
   //    setSeed(Math.floor(Math.random() * 5000));

   //  }, [roomId]) 

    useEffect( () => {
        if(roomId){
       DB.collection('rooms').doc(roomId).onSnapshot(snap => {
          setRoomName(snap.data().name);
          setSeed(snap.data().seed)
       })
   
        DB.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot((snapShot ) => setMessages(snapShot.docs.map((doc) => doc.data())))

        }  
    }, [roomId,seed])

    const sendMessage = (e) => {
       e.preventDefault();
       console.log(input);
       DB.collection('rooms').doc(roomId).collection('messages').add({
          message : input,
          name: user.displayName,
          timestamp : firebase.firestore.FieldValue.serverTimestamp()
       })
       setInput("");
    }
    return (
        <div className="chat">
           <div className="chat__header">
              <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
              <div className="chat__headerInfo">
              
                 <h3>{roomName}</h3>
                 <p>Last seen{" "}
                 {new Date(messages[messages.length-1] ?.timestamp ?.toDate()).toUTCString()}
                 </p>     
              </div>
              <div className="chat__headerRight">
                 <IconButton>
                    <SearchOutlinedIcon/>
                 </IconButton>
                 <IconButton>
                    <AttachFileSharpIcon/>
                 </IconButton>
                 <IconButton>
                     <MoreVertIcon/>
                  </IconButton>
              </div>
           </div>
           <div className="chat__body">
           {messages.map((message) => (
            <p key={message.name}className={`chat__messages ${message.name === user.displayName && "chat__recieve"}`}>
            {message.message}
            <span className="chat__roomName">
             {message.name}
            </span>
            <span className="chat__timeStamp">
             {new Date(message.timestamp?.toDate()).toUTCString
            ()}
            </span>
             </p>
           )) }

           </div>
           <div className="chat__footer">
             <IconButton>
                <MoodRoundedIcon/>
             </IconButton>
              <form onSubmit={sendMessage}>
               
                 <input className="Input" type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)}/>
                 <IconButton type="submit" value="Submit"><SendRoundedIcon/></IconButton>
              </form>
            <IconButton>
               <MicNoneRoundedIcon/>
            </IconButton>
           </div> 
        </div>
    )
}

export default Chat

