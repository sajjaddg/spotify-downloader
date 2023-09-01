import {ApiKeys} from "./apiKeys";

export const selectApi = id => state => state.api?.[id]

export const selectApiGetTrackById = id => state => selectApi(ApiKeys.GET_TRACK_BY_ID + id)(state)
export const selectApiGetAlbumById = id => state => selectApi(ApiKeys.GET_ALBUM_BY_ID + id)(state)
export const selectApiGetPlayListId = id => state => selectApi(ApiKeys.GET_PLAYLIST_BY_ID + id)(state)