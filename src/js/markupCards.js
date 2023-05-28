// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import onFetchData from './API.js'

function onCreateMarkupCard(data) {
  return refs.gallery.insertAdjacentHTML('beforeend', data.reduce((card, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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
 lightbox()
}
function lightbox() {
  new SimpleLightbox('.gallery a', { 
          captionsData:'alt',
          captionPosition: 'bottom',
          captionDelay: 250,
          animationSpeed: 250,
  }).refresh()
}
// export default onCreateMarkupCard
