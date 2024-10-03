document.getElementById('startAppBtn').addEventListener('click', startApp);
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('toggleViewBtn').addEventListener('click', toggleView);
document.getElementById('toggleThemeBtn').addEventListener('click', toggleTheme);

let tasks = [];
let showCompleted = false;
let userName = '';

function startApp() {
    userName = document.getElementById('userName').value;
    if (userName.trim() !== '') {
        document.getElementById('welcomeMessage').innerText = `Welcome, ${userName}!`;
        document.getElementById('taskApp').style.display = 'block';
        document.getElementById('userName').style.display = 'none';
        document.getElementById('startAppBtn').style.display = 'none';
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    if (taskInput !== '') {
        const task = {
            id: Date.now(),
            name: taskInput,
            completed: false
        };
        tasks.push(task);
        document.getElementById('taskInput').value = '';
        updateTaskList();
        updateProgressBar();
    }
}

function updateTaskList() {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = '';

    tasks
        .filter(task => task.completed === showCompleted)
        .forEach(task => {
            const row = document.createElement('tr');
            const taskName = document.createElement('td');
            const actions = document.createElement('td');

            taskName.textContent = task.name;

            const completeBtn = document.createElement('button');
            completeBtn.classList.add('btn', 'btn-success', 'mr-2');
            completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
            completeBtn.addEventListener('click', () => toggleComplete(task.id));

            const editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-warning', 'mr-2');
            editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
            editBtn.addEventListener('click', () => editTask(task.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger');
            deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            actions.appendChild(completeBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            row.appendChild(taskName);
            row.appendChild(actions);
            taskTable.appendChild(row);
        });
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        updateTaskList();
        updateProgressBar();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newTaskName = prompt('Edit Task Name:', task.name);
        if (newTaskName !== null) {
            task.name = newTaskName;
            updateTaskList();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    updateTaskList();
    updateProgressBar();
}

function toggleView() {
    showCompleted = !showCompleted;
    document.getElementById('toggleViewBtn').textContent = showCompleted ? 'Show Pending Tasks' : 'Show Completed Tasks';
    updateTaskList();
}

function updateProgressBar() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById('taskProgress');
    
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
