const button = document.getElementById('clickButton');
const counter = document.getElementById('clickCount');
let clicks = Number(localStorage.getItem('clicks')) || 0;
counter.textContent = clicks;
button.addEventListener('click', function () {
    clicks++;
    counter.textContent = clicks;
    localStorage.setItem('clicks', clicks);
});