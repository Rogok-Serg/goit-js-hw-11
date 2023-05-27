import axios from "axios";
// import fetchData from './fetchData.js'
// import onCreateMarkupCard from "./markupCards.js";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more')
}

refs.form.addEventListener('submit', onRequestSubmit);
refs.loadMore.addEventListener('click', fetchCards);

const API_KEY = '36616176-e2fb394e56572b2a43cdc4409';
const API_URL = 'https://pixabay.com/api/';
let page = 0;
let searchQuery= ''

async function onFetchData(value, page = 1) {
  const { data } = await axios
    .get(`${API_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
    return data;
};

function onRequestSubmit(event) {
  event.preventDefault()
  const form = event.currentTarget
  const formValue = form.elements.searchQuery.value.trim();
  if (formValue === '') {
    refs.gallery.innerHTML = ''
    onHideButton()
    Notify.info("The input field is empty. Please enter a value to search for")
  } else { 
    searchQuery = formValue;
    page = 0;
    refs.gallery.innerHTML = ''
    fetchCards()
    form.reset();
    }
}

function fetchCards() {
  page += 1;
  onShowButton() 
  onDisableButton()
  getHitsMarkup().then(() => onEnableButton());
}

onHideButton();
function getHitsMarkup() {
  return onFetchData(searchQuery, page)
    .then((data) => {
      console.log(data.hits.length)
      if (data.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        onHideButton()
      } else if (data.totalHits === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        onHideButton()
      } else if (data.hits.length < 40) {
        onHideButton()
        Notify.info("We're sorry, but you've reached the end of search results.")
      }
      onCreateMarkupCard(data.hits)
      Notify.info(`Hooray! We found ${data.totalHits} images.`)
    })
    .catch(error => Notify.failure("Sorry, there are no images matching your search query. Please try again."));
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

function onCreateMarkupCard(data) {
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
</a>`, ''));
const lightbox = new SimpleLightbox('.gallery a', { 
        captionsData:'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
}