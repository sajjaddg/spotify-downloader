import {useMemo} from "react";

function UseAppAlbum(album) {
  const {
    images,
    name,
    artists,
    total_tracks,
    tracks
  } = album ?? {}

  const image = useMemo(() => images ? images[0]?.url : '', [images])
  const nameArtists = useMemo(() => artists?.map(it => it.name).join(', '), [artists])
  const numberOfSongs = useMemo(() => total_tracks < 2 ? `${total_tracks} song` : `${total_tracks} songs`, [total_tracks])
  const items = useMemo(() => tracks?.items.map(it=>({...it,images})) ?? [], [tracks])

  return {
    image,
    name,
    nameArtists,
    numberOfSongs,
    items
  }


}

export default UseAppAlbum