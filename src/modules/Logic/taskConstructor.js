export default class Task {
  constructor(projectName, id = crypto.randomUUID(), taskName, description, dueDate, priority) {
    this.parentProject = projectName;
    this.id = id;
    this.taskName = taskName;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}