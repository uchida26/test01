function toggleButton(button) {
    button.classList.toggle('active');
    saveData();
}

function removeButton(closeBtn) {
    const button = closeBtn.parentElement;
    const container = button.parentElement;
    container.removeChild(button);
    rearrangeButtons(container);
    saveData();
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
    saveData();
}

function updateTimestamp() {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
    document.getElementById('last-updated').innerText = `最終更新日時: ${formattedDate}`;
    localStorage.setItem('lastUpdated', formattedDate);
}

function saveData() {
    const title = document.getElementById('page-title').value;
    const menuName1 = document.getElementById('menuName1').value;
    const menuName2 = document.getElementById('menuName2').value;

    const buttonsState = {
        menu1: [...document.querySelectorAll('#menu1 .button')].map(button => button.classList.contains('active')),
        menu2: [...document.querySelectorAll('#menu2 .button')].map(button => button.classList.contains('active'))
    };

    localStorage.setItem('pageTitle', title);
    localStorage.setItem('menuName1', menuName1);
    localStorage.setItem('menuName2', menuName2);
    localStorage.setItem('buttonsState', JSON.stringify(buttonsState));
    updateTimestamp();
}

function loadData() {
    const title = localStorage.getItem('pageTitle');
    const menuName1 = localStorage.getItem('menuName1');
    const menuName2 = localStorage.getItem('menuName2');
    const buttonsState = JSON.parse(localStorage.getItem('buttonsState'));

    if (title) document.getElementById('page-title').value = title;
    if (menuName1) document.getElementById('menuName1').value = menuName1;
    if (menuName2) document.getElementById('menuName2').value = menuName2;

    if (buttonsState) {
        const menu1Buttons = document.querySelectorAll('#menu1 .button');
        buttonsState.menu1.forEach((active, i) => {
            if (active) menu1Buttons[i].classList.add('active');
        });

        const menu2Buttons = document.querySelectorAll('#menu2 .button');
        buttonsState.menu2.forEach((active, i) => {
            if (active) menu2Buttons[i].classList.add('active');
        });
    }

    const lastUpdated = localStorage.getItem('lastUpdated');
    if (lastUpdated) {
        document.getElementById('last-updated').innerText = `最終更新日時: ${lastUpdated}`;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadData();

    document.getElementById('page-title').addEventListener('input', saveData);
    document.getElementById('menuName1').addEventListener('input', saveData);
    document.getElementById('menuName2').addEventListener('input', saveData);
});
