'use strict';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// Підключення завантажувача
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '41487030-c0d4f2e8fae3a5e9414bad560',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

const form = document.querySelector('.search-form');
const ul = document.querySelector('.images-list');
const loadMoreBtn = document.querySelector('.load_more_btn');
const input = document.querySelector('.search-input');
// Ініціалізація SimpleLightbox один раз поза обробником подій
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

// Створення нового елементу для завантажувача
const loaderElement = document.createElement('span');
loaderElement.className = 'loader is-hidden';

// Додавання завантажувача до списку
divGallery.append(loaderElement);
const loaderClass = document.querySelector('.loader');

// Функція виведення зображення на сторінку
function renderImages(images = []) {
  const insertImages = images.reduce(
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
  ul.insertAdjacentHTML('beforeend', insertImages);
  // Виклик методу для оновлення галереї
  lightbox.refresh();
}

// Виклик повідомлення з помилкою
function errorAlert() {
  iziToast.show({
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
}

// ============= Пагінація ============ //

// Функція створення запиту
const getImages = async params => {
  try {
    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    errorAlert();
  }
};

// Функція для створення параметрів запиту
const createGetImagesRequest = q => {
  let page = 1;
  let isLastPage = false;
  const per_page = 3; // ! TO DO 40

  return async () => {
    try {
      // Виходимо, якщо остання сторінка
      if (isLastPage) return [];
      // Робимо запит на першу сторінку
      const { hits, totalHits } = await getImages({ page, per_page, q });

      // Перевіряємо на наявність зображень згідно запиту
      if (hits.length === 0) {
        throw new Error();
      }

      // Вираховуємо останню сторінку
      if (page >= Math.ceil(totalHits / per_page)) {
        isLastPage = true;
        //! Приховуємо кнопку Load More
        loadMoreBtn.classList.add('is-hidden');
      }
      // Додаємо сторінки для Load More
      page++;
      // Повертаємо додану сторінку
      return hits;
    } catch (error) {
      errorAlert();
    }
  };
};

// ============= /Пагінація ============ //

// Для замикання функції виведення зображень
let doFetch = null;

form.addEventListener('submit', async event => {
  event.preventDefault();

  // Видаляємо слухача Load More, якщо він вже викликався до нового пошуку
  if (doFetch != null) {
    loadMoreBtn.removeEventListener('click', doFetch);
    // !Приховуємо кнопку Load More
    loadMoreBtn.classList.add('is-hidden');
  }

  // Беремо данні з поля введення форми
  const data = new FormData(event.currentTarget);
  const query = data.get('query');
  // Чистимо сторінку і поле введення від попереднього запиту
  ul.innerHTML = '';
  input.value = '';

  // Викликаємо запит
  const fetchImages = createGetImagesRequest(query);

  // Функція виведення зображень
  doFetch = async () => {
    // Чекаємо на зображення
    const images = await fetchImages();

    // Відмальовуємо зображення
    renderImages(images);
  };

  await doFetch();

  // Відображаємо кнопку Load More
  loadMoreBtn.classList.remove('is-hidden');

  // Додаємо слухача Load More з повторним викликом функції виведення зображень
  loadMoreBtn.addEventListener('click', doFetch);
});
