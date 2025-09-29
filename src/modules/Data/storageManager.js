import Project from '../Logic/projectConstructor.js';
import ProjectManager from '../Logic/projectManager.js';
import Task from '../Logic/taskConstructor.js';

const APP_STORAGE = 'allAppData';

export function loadData () {
    const data = localStorage.getItem(APP_STORAGE);
    if (!data) return;

    const parsedData = JSON.parse(data);
    
    parsedData.forEach (projectData => {
        const project = new Project(projectData.name);
        
        projectData.taskList.forEach(taskData => {
            const task = new Task(
                project.projectName,
                taskData.id, 
                taskData.taskName, 
                taskData.description, 
                taskData.dueDate, 
                taskData.priority
            );

            project.addTaskToList(task);
        });
        ProjectManager.addProject(project);
    });

}

export function saveData () {
    localStorage.setItem(APP_STORAGE, JSON.stringify(ProjectManager.getAllProjects()));
}
