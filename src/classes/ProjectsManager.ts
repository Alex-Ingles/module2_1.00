import { Project, IProject, UserRole, ProjectStatus } from "./Project"
// import { ToDoManager } from "./ToDoManager"
import { ToDo, IToDo, ToDoStatus } from "./ToDo"
// import { toggleModal } from "../index"
// import { todoManager } from ".."
// import { todoManager } from "/Users/alex/Desktop/dev/module2_0.00/src/index.ts"

export class ProjectsManager {
    list: Project[] = []
    ui: HTMLElement
// -----------------------------------------------------------------------------
constructor(container: HTMLElement) {
        console.warn("PM - New ProjectsManager constructor invoked" )
        this.ui = container
        this.setDefaultProjectUI()
    }
// -----------------------------------------------------------------------------
// let todoListUI = document.getElementById("todo-list") as HTMLElement
// let todoManager = new ToDoManager(todoListUI)
// // -----------------------------------------------------------------------------
setDefaultProjectUI() {
    console.warn("PM - setDefaultProjectUI invoked")
    const defaultData: IProject = {
        name: "default-project" as string,
        description: "Default description" as string,
        cost: 0 as number,
        status: "Default status" as ProjectStatus,
        userRole: "Default userRole" as UserRole,
        finishDate: new Date ("finishDate" as string),
        progress: 50 as number,
        initials: "DP" as string,
        id: "defaultId" as string,
        todoList: []

    }
    const defaultProject = new Project(defaultData)
    defaultProject.ui.addEventListener("click", () => {
        const projectsPage = document.getElementById("projects-page")
        const detailsPage = document.getElementById("project-details")
        if (!projectsPage || !detailsPage) {return}
        console.log("pages exists")
        projectsPage.style.display = "none"
        detailsPage.style.display = "flex"
        // todoManager.cleanToDoManager()
        // todoManager.cleanToDoManager()
        this.setDetailsPage(defaultProject)
    })

    this.ui.append(defaultProject.ui)
    this.list.push(defaultProject)
    console.warn("Default Project is created")
    return defaultProject
}
// -----------------------------------------------------------------------------
deleteDefaultProjectUI() {
    console.warn("PM - deleteDefaultProjectUI invoked")
    const child = document.getElementById("defaultId")
    const parent = document.getElementById("projects-list")
    if (child && parent) {
        parent.removeChild(child)
        this.list.shift()
        return(document)
    }
}
// -----------------------------------------------------------------------------
newProject(data: IProject) {
    this.deleteDefaultProjectUI()

    console.warn("PM - newProject invoked")
    const projectNames = this.list.map((project) => {
        return project.name
    })
    console.log("ProjectsManager.newProject -> Project names list before newProject:")
    console.log(projectNames)
    const nameInUse = projectNames.includes(data.name)
    if (data.name.length < 6){
        throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    }
    // if (nameInUse) {
    //     throw new Error(`A project with the name "${data.name}" already exists`)
    // }
    // const child = document.getElementById("default-project")
    // console.log(child)
    // const todos = data.todoList as ToDo[]
    // data.todoList = todos

    if (this.idInUse(data.id)) {
        this.updateProject(data)
    } else {

        const newToDoList = [] as ToDo[]
        for (const toDo of data.todoList) {
            try { 
                const newToDo = new ToDo(toDo)
                newToDoList.push(newToDo)
            } catch (error) {
                    alert (error)
            }
        }
        data.todoList = newToDoList


        const project = new Project(data)
        project.ui.addEventListener("click", () => {
            const projectsPage = document.getElementById("projects-page")
            const detailsPage = document.getElementById("project-details")
            if (!projectsPage || !detailsPage) {return}
            console.log("pages exists")
            projectsPage.style.display = "none"
            detailsPage.style.display = "flex"
            // todoManager.cleanToDoManager()
            // todoManager.cleanToDoManager()
            this.setDetailsPage(project)
        })
    // const container = document.getElementById("projects-list")
    // if (project.ui && project.ui instanceof HTMLElement) {
    //     console.log("appending UI from ProjectsManager - NewProject")
    // }
        console.warn("PM - newProject project after function: ", project)
        this.ui.append(project.ui)
        this.list.push(project)
        console.warn("PM - newProject projectsManager list after function: ", this.list)

    }

// }

    // const count = project.todoList.lastIndexOf
    // --------------------------------------------------------------
    // const container = document.getElementById("todo-list")
    // if (container && container instanceof HTMLElement) {

    //     let count = container.childElementCount
    //     console.log(count)
    //     for (var i=0;i < count;i++) {
    //         let child = container.firstElementChild
    //         if (child) {
    //         container.removeChild(child)
    //         }
    //     }
    //             if (newToDo.ui && newToDo.ui instanceof HTMLElement) {
    //             container.append(newToDo.ui)
    //             console.log("PM - newProject - newToDOUI: ",newToDo.ui)
    //             }
    //     }
    // }
// -------------------------------------------------------------------

    console.warn("New Project is created")
}
// -----------------------------------------------------------------------------
setDetailsPage(project: Project) {
    console.warn("PM - setDetailsPage invoked")
    const detailsPage = document.getElementById("project-details")
    if (!detailsPage) {return}
    const id = detailsPage.querySelector("[data-project-info='id']")
    if (id) {id.textContent = project.id}
    const name = detailsPage.querySelector("[data-project-info='name']")
    if (name) { name.textContent = project.name}
    const name2 = detailsPage.querySelector("[data-project-info='name2']")
    if (name2) { name2.textContent = project.name}
    const initials = detailsPage.querySelector("[data-project-info='initials']")
    if (initials) { initials.textContent = project.initials}

    const description = detailsPage.querySelector("[data-project-info='description']")
    if (description) { description.textContent = project.description}
    const description2 = detailsPage.querySelector("[data-project-info='description2']")
    if (description2) { description2.textContent = project.description}

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

    const progress = detailsPage.querySelector("[data-project-info='progress']")
    const progressAsString = project.progress.toString()
    if (progress && progressAsString) { progress.textContent = progressAsString }
    const bar = document.getElementById("project-progress-bar")
    // const progressPercent = project.progress + "%" as string
    if (bar) { bar.style.width = `"${progress}%"`
        // bar.style = `"${progressPercent}"`

        console.warn("progress percent: ",progress)
        }
    



    const container = document.getElementById("todo-list")
    if (container && container instanceof HTMLElement) {

        let count = container.childElementCount
        console.log(count)
        for (var i=0;i < count;i++) {
            let child = container.firstElementChild
            if (child) {
            container.removeChild(child)
            }
        }

        // const todoManager = new ToDoManager(container)
        // todoManager.cleanToDoManager()

        for (const toDo of project.todoList) {
            try { 
                const defToDo = 
                (toDo)
                // new ToDo(toDo)
                container.append(defToDo.ui)
                defToDo.ui.addEventListener("click", () => {
                    console.log("I listen the click on ToDo UI")
                    console.log(defToDo)
                    const toDoCard = defToDo.ui
                    // const toDoCard = document.getElementById(`"${defToDo.id}"`) as HTMLElement
                    console.log(toDoCard, toDoCard.innerHTML)
                    const editToDoForm = document.getElementById("edit-todo-form")
 
                    if(toDoCard) {
                        console.log("todoCard exists")
                        const cardId = detailsPage.querySelector("[data-todo-info='id']")
                        const cardName = detailsPage.querySelector("[data-todo-info='name']")
                        const cardDescription = detailsPage.querySelector("[data-todo-info='description']")
                        const cardStatus = detailsPage.querySelector("[data-todo-info='status']")
                        const cardDeadline = detailsPage.querySelector("[data-todo-info='deadline']")
                        const cardRelatedProject = detailsPage.querySelector("[data-todo-info='relatedProject']")
                        console.log("todoCard data: ",cardId, cardName, cardDescription, cardStatus, cardDeadline, cardRelatedProject)
                        if (cardId && cardName && cardDescription && cardStatus && cardDeadline && cardRelatedProject)
                        console.log("todoCard data: ",cardId.innerHTML, cardName.innerHTML, cardDescription.innerHTML, cardStatus.innerHTML, cardDeadline.innerHTML, cardRelatedProject?.innerHTML)

                        console.log("todoCard data: ",cardId?.innerHTML, cardName?.innerHTML, cardDescription?.innerHTML, cardStatus?.innerHTML, cardDeadline?.innerHTML, cardRelatedProject?.innerHTML)
                        const setToDoCardData: IToDo = {
                            id: cardId?.innerHTML as string,
                            name: cardName?.innerHTML as string,
                            description: cardDescription?.innerHTML as string,
                            status: cardStatus?.innerHTML as ToDoStatus,
                            deadline: new Date (cardDeadline?.innerHTML as string),
                            relatedProject: cardRelatedProject?.innerHTML as string,
                        }
                        console.log("setToDoCardData: ",setToDoCardData)
    
                        if (cardName && toDoCard && container && editToDoForm && detailsPage) { 
                            console.log(name)
                            // detailsPage.style.display = "none"
                            // projectsPage.style.display = "none"

                            const editModal = document.getElementById("edit-todo-modal")
                            if (editModal && editModal instanceof HTMLDialogElement) {
                                editModal.showModal()
                            }
                        


                            // toggleModal("edit-todo-modal", "show")

                            let formId = editToDoForm.querySelector("[data-todo-info='id']")
                            if (formId && formId instanceof HTMLInputElement) {
                                // let cardIdValue = cardId.innerHTML
                                // if (formId) { formId.value = cardIdValue }
                                formId.value = defToDo.id
                            }
                            let formName = editToDoForm.querySelector("[data-todo-info='name']")
                            if (formName && formName instanceof HTMLInputElement) {
                                // let cardNameValue = cardName.innerHTML
                                // if (formName) { formName.value = cardNameValue }
                                formName.value = defToDo.name 
                            }

                            let formDescription = editToDoForm.querySelector("[data-todo-info='description']")
                            if (formDescription && formDescription instanceof HTMLTextAreaElement) {
                                // let cardDescriptionValue = cardDescription.innerHTML
                                // if (formDescription) { formDescription.textContent = cardDescriptionValue }
                                formDescription.textContent = defToDo.description 
                            }

                            let formStatus = editToDoForm.querySelector("[data-todo-info='status']")
                            if (formStatus && formStatus instanceof HTMLSelectElement) {
                                // let cardStatusValue = cardStatus.innerHTML
                                // if (formStatus) { formStatus.value = cardStatusValue }
                                formStatus.value = defToDo.status 
                            }

                            let formDeadline = editToDoForm.querySelector("[data-project-info='deadline']")
                            if (formDeadline && formDeadline instanceof HTMLInputElement) {
                                // let deadline2 = new Date(cardDeadline.innerHTML)
                                // const deadline3 = deadline2.toISOString().split('T')[0];
                                // console.warn("deadline3: ", deadline3)
                                // console.warn("deadline2: ",deadline2)
                                // console.warn("deadline2.toLocaleDateString: ",deadline2.toLocaleDateString)
                                formDeadline.value = defToDo.deadline.toISOString().split('T')[0]
                            }

                        }
                    }
        
        
                    // let modal = document.getElementById("edit-todo-modal")
                    // if (modal && modal instanceof HTMLDialogElement) {
                    //     modal.showModal()
                    // }

                    // toggleModal("edit-todo-modal", "show")
                    // editToDo(defToDo.relatedProject, defToDo.id)
                

            })}
            catch (error) {
                alert (error)
            }
        }
    }

    
}
// -----------------------------------------------------------------------------
// todoListRefresh() {
//     console.warn("todoListRefresh is invoked")
//     const detailsPage = document.getElementById("project-details")
//     if (!detailsPage) {return}
//     const container = document.getElementById("todo-list")
//     const projectId = detailsPage.querySelector("[data-project-info='id']")
//     if (projectId) {
//         const project = this.getProject(projectId.innerHTML)
//         if (container && container instanceof HTMLElement && project) {
//             // const todoManager = new ToDoManager(container)
//             todoManager.cleanToDoManager()
//             for (const toDo of project.todoList) {
//                 try { 
//                     todoManager.newToDo(toDo)
//                 }
//                 catch (error) {
//                     alert (error)
//                 }
//             }
//         }
//     }
// }

// -----------------------------------------------------------------------------

idInUse(id: string) {
    console.warn("PM - idInUse invoked")
    const projectIds = this.list.map((project) => {
        return project.id
    })
    if (projectIds.includes(id)) {
        return true
    }
    else {
        return false
    }
    console.warn("idInUse: id already exists")
}


// idInUse(id: string) {
// const projectIds = this.list.map((project) => {
//     return project.id
// })
// const idInUse = projectIds.includes(id)
// console.warn("idInUse: id already exists")

// }

// -----------------------------------------------------------------------------
updateProject(data: IProject) {
    console.warn("PM - updateProject invoked")
    // this.getProject(id)
    // console.log(this.getProject)

    if (data.name.length < 6){
        throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    }


    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
    // const oldproject
    for (const oldproject of this.list) {
        if (oldproject.id !== data.id) {
            newList.push(oldproject)
        } else {
            for (const item of oldproject.todoList) {
                newToDoList.push(item)
            }
            for (const key in oldproject) {
                oldproject[key] = data[key]
            }
            oldproject.todoList = newToDoList
            newList.push(oldproject)
        }
    }
    this.list = newList

    //         for (const oldtodo of oldproject.todoList) {
    //             if (oldtodo.id !== data.id) {
    //                 newToDoList.push(oldtodo)
    //             } else {
    //                 for (const key in oldtodo) {
    //                     oldtodo[key] = data[key]
    //                     newToDoList.push(oldtodo)
    //                 }
    //             }
    //         }
    //         oldproject.todoList = newToDoList
    //         newList.push(oldproject)
    //     }
    // }






    // const projectNames = this.list.map((project) => {
    //     return project.name
    // })
    // console.log("ProjectsManager.newProject -> Project names list before newProject:")
    // console.log(projectNames)
    // const nameInUse = projectNames.includes(data.name)
    // if (nameInUse) {
    //     throw new Error(`A project with the name "${data.name}" already exists`)
    // }
    // const child = document.getElementById("default-project")
    // console.log(child)

    // let projectToBeUpdated = this.getProject(data.id)

    // const newToDoList = [] as ToDo[]
    // for (const toDo of data.todoList) {
    //     try { 
    //         const newToDo = new ToDo(toDo)
    //         newToDoList.push(newToDo)
    //     } catch (error) {
    //             alert (error)
    //     }
    // }
    // data.todoList = newToDoList



    // const updatedProjects = this.list.map(project => {
    //     if (project.id === data.id) {
    //         for (const key in project) {
    //             project[key] = data[key]
    //         }
    //             return project
    //     } else {
    //         return project
    //     }
    // })

//--------------------------------------------------------------------------------

    const projectCard = document.getElementById(data.id)
    if (!projectCard) {return}
    const id = projectCard.querySelector("[data-project-info='id']")
    if (id) {id.textContent = data.id}
    const description = projectCard.querySelector("[data-project-info='description']")
    if (description) {description.textContent = data.description}
    const name = projectCard.querySelector("[data-project-info='name']")
    if (name) {name.textContent = data.name}
    const status = projectCard.querySelector("[data-project-info='status']")
    if (status) {status.textContent = data.status}
    const cost = projectCard.querySelector("[data-project-info='cost']")
    const costAsString = data.cost.toString()
    if (cost && costAsString) { cost.textContent = costAsString}
    const userRole = projectCard.querySelector("[data-project-info='userRole']")
    if (userRole) { userRole.textContent = data.userRole}
    const finishDate = projectCard.querySelector("[data-project-info='finishDate']")
    const finishDateAsString = data.finishDate.toString()
    if (finishDate) { finishDate.textContent = finishDateAsString}
    let progress = projectCard.querySelector("[data-project-info='progress']")
    const progressAsString = data.progress.toString()
    if (progress) { progress.textContent = progressAsString }
    // const progressAsString = data.progress.toString()
}

//--------------------------------------------------------------------------------
// this.list = updatedProjects

    // const container = document.getElementById("todo-list")
    // if (container && container instanceof HTMLElement) {

    //     let count = container.childElementCount
    //     console.log(count)
    //     for (var i=0;i < count;i++) {
    //         let child = container.firstElementChild
    //         if (child) {
    //         container.removeChild(child)
    //         }
    //     }

        // const todoManager = new ToDoManager(container)
        // todoManager.cleanToDoManager()

        // for (const toDo of data.todoList) {
        //     try { 
        //         new ToDo(toDo)
        //         container.append(toDo.ui)
        //     }
        //     catch (error) {
        //         alert (error)
        //     }
        // }
    // }


    // const updatedUI = this.list.map(project => { 
    //     if (project.id === data.id) {
    //         let existingUI = document.getElementById(data.id)
    //         if (existingUI && existingUI instanceof HTMLElement) {
    //             newUI = project.setUI()
    //             // existingUI = project.ui
    //         }
    //         return existingUI
    //     } else {
    //         return
    //     }
    // })


    

    //     return { ...person, age: 28 };
    //     } else {
    //     return person;
    //     }
    //     });
        
    //     console.log(updatedPersons); 



    // const existingProject = this.getProject(data.id)
    // if (existingProject) {
    //     for (const key in data) {
    //         existingProject[key] = data[key]
    //         return existingProject
    //     }
    // }

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


// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
updateToDo(data: IToDo) {
    console.warn("PM - updateToDo invoked")
    // if (data.name.length < 6){
    //     throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    // }

    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
    // const oldproject
    for (const oldproject of this.list) {
        if (oldproject.id !== data.relatedProject) {
            newList.push(oldproject)
        } else {
            for (const oldtodo of oldproject.todoList) {
                if (oldtodo.id !== data.id) {
                    newToDoList.push(oldtodo)
                } else {
                    for (const key in oldtodo) {
                        oldtodo[key] = data[key]
                        newToDoList.push(oldtodo)
                    }
                }
            }
            oldproject.todoList = newToDoList
            newList.push(oldproject)
        }
    }

    const todoCard = document.getElementById(data.id)
    if (!todoCard) {return}
    const id = todoCard.querySelector("[data-todo-info='id']")
    if (id) {id.textContent = data.id}
    const relatedProject = todoCard.querySelector("[data-todo-info='relatedProject']")
    if (relatedProject) {relatedProject.textContent = data.relatedProject}
    const name = todoCard.querySelector("[data-todo-info='name']")
    if (name) {name.textContent = data.name}
    const description = todoCard.querySelector("[data-todo-info='description']")
    if (description) {description.textContent = data.description}
    const status = todoCard.querySelector("[data-todo-info='status']")
    if (status) {status.textContent = data.status}
    const deadline = todoCard.querySelector("[data-todo-info='deadline']")
    const finishDateAsString = data.deadline.toString()
    if (deadline) { deadline.textContent = finishDateAsString}
    // const relatedProject = todoCard.querySelector("[data-todo-info='relatedProject']")
    // const progressAsString = data.progressAsString.toString()
    // if (progressAsString) {progressAsString.textContent = data.progressAsStirng}


    // this.list = updatedProjects

}

// -----------------------------------------------------------------------------




// cleanProjectsManager() {
//     console.warn("PM - cleanProjectsManager invoked")
//     console.log("cleanProjectsManager - this.list: ", this.list)
//     console.log("cleanProjectsManager - this.ui: ", this.ui.children)

//     for (var i=0;i<this.list.length;i++) {
//         console.warn("cleanProjectsManager for is invoked");
//         let project = this.list[i] as Project;
//         if (project) {
//             console.log("for project.id: ", project.id)
//             this.deleteProjectFromList(project.id as string)
//             this.deleteProjectUI(project.id as string)
//             console.log("cleanProjectManager for this.ui.children: ", this.ui.children)
//         }
//     }
//     console.warn("cleanProjectsManager this.ui.children: ",this.ui.children)
// }
// -----------------------------------------------------------------------------
getProject(id: string) {
    console.warn("PM - getProject invoked")
    const project = this.list.find((project) => {
        return project.id as string === id as string
    })
    if (project)
    console.log(project as Project)
    return project as Project
}
// -----------------------------------------------------------------------------
getProjectbyName(name: string) {
    const project = this.list.find((project) => {
        return project.name === name
    })
    return project
}
// -----------------------------------------------------------------------------
deleteProjectUI(id: string) {
    console.warn("PM - deleteProjectUI invoked")
    const project = this.getProject(id) as Project
    const parent = document.getElementById("projects-list")
    const child = document.getElementById(id)
    if (parent && child) {
    parent.removeChild(child)
    console.log("deleteProjectUI: I reach this point")
    } else {
        console.log("Id provided does'nt match with any id of projectsList")
        return }
    }
// -----------------------------------------------------------------------------
deleteProjectFromList(id: string) {
    console.warn("PM - deleteProjectFromList invoked")
    const project = this.getProject(id) as Project
    if (project) {
        const remaining = this.list.filter((project) => {
            return project.id !== id
        })
        this.list = remaining
        console.log("deleteProjectFromList: I reach this point")
        console.log("remaining: ",remaining)
    } else { 
        console.log("Id provided does'nt match with any id of projectsList")
        return
    }
}



// -----------------------------------------------------------------------------
totalCost() {
    const total = this.list.reduce((total, project) => total + project.cost, 0)
    console.log(total)
    return total
}
// -----------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------
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
