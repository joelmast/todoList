// index.js
import "./styles.css";
import { greeting } from "./greeting.js";
import { format, parseISO, isToday, isPast, differenceInDays } from "date-fns";
// todolist element
let todoList = document.getElementById("todo-list");
// todo element
const todo = document.getElementById("todo");
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
// project class link
const projectLinks = document.querySelectorAll('.project-link');
// .delete-btn
// const deleteBtn = document.querySelector('.delete-btn');


const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
// curent project variable
let currentProject = 0;

// object of project lists
let projects = [
    { name: "defaultProj", todos: [] }
];

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    displayProject(); // If you have this function
    displayTodo();   // If you have this function
});

function loadFromLocalStorage() {
    const savedProjects = localStorage.getItem("todoProjects");
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    }
}
loadFromLocalStorage();

function saveToLocalStorage() {
    localStorage.setItem("todoProjects", JSON.stringify(projects));
}
saveToLocalStorage();

// Event listener for deleteBtn
todoList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        const index = parseInt(target.getAttribute('data-index'));
        projects[currentProject].todos.splice(index, 1);
        saveToLocalStorage();
        displayTodo();
    }
});

// Event listener for the Create project button
createProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
        projects.push({ name: projectName, todos: [] });
        console.log(`Project "${projectName}" created successfully.`);
        // function call to display project list
        saveToLocalStorage();
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


projectList.addEventListener('click', (event) => {
    // Check if the clicked element has the class "project-link"
    if (event.target && event.target.classList.contains('project-link')) {
        console.log("I'm here!!!")
        // Get the data-id which is the project index in the projects array
        let selectedProject = parseInt(event.target.getAttribute('data-id'));
        // subtract 1 from the selected project index to get the correct project index in the projects array
        currentProject = selectedProject;
        // 
        console.log("Selected project:", selectedProject);
        // Call displayTodo() or any other function that should run when a project is selected
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

function addTodo (title, description, dueDate, priority, note) {
    const newTodo = new Todo(title, description, dueDate, priority, note)
    projects[currentProject].todos.push(newTodo);
    saveToLocalStorage();
    displayTodo()
    console.log(projects[currentProject]);
}

// function for displaying project list
function displayProject() {
    projectList.innerHTML = "";
    projects.forEach((project, index) => {
        console.log("This is the index!!", index);
        let projectElement = document.createElement('li');
        projectElement.id = project.name;
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
        <a data-id="${index}" class="project-link" href="#">${project.name}</a>
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

    todoList.innerHTML = "";
    projects[currentProject].todos.forEach((todo, index) => {
        let todoElement = document.createElement('div');
        console.log("Yoo da index is:", index)
        todoElement.id = "todo";
        todoElement.innerHTML = `
        <div class="thumbtack" id="thumbtack"></div> <!-- Thumbtack created with CSS -->
        <h2>${todo.title}</h2>
        <div class="todo-item"><strong>Description:</strong>&nbsp;${todo.description}</div>
        <div class="todo-item"><strong>Due Date:&nbsp;${differenceInDays(new Date(todo.dueDate), new Date())}</strong> days left</div>
        <div class="todo-item priority"><strong>Priority:</strong>&nbsp;${todo.priority}</div>
        <div class="todo-item notes"><strong>Notes:</strong>&nbsp;${todo.note}</div>
        <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(todoElement);
    });
}

console.log(projects.defaultProj);

