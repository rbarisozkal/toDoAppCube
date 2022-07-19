import * as db from 'db'


export interface toDoInterface {
    id: string
    todoDefinition: string
    priority: Number
    dueDate: Datetime
    isCompleted: Checkbox
}
@useObject(['ACC__toDoForm__CST'])
export default class projectScript {
    public id: string
    public todoDefinition: string
    public isCompleted: Checkbox
    public dueDate: Datetime
    public priority: Number

    private readonly orm = db.object('ACC__toDoForm__CST');



    public get record(): db.Record {
        console.log("this", this);
        return {
            id: this.id,
            ACC__todoDefinition__CST: this.todoDefinition,
            ACC__isCompleted__CST: this.isCompleted,
            ACC__dueDate__CST: this.dueDate,
            ACC_priority__: this.priority
        };
    }

    public static get(id: string): projectScript | undefined {
        const record = db.object('ACC__toDoForm__CST').query(id);
        if (!record) {
            return undefined;
        }
        return projectScript.getClassByRecord(record);
    }

    public constructor(record: db.Record) {
        this.id = record.id;
        this.update(record);
    }

    public update(record: db.Record): void {
        this.todoDefinition = record.todoDefinition || this.todoDefinition;
        this.dueDate = record.dueDate || this.dueDate;
        this.priority = record.priority || this.priority;
        if (record.isCompleted !== null && record.isCompleted !== undefined) {
            this.isCompleted = record.todoTag || this.isCompleted;
        }
    }

    public static list(conditions: db.Condition | undefined, option: db.Option | undefined = undefined): projectScript[] {
        return db.object('ACC__toDoForm__CST').queryByCondition(conditions, option).map(item => {
            return projectScript.getClassByRecord(item);
        });
    }
    public static getClassByRecord(record: db.Record): projectScript {
        return new projectScript({
            id: record.id,
            todoDefinition: record.ACC__todoDefinition__CST,
            priority: record.ACC__priority__CST,
            dueDate: record.ACC__dueDate__CST,
            isCompleted: record.ACC__isCompleted__CST
        });
    }

    public static listSize(conditions: db.Condition | undefined) {
        let object = db.object('ACC__toDoForm__CST');
        return object.count(conditions);
    }


    public save(): void {
        if (this.id) {
            this.orm.update(this.id, this.record);
        } else {
            this.id = this.orm.insert(this.record);
        }
    }

    public delete(id: string): number {
        return db.object('ACC__toDoForm__CST').delete(id);
    }
}