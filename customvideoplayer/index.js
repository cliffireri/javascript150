// get our elemsnte
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const rangeButtons = player.querySelectorAll('.player__slider');

let isChanging = false;
// create our functions
function togglePlay(){
    if(video.paused) {
        video.play();
    }else{
        video.pause();   
    }
}

function updateButton(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value; 
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;   
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}

//add listerners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => {
    button.addEventListener('click', skip)
});

rangeButtons.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
})


// rangeButtons.forEach(range => {
//     range.addEventListener('mousemove', handleRangeUpdate);
// })

rangeButtons.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate);
})

// rangeButtons.forEach(range => {
//     range.addEventListener('mouseup', () => isChanging = false);
// })

// rangeButtons.forEach(range => {
//     range.addEventListener('mouseout', () => isChanging = false);
// })

toggle.addEventListener('click', togglePlay);
video.addEventListener('keydown', (e) => {
    if(e.keyCode === 'space') {
        togglePlay
    }
});

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));

progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseout', () => mouseDown = false);
progress.addEventListener('mouseup', () => mouseDown = false);