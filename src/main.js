'use strict';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const ul = document.querySelector('.images-list');
const divGallery = document.querySelector('.gallery');

// Створення нового елементу для завантажувача
const loaderElement = document.createElement('span');
loaderElement.className = 'loader is-hidden';

// Додавання завантажувача до списку
divGallery.append(loaderElement);

const loaderClass = document.querySelector('.loader');

const BASE_URL = new URL('https://pixabay.com/api/');
const KEY = '41487030-c0d4f2e8fae3a5e9414bad560';

// Ініціалізація SimpleLightbox один раз поза обробником подій
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

form.addEventListener('submit', listener => {
  listener.preventDefault();
  // Переключення видимості завантажувача
  loaderClass.classList.remove('is-hidden');

  const query = listener.currentTarget.elements.query.value;

  BASE_URL.searchParams.append('key', KEY);
  BASE_URL.searchParams.append('q', query);
  BASE_URL.searchParams.append('image_type', 'photo');
  BASE_URL.searchParams.append('orientation', 'horizontal');
  BASE_URL.searchParams.append('safesearch', 'true');

  fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      // Очищення параметрів запиту
      BASE_URL.searchParams.delete('key');
      BASE_URL.searchParams.delete('q');
      BASE_URL.searchParams.delete('image_type');
      BASE_URL.searchParams.delete('orientation');
      BASE_URL.searchParams.delete('safesearch');
      //
      return response.json();
    })
    .then(images => {
      input.value = '';
      // Приховання завантажувача після отримання результатів
      loaderClass.classList.add('is-hidden');
      if (images.hits.length === 0) {
        throw new Error(error);
      }
      ul.innerHTML = images.hits.reduce(
        (html, img) =>
          html +
          `
          <li class="images-item">
            <a class="images-link" href="${img.largeImageURL}"><img class="images" data-source="${img.largeImageURL}" alt="${img.tags}" src="${img.webformatURL}" width="360" height="200"></a>
            <div class="description">
            <div>
            <p><b>Likes</b></p>
            <p>${img.likes}</p>
            </div>
            <div>
            <p><b>Views</b></p>
            <p>${img.views}</p>
            </div>
            <div>
            <p><b>Comments</b></p>
            <p>${img.comments}</p>
            </div>
           <div>
           <p><b>Downloads</b></p>
           <p>${img.downloads}</p>
           </div>
            </div>
          </li>
            `,
        ''
      );
      // Виклик методу для оновлення галереї
      lightbox.refresh();
    })
    .catch(error => {
      ul.innerHTML = '';
      input.value = '';

      error = iziToast.show({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        color: '#B51B1B',
        iconUrl: './bi_x-octagon.svg',
        iconColor: '#FAFAFB',
        position: 'topRight',
      });
    });
});
