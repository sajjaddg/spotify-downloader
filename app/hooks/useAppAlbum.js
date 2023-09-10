import {useMemo} from "react";

function UseAppAlbum(album) {
  const {
    images,
    name,
    artists,
    total_tracks,
    tracks,
    onPressItem,
    id,
    link
  } = album ?? {}
  // console.log(JSON.stringify(album))

  const image = useMemo(() => images ? images[0]?.url : '', [images])
  const nameArtists = useMemo(() => artists?.map(it => it.name).join(', '), [artists])
  const numberOfSongs = useMemo(() => total_tracks < 2 ? `${total_tracks} song` : `${total_tracks} songs`, [total_tracks])
  const items = useMemo(() => tracks ? tracks.items.map(it => ({...it, images, onPressItem})) :
      [{
        artists,
        images,
        onPressItem,
        name,
        id: link
      }]
    , [artists, images, name, onPressItem, id,link])

  return {
    image,
    name,
    nameArtists,
    numberOfSongs,
    items,
    onPressItem,
    id
  }


}

export default UseAppAlbum