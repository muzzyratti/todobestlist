import ProjectManager from '../Logic/projectManager.js';
import TasksFormUI from './tasksFormUI.js';

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
    li.innerHTML = `
      <div class="task-title">${task.taskName}</div>
      <div class="task-meta">
        <span class="tag priority-${task.priority.toLowerCase()}">${task.priority}</span>
        ${task.dueDate ? `<span class="tag date-tag">${task.dueDate}</span>` : ''}
      </div>
    `;
    li.addEventListener('click', () => {
      TasksFormUI.openTaskModal(task);
    });

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
