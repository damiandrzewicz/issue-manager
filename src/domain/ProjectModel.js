export default class ProjectModel{
    id;
    parentId;
    name;
    description;
    created;

    constructor(data = {}){
        this.id = null;
        this.parentId = null;
        this.name = null;
        this.description = null;
        this.created = null;
        Object.assign(this, data);
    }
}