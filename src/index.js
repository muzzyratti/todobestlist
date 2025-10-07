import ProjectManager from './modules/Logic/projectManager.js';
import Project from './modules/Logic/projectConstructor.js';
import TaskManager from './modules/Logic/taskManager.js';
import { loadData, saveData } from './modules/Data/storageManager.js';
import ProjectsUI from './modules/UI/projectsUI.js';
import TasksUI from './modules/UI/tasksUI.js';

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
    ProjectsUI.renderProjectsList(onProjectSelect);

    const first = ProjectManager.getAllProjects()[0];
    if (first) selectProject(first.projectName);
}

// --- Select Project ---
function selectProject(projectName) {
    currentProject = projectName;
    TasksUI.renderTasksList(currentProject);
    ProjectsUI.highlightProject(currentProject);
}

// --- Callback for UI ---
function onProjectSelect(projectName) {
    selectProject(projectName);
}

initAppUI();