import TaskManager from '../Logic/taskManager.js';
import { saveData } from '../Data/storageManager.js';

let taskModalEl = null;
let addTaskBtnEl = null;
let formEl = null;
let cancelBtnEl = null;

let getCurrentProjectName = null;
let refreshTasksCallback = null;
let editingTask = null;

function initTasksFormUI(getProjectNameFn, refreshCb) {
  getCurrentProjectName = getProjectNameFn;
  refreshTasksCallback = refreshCb;

  taskModalEl = document.getElementById('task-modal');
  addTaskBtnEl = document.getElementById('add-task-btn');
  formEl = document.getElementById('add-task-form');
  cancelBtnEl = document.querySelectorAll('.task-cancel-btn');

  if (!formEl || !taskModalEl || !addTaskBtnEl) return;

  addTaskBtnEl.addEventListener('click', () => openTaskModal(null));
  cancelBtnEl.forEach(btn => btn.addEventListener('click', closeModal));
  formEl.addEventListener('submit', handleSubmit);
}

function openTaskModal(task = null) {
  editingTask = task;
  if (!formEl || !taskModalEl) return;

  if (task) {
    formEl['task-name'].value = task.taskName || '';
    formEl['description'].value = task.description || '';
    formEl['dueDate'].value = task.dueDate || '';
    formEl['priority'].value = task.priority || 'Medium';
    formEl['taskStatus'].value = task.taskStatus || 'To Do';
  } else {
    formEl.reset();
    formEl['taskStatus'].value = 'To Do';
    formEl['priority'].value = 'Medium';
  }

  const existingDeleteBtn = formEl.querySelector('.delete-task-btn');
  if (existingDeleteBtn) existingDeleteBtn.remove();

  if (task) {
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = '🗑';
    deleteBtn.classList.add('delete-task-btn');

    deleteBtn.addEventListener('click', () => {
      if (confirm('Sure?')) {
        const projectName = getCurrentProjectName && getCurrentProjectName();
        if (projectName) {
          TaskManager.deleteTaskFromProject(projectName, task.id);
          saveData();
          if (refreshTasksCallback) refreshTasksCallback(projectName);
          closeModal();
        }
      }
    });

    formEl.appendChild(deleteBtn);
  }

  if (typeof taskModalEl.showModal === 'function') {
    taskModalEl.showModal();
  } else {
    taskModalEl.style.display = 'block';
  }
}

function closeModal() {
  if (!formEl || !taskModalEl) return;
  formEl.reset();
  editingTask = null;
  const existingDeleteBtn = formEl.querySelector('.delete-task-btn');
  if (existingDeleteBtn) existingDeleteBtn.remove();
  if (typeof taskModalEl.close === 'function') {
    taskModalEl.close();
  } else {
    taskModalEl.style.display = 'none';
  }
}

function handleSubmit(e) {
  e.preventDefault();
  if (!formEl) return;

  const projectName = getCurrentProjectName && getCurrentProjectName();
  if (!projectName) {
    alert('Choose a project first');
    return;
  }

  const data = {
    taskName: formEl['task-name'].value.trim(),
    description: formEl['description'].value.trim(),
    dueDate: formEl['dueDate'].value || '',
    priority: formEl['priority'].value || 'Medium',
    taskStatus: formEl['taskStatus'].value || 'To Do'
  };

  if (!data.taskName) {
    alert('Task name is required');
    return;
  }

  if (editingTask) {
    TaskManager.updateTaskInProject(projectName, editingTask.id, data);
  } else {
    TaskManager.addTaskToProject(projectName, data);
  }

  saveData();
  if (refreshTasksCallback) refreshTasksCallback(projectName);
  closeModal();
}

export default { initTasksFormUI, openTaskModal };
