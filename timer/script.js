let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttonControls = document.querySelectorAll('[data-time]');



function timer(seconds) {
    clearInterval(countDown);

   const now = Date.now();
   const then = now + seconds * 1000;
   displayTimeLeft(seconds)
   displayEndTime(then);
    countDown =  setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
        clearInterval(countDown);
        return;
    }
    displayTimeLeft(secondsLeft)
   }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);

    const remainderSeconds = seconds % 60;

    const display = `${minutes} : ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`

    timerDisplay.textContent = display

    document.title = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTimeDisplay.textContent = `Be back at ${hour > 12 ? hour - 12 : hour} : ${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    timer(parseInt(this.dataset.time));
}

buttonControls.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60)
    this.reset();

})