var state = 'idle';
var currPixels;
// Title Text
const title = document.getElementById('title-text');
// Estimate Modal Text
const estimate = document.getElementById('estimate');
// Video Display
const video = document.getElementById('video');
// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// Preparation Canvas
const prepCanvas = document.getElementById('greyscale');
const prepContext = prepCanvas.getContext('2d');
// Buttons
const takePhotoButton = document.getElementById('snap');
const confirmButton = document.getElementById('confirm');
const resetButton = document.getElementById('reset');
const uploadButton = document.getElementById('upload');
//Ranges
const priceRange = ['$500 - $1500', '$1500 - $3000', '$3000 - $5000'];

clearCanvas();

function clearCanvas() {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fill();
}

function handleFiles(files) {
    const file = files[0];
    const img = new Image();
    resizeImage(img, canvas.width, canvas.height);
    img.src = URL.createObjectURL(file);
    state = 'confirm';
}

function resizeImage(image, width, height) {
    image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
        prepareImage(image, 28, 28);
    }
}

function prepareImage(image, width, height) {
    prepContext.drawImage(image, 0, 0, width, height);
    const imgPixels = prepContext.getImageData(0, 0, width, height);
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var i = (y * 4) * width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    prepContext.putImageData(imgPixels, 0, 0);
    const pixels = []
    for (var x = 0; x < imgPixels.data.length; x = x + 4) {
        pixels.push(imgPixels.data[x]);
    }
    currPixels = pixels;
    return pixels;
}

function getEstimate() {
    // TODO: Dynamically generate using ML
    const rand = priceRange[Math.floor(Math.random() * priceRange.length)];
    console.log(rand);
    estimate.innerText = `Your estimated repair cost is ${rand} CAD`;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
});

// State Machine for rendering logic
setInterval(() => {
    video.style.display = state === 'recording' ? null : 'none';
    canvas.style.display = state === 'recording' ? 'none' : null;
    takePhotoButton.style.display = state === 'confirm' ? 'none' : null;
    takePhotoButton.children[0].textContent = state === 'recording' ? 'photo_camera' : 'add_a_photo';
    confirmButton.style.display = state === 'confirm' ? null : 'none';
    resetButton.style.display = state === 'idle' ? 'none' : null;
    resetButton.children[0].textContent = state === 'recording' ? 'clear' : 'undo';
    uploadButton.style.display = state === 'idle' ? null : 'none';
    if (state === 'recording') {
        title.innerText = 'Please take a picture!';
    } else if (state === 'confirm') {
        title.innerText = 'Confirm your photo!';
    } else if (state === 'idle') {
        title.innerText = 'Take or add a photo!';
    }
}, 50);

// Trigger photo take
takePhotoButton.addEventListener("click", function() {
    if (state === 'recording') {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        prepareImage(video, 28, 28);
        video.srcObject = null;
        video.pause();
        state = 'confirm';
    } else {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                video.srcObject = stream;
                video.play();
            });
        }
        state = 'recording';
    }
});

resetButton.addEventListener("click", function() {
    video.srcObject = null;
    video.pause();
    clearCanvas();
    state = 'idle';
});

confirmButton.addEventListener("click", function() {
    console.log(currPixels);
    clearCanvas();
    state = 'idle';
    getEstimate();
    M.Modal.getInstance(document.querySelector('.modal')).open();
});