import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useEffect, useState, useContext, useRef } from 'react';
import SidebarChat from '../SidebarChat/SidebarChat';
import './Sidebar.css';
import db from '../../firebase';
import { AuthContext} from '../../context/auth-context';

function Sidebar() {
    const authContext = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [enteredFilter, setEnteredFilter] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([]);

    const inputRef = useRef();

    useEffect(()=> {
       const unsubscribe= db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
       const timer = setTimeout(() => {
            if(enteredFilter === inputRef.current.value){
                db.collection('rooms').where("name", "==", enteredFilter).onSnapshot(snapshot => {
                    setFilteredRooms(snapshot.docs.map(doc => ({
                        id:doc.id,
                        data: doc.data()
                    })))
                });
            }  
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
        
    }, [enteredFilter, inputRef])


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={authContext.user && authContext.user.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>    
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <input 
                        ref={inputRef}
                        placeholder="search chat room" 
                        type="text" 
                        value={enteredFilter} 
                        onChange={event => setEnteredFilter(event.target.value)}/>
                </div>  
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNew/>
                { !enteredFilter ?
                    rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    )) :
                    filteredRooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar;
