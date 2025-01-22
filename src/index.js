// index.js
import "./styles.css";
import { greeting } from "./greeting.js";

// add todo button
const showBtn = document.getElementById("show-dialog");
// The dialog for adding todos
const dialog = document.getElementById("dialog");
// Close button for the dialog
const jsCloseBtn = document.getElementById("js-close");
// Submit button
const submitBtn = document.getElementsByName("submit");
// The form for adding todos
const todoForm = document.getElementById("todoForm");
// List of todos
const todos = [];


// Event listener for showing dialog
showBtn.addEventListener("click", () => {
    dialog.showModal();
});

// Event listener for closing the dialog
jsCloseBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
});


// Event listener for when the user clicks outside the dialog
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});


// Event listener for the Delete button 


// Event listener for the form submission button
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(todoForm);
    const todoData = {};
    formData.forEach((value, key) => {
        todoData[key] = value;
    });
    console.log(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.notes);
    addTodo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.notes)
    dialog.close();

})


console.log(greeting);

function addTodo (title, description, dueDate, priority, note) {
    const newTodo = new Todo(title, description, dueDate, priority, note)
    todos.push(newTodo);
    displayTodo()
}

function Todo (title, description, dueDate, priority, note) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.note = note;
}

function displayTodo() {
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        let todoElement = document.createElement('div');
        todoElement.id = "todo";
        todoElement.innerHTML = `
        <div class="thumbtack"></div> <!-- Thumbtack created with CSS -->
        <h2>${todo.title}</h2>
        <div class="todo-item"><strong>Description:</strong>&nbsp;${todo.description}</div>
        <div class="todo-item"><strong>Due Date:</strong>&nbsp;${todo.dueDate}</div>
        <div class="todo-item priority"><strong>Priority:</strong>&nbsp;${todo.priority}</div>
        <div class="todo-item notes"><strong>Notes:</strong>&nbsp;${todo.note}</div>
        `;
        todoList.appendChild(todoElement);
    });
}

console.log(todos);

