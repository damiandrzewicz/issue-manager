import TaskPriorityModel from "@/domain/TaskPriorityModel"

export default class TaskModel{
    id;
    projectId;
    name;
    description;
    created;
    started;
    closed;
    deadline;
    priority;
    tags;
    estimatedPoodoro;
    currentPomodoro;
    currentPercent;
    externalUrl;
    externalUrlShortcut;
    labelColor;


    constructor(data = null){
        this.id = null;
        this.projectId = null;
        this.name = null;
        this.description = null;
        this.created = null;
        this.started = null,
        this.closed = null;
        this.deadline = null;
        this.priority = TaskPriorityModel.No;
        this.tags = [];
        this.estimatedPoodoro = 1;
        this.currentPomodoro = 0;
        this.currentPercent = 0;
        this.externalUrl = null;
        this.externalUrlShortcut = null;
        this.labelColor = 'white';

        if(data){
            Object.assign(this, data);
        } 
    }
}