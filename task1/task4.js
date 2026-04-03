let button = document.getElementById('clickButton');
let totalClicksSpan = document.getElementById('totalClicks');
let clickSpeedSpan = document.getElementById('clickSpeed');
        
let totalClicks = Number(localStorage.getItem('totalClicks')) || 0;
let sessionClicks = 0;
let sessionStartTime = Date.now();

function updateView() {
    totalClicksSpan.textContent = totalClicks;
    let elapsedSeconds = (Date.now() - sessionStartTime) / 1000;
    if (sessionClicks === 0 || elapsedSeconds <= 0) {
        clickSpeedSpan.textContent = '0.00';
        return;
    }
    let average = sessionClicks / elapsedSeconds;
    clickSpeedSpan.textContent = average.toFixed(2);
}
updateView();
button.addEventListener('click', function () {
    totalClicks++;
    localStorage.setItem('totalClicks', totalClicks);
    sessionClicks++;
    updateView();
});
