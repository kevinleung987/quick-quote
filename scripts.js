var recording = false;
const video = document.getElementById('video');
const videoBox = document.getElementById('video-box');
const canvasBox = document.getElementById('canvas-box');

// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

clearCanvas();

function clearCanvas() {
  context.beginPath();
  context.rect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.fillStyle = "grey";
  context.fill();
}

setInterval(() => {
  if (recording) {
    videoBox.style.display = null;
    canvasBox.style.display = 'none';
  } else {
    videoBox.style.display = 'none';
    canvasBox.style.display = null;
  }
}, 100);

// Trigger photo take
document.getElementById("snap").addEventListener("click", function () {
  if (recording) {
    context.drawImage(video, 0, 0, 320, 240);
    video.srcObject = null;
    video.pause();
    recording = false;
  } else {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('Access granted!');
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.srcObject = stream;
        video.play();
      });
    }
    recording = true;
  }
});

document.getElementById("reset").addEventListener("click", function () {
  video.srcObject = null;
  video.pause();
  clearCanvas();
});