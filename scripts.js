var recording = false;
var video = document.getElementById('video');

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

context.beginPath();
context.rect(0, 0, canvas.clientWidth, canvas.clientHeight);
context.fillStyle = "grey";
context.fill();

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
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
});