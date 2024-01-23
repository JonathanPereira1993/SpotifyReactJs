import axios from 'axios';

import { TReturnSearchCall, TSearchCall } from './types';

import { tokenContext } from '../context/tokenContext';
import { useContext, useState } from 'react';

export const getAuth = async () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SECRET_KEY;

    const { token, setToken } = useContext(tokenContext)

    axios('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
    })
    .then(tokenResponse => {
        setToken(tokenResponse.data.access_token);
        console.log(token)
        // window.localStorage.setItem('token', tokenResponse.data.access_token)
        return tokenResponse.data.access_token;
    })
    
}

export const searchCall = async (params: TSearchCall):Promise<TReturnSearchCall> => {
    let response;
    let err;

    console.log(window.localStorage.getItem('token'))
    try {
        const { data } = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
            params
        })
         response = data;
    
    } catch(error) {
        err = error;
    } finally {
        return {response, err};
    }
}