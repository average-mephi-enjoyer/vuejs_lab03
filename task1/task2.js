document.addEventListener('DOMContentLoaded', function () {
    document.body.style.userSelect = 'none';

    document.addEventListener('selectstart', function (event) {
        event.preventDefault();
    });
    document.addEventListener('copy', function (event) {
        event.preventDefault();
    });
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});