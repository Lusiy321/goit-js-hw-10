// Add imports above this line
import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
// Change code below this line
const liEl = document.querySelector('.gallery');

for (const gallery of galleryItems) {
  const imgEl = `<div class="gallery__item">
  <a class="gallery__link" href="${gallery.original}">
  <img src="${gallery.preview}" alt="${gallery.description}" class="gallery__image" >
  </a></div>`;
  liEl.insertAdjacentHTML('beforeend', imgEl);
}
new SimpleLightbox('.gallery__item a', {
  fadeSpeed: 250,
  captionsData: 'alt',
});
