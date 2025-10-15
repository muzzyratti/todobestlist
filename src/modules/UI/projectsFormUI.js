import Project from '../Logic/projectConstructor.js';
import ProjectManager from '../Logic/projectManager.js';
import { saveData } from '../Data/storageManager.js';

let modalEl = null;
let addBtnEl = null;
let formEl = null;
let cancelBtnEls = null;

let selectProjectCb = null;
let refreshProjectsCb = null;

function initProjectsFormUI(selectProjectFn, refreshProjectsFn) {
  selectProjectCb = selectProjectFn;
  refreshProjectsCb = refreshProjectsFn;

  modalEl = document.getElementById('project-modal');
  addBtnEl = document.getElementById('add-project-btn');
  formEl = document.getElementById('add-project-form');
  cancelBtnEls = document.querySelectorAll('.project-cancel-btn');

  if (!modalEl || !addBtnEl || !formEl) {
    console.warn('projectsFormUI: missing DOM elements (project-modal/add-project-btn/add-project-form).');
    return;
  }

  addBtnEl.addEventListener('click', openModal);

  cancelBtnEls.forEach(btn => btn.addEventListener('click', closeModal));

  formEl.addEventListener('submit', handleSubmit);
}

function openModal() {
  formEl.reset();
  if (typeof modalEl.showModal === 'function') modalEl.showModal();
  else modalEl.style.display = 'block';
}

function closeModal() {
  formEl.reset();
  if (typeof modalEl.close === 'function') modalEl.close();
  else modalEl.style.display = 'none';
}

function handleSubmit(e) {
  e.preventDefault();
  const name = formEl['project-name'].value.trim();
  if (!name) {
    alert('Project name cannot be empty.');
    return;
  }

  const project = new Project(name);
  ProjectManager.addProject(project);
  saveData();

  if (refreshProjectsCb) refreshProjectsCb();

  if (selectProjectCb) selectProjectCb(name);

  closeModal();
}

function openEditProjectModal(project) {
  if (!project) return;

  formEl.reset();
  formEl['project-name'].value = project.projectName;
  modalEl.showModal();

  const oldHandler = handleSubmit;
  formEl.removeEventListener('submit', handleSubmit);

  formEl.addEventListener('submit', function editHandler(e) {
    e.preventDefault();
    const newName = formEl['project-name'].value.trim();
    if (!newName) {
      alert('Poject name cannot be empty.');
      return;
    }

    ProjectManager.updateProjectName(project.projectName, newName);
    saveData();

    if (refreshProjectsCb) refreshProjectsCb();
    if (selectProjectCb) selectProjectCb(newName);

    closeModal();

    formEl.removeEventListener('submit', editHandler);
    formEl.addEventListener('submit', oldHandler);
  });
}


export default { initProjectsFormUI, openEditProjectModal };