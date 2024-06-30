
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
    // progress: number
    // initials: string
    // // initials: string
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
    initials: string
    initialsColor: string

    constructor(data: IProject) {
        this.id = uuidv4()
        for (const key in data) {
            this[key] = data[key]
        }
        // this.initials = initials()

        // const initials = (() => {
        //     if (!data.name) {
        //         this.initials = "--"
        //     } else {
        //     console.log("this.name: ", this.name)
        //     const words = this.name.split(' ', 2)
        //     console.log("words: ", words)
        //     const map1 = words.map((x) => x.charAt(0))
        //     console.log("map1: ", map1)
        //     this.initials = map1[0]+map1[1] as string
        //     }
        // })
        // this.initials = findInitials()

        // Project data definition
        // this.name = data.name
        // this.description = data.description
        // this.status = data.status
        // this.userRole = data.userRole
        // this.finishDate = data.finishDate
        // this.cost = data.cost
        this.findInitials()
        console.log("new project: ", this.initials)

        this.setUI()

    // Project card UI
    }

    findInitials() {
        if (!this.name) { return }
        console.log("this.name: ", this.name)
        const words = this.name.split(' ', 2)
        console.log("words: ", words)
        const map1 = words.map((x) => x.charAt(0).toUpperCase())
        console.log("map1: ", map1)
        // let counter = 0 as number
        // words.forEach((x) => counter = counter + 1)
        if (map1[1]) {
            this.initials = map1[0] + map1[1] as string
        } else {
            this.initials = map1[0] as string
        }
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const random = getRandomInt(6)
        console.log(random)
        const colors = Array.of("red", "blue", "green", "magenta", "cyan", "lightblue", "grey")
        this.initialsColor = colors[random]
        console.log(this.initialsColor)
        


        // this.initials = map1[0]+ map1[1] as string
        // console.log("this initials: ", this.initials)

        // const firstInitial = words[0].charAt(0)
        // const secondInitial = words[1].charAt(0)
        // const concatInitials = firstInitial + secondInitial
        // this.initials = concatInitials.toUpperCase()


        // return concatInitials.toUpperCase
        // const upperConcatInitials = concatInitials.toUpperCase
        // return upperConcatInitials
        // // this.initials = upperConcatInitials

        // return this.initials
        // const wordsInitials = {
        //     for(const word of words) {
        //         word.at(0)  
            // }
    }
    // }
    

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