// export default function onCreateMarkupCard(data) {
//   // refs.gallery.innerHTML = '';
//   refs.gallery.innerHTML = data.reduce((card, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//     card + `<a class="gallery__link"href="${largeImageURL}">
//   <div class="photo-card">
//   <img class= "gallery__image"src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>${views}</b>
//     </p>
//     <p class="info-item">
//       <b>${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>${downloads}</b>
//     </p>
//   </div>
// </div>
// </a>`, '')  
// const lightbox = new SimpleLightbox('.gallery a', { 
//         /* options */ 
//         captionsData:'alt',
//         captionPosition: 'bottom',
//         captionDelay: 250,
//     });
// }