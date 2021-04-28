import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, DoubleArrow, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Chat.css';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        console.log("you typed ==>", input);
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>last seen ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p className={`chat_message ${ true && "chat__receiver"}`}>
                    <span className="chat__username">Sanket Dhabarde</span>
                    hey guys
                    <span className="chat__timestamp">6:23</span>
                </p>
                
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="write a message"/>
                    <IconButton type="submit" onClick={sendMessage}>
                        <DoubleArrow/>
                    </IconButton>
                </form>
                <Mic/>
            </div>

            
        </div>
    )
}

export default Chat;
