
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
    // progress: number
    // initials: string
    // // initials: string
    // finishDateString: 
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
    // finishDateString: string

    constructor(data: IProject) {
        this.id = uuidv4()
        for (const key in data) {
            this[key] = data[key]
        }
        console.warn("Interfaced data: ",data)
        console.warn("value of date on data: ",data.finishDate.valueOf)
        // if (data.finishDate === null) {

        // }
        // console.log("MS: ",this.finishDate.valueOf)

        // const newDateFromData = new Date(data.finishDate)
        // if (!isNaN(newDateFromData))

        // const miliseconds = this.finishDate.getMilliseconds
        // if (typeof miliseconds === "number") {
        //     return
        // }
        // else {}
        // console.log("miliseconds is not a number")
        // const defDate = new Date(1979, 7, 3, 12)
        // this.finishDate = defDate
        // console.log("Project Cosntructor -> finishDate: ", this.finishDate)
        // const finishDateToString = this.finishDate.toString()
        // console.log("finishDate to string: ",finishDateToString)
        // const finishDateToISOString = this.finishDate.toISOString()
        // console.log("finishDate to ISO string: ",finishDateToISOString)

        // // console.log(isNaN(this.finishDate))
        // // console.log(isNaN(this.finishDate.valueOf))
        // const finishDateValue = this.finishDate.valueOf()
        // console.log("Date type is: ",typeof this.finishDate)
        // console.log(finishDateValue)
        // if (typeof this.finishDate === "string") {
        //     return
        //     }
        //     else (!isNaN(finishDateValue) === true) 
        //         console.log("finishDateValue is not a number")
        //         const defDate = new Date(1979, 7, 3, 12)
        //         this.finishDate = defDate
        //         console.log("Project Cosntructor -> finishDate: ", this.finishDate)
        //         const finishDateToString = this.finishDate.toString()
        //         console.log("finishDate to string: ",finishDateToString)
        //         const finishDateToISOString = this.finishDate.toISOString()
        //         console.log("finishDate to ISO string: ",finishDateToISOString)
            
        
        // if (typeof this.finishDate === NaN) {
        //     console.log("finishDate is a string")
        //     }



        // if (this.finishDate.get)

        // ---------------------
        // if (typeof this.finishDate === "string") {
        //     console.log("finishDate is a string")
        //     }
        // else if (typeof this.finishDate === "object") {
        //     console.log("finishDate is an object")
        //     }
        // else if (typeof this.finishDate === null) {
        //     console.log("finishDate is null")
        // // else if (typeof this.finishDate === Invalid)
        // //     console.log("finishDate is null")
        //     }
        // else
        //     console.log("finishDate is not a string nor an object")
        // -------------------
// Trying to state Date if null
        // console.log(typeof this.finishDate)
        // if (!this.finishDate) {
        //     const defDate = new Date(1979, 7, 3, 12)
        //     this.finishDate = defDate
        //     console.log("Project Cosntructor -> finishDate: ", this.finishDate)
        //     const finishDateToString = this.finishDate.toString()
        //     console.log(finishDateToString)
        //     const finishDateToISOString = this.finishDate.toISOString()
        //     console.log(finishDateToISOString)
        // }
// ---------------



// ------------------
//         if (typeof this.finishDate === "object") {
//             const defDate = new Date(1979, 7, 3, 12)
//             this.finishDate = defDate
//             console.log("Project Cosntructor -> finishDate: ", this.finishDate)
//             const finishDateToString = this.finishDate.toString()
//             console.log(finishDateToString)
//             const finishDateToISOString = this.finishDate.toISOString()
//             console.log(finishDateToISOString)
//         }
// ---------------

            // this.finishDate = new Date('July 03, 1979 23:55:00')

            // UnixTimeZero
            // Date.parse(Date.now)
            // 2024-07-03T00:00:00.000Z
            // = 2024-07-03T00:00:00.000Z as Date
        // }
        console.log("Project Constructor -> Project: ")
        console.log(this.finishDate)
        // }
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
        console.log("new project: ", this.initials, this.finishDate)
        // this.setDefaultDate()
        console.log("new project (after invoking setDefaultDate): ", this.initials, this.finishDate)

        // if (this.finishDate == null) {
        //     const defDate = new Date(1979, 7, 3, 12)
        //     this.finishDate = defDate
        //     console.log("Project Cosntructor -> finishDate: ", this.finishDate)
        // }
        console.log("new project (after invoking setDefaultDate and after if statement): ", this.initials, this.finishDate)
        this.setUI()
        // this.setUI2()

        // this.finishDateShort()

    // finishDateShort() {
    //     if (this.finishDate) {
    //         return (this.finishDate as string)
    //     }
    //     // const dateString = this.finishDate.toDateString
    //     // this.finishDateString = dateString
    //     // dateString(() => {

    //     const algo: string = this.finishDate.toString

    //     // if (this.finishDate) {    

    //     this.finishDateString = algo.toString
    //     }
    //     // = this.finishDate.toDateString as string
    //     // this.finishDateString = dateString.toString()
    //     // console.log(dateString)
    //     // const D = this.finishDate.getDate()
    //     // const M = this.finishDate.getMonth()
    //     // const Y = this.finishDate.getFullYear()

    //     // this.finishDateString = D
    //     // getDate(this.finishDate)
    // }

    // Project card UI
    }

    // State default Date
    
    // setDefaultDate() {
    //     if (this.finishDate == null) {
    //         const defDate = new Date(1979, 7, 3, 12)
    //         this.finishDate = defDate
    //         console.log("finishDate: ", this.finishDate)
    //         return defDate
    //     }
    // }

// Find initials

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
        if (this.initialsColor) {return}
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const random = getRandomInt(11)
        console.log(random)
        const colors = Array.of("powderblue", "lightsteelblue", "lightblue", "darkseagreen", "palegoldenrod", "lightslategrey", "cadetblue", "rosybrown", "silver", "tan", "indianred")
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