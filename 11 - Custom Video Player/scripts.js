const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playToggle = player.querySelector('.toggle');
const fullScreenToggle = player.querySelector('.full_screen');
const skipButtons = player.querySelectorAll('[data-skip]'); // [skipBack, skipFwd]
const ranges = player.querySelectorAll('.player__slider'); // [volume, playbackRate]

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function toggleFullScreen() {
  document.fullscreenElement ? document.exitFullscreen() : player.requestFullscreen();
}

function updatePlayButton() {
  playToggle.textContent = video.paused ? '►' : '❚ ❚';
}

function updateFullScreenButton() {
  fullScreenToggle.innerHTML = document.fullscreenElement ? '&#61542;' : '&#9974;';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  progressBar.style.flexBasis = `${(this.currentTime / this.duration) * 100}%`;
}

function scrub(e) {
  if (!mouseDown) return;
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

/** ADD EVENT LISTENERS */
[playToggle, video].forEach((element) => element.addEventListener('click', togglePlay));

['play', 'pause'].forEach((event) => video.addEventListener(event, updatePlayButton));

skipButtons.forEach((button) => button.addEventListener('click', skip));

['change', 'input'].forEach((event) =>
  ranges.forEach((range) => range.addEventListener(event, handleRangeUpdate))
);

video.addEventListener('timeupdate', handleProgress);

let mouseDown = false;
['click', 'mousemove'].forEach((event) => progress.addEventListener(event, scrub));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));

fullScreenToggle.addEventListener('click', toggleFullScreen);
player.addEventListener('fullscreenchange', updateFullScreenButton);
