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
        modal.innerHTML = `<div class="loading-text">Loading...</div>`;
        modal.style.display = 'block';

        setTimeout(() => {
          modal.innerHTML = `
            <div class="close-btn" onclick="closeFn()">X</div>
            <img src="${photo.urls.regular}" class="modal-img" />
            <div style="margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
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
        }, 2000);
      });
    });
  });

function closeFn() {
  const modal = document.getElementById('modal');
  modal.innerHTML = '';
  modal.style.display = 'none';
}


const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

menuIcon.addEventListener('click', () => {
  sidebar.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
});

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});
