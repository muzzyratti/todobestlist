export default class Project {
    constructor(name) {
        this.projectName = name;
        this.taskList = [];
    }

    addTaskToList(task) {
        this.taskList.push(task);
    }

    deleteTaskFromList(taskId) {
        this.taskList = this.taskList.filter(t => t.id !== taskId);
    }
}