
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("videoGallery");
  const searchInput = document.getElementById("searchInput");
  const tagFilter = document.getElementById("tagFilter");

<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("videoGallery");
=======
  fetch("video.json")
    .then(res => res.json())
    .then(videos => {
      displayVideos(videos);
      buildTagCloud(videos);
>>>>>>> 19cc5c75138907d4c62a9360b645ad5de8ebbcf7

<<<<<<< HEAD
  fetch("video.json")
    .then(res => res.json())
    .then(videos => {
      videos.reverse().forEach(video => {
        const card = document.createElement("div");
        card.className = "video-card";
        card.innerHTML = `
          <a href="post.html?video=${video.id}">
            <img src="${video.thumbnail}" alt="${video.title}" />
            <h3>${video.title}</h3>
          </a>
        `;
        gallery.appendChild(card);
      });
    });
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
    videojs(document.getElementById(id)); // Initialize each video-js player
  });
}
=======
      searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();
        const filtered = videos.filter(v => v.title.toLowerCase().includes(q));
        displayVideos(filtered);
      });
    });
>>>>>>> 19cc5c75138907d4c62a9360b645ad5de8ebbcf7

  function displayVideos(videos) {
    gallery.innerHTML = "";
    videos.forEach((v, index) => {
      const card = document.createElement("div");
      card.className = "video-card";

      const link = document.createElement("a");
      link.href = "post" + (index + 1) + ".html";
      link.innerHTML = `<h3>${v.title}</h3>`;

      const video = document.createElement("video");
      video.className = "video-js vjs-default-skin";
      video.setAttribute("controls", "controls");
      video.setAttribute("preload", "auto");
      video.setAttribute("width", "100%");
      video.setAttribute("poster", v.thumbnail);
      video.innerHTML = `<source src="${v.src}" type="application/x-mpegURL" />`;

      // Security: Prevent download, long-press, and right-click
      video.setAttribute("controlsList", "nodownload");
      video.oncontextmenu = e => e.preventDefault();
      video.addEventListener("touchstart", e => {
        if (e.touches.length > 1) e.preventDefault();
      });

      card.appendChild(link);
      card.appendChild(video);
      gallery.appendChild(card);
      videojs(video);
    });
  }

  function buildTagCloud(videos) {
    const tagMap = new Map();
    videos.forEach(v => {
      const tags = v.tags.split(",").map(t => t.trim().toLowerCase());
      tags.forEach(tag => {
        if (tag) tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });

    tagFilter.innerHTML = "";
    tagMap.forEach((count, tag) => {
      const btn = document.createElement("button");
      btn.textContent = tag;
      btn.onclick = () => {
        const filtered = videos.filter(v => v.tags.toLowerCase().includes(tag));
        displayVideos(filtered);
      };
      tagFilter.appendChild(btn);
    });
  }
});
