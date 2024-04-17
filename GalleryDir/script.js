// Example JavaScript to dynamically add items (you can expand this with an API or other sources)
document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.querySelector('.grid-container');

    // Example function to add a new image
    function addImage(src, alt) {
        const div = document.createElement('div');
        div.className = 'grid-item';
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        div.appendChild(img);
        gridContainer.appendChild(div);
    }

    // Example function to add a new video
    function addVideo(src) {
        const div = document.createElement('div');
        div.className = 'grid-item';
        const video = document.createElement('video');
        video.controls = true;
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        video.appendChild(source);
        div.appendChild(video);
        gridContainer.appendChild(div);
    }

    // Adding initial media
    addImage('path_to_another_image.jpg', 'Another description');
    addVideo('path_to_another_video.mp4');
});
