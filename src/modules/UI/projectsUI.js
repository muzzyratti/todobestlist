import ProjectManager from '../Logic/projectManager.js';

const projectsContainer = document.getElementById('project-list');
let onProjectSelectCallback = null;

function renderProjectsList (onSelect) {
    onProjectSelectCallback = onSelect;

    const projects = ProjectManager.getAllProjects();
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const li = document.createElement('li');
        li.classList.add('project-item');
        li.textContent = project.projectName;

        li.addEventListener('click', () => {
            if (onProjectSelectCallback) onProjectSelectCallback(project.projectName);
        });

        projectsContainer.appendChild(li);
    });

}

function highlightProject(projectName) {
    const items = projectsContainer.querySelectorAll('.project-item');
    items.forEach(item => {
        if (item.textContent === projectName) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

export default { renderProjectsList, highlightProject };