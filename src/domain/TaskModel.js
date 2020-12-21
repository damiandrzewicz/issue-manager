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
    stateMessages;
    workflowNumber;


    constructor(data = null){
        this.id = null;
        this.projectId = null;
        this.name = null;
        this.description = null;
        this.created = null;
        this.started = [],
        this.closed = [];
        this.deadline = null;
        this.priority = TaskPriorityModel.No;
        this.tags = [];
        this.estimatedPoodoro = 1;
        this.currentPomodoro = 0;
        this.progress = [];
        this.externalUrl = null;
        this.externalUrlShortcut = "Link";
        this.labelColor = 'white';
        this.stateMessages = [];
        this.workflowNumber = 0;

        if(data){
            Object.assign(this, data);
        } 
    }

    increaseProgress(){
        let newProgress = this.getLatestProgress() + 5;
        if(newProgress > 100){
            return false;
        } 

        this.setProgress(newProgress);
        return true;
    }

    decreaseProgress(){
        let newProgress = this.getLatestProgress() - 5;
        if(newProgress < 0){
            return false;
        } 

        this.setProgress(newProgress);
        return true;
    }

    setProgress(value){
        const workflowState = { date: Date.now(), value: value };

        let progressForcurrentWorkflow = this.progress.find(p => p.workflowNumber === this.workflowNumber);
        if(!progressForcurrentWorkflow){
            this.progress.push({ workflowNumber: this.workflowNumber, workflowStates: [workflowState] })
        }

        progressForcurrentWorkflow.workflowStates.push();
        this.updateWorkflow();
    }

    updateWorkflow(){
        if(this.getLatestProgress() === 5 && !this.started[this.workflowNumber]){
            this.started[this.workflowNumber] = Date.now();
        } else if(this.getLatestProgress() === 100 && !this.closed[this.workflowNumber]){
            this.closed[this.workflowNumber] = Date.now();
        }
    }

    startNewWorkflow(){
        this.workflowNumber += 1;
    }

    isClosed(){
        return this.workflowNumber < this.closed.length;
    }

    getLatestProgress(){
        let progress = 0;
        if(this.progress.length){
            progress = this.progress[this.progress.length - 1].value;
        }
        console.log(`latest progress: ${progress}`);
        return progress;
    }

    addStateMessage(percent, message){
        const stateMessage = {  }
        let stateMessageForCurrentWorkflow = this.stateMessages.find(s => s.workflowNumber === this.workflowNumber)

        let found = this.stateMessages.find(el => el && el.percent === percent);
        if(!found){
            let arr = [];
            arr.push(message);
            this.stateMessages.push( { percent: percent, messages: arr } );
        } else {
            found.messages.push(message)
        }

        console.log(this.stateMessages);
    }

    deepCopy(){
        let copy = new TaskModel();
        return Object.assign(copy, JSON.parse(JSON.stringify(this)));
    }
}