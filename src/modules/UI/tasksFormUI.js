import TaskManager from '../Logic/taskManager.js';
import { saveData } from '../Data/storageManager.js';

let taskModalEl = null;
let addTaskBtnEl = null;
let formEl = null;
let deleteBtnEl = null;

let getCurrentProjectName = null;
let refreshTasksCallback = null;
let editingTask = null;

function initTasksFormUI(getProjectNameFn, refreshCb) {
  getCurrentProjectName = getProjectNameFn;
  refreshTasksCallback = refreshCb;

  taskModalEl = document.getElementById('task-modal');
  addTaskBtnEl = document.getElementById('add-task-btn');
  formEl = document.getElementById('add-task-form');
  deleteBtnEl = document.getElementById('delete-task-btn');

  if (!formEl || !taskModalEl || !addTaskBtnEl) return;

  addTaskBtnEl.addEventListener('click', (e) => {
    e.stopPropagation();
    openTaskModal(null);
  });

  const cancelBtnEl = document.getElementById('task-cancel-btn');
  if (cancelBtnEl) {
    cancelBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  formEl.addEventListener('submit', handleSubmit);

  if (deleteBtnEl) {
    deleteBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!editingTask) return;
      const projectName = getCurrentProjectName && getCurrentProjectName();
      if (!projectName) return;
      if (!confirm('Sure?')) return;
      TaskManager.deleteTaskFromProject(projectName, editingTask.id);
      saveData();
      if (refreshTasksCallback) refreshTasksCallback(projectName);
      closeModal();
    });
  }
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
    if (deleteBtnEl) deleteBtnEl.style.display = 'inline-flex';
  } else {
    formEl.reset();
    formEl['taskStatus'].value = 'To Do';
    formEl['priority'].value = 'Medium';
    if (deleteBtnEl) deleteBtnEl.style.display = 'none';
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
    taskStatus: formEl['taskStatus'].value || 'To Do',
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
