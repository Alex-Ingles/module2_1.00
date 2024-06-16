
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
}

export class Project implements IProject {
    // To satisfy Interface
    name: string
    description: string
    status: "pending" | "active" | "finished"
    userRole: "architect" | "engineer" | "developer"
    finishDate: Date
    cost: number

    // Class internals
    ui: HTMLDivElement
    progress: number = 0
    id: string

    constructor(data: IProject) {
        // Project data definition
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.userRole = data.userRole
        this.finishDate = data.finishDate
        this.cost = data.cost
        this.id = uuidv4()
        this.setUI()    

        // Project card UI
    }

    setUI() {
        if (this.ui) {return}
        this.ui = document.createElement("div")
        this.ui.className = "project-card"
        this.ui.id = this.name
        this.ui.innerHTML = `
        <div class="card">
            <div class="card-header">
                <p style="background-color: #ca8134; padding:10px; border-radius: 8px; aspect-ratio: 1">HC</p>
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
            </div>`
    }
}