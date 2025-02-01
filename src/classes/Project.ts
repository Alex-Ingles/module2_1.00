
import { v4 as uuidv4 } from "uuid"
import { ToDo, IToDo } from "./ToDo"
import { Timestamp } from "firebase/firestore"

export type ProjectStatus = "pending" | "active" | "finished"
export type UserRole = "architect" | "engineer" | "developer"

export interface IProject {

    name: string
    description: string
    status: ProjectStatus
    userRole: UserRole
    finishDate: Date | Timestamp;
    cost: number
    initials: string
    progress: number
    id: string
    firebaseId: string
    todoList: ToDo[]
}

export class Project implements IProject {
    // To satisfy Interface
    name: string
    description: string
    status: "pending" | "active" | "finished"
    userRole: "architect" | "engineer" | "developer"
    finishDate: Date
    cost: number
    progress: number = 0
    todoList: ToDo[] = []
    id: string


    // Class internals
    initials: string
    initialsColor: string
    shortFinishDate: string
    firebaseId: string

    constructor(data: IProject, id = uuidv4()) {
        for (const key in data) {
            this[key] = data[key]
        }
        if (this.id == "") {
            this.id = id
        }
        this.findInitials()
        this.setShortFinishDate()
    }

    findInitials() {
        console.warn("P - findInitials invoked")
        if (!this.name) { return }
        const words = this.name.split(' ', 2)
        const map1 = words.map((x) => x.charAt(0))
        if (map1[1]) {
            this.initials = map1[0] + map1[1] as string
        } else {
            this.initials = map1[0] as string
        }
        if (this.initialsColor) {return}
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const random = getRandomInt(11)
        const colors = Array.of("powderblue", "lightsteelblue", "lightblue", "darkseagreen", "palegoldenrod", "lightslategrey", "cadetblue", "rosybrown", "silver", "tan", "indianred")
        this.initialsColor = colors[random]
    }

    setShortFinishDate() {
        this.shortFinishDate = new Date (this.finishDate).toLocaleDateString("es-ES")
    }
}