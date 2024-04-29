document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("galleryContainer");

    // Function to fetch images from Lorem Picsum API
    async function fetchImages() {
        try {
            const response = await fetch("https://picsum.photos/v2/list?page=3&limit=20");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    // Function to render images in the gallery
    async function renderGallery() {
        const images = await fetchImages();
        images.forEach(image => {
            const imageItem = document.createElement("div");

            const img = document.createElement("img");
            img.src = image.download_url;
            img.alt = image.author;

            const authorInfo = document.createElement('p');
            authorInfo.innerText = `Author: ${image.author}`;
            authorInfo.classList.add("authorText");
            imageItem.appendChild(authorInfo);
            imageItem.appendChild(img);
            galleryContainer.appendChild(imageItem);



            img.addEventListener("mouseenter", () => {
                authorInfo.style.display = 'block';
            });
            img.addEventListener("mouseleave", () => {
                authorInfo.style.display = 'none';
            });
        });
    }

    // Call renderGallery function to populate the gallery
    renderGallery();
});
