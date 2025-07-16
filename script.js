let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const meta = document.createElement('div');
    meta.classList.add('task-meta');

    const name = document.createElement('div');
    name.classList.add('task-name', `priority-${task.priority.toLowerCase()}`);
    name.textContent = task.name;

    const cat = document.createElement('div');
    cat.classList.add('task-category');
    cat.textContent = `📂 ${task.category}`;

    const date = document.createElement('div');
    date.classList.add('task-date');
    date.textContent = `🗓️ Due: ${task.dueDate}`;

    meta.appendChild(name);
    meta.appendChild(cat);
    meta.appendChild(date);

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️ Delete';
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(meta);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const name = document.getElementById('taskName').value.trim();
  const category = document.getElementById('category').value;
  const priority = document.getElementById('priority').value;
  const dueDate = document.getElementById('dueDate').value;

  if (!name || !dueDate) {
    alert('Please enter both a task and a due date.');
    return;
  }

  const task = { name, category, priority, dueDate };
  tasks.push(task);
  updateTasks();

  // Clear form
  document.getElementById('taskForm').reset();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Theme toggle
document.getElementById('toggleTheme').addEventListener('click', () => {
  const html = document.documentElement;
  const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  renderTasks();
  document.getElementById('taskForm').addEventListener('submit', addTask);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log("✅ Service Worker registered"))
    .catch((err) => console.log("❌ SW registration failed:", err));
}
