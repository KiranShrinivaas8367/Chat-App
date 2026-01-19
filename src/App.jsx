import { useState, useRef } from 'react'
import Auth from './Components/Auth'
import Cookies from 'universal-cookie'
import Chat from './Components/Chat'
import { auth } from './firebase-config'
import { signOut } from 'firebase/auth'

import './App.css'

const cookies = new Cookies();

export default function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const roomInputRef = useRef(null);

  //Handling Input e.key === 'Enter'
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }
  
  const handleKeyDown = (e) => {
    if(e.key === 'Enter')
      setRoom(inputValue);
  }

  //Sign-out
  async function signUserOut(){
    await signOut(auth);
    cookies.remove("auth-token")
    setIsAuth(false);
    setRoom(null);
  }

  //User name retreived from cookie
  let userName = cookies.get("auth-name");

  if(!isAuth){
    return(
      <>
        <Auth setIsAuth={setIsAuth}/>
      </>
    )
  }

  return(
    <>
      
      {room ? (
      <Chat room={room} setIsAuth={setIsAuth} user={userName}/>
    ):(
      <div className="room-container">
        <h2 className='room-header'>Welcome {userName}</h2>
        <div className='room-content'>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown}
          placeholder='Enter Room Name'/>
          <button className='room-btn' onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>  
        </div>
          <div className='sign-out'>
            <button className='room-btn' onClick={signUserOut}>Sign Out</button>  
          </div>
        </div>
    )}
    </> 
  )
  // return (
  //   <Auth />
  // )
  
}

