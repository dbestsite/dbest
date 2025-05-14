document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("videoGallery");

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
