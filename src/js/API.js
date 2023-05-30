import axios from "axios";

const API_KEY = '36616176-e2fb394e56572b2a43cdc4409';
const API_URL = 'https://pixabay.com/api/';
let page = 0;
let searchQuery= ''

export default async function onFetchData(searchQuery, page = 1) {
  const { data } = await axios
    .get(`${API_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    return data;
};