var state = 'idle';
// Video Display
const video = document.getElementById('video');
// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
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
  const img = new Image;
  img.onload = function () {
    context.drawImage(img, 0, 0);
  }
  img.src = URL.createObjectURL(file);
  console.log(file);
}

// STATE MACHINE!!!!!
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