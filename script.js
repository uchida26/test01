function toggleButton(button) {
    button.classList.toggle('active');
}

function removeButton(closeBtn) {
    const button = closeBtn.parentElement;
    const container = button.parentElement;
    container.removeChild(button);
    rearrangeButtons(container);
}

function rearrangeButtons(container) {
    const buttons = container.querySelectorAll('.button');
    buttons.forEach(button => {
        container.appendChild(button);
    });
}

function addButton(menuId) {
    const container = document.getElementById(menuId);
    const newButton = document.createElement('div');
    newButton.classList.add('button');
    newButton.innerHTML = '<span class="close-btn" onclick="removeButton(this)">×</span>';
    newButton.onclick = function() {
        toggleButton(newButton);
    };
    container.insertBefore(newButton, container.querySelector('.add-button'));
}
