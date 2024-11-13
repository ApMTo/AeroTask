export class NewTask {
  id: string;
  userId: string;
  title: string;
  task: string;
  status: "Pending";
  isCompleted: boolean;
  priority: string;
  isEdited: boolean;

  constructor(
    id: string,
    userId: string,
    title: string,
    task: string,
    status: "Pending",
    isCompleted: boolean,
    priority: string,
    isEdited: boolean
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.task = task;
    this.status = status;
    this.isCompleted = isCompleted;
    this.priority = priority;
    this.isEdited = isEdited;
  }
}
