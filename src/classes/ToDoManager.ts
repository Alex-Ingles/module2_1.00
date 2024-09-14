import { Project, IProject, UserRole, ProjectStatus } from "./Project"
import { ProjectsManager } from "./ProjectsManager"
import { ToDo, IToDo, ToDoStatus} from "./ToDo"

export class ToDoManager {
    list: ToDo[] = []
    ui: HTMLElement

// -----------------------------------------------------------------------------
    constructor(container: HTMLElement) {
            this.ui = container
            // this.setDefaultToDoUI()
        }
    // setDefaultToDoUI() {
    //     const defaultData: IToDo = {
    //         name: "Start using To-do Feature" as string,
    //         description: "Hi! You can start manage To-Dos from here" as string,
    //         status: "Default status" as ToDoStatus,
    //         deadline: new Date ("2024-09-30" as string),
    //         id: "defaultId" as string,
    //         relatedProject:""

    //     }
    //     const defaultToDo = new ToDo(defaultData)
    //     this.ui.append(defaultToDo.ui)
    //     this.list.push(defaultToDo)
    //     console.warn("Default ToDo is created")
    //     return defaultToDo
    // }
    // -----------------------------------------------------------------------------
// deleteDefaultToDoUI() {
//     console.log("I reach deleteDefault function")
//     const child = document.getElementById("default-todo")
//     const parent = document.getElementById("todo-list")
//     if (child && parent) {
//         console.log("parent & child exists")
//         parent.removeChild(child)
//         this.list.shift()
//         console.log("child removed", child)
//         return(document)
//     }
// }
// -----------------------------------------------------------------------------
newToDo(data: IToDo) {
    // const projectNames = this.list.map((project) => {
    //     return project.name
    // })
    // console.log("ProjectsManager.newProject -> Project names list before newProject:")
    // console.log(projectNames)
    // const nameInUse = projectNames.includes(data.name)
    // if (data.name.length < 6){
    //     throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    // }
    // if (nameInUse) {
    //     throw new Error(`A project with the name "${data.name}" already exists`)
    // }
    // const child = document.getElementById("default-project")
    // console.log(child)

    const todo = new ToDo(data)
    // todo.ui.addEventListener("click", () => {
    //     const projectsPage = document.getElementById("projects-page")
    //     const detailsPage = document.getElementById("project-details")
    //     if (!projectsPage || !detailsPage) {return}
    //     console.log("pages exists")
    //     projectsPage.style.display = "none"
    //     detailsPage.style.display = "flex"
    //     this.setDetailsPage(project)
    // })
    // const project = new Project

    this.ui.append(todo.ui)
    console.log("ToDoMng NewToDo this.ui after append: ", this.ui)
    this.list.push(todo)
    // projectsManager.getProject(data.relatedProject)
    console.warn("New To-do is created")
    console.warn("To-do list: ",this.list)
    // this.deleteDefaultProjectUI()

}
// -----------------------------------------------------------------------------
cleanToDoManager() {
    console.warn("cleanToDomanager is invoked")

    // if (this.ui && this.ui instanceof HTMLElement) {
    // this.ui = document.createElement("div")
    // this.ui.className = "project-card"
    // this.ui.id = this.name
    // this.ui.innerHTML = `
    // <div class="card">

    console.log("cleanToDoManager - this.list: ", this.list)
    console.log("cleanToDoManager - this.ui: ", this.ui.children)

    // var todoIds = [];
    // for(var i=0;i<this.list.length;i++){
    //     const id = this.list[i].id
    //     todoIds.push(id);
    // }

    // const todoIds = this.list.map((todo) => {
    //     return todo.id
    // })
    // console.warn("todoIds: ", todoIds)


    for (var i=0;i<this.list.length;i++) {
        console.warn("for is invoked");
        let todo = this.list[i] as ToDo
        if (todo) {
            const id = todo.id
            console.log("for todo.id: ", id)
            this.deleteToDo(id)


            // const ui = document.getElementById(id)
            //     if (ui && ui instanceof HTMLElement) {
            //         console.log(ui)
            //         ui.remove()
            //     }
        }
    }
    console.warn("this.ui.children: ",this.ui.children)

    // console.warn("this.ui children: ",this.ui.children)
    // const childrenIds = this.list.filter((todo) => {
    //     return todo.id
    // })
    // for (const child in this.ui) {
    //     console.warn("for is invoked")
    //     this.ui.removeChild
    // }

    // console.warn("this.list children: ",childrenIds)
    // childrenIds.forEach((id) => {
    //     console.warn("forEach is invoked")

    //     id.ui.remove()
    // })
    // console.warn("this.ui children (for): ", this.ui.children)

    // for (const id in childrenIds) {
    //     console.warn("for is invoked")
    //     const todoUi = document.getElementById(id)
    //     if (todoUi)
    //     todoUi.remove()
    //     console.warn("this.ui children (for): ", this.ui.children)
    // }
    // for (const child in this.ui) {
    //     child.ui.remove
    // }

    // deleteProject(id: string) {
    //     const project = this.getProject(id)
    //     if (!project) { 
    //         console.log("Id provided does'nt match with any id of projectsList")
    //         return }
    //     project.ui.remove()
    //     const remaining = this.list.filter((project) => {
    //         return project.id !== id
    //     })
    //     this.list = remaining
    // }
    

    // this.list.forEach((i) => {
    //     i.ui.remove
    //     console.warn("cleanToDoManager: ",this.ui)
    // })
    // for() {
    //     if (this.ui)
    //     const ui = this.ui
    //     ui.childNodes.remove
    // }

    // for (const todo in this.list) {
    //     if (todo) {
    //     todo.ui.remove
    //     }
        
    //     this.list = []
    // const children = this.ui.children
    // children
    // }
}
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// private setDetailsPage(project: Project) {
//     const detailsPage = document.getElementById("project-details")
//     if (!detailsPage) {return}
//     const id = detailsPage.querySelector("[data-project-info='id']")
//     if (id) {id.textContent = project.id}
//     const name = detailsPage.querySelector("[data-project-info='name']")
//     if (name) { name.textContent = project.name}
//     const name2 = detailsPage.querySelector("[data-project-info='name2']")
//     if (name2) { name2.textContent = project.name}
//     const initials = detailsPage.querySelector("[data-project-info='initials']")
//     if (initials) { initials.textContent = project.initials}

//     const description = detailsPage.querySelector("[data-project-info='description']")
//     if (description) { description.textContent = project.description}
//     const description2 = detailsPage.querySelector("[data-project-info='description2']")
//     if (description2) { description2.textContent = project.description}

//     const status = detailsPage.querySelector("[data-project-info='status']")
//     if (status) { status.textContent = project.status}
//     const cost = detailsPage.querySelector("[data-project-info='cost']")
//     const costAsString = project.cost.toString()
//     if (cost && costAsString) { cost.textContent = costAsString}
//     const userRole = detailsPage.querySelector("[data-project-info='userRole']")
//     if (userRole) { userRole.textContent = project.userRole}
//     const finishDate = detailsPage.querySelector("[data-project-info='finishDate']")
//     const finishDateAsString = project.finishDate.toString()
//     if (finishDate) { finishDate.textContent = finishDateAsString}

//     const progress = detailsPage.querySelector("[data-project-info='progress']")
//     const progressAsString = project.progress.toString()
//     if (progress && progressAsString) {
//         progress.textContent = progressAsString + "%"
//         const bar = document.getElementById("project-progress-bar")
//         const progressPercent = project.progress + "%"
//         if (bar) {
//         bar.style.width = `"${progressPercent}"`
//         // bar.style = `"${progressPercent}"`

//         console.warn("progress percent: ",progressPercent)
//         }
//     }
// }
// -----------------------------------------------------------------------------

// idInUse(id: string) {
//     const projectIds = this.list.map((project) => {
//         return project.id
//     })
//     if (projectIds.includes(id)) {
//         return true
//     }
//     else {
//         return false
//     }
//     console.warn("idInUse: id already exists")
// }


// idInUse(id: string) {
// const projectIds = this.list.map((project) => {
//     return project.id
// })
// const idInUse = projectIds.includes(id)
// console.warn("idInUse: id already exists")

// }

// -----------------------------------------------------------------------------
// updateProject(data: IProject) {
    // this.getProject(id)
    // console.log(this.getProject)


    // const projectNames = this.list.map((project) => {
    //     return project.name
    // })
    // console.log("ProjectsManager.newProject -> Project names list before newProject:")
    // console.log(projectNames)
    // const nameInUse = projectNames.includes(data.name)
    // if (data.name.length < 6){
    //     throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    // }
    // if (nameInUse) {
    //     throw new Error(`A project with the name "${data.name}" already exists`)
    // }
    // const child = document.getElementById("default-project")
    // console.log(child)

    // let projectToBeUpdated = this.getProject(data.id)
    // this.deleteProject(data.id)
    // this.newProject(data)
    // console.log("projectToBeUpdated: ", projectToBeUpdated)


    // let projectUpdated = data
    // console.log("projectToBeUpdated: ",projectToBeUpdated)
    // let projectUpdated = data
    // for (const key in projectToBeUpdated) {
    //     this[key] = data[key]
    // }
    // console.log("projectUpdated: ", projectToBeUpdated)

    // const projectsIds = this.list.map((project) => {
    //     return project.id })
    // const projectIndex = this.list.indexOf(data)
    

    // if (data.id) {
    //     console.log("projectsIds: ",projectsIds)
    //     // projectsIds.find()
    // }


    // const updatedProjectIndex = projectsIds.findIndex(data.id.valueOf)
    // console.log("idNumber: ",updatedProjectIndex)

    // const project = new Project(data)
    // project.ui.addEventListener("click", () => {
    //     const projectsPage = document.getElementById("projects-page")
    //     const detailsPage = document.getElementById("project-details")
    //     if (!projectsPage || !detailsPage) {return}
    //     console.log("pages exists")
    //     projectsPage.style.display = "none"
    //     detailsPage.style.display = "flex"
    //     this.setDetailsPage(project)
    // })
    // this.ui.append(project.ui)
    // this.list.push(project)
    // console.warn("New Project is created")
    // this.deleteDefaultProjectUI()
// }




// -----------------------------------------------------------------------------
// getProject(id: string) {
//     const project = this.list.find((project) => {
//         return project.id === id
//     })
//     return project
// }
// -----------------------------------------------------------------------------
// getProjectbyName(name: string) {
//     const project = this.list.find((project) => {
//         return project.name === name
//     })
//     return project
// }
// -----------------------------------------------------------------------------
// deleteProject(id: string) {
//     const project = this.getProject(id)
//     if (!project) { 
//         console.log("Id provided does'nt match with any id of projectsList")
//         return }
//     project.ui.remove()
//     const remaining = this.list.filter((project) => {
//         return project.id !== id
//     })
//     this.list = remaining
// }
// -----------------------------------------------------------------------------
// totalCost() {
//     const total = this.list.reduce((total, project) => total + project.cost, 0)
//     console.log(total)
//     return total
// }
// -----------------------------------------------------------------------------
// exportToJSON(fileName: string = "projects") {
//     const json = JSON.stringify(this.list, null, 2)
//     const blob = new Blob([json], {type: 'application/json'})
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = fileName
//     a.click()
//     URL.revokeObjectURL(url)
// }
// -----------------------------------------------------------------------------
// importFromJSON() {
//     const input = document.createElement('input')
//     input.type = 'file'
//     input.accept = 'application/json'
//     const reader = new FileReader()
//     reader.addEventListener('load', () => {
//         const json = reader.result
//         if (!json) { return }
//         const projects: IProject[] = JSON.parse(json as string)
//         for (const project of projects) {
//             try {
//                 this.newProject(project)
//             }
//             catch (error) {
//                 alert(error)
//             }
//         }

    // })
    // input.addEventListener('change', () => {
    //     const filesList = input.files
    //     if (!filesList) { return }
    //     reader.readAsText(filesList[0])
    // })
    // input.click()
// }
// -----------------------------------------------------------------------------
getToDo(id: string) {
    const todo = this.list.find((todo) => {
        return todo.id === id
    })
    return todo
}

// -----------------------------------------------------------------------------
deleteToDo(id: string) {
    const todo = this.getToDo(id)
    if (!todo) { 
        console.log("Id provided does'nt match with any id of todo.list")
        return }
    todo.ui.remove()
    const remaining = this.list.filter((todo) => {
        return todo.id !== id
    })
    this.list = remaining
}

}
