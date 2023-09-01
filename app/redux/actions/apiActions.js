import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiKeys} from "../api/apiKeys";
import {callApi} from "../../utils/api-helper";
import useSpotifyApi from "../../hooks/useSpotifyApi";


const {api} = useSpotifyApi()

export const callGetTrackById = createAsyncThunk(ApiKeys.GET_TRACK_BY_ID, async id => {
  await callApi(ApiKeys.GET_TRACK_BY_ID + id, () => api.getTrack(id))
})

export const callGetAlbumById = createAsyncThunk(ApiKeys.GET_ALBUM_BY_ID, async id => {
  await callApi(ApiKeys.GET_ALBUM_BY_ID + id, () => api.getAlbum(id))
})

export const callGetPlayListById = createAsyncThunk(ApiKeys.GET_PLAYLIST_BY_ID, async id => {
  await callApi(ApiKeys.GET_PLAYLIST_BY_ID + id, () => api.getPlaylist(id))
})