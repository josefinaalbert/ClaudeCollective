// Modal functionality
const modal = document.getElementById('submission-modal');
const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close-modal');

function openSubmissionForm() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.onclick = closeModal;

window.onclick = function(event) {
    if (event.