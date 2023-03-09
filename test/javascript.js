document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const boxes = container.querySelectorAll('.box');
    const highlightBox = document.createElement('div');
    highlightBox.classList.add('highlight-box');

    document.body.appendChild(highlightBox);

    let currentIndex = 0;

    function highlight(index) {
        boxes[currentIndex].classList.remove('highlighted');
        boxes[index].classList.add('highlighted');
        currentIndex = index;
        updateHighlightBox();
    }

    function hover(index) {
        if (index !== currentIndex) {
            boxes[currentIndex].classList.remove('highlighted');
            boxes[currentIndex].classList.remove('highlight-color');
            boxes[index].classList.add('hovered');
            boxes[index].classList.add('highlight-color');

            currentIndex = index;
            updateHighlightBox();
        }
    }

    function unhover() {
        boxes[currentIndex].classList.remove('hovered');
        if (currentIndex !== boxes[currentIndex].dataset.index) {
            currentIndex = parseInt(boxes[currentIndex].dataset.index);
            updateHighlightBox();
        }
    }

    function updateHighlightBox(index) {
        const box = index !== undefined ? boxes[index] : boxes[currentIndex];
        const boxRect = box.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        highlightBox.style.width = `${boxRect.width}px`;
        highlightBox.style.height = `${boxRect.height}px`;
        highlightBox.style.transform = `translate(${boxRect.left + scrollX}px, ${boxRect.top + scrollY}px)`;
    }

    highlight(currentIndex);

    boxes.forEach((box, index) => {
        box.dataset.index = index;
        box.addEventListener('mouseover', () => hover(index));
        box.addEventListener('mouseout', unhover);
    });
});
