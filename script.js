//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

      // Function to create a promise that resolves when an image is loaded
      function loadImage(src) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
        });
      }

      // Function to load multiple images using Promise.all
      function loadImages(imageUrls) {
        const promises = imageUrls.map((image) => loadImage(image.url));
        return Promise.all(promises);
      }

      // Event listener for button click
      document
        .getElementById("download-images-button")
        .addEventListener("click", () => {
          loadImages(images)
            .then((loadedImages) => {
              const imagesContainer =
                document.getElementById("imagesContainer");
              imagesContainer.innerHTML = ""; // Clear any previous images
              loadedImages.forEach((img, index) => {
                const link = document.createElement("a");
                link.href = img.src;
                link.download = `image${index + 1}.jpg`;
                link.appendChild(img);
                imagesContainer.appendChild(link);

                // Programmatically click the link to start download
                link.click();
              });
            })
            .catch((error) => {
              console.error("Error loading images:", error);
            });
        });
