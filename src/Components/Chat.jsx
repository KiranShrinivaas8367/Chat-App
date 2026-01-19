import React, {useEffect, useState} from 'react'
import { db, auth } from '../firebase-config'
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'; //onSnapshot will allow us to listen the changesimport { timestampAdd } from 'firebase/firestore/pipelines';
import '../Components/Chat.css'

//Cookie declaration
const cookies = new Cookies();

export default function Chat({room, setIsAuth, user}) {

  const [newMsg, setNewMsg] = useState("");
  const msgRef = collection(db,"messages");  
  const [msgs, setMsgs] = useState([]);
  
  //For retreiving and displaying data from database, firebase will be listening changes via onSnapshot, 
  // snapshot will be listening changes via query.
  useEffect(()=>{
    const queryMsgs = query(msgRef, 
        where("room", "==", room),
        orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMsgs, (snapshot) => {
        // console.log(snapshot)
        let messages = [];
        snapshot.forEach((doc) => {
            messages.push({...doc.data(), 
                id:doc.id})
        })
        setMsgs(messages);    
    })
    return () => unsubscribe();//if the useEffect is not cleaned up  we will have performance issue.
  },[])

  //Form handled when submitted
  const handleSubmit = async(e) => {
    try{
        e.preventDefault();
        console.log(newMsg)
        if(!newMsg)
            return;
        await addDoc(msgRef, {
            text: newMsg,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
    });
    setNewMsg("");
    }
    catch(error){
        console.log(error);
    }
  }   

  //Sign-out function
  async function signUserOut(){
      await signOut(auth);
      cookies.remove("auth-token")
      cookies.remove("auth-name")
      setIsAuth(false);
      setRoom(null);
    }

  return (
    <div className='chat-app'>        
        <div className="chat-header">You are in <b>{room}</b> {user}</div>

        <div className="messages-display">
            <div className='messages'>
                {msgs.map((msg) => 
                    <div className='message' key={msg.id}>
                        <span className='user'>{msg.user}</span>
                        <span className='text'>{msg.text}</span>
                    </div>
                )}
            </div>

            <form className='new-msg-form' onSubmit={handleSubmit}>
                <input 
                className='new-msg-input' 
                placeholder='Type your message..' 
                onChange={(e) => setNewMsg(e.target.value)}
                value={newMsg}/>
                <button type='submit' className='send-btn'>Send</button>
            </form>
        </div>

        <div className='sign-out'>
            <button className='room-btn' onClick={signUserOut}>Sign Out</button>  
        </div>
    </div>
  )
}
