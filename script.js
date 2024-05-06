function photoGallery() {
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

    // Function to switch to Light mode
    function toggleDarkMode() {
        let body = document.body;
        body.className = ("dark-mode");
        let nav = document.getElementsByTagName("nav")[0];
        nav.className = ("dark-mode-nav");
        document.getElementById("light-mode").style.display = "block";
        document.getElementById("dark").style.display = "none";
    }

    // Function to switch to Dark mode
    function toggleLightMode() {
        document.getElementById("light-mode").style.display = "none";
        document.getElementById("dark").style.display = "block";
        let body = document.body;
        body.className = ("light-mode-body");
        let nav = document.getElementsByTagName("nav")[0];
        nav.className = ("light-mode-nav");
    }


    // Function to render a single Image
    function renderImage(image) {
        const imageItem = document.createElement("div");
        const img = document.createElement("img");
        img.src = image.download_url;
        img.alt = image.author;
        const authorInfo = document.createElement('p');
        authorInfo.innerText = `Author: ${image.author}`;
        authorInfo.classList.add("authorText");
        imageItem.appendChild(authorInfo);
        imageItem.appendChild(img);
        galleryContainer.prepend(imageItem);
        img.addEventListener("mouseenter", (e) => {

            authorInfo.style.display = 'block';
        });
        img.addEventListener("mouseleave", () => {
            e.stopPropagation();
            authorInfo.style.display = 'none';
        });
    }

    // Get new Image details
    document.getElementById("newImageForm").addEventListener('submit', (e) => {
        e.preventDefault();
        renderImage({
            download_url: e.target.download_url.value,
            author: e.target.author.value
        })
        document.getElementById("newImageForm").reset()
    })

    // Call toggleDarkMode when darkMode button is clicked
    document.getElementById("dark").addEventListener('click', toggleDarkMode);


    // Call toggleLightMode when lightMode button is clicked
    document.getElementById("light-mode").addEventListener('click', toggleLightMode);


    // Call renderGallery function to populate the gallery
    renderGallery();

}
photoGallery()