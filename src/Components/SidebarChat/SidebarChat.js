import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';

function SidebarChat({id, name}) {
    const [seed, setSeed] = useState('');

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    return (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h3>{name}</h3>
                <p>last message</p>
            </div>
        </div>
    )
}

export default SidebarChat;
