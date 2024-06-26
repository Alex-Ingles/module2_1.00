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
            finishDate: new Date ("finishDate" as string),
            progress: 50 as number,
            // initials: "DP" as string,
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
    project.ui.addEventListener("click", () => {
        const projectsPage = document.getElementById("projects-page")
        const detailsPage = document.getElementById("project-details")
        if (!projectsPage || !detailsPage) {return}
        console.log("pages exists")
        projectsPage.style.display = "none"
        detailsPage.style.display = "flex"
        this.setDetailsPage(project)
    })
    this.ui.append(project.ui)
    this.list.push(project)
    console.warn("New Project is created")
    // const parent = document.getElementById("project-list")
    this.deleteDefaultProjectUI()


    // return project
}

private setDetailsPage(project: Project) {
    const detailsPage = document.getElementById("project-details")
    if (!detailsPage) {return}
    const name = detailsPage.querySelector("[data-project-info='name']")
    if (name) { name.textContent = project.name}
    const description = detailsPage.querySelector("[data-project-info='description']")
    if (description) { description.textContent = project.description}
    const status = detailsPage.querySelector("[data-project-info='status']")
    if (status) { status.textContent = project.status}
    const cost = detailsPage.querySelector("[data-project-info='cost']")
    const costAsString = project.cost.toString()
    if (cost && costAsString) { cost.textContent = costAsString}
    const userRole = detailsPage.querySelector("[data-project-info='userRole']")
    if (userRole) { userRole.textContent = project.userRole}
    const finishDate = detailsPage.querySelector("[data-project-info='finishDate']")
    const finishDateAsString = project.finishDate.toString()
    if (finishDate) { finishDate.textContent = finishDateAsString}
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
    if (!project) { 
        console.log("Id provided does'nt match with any id of projectsList")
        return }
    project.ui.remove()
    const remaining = this.list.filter((project) => {
        return project.id !== id
    })
    this.list = remaining
}

// ----------------------------------------------------------------------------------------
// 5. TOTAL COST WITH A SINGLE SENTENCE
// ----------------------------------------------------------------------------------------

totalCost() {
    const total = this.list.reduce((total, project) => total + project.cost, 0)
    console.log(total)
    return total
}

// printTotalCost(){
//     console.log(() => (this.totalCost))
// }

// ----------------------------------------------------------------------------------------
// 4. TOTAL COST FORCING NUMBER TO GET A TOTAL
// ----------------------------------------------------------------------------------------

// totalCost() {
//     const cost: number[] = []
//     this.list.map(project => cost.push(project.cost)
//     )
//     console.log("I reach this point")
//     console.log("here you have your project cost: ", cost)

//     const costNumber = cost.map(Number)
//     const sumOfCost = costNumber.reduce((total, initialValue) =>  total + initialValue
//     )
//     console.log(sumOfCost)
// }

// ----------------------------------------------------------------------------------------
// 3. TOTAL COST CONVERTING FOR EACH IN A MAP METHOD AND NOT FORCING ARRAY TO NUMBER
//    Not working, sum output is a concatenate of strings however arguments are number type
// ----------------------------------------------------------------------------------------

// totalCost() {
//     const cost: number[] = []
//     this.list.map(project => cost.push(project.cost)
//     )
//     console.log("I reach this point")
//     console.log("here you have your project cost: ", cost)

//     const sumOfCost = cost.reduce((total, initialValue) =>  total + initialValue
//     )
//     console.log(sumOfCost)
// }
// ---------------------------------------------------------------------------------
// 2. TOTAL COST TUNED AFTER JUAN 1ST COMMENT. (return deleted and 1 less variable)
// ---------------------------------------------------------------------------------

// totalCost() {
//     const totalCost: number[] = []
//     const costArray = this.list.forEach((project) => {
//         totalCost.push(project.cost)
//         console.log("here you have your project cost: ",project.cost)
//     })
//     const costNumber = totalCost.map(Number)
//     const sumOfCost = costNumber.reduce((total, initialValue) =>  total + initialValue)

//     console.log(sumOfCost)
// }

// ---------------------------------------------------------------------------------
// TOTAL COST ORIGINAL
// ---------------------------------------------------------------------------------


// totalCost() {
//     const totalCost: number[] = []
//     const costArray = this.list.forEach((project) => {
//         const projectCost = project.cost -------- I can pass project.cost as an argument for push method directly. Not needed a new variable.
//         totalCost.push(projectCost)
//         console.log(projectCost)
//         // return totalCost -------- ForEach is not expected to return nothing!!
        
    // const costNumber = totalCost.map(Number)
    // const sumOfCost = costNumber.reduce((total, initialValue) => {
    //     console.log(sumOfCost)
    //     return total + initialValue
    // })

    // return sumOfCost
    // console.log(costNumber)
    // console.log(sumOfCost)
// }

exportToJSON(fileName: string = "projects") {
    const json = JSON.stringify(this.list, null, 2)
    const blob = new Blob([json], {type: 'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
}

importFromJSON() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        const json = reader.result
        if (!json) { return }
        const projects: IProject[] = JSON.parse(json as string)
        for (const project of projects) {
            try {
                this.newProject(project)
            }
            catch (error) {
                alert(error)
                // console.log("import is not working")
            }
        }

    })
    input.addEventListener('change', () => {
        const filesList = input.files
        if (!filesList) { return }
        reader.readAsText(filesList[0])
    })
    input.click()
}
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