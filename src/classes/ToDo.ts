
import { v4 as uuidv4 } from "uuid"
// import { todoManager } from ".."

export type ToDoStatus = "pending" | "on going" | "solved"

export interface IToDo {

    name: string
    description: string
    status: ToDoStatus
    deadline: Date
    id: string
    relatedProject: string
}

export class ToDo implements IToDo {
    // To satisfy Interface
    name: string
    description: string
    status: "pending" | "on going" | "solved"
    deadline: Date

    // Class internals
    ui: HTMLDivElement
    id: string
    relatedProject: string


    constructor(data: IToDo) {
        console.warn("TD - ToDo constructor invoked")
        for (const key in data) {
            this[key] = data[key]
        }
        console.log("data: ", data)
        // console.log("Project: ", Project)
        console.log("this.id: ",this.id)
        this.setUI()
        this.setTODOCardColor()
        // todoManager.ui.appendChild(this.ui)
        if (this.id == "") {
            console.log("this.id is undefined")
            this.id = uuidv4()
            console.log("this id after uuidv4: ",this.id) 
        }

        // console.warn("Interfaced data: ",data)
        // console.warn("value of date on data: ",data.finishDate.valueOf)

        // console.log("Project Constructor -> Project: ")
        // console.log(this.finishDate)

        // this.findInitials()
        // console.log("new project: ", this.initials, this.finishDate)
        // // this.setDefaultDate()
        // console.log("new project (after invoking setDefaultDate): ", this.initials, this.finishDate)

        // console.log("new project (after invoking setDefaultDate and after if statement): ", this.initials, this.finishDate)
        // this.setUI()
    }

    // findInitials() {
    //     if (!this.name) { return }
    //     console.log("this.name: ", this.name)
    //     const words = this.name.split(' ', 2)
    //     console.log("words: ", words)
    //     const map1 = words.map((x) => x.charAt(0).toUpperCase())
    //     console.log("map1: ", map1)
    //     if (map1[1]) {
    //         this.initials = map1[0] + map1[1] as string
    //     } else {
    //         this.initials = map1[0] as string
    //     }
    //     if (this.initialsColor) {return}
    //     function getRandomInt(max) {
    //         return Math.floor(Math.random() * max);
    //       }
    //     const random = getRandomInt(11)
    //     console.log(random)
    //     const colors = Array.of("powderblue", "lightsteelblue", "lightblue", "darkseagreen", "palegoldenrod", "lightslategrey", "cadetblue", "rosybrown", "silver", "tan", "indianred")
    //     this.initialsColor = colors[random]
    //     console.log(this.initialsColor)
    // }
    editProject() {
        console.warn("TD - editProject invoked")
        console.log("tratando de editar")
    }


    setUI() {
        console.warn("TD - setUI invoked")
        if (this.ui && this.ui instanceof HTMLElement) {return}
        console.log("I've reached this point")
        this.ui = document.createElement("div")
        this.ui.className = "todo-card"
        this.ui.id = this.id
        this.ui.innerHTML = `
        <div class="todo-card" type="button">
            <button id="${this.id}-btn"><span class="material-icons-round">edit</span></button>
            <span class="material-icons-round" style="width:30px; height:30px; display:flex; justify-content:center; align-items:center">check_circle_outline</span>
            <div><h5 data-todo-info:"id" class="todo-description">${this.id}</h5></div>
            <div><h5 hidden data-todo-info:"status" class="todo-description">${this.status}</h5></div>
            <div><h5 hidden data-todo-info:"relatedProject" class="todo-description">${this.relatedProject}</h5></div>
            <div><h5 data-todo-info:"description" class="todo-description">${this.description}</h5></div>
            <div><h5 data-todo-info:"deadline" class="todo-deadline">${this.deadline}</h5></div>
        </div>`
    }

    setTODOCardColor() {
        const todocard = this.ui
        if (todocard && todocard instanceof HTMLDivElement) {
            if (this.status == "solved") {
                console.log("TD - SetToDoCardCooor, this.ui exists.", this.status)
                todocard.style.backgroundColor = 'rgb(158, 195, 158)';
            } 
            if (this.status == "on going") {
            todocard.style.backgroundColor = '#D2B48C';
            }
            if (this.status == "pending") {
            todocard.style.backgroundColor = 'var(--background-200)';
            }
         }
    }

}