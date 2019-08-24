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

clearCanvas();

function clearCanvas() {
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "grey";
  context.fill();
}

setInterval(() => {
  if (state === 'recording') {
    video.style.display = null;
    canvas.style.display = 'none';
    takePhotoButton.style.display = null;
    takePhotoButton.children[0].textContent = 'photo_camera';
    confirmButton.style.display = 'none';
    resetButton.style.display = 'none';
  } else if (state === 'confirm') {
    video.style.display = 'none';
    canvas.style.display = null;
    takePhotoButton.style.display = 'none';
    confirmButton.style.display = null;
    resetButton.style.display = null;
  } else { // Idle State
    video.style.display = 'none';
    canvas.style.display = null;
    takePhotoButton.style.display = null;
    takePhotoButton.children[0].textContent = 'add_a_photo';
    confirmButton.style.display = 'none';
    resetButton.style.display = 'none';
  }
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