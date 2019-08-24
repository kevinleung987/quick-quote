var state = 'idle';
// Video Display
const video = document.getElementById('video');
// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// Greyscale/Neural Network Canvas
const prepCanvas = document.getElementById('greyscale');
const prepContext = prepCanvas.getContext('2d');
// Buttons
const takePhotoButton = document.getElementById('snap');
const confirmButton = document.getElementById('confirm');
const resetButton = document.getElementById('reset');
const uploadButton = document.getElementById('upload');

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
  console.log(imgPixels);
  return imgPixels
}

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
}, 50);

// Trigger photo take
takePhotoButton.addEventListener("click", function () {
  if (state === 'recording') {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    prepareImage(video, 28, 28);
    video.srcObject = null;
    video.pause();
    state = 'confirm';
  } else {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();
      });
    }
    state = 'recording';
  }
});

resetButton.addEventListener("click", function () {
  video.srcObject = null;
  video.pause();
  clearCanvas();
  state = 'idle';
});