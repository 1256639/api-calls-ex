const API_KEY = "YC6IYtaYK6LcNXsFaoqnXyl91rlWVIQJ";
const img = document.getElementById("gif");
const imageContainer = document.getElementById("image-container");
const form = document.getElementById("gif-form");
const searchInput = document.getElementById("search");
const errorMessage = document.getElementById("error-message");

function showGif(url) {
    img.src = url;
    img.alt = "GIF";
    imageContainer.style.display = "block";
    errorMessage.textContent = "";
}

function showError(message) {
    imageContainer.style.display = "none";
    errorMessage.textContent = message;
}

function fetchGif(query) {
    fetch("https://api.giphy.com/v1/gifs/translate?api_key=" + API_KEY + "&s=" + encodeURIComponent(query), { mode: "cors"})
    .then(response => response.json())
    .then(response => {
        if (response.data && response.data.images && response.data.images.original && response.data.images.original.url) {
            showGif(response.data.images.original.url);
        } else {
            showError("No GIF found :(")
        }
    })
    .catch(() => {
        showError("There was an error.");
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
        showError("Enter a search term")
        return;
    }
    fetchGif(searchTerm);
});