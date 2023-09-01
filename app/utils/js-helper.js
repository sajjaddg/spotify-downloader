export const extractSpotifyInfo = (url) => {
  const urlRegex = /^(https?:\/\/)?open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)(?:\?.*)?$/
  const match = url.match(urlRegex)

  if (match) {
    const [, , type, id] = match
    return {type, id}
  }

  return null
}