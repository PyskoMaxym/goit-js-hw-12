// render-functions.js

export function renderImages(images, container) {
    const imageCards = images.map(image => {
      return `
        <a href="${image.largeImageURL}" class="gallery-item">
          <div class="image-card">
            <img src="${image.webformatURL}" alt="${image.tags}" />
            <div class="info">
              <p><b>Likes:</b> ${image.likes}</p>
              <p><b>Views:</b> ${image.views}</p>
              <p><b>Comments:</b> ${image.comments}</p>
              <p><b>Downloads:</b> ${image.downloads}</p>
            </div>
          </div>
        </a>
      `;
    }).join('');
  
    container.insertAdjacentHTML('beforeend', imageCards);
  }
  
  export function clearResults(container) {
    container.innerHTML = '';
  }