import Project from "./projectConstructor";

class ProjectManager {
    constructor() {
        this.projectList = [];
    }
    
    addProject(project) {
        this.projectList.push(project);
    }

    deleteProject(projectName) {
        this.projectList = this.projectList.filter(p => p.projectName !== projectName);
    }

    getAllProjects() {
        return this.projectList;
    }
}

export default new ProjectManager();