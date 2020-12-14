export default class ProjectModel{
    id;
    parentId;
    name;
    description;
    created;

    constructor(data = null){
        this.id = null;
        this.parentId = null;
        this.name = null;
        this.description = null;
        this.created = null;

        if(data){
            Object.assign(this, data);
        }
        
    }
}