document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const bgColorButton = document.getElementById("bgColorButton");
    const taskList = document.getElementById("taskList");
    const showAllButton = document.getElementById('showAllButton');
    const showActiveButton = document.getElementById('showActiveButton');
    const showCompletedButton = document.getElementById('showCompletedButton');
    const completedTaskList = document.getElementById('completedTaskList');
    const dueDateInput = document.getElementById('dueDateInput');
     

    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;

            if (task.completed) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => {
                    tasks.splice(index, 1);
                    updateLocalStorage();
                    renderTasks();
                };
                li.appendChild(deleteButton);
                completedTaskList.appendChild(li);
            } else {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.onclick = () => {
                    task.completed = true;
                    updateLocalStorage();
                    renderTasks();
                };

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => {
                    const newText = prompt("Edit Task:", task.text);
                    if (newText) {
                        task.text = newText;
                        updateLocalStorage();
                        renderTasks();
                    }
                };

                li.appendChild(completeButton);
                li.appendChild(editButton);
                taskList.appendChild(li);
            }
        });
    };

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addButton.onclick = () => {
        if (taskInput.value) {
            
            tasks.push({
                text: taskInput.value,
                completed: false,
                dueDate: dueDateInput.value // Save due date
            });
            taskInput.value = '';
            dueDateInput.value = ''; // Clear date input
            updateLocalStorage();
            renderTasks();
        }
        }
    /*

   bgColorButton.onclick = () => {
        document.body.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    };*/

    showAllButton.onclick = renderTasks;
    showActiveButton.onclick = () => {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        tasks.forEach(task => {
            if (!task.completed) {
                const li = document.createElement('li');
                li.textContent = task.text;
                taskList.appendChild(li);
            }
        });
    };
    showCompletedButton.onclick = () => {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        tasks.forEach(task => {
            if (task.completed) {
                const li = document.createElement('li');
                li.textContent = task.text;
                completedTaskList.appendChild(li);
            }
        });
    };

    renderTasks();
});

      
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';

        tasks.forEach((task) => {
            const listItem = document.createElement('li');
            listItem.textContent = task.content;

            if (task.completed) {
                listItem.classList.add('completed');
                completedTaskList.appendChild(listItem);
            } else {
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit');
                editButton.onclick = () => editTask(task.id);
                listItem.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete');
                deleteButton.onclick = () => deleteTask(task.id);
                listItem.appendChild(deleteButton);

                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.onclick = () => toggleCompletion(task.id);
                listItem.appendChild(completeButton);

                taskList.appendChild(listItem);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener("click", () => {
        const taskContent = taskInput.value.trim();
        if (taskContent) {
            const newTask = {
                id: Date.now(),
                content: taskContent,
                completed: false
            };
            tasks.push(newTask);
            renderTasks();
            taskInput.value = '';
        }
    });

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }

    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            taskInput.value = task.content;
            deleteTask(taskId);
        }
    }

    function toggleCompletion(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    }

    bgColorButton.addEventListener("click", () => {
        document.body.style.backgroundColor = getRandomColor();
    });

    /*function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    renderTasks();
});
*/

// Existing addTask function and other code remains the same
document.getElementById('addButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskPriority = document.getElementById('taskPriority');

    const taskText = taskInput.value;
    const deadline = taskDeadline.value;
    const priority = taskPriority.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = `${taskText} (Deadline: ${deadline}, Priority: ${priority})`;

    // Create a complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
        completeTask(li);
    };
    li.appendChild(completeButton);

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        taskList.removeChild(li);
    };
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    taskInput.value = '';
    taskDeadline.value = '';
    taskPriority.value = 'low';
}

let isDarkMode = false;
const app = document.getElementById('app');

document.getElementById('bgColorButton').addEventListener('click', changeBackgroundColor);

function changeBackgroundColor() {
    if (isDarkMode) {
        // 
        //Set body to dark  and app to black 
        document.body.style.backgroundColor = '#000'; // Light background '#333'
        app.style.backgroundColor = '#f0f8ff'; // Light blue background
        app.style.color = '#000'; // Dark text
        isDarkMode = false;
    } else {
        // Set body to light and  app to black 
        document.body.style.backgroundColor = '#f0f8ff' ; // Dark background '#ffffff'
        app.style.backgroundColor = '#000'; // Black background
        app.style.color = '#fff'; // Light text
        isDarkMode = true;
    }
}


