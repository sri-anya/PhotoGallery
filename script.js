document.addEventListener("DOMContentLoaded", function() {
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
            imageItem.classList.add("image-item");
            const img = document.createElement("img");
            img.src = image.download_url;
            img.alt = image.author;
            imageItem.appendChild(img);
            galleryContainer.appendChild(imageItem);

            // Add event listener for click event
            img.addEventListener("click", () => {
                console.log(`Clicked on image by ${image.author}`);
                // Create modal overlay
                const modal = document.createElement("div");
                modal.classList.add("modal");
                // Create image element inside modal
                const modalImg = document.createElement("img");
                modalImg.src = image.download_url;
                modalImg.alt = image.author;
                modal.appendChild(modalImg);
                // Append modal to the body
                document.body.appendChild(modal);
                // Add event listener to close modal when clicking outside the image
                modal.addEventListener("click", () => {
                    modal.remove();
                });
            });

            // Add event listener for hover event
            img.addEventListener("mouseover", () => {
                // Create tooltip element
                const tooltip = document.createElement("div");
                tooltip.classList.add("tooltip");
                // Set tooltip content
                tooltip.innerHTML = `
                    <strong>Author:</strong> ${image.author}<br>
                    <strong>Dimensions:</strong> ${image.width} x ${image.height}
                `;
                // Position tooltip relative to the image
                const imgRect = img.getBoundingClientRect();
                tooltip.style.top = `${imgRect.bottom + 5}px`;
                tooltip.style.left = `${imgRect.left}px`;
                // Append tooltip to the body
                document.body.appendChild(tooltip);
                // Add event listener to remove tooltip when mouse leaves the image
                img.addEventListener("mouseout", () => {
                    tooltip.remove();
                });
            });
        });
    }

    // Call renderGallery function to populate the gallery
    renderGallery();
});
