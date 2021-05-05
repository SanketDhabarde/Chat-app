import { Avatar, IconButton, Popover, Typography } from '@material-ui/core';
import { AttachFile, DoubleArrow, InsertEmoticon, Mic } from '@material-ui/icons';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from '../../firebase';
import firebase from 'firebase';
import { AuthContext } from '../../context/auth-context';
import { storage } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// speech recognition
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new speechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';


toast.configure();
function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [color, setColor] = useState(null);
    const bottomRef = useRef();
   

    const authContext = useContext(AuthContext);
    // to collect all the messages from db
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
    }, [roomId]);

    // to upload images in db
    useEffect(() => {
        if(file){
            const storageRef=storage.ref(file.name);

            storageRef.put(file).on('state_changed', (snap) => {
                let progress= (snap.bytesTransferred/snap.totalBytes)*100;
                setProgress(progress);
            }, (error) => {
                toast.error(error.message, {position: 'top-center'});
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const name= authContext.user.displayName;
                const timestamp = firebase.firestore.FieldValue.serverTimestamp();
                db.collection('rooms').doc(roomId).collection('messages').add({name, timestamp, url})
            })
        }
    }, [file, authContext.user])

    // for random avatars
    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    // to scroll automatic upto bottom
    useEffect(() => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [messages]);

    // convert audio to text
    useEffect(() =>{
        handleListen();
    },[isListening])

    const handleListen = () =>{
        if(isListening){
            mic.start();
            setColor({color: 'green'});
            mic.onend = () => {
                console.log("continue...");
                mic.start();
            }
        }else{
            mic.stop();
            mic.onend = () => {
                console.log("mic stopped");
                setColor(null);
            }
        }

        mic.onstart =() =>{
            console.log("mic on!!");
        }

        mic.onresult = (event) =>{
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            setInput(transcript);
            // console.log(transcript);
            mic.onerror = (e) =>{
                console.log(e.error);
            }
        }

    }

    
    const sendMessage = (event) => {
        event.preventDefault();
        
        // add message to db
        if(input.length > 0){
            db.collection('rooms').doc(roomId).collection('messages').add({
                name: authContext.user.displayName,
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }else{
            toast.error("please enter valid message", {position: 'top-center'});
        }
       

        setInput('');
    }

    const types = [ 'image/jpeg', 'image/png'];

    const imageUploadHandler = (event) => {
        const selected = event.target.files[0];

        if(selected && types.includes(selected.type)){
            setFile(selected);
        }else{
            setFile(null);
            toast.error("please select file of type jpeg/png", {position: 'top-center'});
        }
    }
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const emojis = ["😃", "😆", "😅", "🤣", "😂", "🙂", "😍", "😘", "😡", "😢", "😭", "🥱", "😫", "😱", "🥳", "😴", "🥴", "😷",
                    "🤤", "😒", "🤩", "😜", "😋"];

    const emojiHandler = (emoji) => {
        setInput(prevInput => (
            prevInput + emoji
        ));
        handleClose();
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                
            </div>

            <div className="chat__body">
                    {messages.map(message => !message.url ? (
                    
                    <p key={message.timestamp} className={`chat_message ${ message.name === authContext.user.displayName && "chat__receiver"}`}>
                            <span className="chat__username">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                    </p>

                    ) : (
                        <div key={message.timestamp} className={`chat_Img ${ message.name === authContext.user.displayName && "chat__receiverImg"}`}>
                            <span className="chat__usernameImg">{message.name}</span>
                            <img className="chat__image" src={message.url} alt=""></img>
                            <p className="chat__timestampImg">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                            </p>
                        </div>   
                    ))}  
                    <div ref={bottomRef}></div>  
            </div>

            <div className="chat__footer">
                <div>
                    <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                        <InsertEmoticon/>
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography className="chat__emojis">
                            {emojis.map(emoji => (
                                <span className="chat__emoji" key={emoji} onClick={() => emojiHandler(emoji)}>{emoji}</span>
                            ))}
                        </Typography>
                    </Popover>
                </div>
                <label>
                    <input type="file" onChange={imageUploadHandler}/>
                    <span>
                        <AttachFile/>
                    </span>
                </label>
                
                <form>
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="write a message"/>
                    <IconButton type="submit" onClick={sendMessage}>
                        <DoubleArrow/>
                    </IconButton>
                </form>
                <IconButton onClick={() => setIsListening(prevState => !prevState)}>
                    <Mic style={color}/>
                </IconButton>
                
            </div>

            
        </div>
    )
}

export default Chat;
