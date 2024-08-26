
import { v4 as uuidv4 } from "uuid"

export type ProjectStatus = "pending" | "active" | "finished"
export type UserRole = "architect" | "engineer" | "developer"

export interface IProject {

    name: string
    description: string
    status: ProjectStatus
    userRole: UserRole
    finishDate: Date
    cost: number
    initials: string
    progress: number
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

    // Class internals
    ui: HTMLDivElement
    ui2: HTMLDivElement
    id: string
    initials: string
    initialsColor: string

    constructor(data: IProject) {
        this.id = uuidv4()
        for (const key in data) {
            this[key] = data[key]
        }
        this.findInitials()

    }


    findInitials() {
        if (!this.name) { return }
        const words = this.name.split(' ', 2)
        const map1 = words.map((x) => x.charAt(0).toUpperCase())
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
        console.log(this.initialsColor)
    }

    editProject() {
        console.log("tratando de editar")
    }

    setUI() {
        if (this.ui && this.ui instanceof HTMLElement) {return}
        this.ui = document.createElement("div")
        this.ui.className = "project-card"
        this.ui.id = this.name
        this.ui.innerHTML = `
        <div class="card">
            <div class="card-header">
                <p style="background-color: ${this.initialsColor}; padding:10px; border-radius: 8px; aspect-ratio: 1">${this.initials}</p>
                <div>
                    <h5>${this.name}</h5>
                    <h5 class="description">${this.description}</h5>
                </div>
            </div>
            <div class="card-content">
                <div class="card-property">
                    <p style="color: #969696;">Id</p>
                    <p>${this.id}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Status</p>
                    <p>${this.status}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Role</p>
                    <p>${this.userRole}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Cost</p>
                    <p>$${this.cost}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Finish Date</p>
                    <p>${this.finishDate}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Estimated Progress</p>
                    <p>${this.progress * 100}%</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Initials</p>
                    <p>${this.initials}</p>
                </div>

            </div>`
    }

    setUI2() {
        if (this.ui2 && this.ui2 instanceof HTMLElement) {return}
        this.ui = document.createElement("div")
        this.ui.className = "project-card"
        this.ui.id = this.name
        this.ui.innerHTML = `
        <div class="card">
            <div class="card-header">
                <p style="background-color: ${this.initialsColor}; padding:10px; border-radius: 8px; aspect-ratio: 1">${this.initials}</p>
                <div>
                    <h5>${this.name}</h5>
                    <h5 class="description">${this.description}</h5>
                </div>
            </div>
            <div class="card-content">
                <div class="card-property">
                    <p style="color: #969696;">Status</p>
                    <p>${this.id}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Status</p>
                    <p>${this.status}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Role</p>
                    <p>${this.userRole}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Cost</p>
                    <p>$${this.cost}</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Estimated Progress</p>
                    <p>${this.progress * 100}%</p>
                </div>
                <div class="card-property">
                    <p style="color: #969696;">Initials</p>
                    <p>${this.initials}</p>
                </div>

            </div>`
    }

}