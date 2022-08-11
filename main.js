///////////////
// shortcuts //
///////////////

// variables
const shortcutsContainer = document.querySelector('#shortcuts');
const shortcutsNode = shortcutsContainer.childNodes;
const setShortcutForm = document.querySelector('#set-shortcut');
const shortcutId = setShortcutForm.querySelector('#shortcut-id');
const shortcutNameInput = setShortcutForm.querySelector('#shortcut-name');
const shortcutUrlInput = setShortcutForm.querySelector('#shortcut-url');
const cancelShortcutFormBtn = setShortcutForm.querySelector('#set-shortcut-cancel');

// functions
function creatShortcut(index) {
    let name = localStorage.getItem(`shortcut${index}name`);
    let url = localStorage.getItem(`shortcut${index}url`);
    let icon = localStorage.getItem(`shortcut${index}ico`);
    let tagName = ((name === null || name == '') ? 'div' : 'a');
    const shortcut = document.createElement(tagName);
    const shotcutImg = document.createElement('img');
    const shortcutTitle = document.createElement('p');
    
    if (tagName === 'a') {
        shortcut.href = url;
        shotcutImg.src = icon;
        shortcutTitle.innerText = name;
    } else {
        shotcutImg.src = "./res/plus-solid.svg";
        shortcutTitle.innerText = "ADD";
    }
    shotcutImg.classList.add("shortcut-img");
    shortcut.id = 'shortcut' + index;
    shortcut.classList.add('container', 'shortcut', 'flex');

    shortcut.appendChild(shotcutImg);
    shortcut.appendChild(shortcutTitle);
    return shortcut
}

function loadShortcuts() {
    shortcutsContainer.innerHTML = '';
    for (let index = 0; index < 8; index++) {
        const shortcut = creatShortcut(index);
        shortcutsContainer.appendChild(shortcut);
    }
}

function setShortcut(event) {
    let shortcut = event.target;
    if (shortcut.tagName != 'DIV' && shortcut.tagName != 'A') {
        shortcut = shortcut.parentElement;
    }
    setShortcutForm.classList.replace('hidden', 'shown');
    shortcutId.value = shortcut.id;
}

function resetShortcutForm() {
    shortcutNameInput.value = '';
    shortcutUrlInput.value = '';
    setShortcutForm.classList.replace('shown', 'hidden');
    loadShortcuts();
    toggleEditMode();
}

// event listeners
setShortcutForm.addEventListener('submit', () => {
    localStorage.setItem(shortcutId.value + 'name', shortcutNameInput.value);
    localStorage.setItem(shortcutId.value + 'url', shortcutUrlInput.value);
    localStorage.setItem(shortcutId.value + 'ico', `https://s2.googleusercontent.com/s2/favicons?domain=${shortcutUrlInput.value}&sz=32`);
    resetShortcutForm();
})

cancelShortcutFormBtn.addEventListener('click', resetShortcutForm)

// calls
loadShortcuts();

///////////////
// edit mode //
///////////////

// variables
let editMode = false;
const editModeBtn = document.querySelector('#edit');

// functions
function toggleEditMode() {
    if (editMode) {
        shortcutsNode.forEach(element => {
            element.removeEventListener('click', setShortcut);
            element.classList.remove('edit-mode');
            if (element.tagName == "DIV") {
                element.style.cursor = 'default';
            } else {
                element.href = localStorage.getItem(element.id + 'url');
            }
        })
        editModeBtn.classList.replace('active', 'inactive');
        editMode = false;
    } else {
        shortcutsNode.forEach(element => {
            element.addEventListener('click', setShortcut);
            element.classList.add('edit-mode');
            if (element.tagName == "DIV") {
                element.style.cursor = 'pointer';
            } else {
                element.href = '#';
            }
        })
        editModeBtn.classList.replace('inactive', 'active');
        editMode = true;
    }
}

// event listeners
editModeBtn.addEventListener('click', toggleEditMode)
