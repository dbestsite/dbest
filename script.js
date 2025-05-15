let videos = [];
let allTags = new Set();

fetch('video.json')
  .then(res => res.json())
  .then(data => {
    videos = data;
    extractTags();
    renderTags();
    renderVideos(videos);
  });

function extractTags() {
  videos.forEach(video => {
    if (video.tags) {
      video.tags.split(',').forEach(tag => allTags.add(tag.trim()));
    }
  });
}

function renderTags() {
  const tagCloud = document.getElementById('tagCloud');
  tagCloud.innerHTML = '';
  allTags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.textContent = tag;
    tagEl.onclick = () => filterByTag(tag);
    tagCloud.appendChild(tagEl);
  });
}

function renderVideos(list) {
  const gallery = document.getElementById('videoGallery');
  gallery.innerHTML = '';
  list.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <img src="${video.thumbnail}" alt="${video.title}" />
      <h3>${video.title}</h3>
      <video controls preload="none" width="100%" style="margin-top:10px" oncontextmenu="return false;" onmousedown="if(event.which===3) return false;">
        <source src="${video.src}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
    gallery.appendChild(card);
  });
}

function filterByTag(tag) {
  const filtered = videos.filter(video =>
    video.tags.toLowerCase().includes(tag.toLowerCase())
  );
  renderVideos(filtered);
}

document.getElementById('searchInput').addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = videos.filter(video =>
    video.title.toLowerCase().includes(term) ||
    video.tags.toLowerCase().includes(term)
  );
  renderVideos(filtered);
});
