import {useEffect, useState} from "react";
import axios from "axios";
import Spotify from 'spotify-web-api-js'
import {encode} from 'base-64';

const clientId = '71bdde9c0dce49d6ab3d7153a34d66e8'
const clientSecret = 'ec5dc65cec2846c5a5e33c10e70ea3c7'

let api

function UseSpotifyApi(props) {

  api = new Spotify({
    clientSecret,
    clientId
  })
  getAccessToken()

  return {api}
}

function getAccessToken() {

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + encode(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  }

  axios(authOptions)
    .then(response => {
      if (response.status === 200) {
        const token = response.data.access_token
        api.setAccessToken(token)
      }
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

export default UseSpotifyApi
