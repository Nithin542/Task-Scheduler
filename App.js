const tasks = [];
const completedTasks = [];

document.getElementById("add-task").addEventListener("click", () => {
    const taskInput = document.getElementById("task");
    const prioritySelect = document.getElementById("priority");
    const deadlineInput = document.getElementById("deadline");

    const task = taskInput.value;
    const priority = prioritySelect.value;
    const deadline = deadlineInput.value;

    if (task.trim() === "" || deadline === "") {
        alert("Please enter a task and select a valid deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select a future date for the deadline.");
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        task,
        priority,
        deadline,
        done: false,
    };

    tasks.push(newTask);
    updateTaskList();

    taskInput.value = "";
    prioritySelect.value = "top";
    deadlineInput.value = "";
});

document.getElementById("upcoming-tasks").addEventListener("click", (e) => {
    if (e.target.classList.contains("mark-done")) {
        const taskId = parseInt(e.target.dataset.id, 10);
        const task = tasks.find((t) => t.id === taskId);

        if (task) {
            task.done = true;
            completedTasks.push(task);

            const index = tasks.indexOf(task);
            if (index > -1) {
                tasks.splice(index, 1);
            }

            updateTaskList();
        }
    }
});

function updateTaskList() {
    const upcomingTasks = tasks.filter((t) => !t.done);
    const upcomingTasksTable = document.getElementById("upcoming-tasks");

    upcomingTasksTable.innerHTML = "";

    upcomingTasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.priority}</td>
            <td>${task.deadline}</td>
            <td>
                <button class="mark-done" data-id="${task.id}">Mark Done</button>
            </td>
        `;
        upcomingTasksTable.appendChild(row);
    });

    const completedTasksTable = document.getElementById("completed-tasks");
    completedTasksTable.innerHTML = "";

    completedTasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${task.task}</td>
            <td>${task.priority}</td>
            <td>${task.deadline}</td>
        `;
        completedTasksTable.appendChild(row);
    });
}
