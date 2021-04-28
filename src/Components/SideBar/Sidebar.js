import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SideBarChat from './SideBarChat/SideBarChat'
import DB from '../../firebase'
import { useStateValue } from '../../StateProvider';

function Sidebar() {

   const [rooms, setRooms] = useState([]);
   const [{user}, dispatch] = useStateValue()
   useEffect(()=> {
    const unsubsribe =  DB.collection('rooms').onSnapshot( snapshot => {
        setRooms(
           snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data : doc.data()
           }))
        )
     });

     return () => {
        unsubsribe();
     }

   }, [])


    return (
        <div className="sidebar">
             <div className="sidebar__header">
                <Avatar src={user ? user.photoURL : null}/>
                <div className="sidebar__headerRight">
                <IconButton>
                   <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                   <ChatBubbleOutlineIcon/>
                </IconButton>
                <IconButton>
                   <MoreVertIcon/>
                </IconButton>
                </div>
             </div>
             <div className="sidebar__search">
                 <div className="sidebar__searchContainer">
                   <IconButton>
                      <SearchIcon/>
                   </IconButton> 
                 </div>
                 <input type="text" placeholder="Search or Start a new chat"/>
             </div>
             <div className="sidebar__chats">
               <SideBarChat addNewChat/>
               {rooms.map(room => {
                  return <SideBarChat key={room.id} id={room.id} name={room.data.name} />
               })}
             </div>
        </div>
    )
}

export default Sidebar
