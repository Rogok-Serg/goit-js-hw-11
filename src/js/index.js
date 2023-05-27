import axios from "axios";
// import fetchData from './fetchData.js'
// import onCreateMarkupCard from "./markupCards.js";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchData } from './fetchData'

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more')
}
// const API_KEY = '36616176-e2fb394e56572b2a43cdc4409'
// const API_URL = 'https://pixabay.com/api/'
// const page = 1
refs.form.addEventListener('submit', onRequestSubmit);
refs.loadMore.addEventListener('click', fetchCards);

const API_KEY = '36616176-e2fb394e56572b2a43cdc4409';
const API_URL = 'https://pixabay.com/api/';
let page = 0;
let searchQuery= ''

async function onFetchData(value, page = 1) {
  const { data } = await axios
    .get(`${API_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    // .then(({ data }) => {
    // incrementPage();
    return data.hits;
  // })
  // .catch(error => console.log(error));
};
function onRequestSubmit(event) {
  event.preventDefault()
  const form = event.currentTarget
  const formValue = form.elements.searchQuery.value.trim();
  if (formValue === '') {
    refs.gallery.innerHTML = ''
    Notify.info("The input field is empty. Please enter a value to search for")
  } else { 
    searchQuery = formValue;
    page = 1;
    refs.gallery.innerHTML = ''
     
    fetchCards()
      .finally(() => form.reset());
    }
    console.log(formValue)  

  // event.target.searchQuery.value
  // event.currentTarget.elements.searchQuery.value
}
// function incrementPage() {
//   page + 1
// }
// function resetPage() {
//   page = 1
// };
function fetchCards() {
  page += 1;
  onShowButton() 
  onDisableButton()
  return getHitsMarkup().then(() => onEnableButton());

    // .finally(() => formValue.reset());
}

onHideButton();
function getHitsMarkup() {
  return onFetchData(searchQuery, page)
    .then(data => {
      if (data.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      }
      onCreateMarkupCard(data)
      
    })
    .catch(error => Notify.failure("Sorry, there are no images matching your search query. Please try again."))  
}


function onHideButton() {
  refs.loadMore.classList.add("hidden")
}

function onShowButton() {
  refs.loadMore.classList.remove("hidden")
}

function onDisableButton() {
  refs.loadMore.disabled = true;
  refs.loadMore.textContent = "Loading..."
  refs.loadMore.classList.add("disabled")
}

function onEnableButton() {
  refs.loadMore.disabled = false;
  refs.loadMore.textContent = "Load more"
  refs.loadMore.classList.remove("disabled")
}

// async function onFetchData(type) {
//   const {data} = await axios
//   .get(`${API_URL}?key=${API_KEY}&q=${type}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//     // .then(({ data }) => {
//   incrementPage();
//   console.log(data.hits);
//       return data.hits;
//   // })
//   // .catch(error => console.log(error));
// };


// function incrementPage() {
//   page + 1
// }
// function resetPage() {
//   page = 1
// }

// function onFetchData(type) {
//   return fetch(`${API_URL}?key=${API_KEY}&q=${type}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return (response.json());
//     })
// }

function onCreateMarkupCard(data) {
  // refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', data.reduce((card, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    card + `<a class="gallery__link card-link"href="${largeImageURL}">
  <div class="photo-card  overlay-card">
  <img class= "gallery__image"src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info overlay">
    <p class="info-item">
      <b>Likes: 
      ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: 
      ${views}</b> 
    </p>
    <p class="info-item">
      <b>Comments: 
      ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: 
      ${downloads}</b>
    </p>
  </div>
</div>
</a>`, ''))
const lightbox = new SimpleLightbox('.gallery a', { 
        /* options */ 
        captionsData:'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
}