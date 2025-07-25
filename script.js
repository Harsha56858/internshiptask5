const container = document.getElementById("user-container");
const searchInput = document.getElementById("search");
const loader = document.getElementById("loader");

fetch("https://randomuser.me/api/?results=30")
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none";
    displayUsers(data.results);
  });

function displayUsers(users) {
  container.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="${user.picture.medium}" alt="${user.name.first}" />
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>${user.email}</p>
      <p>${user.location.city}, ${user.location.country}</p>
    `;
    container.appendChild(card);
  });

  // Search filtering
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = users.filter(user =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(keyword)
    );
    displayUsers(filtered);
  });
}
