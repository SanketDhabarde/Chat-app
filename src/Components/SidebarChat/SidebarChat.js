import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import db from '../../firebase';
import { Link } from 'react-router-dom';
import { Image } from '@material-ui/icons';

function SidebarChat({id, name}) {
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

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h3>{name}</h3>
                    <p>{messages[0].message ? messages[0].message : <Image/>}</p>
                </div>
            </div>
        </Link>
        
    )
}

export default SidebarChat;
