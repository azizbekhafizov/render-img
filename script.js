const accessKey = 'o00Jwa5grgxiSpuKUdAccp4EqxOrvTEz5XPqcITGOPo';

fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}`)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('image__container');
    const modal = document.getElementById('modal');

    data.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.urls.small;
      img.classList.add('gallery-img');
      container.appendChild(img);

      img.addEventListener('click', () => {
        modal.innerHTML = `
          <p onclick="closeFn()">X</p>
          <img src="${photo.urls.regular}" class="modal-img">
          <button id="likeBtn">❤</button>
        `;
        modal.style.display = 'block';

        const likeBtn = document.getElementById('likeBtn');
        likeBtn.addEventListener('click', () => {
          likeBtn.classList.toggle('liked');
        });
      });
    });
  });

function closeFn() {
  const modal = document.getElementById('modal');
  modal.innerHTML = '';
  modal.style.display = 'none';
}
