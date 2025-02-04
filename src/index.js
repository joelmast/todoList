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
// The project list
const projectList = document.getElementById("project-list");
// Create new project button
const createProjectBtn = document.getElementById("create-project");
// project item class
const projectItems = document.querySelectorAll('.project-item');
console.log(projectItems + "yoooo")

const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
// curent project variable
let currentProject = 0;
// List of todos in default project
// const defaultProj = [];
// object of project lists
let projects = [
    { name: "defaultProj", todos: [] }
];
console.log(projects);

// Event listener for the Create project button
createProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
        projects.push({ name: projectName, todos: [] });
        alert(`Project "${projectName}" created successfully.`);
        // function call to display project list
        displayProject();
    }
    console.log(projects);
});

// Event listener for the hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    container.classList.toggle('active');
});

// event listener for the all the projectItems with .foreach
projectItems.addEventListener('click', (event) => {
    console.log("I was here!!")
    console.log(event.target)
    if (event.target.classList.contains('project-item')) {
        currentProject = e.target.id;
        console.log("I was here!!")
        console.log(currentProject);
        displayTodo();
    }
});


// Close menu when clicking on a link
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        container.classList.remove('active');
    });
});

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
    projects[currentProject].todos.push(newTodo);
    displayTodo()
    console.log(projects[currentProject]);
}

// function for displaying project list
function displayProject() {
    projectList.innerHTML = "";
    projects.forEach((project, index) => {
        let projectElement = document.createElement('li');
        projectElement.id = project.name;
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
        <a href="#">${project.name}</a>
        `;
        projectList.appendChild(projectElement);
    });
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
    projects[currentProject].todos.forEach((todo, index) => {
        let todoElement = document.createElement('div');
        todoElement.id = "todo";
        todoElement.innerHTML = `
        <div class="thumbtack" id="thumbtack"></div> <!-- Thumbtack created with CSS -->
        <h2>${todo.title}</h2>
        <div class="todo-item"><strong>Description:</strong>&nbsp;${todo.description}</div>
        <div class="todo-item"><strong>Due Date:</strong>&nbsp;${todo.dueDate}</div>
        <div class="todo-item priority"><strong>Priority:</strong>&nbsp;${todo.priority}</div>
        <div class="todo-item notes"><strong>Notes:</strong>&nbsp;${todo.note}</div>
        `;
        todoList.appendChild(todoElement);
    });
}

console.log(projects.defaultProj);

