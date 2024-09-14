// ページの読み込み時にデータを復元
window.onload = function() {
    loadData();
    updateLastUpdatedTime();
};

// ボタンのOn/Off切り替え
function toggleButton(button) {
    button.classList.toggle('active');
    saveData();
}

// ボタン削除
function removeButton(closeBtn) {
    const button = closeBtn.parentElement;
    const container = button.parentElement;
    container.removeChild(button);
    rearrangeButtons(container);
    saveData();
}

// ボタンの再配置
function rearrangeButtons(container) {
    const buttons = container.querySelectorAll('.button');
    buttons.forEach(button => {
        container.appendChild(button);
    });
}

// ボタンの追加
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

// データをローカルストレージに保存
function saveData() {
    const title = document.getElementById('title').value;
    const menu1Name = document.getElementById('menu1-name').value;
    const menu2Name = document.getElementById('menu2-name').value;

    const menu1Buttons = Array.from(document.getElementById('menu1').querySelectorAll('.button')).map(button => button.classList.contains('active'));
    const menu2Buttons = Array.from(document.getElementById('menu2').querySelectorAll('.button')).map(button => button.classList.contains('active'));

    const data = {
        title: title,
        menu1Name: menu1Name,
        menu2Name: menu2Name,
        menu1Buttons: menu1Buttons,
        menu2Buttons: menu2Buttons,
        lastUpdated: new Date().toLocaleString()
    };

    localStorage.setItem('pageData', JSON.stringify(data));
    updateLastUpdatedTime();
}

// データをローカルストレージから復元
function loadData() {
    const savedData = localStorage.getItem('pageData');
    if (savedData) {
        const data = JSON.parse(savedData);

        document.getElementById('title').value = data.title;
        document.getElementById('menu1-name').value = data.menu1Name;
        document.getElementById('menu2-name').value = data.menu2Name;

        // メニュー1のボタン復元
        const menu1 = document.getElementById('menu1');
        menu1.querySelectorAll('.button').forEach(button => button.remove());  // 初期ボタン削除
        data.menu1Buttons.forEach(isActive => {
            const button = document.createElement('div');
            button.classList.add('button');
            if (isActive) button.classList.add('active');
            button.innerHTML = '<span class="close-btn" onclick="removeButton(this)">×</span>';
            button.onclick = function() {
                toggleButton(button);
            };
            menu1.insertBefore(button, menu1.querySelector('.add-button'));
        });

        // メニュー2のボタン復元
        const menu2 = document.getElementById('menu2');
        menu2.querySelectorAll('.button').forEach(button => button.remove());  // 初期ボタン削除
        data.menu2Buttons.forEach(isActive => {
            const button = document.createElement('div');
            button.classList.add('button');
            if (isActive) button.classList.add('active');
            button.innerHTML = '<span class="close-btn" onclick="removeButton(this)">×</span>';
            button.onclick = function() {
                toggleButton(button);
            };
            menu2.insertBefore(button, menu2.querySelector('.add-button'));
        });
    }
}

// 最終更新日時を表示
function updateLastUpdatedTime() {
    const savedData = localStorage.getItem('pageData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const lastUpdatedElement = document.getElementById('last-updated');
        lastUpdatedElement.textContent = `最終更新日時: ${data.lastUpdated}`;
    }
}
