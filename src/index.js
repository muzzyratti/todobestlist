import "./styles.css";
import ProjectManager from './modules/Logic/projectManager.js';
import Project from './modules/Logic/projectConstructor.js';
import Task from './modules/Logic/taskConstructor.js';

const project1 = new Project('Work');
ProjectManager.addProject(project1);

const task1 = new Task(
  project1.projectName,
  undefined,
  'Finish report',
  'Complete the annual report',
  '2023-12-01',
  'High'
);

project1.addTaskToList(task1);

console.log('До удаления проекта:', ProjectManager.getAllProjects());

console.log(project1.taskList);
project1.deleteTaskFromList(task1.id);
console.log(project1.taskList);

ProjectManager.deleteProject(project1.projectName);
console.log('После удаления проекта:', ProjectManager.getAllProjects());