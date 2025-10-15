import ProjectManager from '../Logic/projectManager.js';
import ProjectsFormUI from './projectsFormUI.js'; 
import { saveData } from '../Data/storageManager.js';

const projectsContainer = document.getElementById('project-list');

let onProjectSelectCallback = null;

function renderProjectsList(onSelect, activeProjectName = null) {
  onProjectSelectCallback = onSelect;

  const projects = ProjectManager.getAllProjects();
  projectsContainer.innerHTML = '';

  projects.forEach(project => {
    const li = document.createElement('li');
    li.classList.add('project-item');
    li.textContent = project.projectName;

    if (activeProjectName && project.projectName === activeProjectName) {
      li.classList.add('active');

      const btnWrapper = document.createElement('span');
      btnWrapper.classList.add('project-actions');

      const editBtn = document.createElement('button');
      editBtn.textContent = '✏️';
      editBtn.classList.add('project-edit-btn');
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ProjectsFormUI.openEditProjectModal(project);
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.classList.add('project-delete-btn');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        ProjectManager.deleteProject(project.projectName);
        saveData();

        renderProjectsList(onSelect);

        const remaining = ProjectManager.getAllProjects();
        if (remaining.length > 0) onSelect(remaining[0].projectName);
      });

      btnWrapper.append(editBtn, delBtn);
      li.appendChild(btnWrapper);
    }

    li.addEventListener('click', () => {
      if (onProjectSelectCallback) onProjectSelectCallback(project.projectName);
    });

    projectsContainer.appendChild(li);
  });
}

function highlightProject(projectName) {
  const items = projectsContainer.querySelectorAll('.project-item');
  items.forEach(item => {
    if (item.textContent === projectName) item.classList.add('active');
    else item.classList.remove('active');
  });
}

export default { renderProjectsList, highlightProject };
