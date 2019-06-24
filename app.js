// Check if there's data stored already, using localStorage instead of database for now :±)

let todos = [];
let todosHistory = JSON.parse(localStorage.getItem('todos'));
// Set dummy data if no storage is known
if (!todosHistory) {
    todos = ['Groceries', 'Buy exquisite wine', 'Just kidding', 4];
} else {
    // update todos array with the localstorage values
    todos = todosHistory;
}

// Elements
const list = document.querySelector('.list');
const input = document.querySelector('.input-button');
const submit = document.querySelector('.js-push');

// Add new value to the localstorage, resets inputfield for usabillity
submit.addEventListener('click', () => {
    let newValue = input.value;
    todos.push(newValue);
    input.value = '';
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
});

// Loops through our database and displays the items
function displayItems() {
    listItems = todos.reduce((items, val, i) => {
        items += `<li data-index="${i}"><input class="todo-item" value="${val}"></input><button class="remove">x</button></li>`;

        return items;
    }, '');

    list.innerHTML = listItems;
}

// Render function
function render() {
    displayItems();
    bindRemoveButton();
    inputState();
}

// Save new items to the localStorage
function saveItems() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Don't do anything if there's no index, else update the value
function updateItem(i, todoItem) {
    if (!i) {
        return;
    }

    const updatedValue = todoItem.value;
    todos.splice(i, 1, updatedValue);
    saveItems();
}

// Delete the item and the index, which recalculates the indexes
function deleteItem(removeItemIndex) {
    if (!removeItemIndex) {
        return;
    }

    todos.splice(removeItemIndex, 1);
    saveItems();
    render();
}

// Bind the remove button
function bindRemoveButton() {
    const removeItems = document.querySelectorAll('.remove');
    removeItems.forEach(removeItem => {
        removeItem.addEventListener('click', () => {
            deleteItem(removeItem.parentElement.dataset.index);
        });
    });
}

// Listens to the inputstate
function inputState() {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(todoItem => {
        todoItem.addEventListener('input', () => {
            let i = todoItem.parentElement.dataset.index;
            updateItem(i, todoItem);
        });
    });
}

render();
