export default class ProjectModelTreeView{
    id;
    name;
    selected;
    subprojects;

    constructor(data = null){
        this.id = null;
        this.name = null;
        this.selected = false;
        this.subprojects = [];

        if(data){
            Object.assign(this, data);
        } 
    }

    deepCopy(){
        let copy = new ProjectModelTreeView();
        return Object.assign(copy, JSON.parse(JSON.stringify(this)));
    }
}