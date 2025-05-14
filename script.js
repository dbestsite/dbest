
let allVideos = [];
let allTags = new Set();

fetch("videos.json")
  .then((res) => res.json())
  .then((videos) => {
    allVideos = videos.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderVideos(allVideos);
    extractTags(allVideos);
  });

function renderVideos(videos) {
  const container = document.getElementById("videoGallery");
  container.innerHTML = "";
  videos.forEach((video, index) => {
    const id = `video_${index}`;
    const card = document.createElement("div");
    card.className = "video-card";
    card.setAttribute("data-title", video.title);
    card.setAttribute("data-tags", video.tags);
    card.innerHTML = `
      <h3>${video.title}</h3>
      <video-js id="${id}" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264">
        <source src="${video.src}" type="application/x-mpegURL" />
      </video-js>
    `;
    container.appendChild(card);
    videojs(id);
  });
}

function extractTags(videos) {
  videos.forEach(video => {
    video.tags.split(',').forEach(tag => {
      allTags.add(tag.trim());
    });
  });
  renderTagButtons();
}

function renderTagButtons() {
  const container = document.getElementById("tagFilter");
  container.innerHTML = '<button onclick="filterTag(\'all\')" class="active">All</button>';
  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.onclick = function(e) {
      document.querySelectorAll('#tagFilter button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterTag(tag);
    };
    container.appendChild(btn);
  });
}

document.getElementById('searchInput').addEventListener('input', function () {
  const filter = this.value.toLowerCase();
  const filtered = allVideos.filter(v => v.title.toLowerCase().includes(filter));
  renderVideos(filtered);
});

function filterTag(tag) {
  const filtered = tag === 'all'
    ? allVideos
    : allVideos.filter(v =>
        v.tags.toLowerCase().split(',').map(t => t.trim()).includes(tag.toLowerCase())
      );
  renderVideos(filtered);
}
