"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const slidesContainer = document.querySelector('.slides');
    const slides = Array.from(document.querySelectorAll('.slides img'));
    let currentIndex = 0;

    ['click', 'click'].forEach((event, index) => {
        document.querySelector(index ? '.right-arrow' : '.left-arrow').addEventListener(event, () => {
            moveSlide(index * 2 - 1);
        });
    });

    function moveSlide(direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        slidesContainer.style.transform = `translateX(${-600 * currentIndex}px)`;
    }
});
