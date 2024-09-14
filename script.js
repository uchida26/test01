function toggleButton(button) {
    button.classList.toggle('active');
    saveData();
}

function removeButton(closeBtn) {
    const button = closeBtn.parentElement;
    const container = button.parentElement;
    container.removeChild(button);
    saveData();
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
    const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    document.getElementById('last-updated').innerText = `最終更新日時: ${formattedDate}`;
    localStorage.setItem('lastUpdated', formattedDate);
}

function saveData() {
    const title = document.getElementById('page-title').value;
    const menuName1 = document.getElementById('menuName1').value;
    const menuName2 = document.getElementById('menuName2').value;

    const buttonsState = {
        menu1: Array.from(document.querySelectorAll('#menu1 .button')).map(button => button.classList.contains('active')),
        menu2: Array.from(document.querySelectorAll('#menu2 .button')).map(button => button.classList.contains('active'))
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
        const menu1Container = document.getElementById('menu1');
        menu1Container.innerHTML = ''; // 現在のボタンをクリア
        buttonsState.menu1.forEach((active) => {
            const button = document.createElement('div');
            button.classList.add('button');
            if (active) button.classList.add('active');
            button.innerHTML = '<span class="close-btn" onclick="removeButton(this)">×</span>';
            button.onclick = function () {
                toggleButton(button);
            };
            menu1Container.appendChild(button);
        });
        menu1Container.appendChild(createAddButton('menu1')); // 正しい add-button を追加

        const menu2Container = document.getElementById('menu2');
        menu2Container.innerHTML = ''; // 現在のボタンをクリア
        buttonsState.menu2.forEach((active) => {
            const button = document.createElement('div');
            button.classList.add('button');
            if (active) button.classList.add('active');
            button.innerHTML = '<span class="close-btn" onclick="removeButton(this)">×</span>';
            button.onclick = function () {
                toggleButton(button);
            };
            menu2Container.appendChild(button);
        });
        menu2Container.appendChild(createAddButton('menu2')); // 正しい add-button を追加
    }

    const lastUpdated = localStorage.getItem('lastUpdated');
    if (lastUpdated) {
        document.getElementById('last-updated').innerText = `最終更新日時: ${lastUpdated}`;
    }
}

function createAddButton(menuId) {
    const addButton = document.createElement('div');
    addButton.classList.add('add-button');
    addButton.textContent = '+';
    addButton.onclick = function() {
        addButton(menuId);
    };
    return addButton;
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadData();

    document.getElementById('page-title').addEventListener('input', saveData);
    document.getElementById('menuName1').addEventListener('input', saveData);
    document.getElementById('menuName2').addEventListener('input', saveData);
});
