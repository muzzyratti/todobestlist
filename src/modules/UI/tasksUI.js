import ProjectManager from '../Logic/projectManager.js';
import TasksFormUI from './tasksFormUI.js';
import TaskManager from '../Logic/taskManager.js';
import { saveData } from '../Data/storageManager.js';

const todoContainer = document.getElementById('to-do-list');
const inProgressContainer = document.getElementById('in-progress-list');
const doneContainer = document.getElementById('done-list');

function clearAllLists() {
  todoContainer.innerHTML = '';
  inProgressContainer.innerHTML = '';
  doneContainer.innerHTML = '';
}

function createTaskElement(task, projectName) {
  const li = document.createElement('li');
  li.classList.add('task-item');

  // --- Task content ---
  const titleSpan = document.createElement('span');
  titleSpan.textContent = `${task.taskName} (${task.priority})`;

  // --- Div for buttons ---
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('task-buttons');

  // --- Edit button ---
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-task-btn');
  editBtn.textContent = '✏️';
  editBtn.title = 'Edit task';
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    TasksFormUI.openTaskModal(task);
  });

  // --- Delete button ---
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-task-btn');
  deleteBtn.textContent = '🗑️';
  deleteBtn.title = 'Delete task';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    TaskManager.deleteTaskFromProject(projectName, task.id);
    saveData();
    renderTasksList(projectName);
  });

  // --- Adding all elements to div ---
  buttonsDiv.append(editBtn, deleteBtn);
  li.append(titleSpan, buttonsDiv);

  return li;
}

// --- Render all task lists ---
function renderTasksList(projectName) {
  const project = ProjectManager.getProjectByName(projectName);
  if (!project) return;

  clearAllLists();

  project.taskList.forEach(task => {
    const taskEl = createTaskElement(task, projectName);

    switch (task.taskStatus) {
      case 'To Do':
        todoContainer.appendChild(taskEl);
        break;
      case 'In Progress':
        inProgressContainer.appendChild(taskEl);
        break;
      case 'Done':
        doneContainer.appendChild(taskEl);
        break;
    }
  });
}

export default { renderTasksList };