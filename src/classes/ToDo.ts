
import { v4 as uuidv4 } from "uuid"

export type ToDoStatus = "pending" | "on going" | "solved"

export interface IToDo {
    name: string
    description: string
    status: ToDoStatus
    deadline: Date
    id: string
    relatedProject: string
    firebaseId: string
    priority: number
    // todocardcolor: string
}

export class ToDo implements IToDo {
    // To satisfy Interface
    name: string
    description: string
    status: "pending" | "on going" | "solved"
    deadline: Date
    relatedProject: string
    firebaseId: string
    priority: number
    
    // Class internals
    // ui: HTMLDivElement
    id: string
    shortdeadline: string
    todocardcolor: string
    prioritycardcolor: string

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
        this.setPriorityCardColor()
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
   
    setPriorityCardColor() {
        if (this.priority == 10) {
            console.log("TD - SetToDoCardCooor, this.ui exists.", this.priority)
            this.prioritycardcolor = 'red';
        } 
        if (this.priority < 10 && this.priority > 6) {
            this.prioritycardcolor = 'blue';
        }
        if (this.priority < 7 && this.priority > 4) {
            this.prioritycardcolor = 'green';
        }
        if (this.priority < 5) {
            this.prioritycardcolor = 'lightgrey';
        }

        }
    
    setShortDeadline() {
        this.shortdeadline = new Date (this.deadline).toLocaleDateString("es-ES")
    }


}