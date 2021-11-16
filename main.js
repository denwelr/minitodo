const addTaskForm = document.forms.addTaskForm;
const taskContainer = document.querySelector('#items');
const searchFormInput = document.forms.searchForm.searchInput;

const createTask = taskName => {
    taskContainer.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item" data-task="${taskName}">
            ${taskName}

            <button data-action="delete" type="button" class="btn btn-light btn-sm float-right">
                Удалить
            </button>
        </li>
    `);
};

const getTasks = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const task = localStorage.key(i);

        createTask(localStorage.getItem(task));
    }
};
getTasks();

const addTask = event => {
    event.preventDefault();

    const taskName = addTaskForm.taskName.value;
    createTask(taskName);

    localStorage.setItem(taskContainer.children.length - 1, taskName);

    addTaskForm.reset();
};

const removeTask = event => {
    const target = event.target.closest('[data-action="delete"]');
    if(!target) return;

    const taskName = target.closest('.list-group-item').getAttribute('data-task');

    if(confirm(`Вы уверены, что хотите удалить задачу «${taskName}»?`)) {
        target.closest('.list-group-item').remove();

        for (let i = 0; i < localStorage.length; i++) {
            const task = localStorage.key(i);

            if(localStorage.getItem(task) === taskName) {
                localStorage.removeItem(task);
                break;
            }
        }
    }
};

const filterTasks = event => {
    const tasks = Array.from(taskContainer.children);

    tasks.forEach(task => {
        const taskName = task.firstChild.textContent.toLowerCase();
        
        if(taskName.includes(searchFormInput.value.toLowerCase())) {
            task.hidden = false;
        } else {
            task.hidden = true;
        }
    });
};

addTaskForm.addEventListener('submit', addTask);
taskContainer.addEventListener('click', removeTask);
searchFormInput.addEventListener('input', filterTasks);
