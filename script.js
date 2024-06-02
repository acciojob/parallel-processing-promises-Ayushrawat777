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
      const promises = imageUrls.map(image => loadImage(image.url));
      return Promise.all(promises);
    }

    // Function to display images
    function displayImages(images) {
      output.innerHTML = ''; // Clear any previous images
      images.forEach(img => output.appendChild(img));
    }

    // Event listener for button click
    btn.addEventListener('click', () => {
      loadImages(images)
        .then(loadedImages => {
          displayImages(loadedImages);
        })
        .catch(error => {
          console.error('Error loading images:', error);
        });
    });