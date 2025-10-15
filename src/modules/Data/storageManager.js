import Project from '../Logic/projectConstructor.js';
import ProjectManager from '../Logic/projectManager.js';
import Task from '../Logic/taskConstructor.js';
import taskManager from '../Logic/taskManager.js';

const APP_STORAGE = 'allAppData';

export function loadData () {
    const data = localStorage.getItem(APP_STORAGE);
    if (!data) return;

    ProjectManager.projectList = [];

    const parsedData = JSON.parse(data);
    
    parsedData.forEach (projectData => {
        const project = new Project(projectData.projectName);
        
        projectData.taskList.forEach(taskData => {
            const task = new Task(
                project.projectName,
                taskData.id, 
                taskData.taskName, 
                taskData.description, 
                taskData.dueDate, 
                taskData.priority,
                taskData.taskStatus
            );

            project.taskList.push(task);
        });
        ProjectManager.addProject(project);
    });

}

export function saveData() {
  const dataToSave = ProjectManager.getAllProjects().map(project => ({
    projectName: project.projectName,
    taskList: project.taskList.map(task => ({
      parentProject: task.parentProject,
      id: task.id,
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      taskStatus: task.taskStatus
    }))
  }));

  localStorage.setItem(APP_STORAGE, JSON.stringify(dataToSave));
}