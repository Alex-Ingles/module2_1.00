import { Project, IProject, UserRole, ProjectStatus } from "./Project"


// ------------------------------------------------------------------------------
// 3.1 Create & delete Default Project data and UI || ProjectsManagers class side
// Default project when ProjectsManager Constructor is instanciated
// deleteDefaultProjectUI as a ProjectsManager class method
// ------------------------------------------------------------------------------

export class ProjectsManager {
    list: Project[] = []
    ui: HTMLElement

    constructor(container: HTMLElement) {
        this.ui = container
        this.setDefaultProjectUI()
    }

    setDefaultProjectUI() {
        const defaultData: IProject = {
            name: "default-project" as string,
            description: "Default description" as string,
            cost: 0 as number,
            status: "Default status" as ProjectStatus,
            userRole: "Default userRole" as UserRole,
            finishDate: new Date ("finishDate" as string)
        }
        const defaultProject = new Project(defaultData)
        this.ui.append(defaultProject.ui)
        this.list.push(defaultProject)
        console.warn("Default Project is created")
        return defaultProject
    }

deleteDefaultProjectUI() {
    console.log("I reach deleteDefault function")
    const child = document.getElementById("default-project")
    const parent = document.getElementById("projects-list")
    if (child && parent) {
        console.log("parent & child exists")
        parent.removeChild(child)
        this.list.shift()
        console.log("child removed", child)
        return(document)
    }


    // constructor(container: HTMLElement) {
    //     // To satisfy interface
    //     this.ui = container
    //     this.setDefaultProjectUI()

    //     // Class internals
    // }





    // if((parent) && (child)) {
    //     this.list.shift()
    //     document.removeChild(child)
            
    //     console.log("parent is:", parent)
    //     console.log("child is:", child)
    //     console.log("default project removed")
    //     return(document)
    // }
}

newProject(data: IProject) {
    const projectNames = this.list.map((project) => {
        return project.name
    })
    console.log(projectNames)
    const nameInUse = projectNames.includes(data.name)
    if (nameInUse) {
        throw new Error(`A project with the name "${data.name}" already exists`)
    }
    const child = document.getElementById("default-project")
    console.log(child)

    const project = new Project(data)
    this.ui.append(project.ui)
    this.list.push(project)
    console.warn("New Project is created")
    const parent = document.getElementById("project-list")
    this.deleteDefaultProjectUI()


    // return project
}

getProject(id: string) {
    const project = this.list.find((project) => {
        return project.id === id
    })
    return project
}

// // idMatch before simplify it
// getProject(id: string) {
//     this.list.find((project) => {
//         const idMatch = project.id === id
//         return idMatch
//     })

// }

getProjectbyName(name: string) {
    const project = this.list.find((project) => {
        return project.name === name
    })
    return project
}

deleteProject(id: string) {
    const project = this.getProject(id)
    if (!project) { return }
    project.ui.remove()
    const remaining = this.list.filter((project) => {
        return project.id !== id
    })
    this.list = remaining
}

totalCost() {
    const totalCost: number[] = []
    const costArray = this.list.forEach((project) => {
        const projectCost = project.cost
        totalCost.push(projectCost)
        return totalCost
        
    })
    const costNumber = totalCost.map(Number)
    const sumOfCost = costNumber.reduce((total, initialValue) => {
        return total + initialValue
        console.log(sumOfCost)
    })
    // return sumOfCost
    // console.log(costNumber)
    // console.log(sumOfCost)
}

exportToJSON() {}

importFromJSON() {}


}

        // const projectData = {
        //     name = "name" as string,
        //     description = "description" as string,
        //     status = "active" as ProjectStatus,
        //     userRole = "engineer" as UserRole,
        //     finishDate = 
        // }
        // const project = new Project(projectData)
        // this.ui.append(project.ui)
        // this.list.push(project)
        // return project

    //      {
    //         name: "name" as string,
    //         description: "description" as string,
    //         status: "status" as ProjectStatus,
    //         userRole: "userRole" as UserRole,
    //         finishDate: "finishDate" as string)
    //         }
    // }
    
//         const project = projectsManager.newProject(projectData)
//         projectForm.reset()
//         toggleModal("new-project-modal", "close")
//         console.warn("default project is created!")
//         console.log(projectData)
//         console.log(projectsManager.list)

// }