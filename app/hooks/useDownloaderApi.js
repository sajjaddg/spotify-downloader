import axios from "axios";

const headers = {
  'X-RapidAPI-Key': '69fc79bdccmsh68f3c1d7910e199p1fcda6jsn4da8d713edcc',
  'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
}

function UseDownloaderApi() {
  return axios.create({headers})

}

export default UseDownloaderApi