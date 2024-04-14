document.addEventListener("DOMContentLoaded", function() {
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slides img');
    let currentIndex = 0;

    document.querySelector('.left-arrow').addEventListener('click', function() {
        moveSlide(-1);
    });

    document.querySelector('.right-arrow').addEventListener('click', function() {
        moveSlide(1);
    });

    function moveSlide(direction) {
        if (direction === 1 && currentIndex < slides.length - 1) {
            currentIndex++;
        } else if (direction === -1 && currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = (direction === 1) ? 0 : slides.length - 1; // Loop around
        }
        slidesContainer.style.transform = `translateX(${-600 * currentIndex}px)`;
    }
});
