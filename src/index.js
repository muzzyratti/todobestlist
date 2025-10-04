import ProjectManager from './modules/Logic/projectManager.js';
import Project from './modules/Logic/projectConstructor.js';
import TaskManager from './modules/Logic/taskManager.js';
import { loadData, saveData } from './modules/Data/storageManager.js';


function initializeAppData() {
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
            taskStatus: 'Incomplete'
        });
        saveData();
    }
  }

initializeAppData();