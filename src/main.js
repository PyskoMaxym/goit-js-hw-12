// main.js

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api.js";
import { renderImages, clearResults } from "./js/render-functions.js";

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.input-search');
const resultsContainer = document.querySelector('.results-container');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.js-load-more');

let query = ''; // Пошуковий запит
let page = 1; // Поточна сторінка
const perPage = 15; // Кількість зображень на сторінку
let totalHits = 0; // Загальна кількість результатів
let lightbox = new SimpleLightbox('.results-container .gallery-item', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
   query = searchInput.value.trim();
  
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  page = 1;
  totalHits = 0;

  clearResults(resultsContainer);
  fetchAndDisplayImages(query);
});

loadMore.addEventListener('click',()=>{
    page+=1;
    fetchAndDisplayImages();    
})

function fetchAndDisplayImages() {
  loader.style.display = 'block'; // Показуємо індикатор завантаження

  fetchImages(query, page, perPage)
    .then(data => {
      loader.style.display = 'none'; // Ховаємо індикатор завантаження

        totalHits=data.totalHits;
      if (data.hits.length === 0 && page ===1) {
        iziToast.info({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      renderImages(data.hits, resultsContainer);
      lightbox.refresh(); // Оновлюємо lightbox після додавання нових зображень
    
      if (page * perPage >= totalHits) {
        loadMore.classList.replace('load-more', 'load-more-hidden'); // Ховаємо кнопку
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        loadMore.classList.replace('load-more-hidden', 'load-more'); // Показуємо кнопку
      }
    })
    .catch(error => {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
    });
}
function scrollPage() {
    const galleryItem = document.querySelector('.gallery-item'); // Отримуємо перший елемент галереї
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect(); // Визначаємо висоту елемента
      window.scrollBy({
        top: height * 2, // Прокрутка на дві висоти елемента
        behavior: 'smooth', // Плавна прокрутка
      });
    }
  }