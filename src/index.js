import ProjectManager from './modules/Logic/projectManager.js';
import Project from './modules/Logic/projectConstructor.js';
import TaskManager from './modules/Logic/taskManager.js';
import { loadData, saveData } from './modules/Data/storageManager.js';
import ProjectsUI from './modules/UI/projectsUI.js';
import TasksUI from './modules/UI/tasksUI.js';
import TasksFormUI from './modules/UI/tasksFormUI.js';
import ProjectsFormUI from './modules/UI/projectsFormUI.js';

import "./styles.css";


function initAppData() {
    loadData();

    // If no projects exist, create a default project
    if (ProjectManager.getAllProjects().length === 0) {
        const defaultProject = new Project('Default Project');
        ProjectManager.addProject(defaultProject);
        saveData();
    
        // Add a sample task to the default project
        TaskManager.addTaskToProject('Default Project', {
            taskName: 'Sample Task',
            description: 'This is a sample task description.',
            dueDate: new Date().toISOString().split('T')[0],
            priority: 'Medium',
            taskStatus: 'To Do'
        });
        saveData();
    }
  }

initAppData();

let currentProject = null;

// --- 2. Init UI Layer ---
function initAppUI() {
  ProjectsUI.renderProjectsList(onProjectSelect, currentProject);

  const first = ProjectManager.getAllProjects()[0];
  if (first) selectProject(first.projectName);
}

// --- Select Project ---
function selectProject(projectName) {
  currentProject = projectName;

  const titleEl = document.getElementById('current-project-name');
  if (titleEl) titleEl.textContent = `Tasks — ${projectName}`;

  TasksUI.renderTasksList(currentProject);
  ProjectsUI.renderProjectsList(onProjectSelect, currentProject);
}

// --- Callback for UI ---
function onProjectSelect(projectName) {
    selectProject(projectName);
}

function refreshProjectsList() {
  ProjectsUI.renderProjectsList(onProjectSelect);
}

initAppUI();

// --- Getter for current project name ---
function getCurrentProjectName() {
  return currentProject;
}

ProjectsFormUI.initProjectsFormUI(selectProject, refreshProjectsList);
TasksFormUI.initTasksFormUI(getCurrentProjectName, TasksUI.renderTasksList);

// --- Backdrop close: closing modals ---
function enableBackdropClose(dialogId, formId) {
  const dialog = document.getElementById(dialogId) || document.querySelector(dialogId);
  if (!dialog) return;
  const form = formId ? document.getElementById(formId) : dialog.querySelector('form');

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      if (form) form.reset();
    }
  });
}

enableBackdropClose('task-modal', 'add-task-form');
enableBackdropClose('project-modal', 'add-project-form');
