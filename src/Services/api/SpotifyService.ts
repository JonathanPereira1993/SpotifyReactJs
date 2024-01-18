import axios from 'axios';
import { useState } from 'react';


export const getAuth = async () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SECRET_KEY;

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: clientId,
            password: clientSecret,
        }
    };

    const data = {
        grant_type: 'client_credentials',
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token', {
                params: {
                    grant_type: 'client_credentials'
                },
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                auth: {
                    username: clientId,
                    password: clientSecret
                }

            }
        )
        console.log(response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.log(error)
    }
}