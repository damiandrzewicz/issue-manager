export class ProjectModel{
    id;
    name;
    description;
    created;
    subprojects;

    constructor(){
        this.subprojects = [];
    }

    assign(data){
        Object.assign(this, data);
    }
}