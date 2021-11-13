const addTaskForm = document.forms.addTaskForm;
const taskContainer = document.querySelector('#items');
const searchFormInput = document.forms.searchForm.searchInput;

const addTask = event => {
    event.preventDefault();

    const taskName = addTaskForm.taskName.value;

    taskContainer.insertAdjacentHTML('afterbegin', `
        <li class="list-group-item" data-task="${taskName.toLowerCase()}">
            ${taskName}

            <button data-action="delete" type="button" class="btn btn-light btn-sm float-right">
                Удалить
            </button>
        </li>
    `);

    addTaskForm.reset();
};

const removeTask = event => {
    const target = event.target.closest('[data-action="delete"]');

    if(!target) return;

    if(confirm(`Вы уверены, что хотите удалить задачу «${target.closest('.list-group-item').getAttribute('data-task')}»?`)) {
        target.closest('.list-group-item').remove();
    }
};

const filterTasks = event => {
    for (const task of taskContainer.children) {
        const taskName = task.firstChild.textContent.toLowerCase();
        
        if(taskName.includes(searchFormInput.value)) {
            task.hidden = false;
        } else {
            task.hidden = true;
        }
    }
};

addTaskForm.addEventListener('submit', addTask);
taskContainer.addEventListener('click', removeTask);
searchFormInput.addEventListener('input', filterTasks);
