import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import db from '../../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNew}) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    useEffect(()=> {
        if(id){
            db.collection('rooms')
                .doc(id).collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                });
        }
    }, [id])

    const addNewChat = () => {
        const roomName = prompt("Add a room Name");

        // add into database
        db.collection('rooms').add({
            name: roomName,
        });
    }

    return !addNew ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
        
    ): (
        <div className="sidebarChat" onClick={addNewChat}>
            <h2>Add new chat room</h2>
        </div>
    )
}

export default SidebarChat;
