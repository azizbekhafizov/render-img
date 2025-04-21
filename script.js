const accessKey = 'o00Jwa5grgxiSpuKUdAccp4EqxOrvTEz5XPqcITGOPo';
const searchInput = document.getElementById('searchInput');
const container = document.getElementById('image__container');
const modal = document.getElementById('modal');

function renderImages(photos) {
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.classList.add('gallery-img');
    container.appendChild(img);

    img.addEventListener('click', () => {
      modal.innerHTML = `<div class="loading-text">Loading...</div>`;
      modal.style.display = 'flex';

      setTimeout(() => {
        modal.innerHTML = `
          <div class="close-btn" onclick="closeFn()">X</div>
          <img src="${photo.urls.regular}" class="modal-img" />
          <div class="modal-info">
            <button id="likeBtn">❤</button>
            <span id="likeCount">${photo.likes}</span>
          </div>
        `;

        const likeBtn = document.getElementById('likeBtn');
        const likeCount = document.getElementById('likeCount');
        let liked = false;

        likeBtn.addEventListener('click', () => {
          liked = !liked;
          likeBtn.classList.toggle('liked');
          let count = parseInt(likeCount.textContent);
          likeCount.textContent = liked ? count + 1 : count - 1;
        });
      }, 1000);
    });
  });
}

fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
  .then(res => res.json())
  .then(data => {
    renderImages(data);
  });

let timeOut;
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  clearTimeout(timeOut);

  if (query === '') return;

  timeOut = setTimeout(() => {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
      .then(res => res.json())
      .then(data => {
        renderImages(data.results);
      });
  }, 500);
});

function closeFn() {
  modal.innerHTML = '';
  modal.style.display = 'none';
}
