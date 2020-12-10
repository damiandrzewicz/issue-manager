export class ProjectModel{

    constructor(name = "", description = "", created = null, subprojects = []){
        this._name = name;
        this._description = description;
        this._created = created;
        this._subprojects = subprojects ;

        this.setName = (name) => { this._name = name; }
        this.setDescription = (description) => { this._description = description; }
        this.setCreated = (created) => { this._created = created; }
        this.setSubprojects = (subprojects) => { this._subprojects = subprojects; }

        this.getName = () => { return this._name; }
        this.getDescription = () => { return this._description; }
        this.getCreated = () => { return this._created; }
        this.getSubprojects = () => { return this._subprojects; }
    }
}