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
        images.forEach(image => renderImage(image));
    }

    function toggleDarkMode() {
        let element = document.body;
        element.classList.toggle("dark-mode");
        let nav = document.getElementsByTagName("nav")[0];
        nav.classList.toggle("dark-mode-nav");
        let button = document.getElementById("button");
        button.classList.toggle("dark-submit-button");
    }

    function renderImage(image) {
        {
            console.log(image)
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
        }
    }

    document.getElementById("newImageForm").addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target.download_url.value);
        console.log(e.target.author.value);
        renderImage({
            download_url: e.target.download_url.value,
            author: e.target.author.value

        })
        document.getElementById("newImageForm").reset()

    })

    document.getElementById("dark").addEventListener('click', toggleDarkMode);


    // Call renderGallery function to populate the gallery
    renderGallery();
});
