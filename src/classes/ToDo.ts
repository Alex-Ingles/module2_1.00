
import { v4 as uuidv4 } from "uuid"

export type ToDoStatus = "pending" | "on going" | "solved"

export interface IToDo {
    name: string
    description: string
    status: ToDoStatus
    deadline: Date
    id: string
    relatedProject: string
    // todocardcolor: string
}

export class ToDo implements IToDo {
    // To satisfy Interface
    name: string
    description: string
    status: "pending" | "on going" | "solved"
    deadline: Date
    relatedProject: string
    todocardcolor: string

    // Class internals
    // ui: HTMLDivElement
    id: string
    shortdeadline: string

    constructor(data: IToDo) {
        console.warn("TD - ToDo constructor invoked")
        for (const key in data) {
            this[key] = data[key]
        }
        console.log("data: ", data)
        console.log("this.id: ",this.id)
        this.setShortDeadline()
        // this.setUI()
        this.setTodoCardColor()
        if (this.id == "") {
            console.log("this.id is undefined")
            this.id = uuidv4()
            console.log("this id after uuidv4: ",this.id) 
        }
    }

    setTodoCardColor() {
        if (this.status == "solved") {
            console.log("TD - SetToDoCardCooor, this.ui exists.", this.status)
            this.todocardcolor = 'rgb(158, 195, 158)';
        } 
        if (this.status == "on going") {
        this.todocardcolor = '#D2B48C';
        }
        if (this.status == "pending") {
        this.todocardcolor = 'var(--background-200)';
        }
        }
   
    setShortDeadline() {
        this.shortdeadline = new Date (this.deadline).toLocaleDateString("es-ES")
    }


}