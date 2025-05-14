
let allVideos = [];

fetch("videos.json")
  .then((res) => res.json())
  .then((videos) => {
    allVideos = videos.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderVideos(allVideos);
  });

function renderVideos(videos) {
  const container = document.getElementById("videoGallery");
  container.innerHTML = "";
  videos.forEach((video, index) => {
    const id = `video_${index}`;
    const card = document.createElement("div");
    card.className = "video-card";
    card.setAttribute("data-title", video.title);
    card.setAttribute("data-tag", video.tag);
    card.innerHTML = `
      <h3>${video.title}</h3>
      <video-js id="${id}" class="video-js vjs-default-skin" controls preload="auto" width="640" height="264" poster="">
        <source src="${video.src}" type="application/x-mpegURL" />
      </video-js>
    `;
    container.appendChild(card);
    videojs(id); // Initialize each video-js player
  });
}

document.getElementById('searchInput').addEventListener('input', function () {
  const filter = this.value.toLowerCase();
  const filtered = allVideos.filter(v => v.title.toLowerCase().includes(filter));
  renderVideos(filtered);
});

function filterTag(tag) {
  const filtered = tag === 'all' ? allVideos : allVideos.filter(v => v.tag === tag);
  renderVideos(filtered);
}
