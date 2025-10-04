import { saveData } from "../Data/storageManager";
import Task from "./taskConstructor";
import projectManager from "./projectManager";

class TaskManager {
    addTaskToProject(projectName, taskData) {
        const project = projectManager.getProjectByName(projectName);
        if (!project) return;

        const newTask = new Task(
            projectName,
            undefined,
            taskData.taskName,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.taskStatus
        );

        project.taskList.push(newTask);
        saveData();
    }

    deleteTaskFromProject(projectName, taskId) {
        const project = projectManager.getProjectByName(projectName);
        if (!project) return;

        project.taskList = project.taskList.filter(t => t.id !== taskId);
        saveData();
    }

    updateTaskInProject(projectName, taskId, updatedData) {
        const project = projectManager.getProjectByName(projectName);
        if (!project) return;
        
        const task = project.taskList.find(t => t.id === taskId);
        if (!task) return;

        Object.assign(task, updatedData);
        saveData();
    }

}

export default new TaskManager();