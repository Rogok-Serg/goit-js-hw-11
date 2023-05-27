// https://pixabay.com/api/?key=36616176-e2fb394e56572b2a43cdc4409&q=cat&image_type=photo&orientation=horizontal&safesearch=true
import axios from "axios";
// const API_KEY = '36616176-e2fb394e56572b2a43cdc4409'
// const API_URL = 'https://pixabay.com/api/'
// const page = 1

// export default function fetchData(type) {
//   return fetch(`${API_URL}?key=${API_KEY}&q=${type}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//   .then(data => console.log(data.json()))
// }
// fetchData("yellow")
const API_KEY = '36616176-e2fb394e56572b2a43cdc4409';
const API_URL = 'https://pixabay.com/api/';

export default class FetchData {
  constructor() {
    this.page = 0;
    this.searchQuery = '';
}

  async onFetchData() {
  const data = await axios
    .get(`${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
    .then(({ data }) => {
      //  if (!hits.ok) {
      //   throw new Error(hits.statusText);
      // }
    this.incrementPage();
    console.log(data.hits);
  })
  // .catch(error => console.log(error));
  };
  incrementPage() {
  this.page += 1
  };
  resetPage() {
  this.page = 1
  };
}

// function incrementPage() {
//   page + 1
// }
// function resetPage() {
//   page = 1
// };

// export default { onFetchData, incrementPage, resetPage };