const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  let filtered = tasks.filter(t => 
    currentFilter === "all" ? true : 
    currentFilter === "completed" ? t.completed : !t.completed
  );

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-text">
        <strong>${task.text}</strong><br/>
        <span class="task-time">${task.dateTime || ""}</span>
      </div>
      <div class="actions">
        <button class="action-btn" onclick="toggleComplete(${index})">✔️</button>
        <button class="action-btn" onclick="editTask(${index})">✏️</button>
        <button class="action-btn" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text, dateTime, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskDateTime.value = "";
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

renderTasks();
