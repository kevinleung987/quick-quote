var recording = false;
const video = document.getElementById('video');

// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

clearCanvas();

function clearCanvas() {
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "grey";
  context.fill();
}

setInterval(() => {
  if (recording) {
    video.style.display = null;
    canvas.style.display = 'none';
  } else {
    video.style.display = 'none';
    canvas.style.display = null;
  }
}, 50);

// Trigger photo take
document.getElementById("snap").addEventListener("click", function () {
  if (recording) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
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

document.getElementById("canvas").addEventListener("click", function () {
  video.srcObject = null;
  video.pause();
  clearCanvas();
});