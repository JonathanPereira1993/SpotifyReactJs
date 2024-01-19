import { useState } from "react";
import { getAuth } from "../Services/api/SpotifyService";

const LoginPage = () => {
    const [token, setToken] = useState();

    const getTokenFromlLocalStorage = () => {
        getAuth()
        let localStorageValue = window.localStorage.getItem('token');
        if(localStorageValue != '') {
          setToken(localStorageValue)
        }
      }
  return (
    <div>
        <h2>Please, LogIn</h2>
      <button onClick={getTokenFromlLocalStorage}>Retreive TOKEN</button>
    </div>
  )
}

export default LoginPage