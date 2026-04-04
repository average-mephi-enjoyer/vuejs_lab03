let circle = document.querySelector('.circle');
document.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY;
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
});