import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
let galleryInstance;

galleryEl.innerHTML = createGalleryMarkup();
galleryEl.addEventListener('click', onGalleryItemClick);

function createGalleryMarkup() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
    `;
    })
    .join('');
}

function onGalleryItemClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  let bigImgUrl = e.target.dataset.source;

  showLightbox(bigImgUrl);
}

function showLightbox(bigImgUrl) {
  galleryInstance = basicLightbox.create(`<img width="1280" height="855" src="${bigImgUrl}">`, {
    onShow: () => {
      registerEscBtnListener();
    },
    onClose: () => {
      removeEscBtnListener();
    },
  });

  galleryInstance.show();
}

function registerEscBtnListener() {
  window.addEventListener('keydown', onKeyDown);
}

function removeEscBtnListener() {
  window.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  if (e.code !== 'Escape') {
    return;
  }

  if (typeof galleryInstance.close === 'function') {
    galleryInstance.close();
  }
}
