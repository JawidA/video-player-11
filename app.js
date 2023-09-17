const playerA = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-ind');
const playBtn = document.querySelector('#play');
const volumeBtn = document.querySelector('#volume-ic');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-progress');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration-time');
const fullScreen = document.querySelector('#fullscree');
const showControl = document.querySelector('.show-control');
const speedContaner = document.querySelector('.speed-contaner');

// =============================================================
// play and pause ----------------------------------------------
// =============================================================
let playing = false;

function togglePlay () {
    if (video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }else {
        video.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');
    }
};

// here is another way of achieving the same functionality
// {
//     function playVid () {
//         playing = true;
//         video.play();
//         playBtn.classList.replace('fa-play', 'fa-pause');
//     };

//     function pauseVid () {
//         playing = false;
//         video.pause();
//         playBtn.classList.replace('fa-pause', 'fa-play')
//     };
//     playBtn.addEventListener('click', (() => (playing === true ? pauseVid() : playVid())))
// }

video.addEventListener('ended', () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
});

// =============================================================
// progress bar ------------------------------------------------
// =============================================================

function updateProgressBar (e) {
    // console.log(video.currentTime, video.duration); // we can also get current time and duration like this (video.currentTime, video.duration)
    const {duration: videoDuration, currentTime: videoCurrentTime} = e.srcElement;
    currentTime.textContent = `${Math.floor(videoCurrentTime / 60)}:${String(Math.floor(videoCurrentTime % 60)).padStart(2, 0)} / `;
    duration.textContent = `${Math.floor(videoDuration / 60)}:${String(Math.floor(videoDuration % 60)).padStart(2, 0)}`;
    progressBar.style.width = `${Math.floor((100 * videoCurrentTime) / videoDuration)}%`;
};

function ChangeProgressBar (e) {
    const {offsetX} = e;
    const progressRangeWidth = progressRange.offsetWidth;
    progressBar.style.width = `${(offsetX * 100) / progressRangeWidth}%`
    video.currentTime = (offsetX / progressRangeWidth) * video.duration;
};

// =============================================================
// volume bar and icon -----------------------------------------
// =============================================================

function changeVolume (e) {
    const {offsetX} = e;
    const volumeRangeWidth = volumeRange.offsetWidth;
    let val = `${(offsetX * 100) / volumeRangeWidth}`;
        
    if (val < 5) val = 0;

    // clearing the class of volumeBtn and and change the value of val (which is value of volume bar)
    volumeBtn.className = '';
    if (val > 70) volumeBtn.classList.add("fa", "fa-volume-up");
    else if (val <= 70 && val > 5) volumeBtn.classList.add("fas", "fa-volume-down");
    else if (val <= 5) volumeBtn.classList.add("fas", "fa-volume-mute");

    volumeBar.style.width = `${val}%`;
    video.volume = val / 100;
};


function muteToggle () {
    let volumeLevel = video.volume;
    volumeBtn.className = '';

    if (!video.muted){
        video.muted = true;
        volumeBtn.classList.add("fas", "fa-volume-mute");
        volumeBtn.setAttribute('title', 'Unmute')
        volumeBar.style.width = `0%`;
    } else {
        video.muted = false;
        volumeBtn.classList.add("fas", "fa-volume-up");
        volumeBtn.setAttribute('title', 'Mute')
        volumeBar.style.width = `${volumeLevel * 100}%`;
    };
};


// =============================================================
// speed changer -----------------------------------------------
// =============================================================

function changeSpeed () {
    video.playbackRate = speedContaner.value;
};

// =============================================================
// full screen mode --------------------------------------------
// =============================================================


/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
};
  
  /* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
};

let isFullScreen = false;
function fullScreenToggle() {
    fullScreen.className = '';

    if (!isFullScreen){
        openFullscreen(playerA);
        fullScreen.classList.add('fas', 'fa-compress');
    }else {
        closeFullscreen();
        fullScreen.classList.add('fas', 'fa-expand');
    };

    isFullScreen = !isFullScreen;
};


// =============================================================
// event listeners ---------------------------------------------
// =============================================================
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
showControl.addEventListener('click', (e) => {if (e.target.classList == 'show-control') togglePlay()});
video.addEventListener('timeupdate', updateProgressBar);
video.addEventListener('canplay', updateProgressBar);
progressRange.addEventListener('click', ChangeProgressBar);
volumeRange.addEventListener('click', changeVolume);
volumeBtn.addEventListener('click', muteToggle);
speedContaner.addEventListener('change', changeSpeed)
fullScreen.addEventListener('click', fullScreenToggle);
