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

function addButtonFunction(menuId) {
    const container = document.getElementById(menuId);
    const newButton = document.createElement('div');
    newButton.classList.add('button');
    newButton.innerHTML = `
        <input type="text" placeholder="追加" class="button-text" onclick="event.stopPropagation();"/>
        <span class="close-btn" onclick="removeButton(this)">×</span>
    `;
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
        menu1: Array.from(document.querySelectorAll('#menu1 .button')).map(button => ({
            active: button.classList.contains('active'),
            text: button.querySelector('.button-text').value
        })),
        menu2: Array.from(document.querySelectorAll('#menu2 .button')).map(button => ({
            active: button.classList.contains('active'),
            text: button.querySelector('.button-text').value
        }))
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
    const buttonsStateStr = localStorage.getItem('buttonsState');
    const buttonsState = buttonsStateStr ? JSON.parse(buttonsStateStr) : null;

    if (title) document.getElementById('page-title').value = title;
    if (menuName1) document.getElementById('menuName1').value = menuName1;
    if (menuName2) document.getElementById('menuName2').value = menuName2;

    const menu1Container = document.getElementById('menu1');
    const menu2Container = document.getElementById('menu2');

    menu1Container.innerHTML = ''; // 現在のボタンをクリア
    menu2Container.innerHTML = ''; // 現在のボタンをクリア

    if (buttonsState) {
        buttonsState.menu1.forEach(({ active, text }) => {
            const button = document.createElement('div');
            button.classList.add('button');
            if (active) button.classList.add('active');
            button.innerHTML = `
                <input type="text" value="${text}" placeholder="追加" class="button-text" onclick="event.stopPropagation();" />
                <span class="close-btn" onclick="removeButton(this)">×</span>
            `;
            button.onclick = function () {
                toggleButton(button);
            };
            menu1Container.appendChild(button);
        });

        buttonsState.menu2.forEach(({ active, text }) => {
            const button = document.createElement('div');
            button.classList.add('button');
            if (active) button.classList.add('active');
            button.innerHTML = `
                <input type="text" value="${text}" placeholder="追加" class="button-text" onclick="event.stopPropagation();" />
                <span class="close-btn" onclick="removeButton(this)">×</span>
            `;
            button.onclick = function () {
                toggleButton(button);
            };
            menu2Container.appendChild(button);
        });
    } else {
        // データが存在しない場合、各メニューに3つのデフォルトボタンを追加
        const defaultValues = [
            { text: 'ホテル', active: true },
            { text: '', active: false },
            { text: '', active: false }
        ];

        defaultValues.forEach(({ text, active }, index) => {
            const button1 = document.createElement('div');
            button1.classList.add('button');
            if (index === 0 && active) button1.classList.add('active');  // 最初のボタンをアクティブに
            button1.innerHTML = `
                <input type="text" value="${text}" placeholder="追加" class="button-text" onclick="event.stopPropagation();" />
                <span class="close-btn" onclick="removeButton(this)">×</span>
            `;
            button1.onclick = function () {
                toggleButton(button1);
            };
            menu1Container.appendChild(button1);
        });

        const defaultValues2 = [
            { text: '縄', active: true },
            { text: '', active: false },
            { text: '', active: false }
        ];

        defaultValues2.forEach(({ text, active }, index) => {
            const button2 = document.createElement('div');
            button2.classList.add('button');
            if (index === 0 && active) button2.classList.add('active');  // 最初のボタンをアクティブに
            button2.innerHTML = `
                <input type="text" value="${text}" placeholder="追加" class="button-text" onclick="event.stopPropagation();" />
                <span class="close-btn" onclick="removeButton(this)">×</span>
            `;
            button2.onclick = function () {
                toggleButton(button2);
            };
            menu2Container.appendChild(button2);
        });
    }

    menu1Container.appendChild(createAddButton('menu1'));
    menu2Container.appendChild(createAddButton('menu2'));

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
        addButtonFunction(menuId);
    };
    return addButton;
}

document.addEventListener('DOMContentLoaded', loadData);
