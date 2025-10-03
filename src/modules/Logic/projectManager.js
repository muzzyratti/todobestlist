import { saveData } from "../Data/storageManager";

class ProjectManager {
    constructor() {
        this.projectList = [];
    }
    
    addProject(project) {
        this.projectList.push(project);
        saveData();
    }

    deleteProject(projectName) {
        this.projectList = this.projectList.filter(p => p.projectName !== projectName);
        saveData();
    }

    getProjectByName(projectName) {
        return this.projectList.find(p => p.projectName === projectName);
    }

    getAllProjects() {
        return this.projectList;
    }

    updateProjectName(oldName, newName) {
        const project = this.getProjectByName(oldName);
        if (!project) return;

        project.projectName = newName;
        project.taskList.forEach(task => {
            task.parentProject = newName;
        });
        saveData();
    }

}

export default new ProjectManager();