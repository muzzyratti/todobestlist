import ProjectManager from '../Logic/projectManager.js';

const todoContainer = document.getElementById('to-do-list');
const inProgressContainer = document.getElementById('in-progress-list');
const doneContainer = document.getElementById('done-list');

function clearAllLists() {
  todoContainer.innerHTML = '';
  inProgressContainer.innerHTML = '';
  doneContainer.innerHTML = '';
}

function renderTasksList(projectName) {
    const project = ProjectManager.getProjectByName(projectName);
    if (!project) return;

    clearAllLists();

    project.taskList.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.textContent = `${task.taskName} (${task.priority})`;

        switch (task.taskStatus) {
            case 'To Do':
                todoContainer.appendChild(li);
                break;
            case 'In Progress':
                inProgressContainer.appendChild(li);
                break;
            case 'Done':
                doneContainer.appendChild(li);
                break;
        }
    });
}

export default { renderTasksList };