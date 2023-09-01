import React, {useEffect} from "react";
import Spotify from 'spotify-web-api-js'
import axios from "axios";
import {ResponseType, useAuthRequest} from "expo-auth-session";
import {encode} from 'base-64';


const clientId = '71bdde9c0dce49d6ab3d7153a34d66e8'
const clientSecret = 'ec5dc65cec2846c5a5e33c10e70ea3c7'

let spotifyApi = new Spotify({
    clientId: '71bdde9c0dce49d6ab3d7153a34d66e8',
    clientSecret: 'ec5dc65cec2846c5a5e33c10e70ea3c7',
    redirectUri: 'exp://127.0.0.1:19000/'
});

function UseSpotifyApi(props) {

    getAccessToken(clientId, clientSecret)

    return spotifyApi;
}

function getAccessToken(clientId, clientSecret) {
    const client_id = clientId;
    const client_secret = clientSecret;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + encode(`${client_id}:${client_secret}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials'
    };

    axios(authOptions)
        .then(response => {
            if (response.status === 200) {
                const token = response.data.access_token;
                spotifyApi.setAccessToken(token)
                // Use the token for your further requests
            }
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
}

export default UseSpotifyApi;
