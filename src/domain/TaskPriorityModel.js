export default class TaskPriority{
    static No = 0;
    static Low = 1;
    static Medium = 2;
    static High = 3;

    static toString(value){
        if(value === this.Low) return "Low"
        else if(value === this.Medium) return "Medium"
        else if(value === this.High) return "High"
        else return "No"
    }

    static fromString(value){
        if (value === "Low") return this.Low
        else if (value === "Medium") return this.Medium
        else if (value === "High") return this.High
        else return this.No
    }
}