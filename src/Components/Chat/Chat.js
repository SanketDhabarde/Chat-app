import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, DoubleArrow, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from '../../firebase';
import firebase from 'firebase';
import { AuthContext } from '../../context/auth-context';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    
    const [roomName, setRoomName] = useState('');

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if(roomId){
            // pull the name from db based on room id
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            // pull the messages from db to specific roomId
            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ));
        }
    }, [roomId])


    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        
        // add message to db
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: authContext.user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('');
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
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
                {messages.map(message => (
                    <p className={`chat_message ${ message.name === authContext.user.displayName && "chat__receiver"}`}>
                        <span className="chat__username">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                           {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
                
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
