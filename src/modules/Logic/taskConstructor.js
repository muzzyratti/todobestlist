export default class Task {
  constructor(parentProject, id = crypto.randomUUID(), taskName, description, dueDate, priority) {
    this.parentProject = parentProject;
    this.id = id;
    this.taskName = taskName;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}