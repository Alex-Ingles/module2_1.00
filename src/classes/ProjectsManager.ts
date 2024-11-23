import { Project, IProject, UserRole, ProjectStatus } from "./Project"
import { ToDo, IToDo, ToDoStatus } from "./ToDo"

export class ProjectsManager {
    list: Project[] = []
    onProjectCreated = (project: Project) => {}
    onProjectUpdated = (project: Project) => {}
    onProjectDeleted = () => {}
    onTodoCreated = (todo: ToDo) => {}
    onTodoUpdated = (todo: ToDo) => {}
    onTodoDeleted = () => {}

// -----------------------------------------------------------------------------
constructor() {
    const project = this.newProject({
        name: "default project",
        description: "This is just a default app project",
        status: "pending",
        userRole: "architect",
        finishDate: new Date(),
        cost: 10,
        initials: "",
        progress: 0,
        id: "default id",
        todoList: [],
    })
    console.log(project)
}
// -----------------------------------------------------------------------------
deleteDefaultProjectUI() {
    console.warn("PM - deleteDefaultProjectUI invoked")
    const child = document.getElementById("defaultId")
    const parent = document.getElementById("projects-list")
    if (child && parent) {
        // parent.removeChild(child)
        this.list.shift()
        // return(document)
    }
}
// ---------------------------------------------------------------- New Project - to index / to ProjectsPage
newProject(data: IProject) {
    console.warn("PM - newProject is invoked")
    this.deleteDefaultProjectUI()
    const projectNames = this.list.map((project) => {
        return project.name
    })
    const nameInUse = projectNames.includes(data.name)
    if (data.name.length < 6) { throw new Error(`Project name "${data.name}" must contain at least 6 characters`) }
    if (this.idInUse(data.id)) { this.updateProject(data) }
    else {
    const newTodoList = [] as ToDo[]
        for (const toDo of data.todoList) {
            try { 
                const newTodo = new ToDo(toDo)
                newTodoList.push(newTodo)
                // this.onTodoCreated(newTodo)
            } catch (error) {
                    alert (error)
            }
        }
        data.todoList = newTodoList
        const project = new Project(data)
        this.list.push(project)
        this.onProjectCreated(project)
        return project
    }
}
// set Details Page -----------------------------------------------------------------------------
// setDetailsPage(project: Project) {
// } 
//  --------------------------------------------------------------------Id In Use to index / to ProjectsPage
idInUse(id: string) {
    console.warn("PM - idInUse invoked")
    const projectIds = this.list.map((project) => {
        return project.id
    })
    if (projectIds.includes(id)) {
        console.warn("idInUse: id already exists")
        return true
    }
    else {
        return false
    }
}
//  ----------------------------------------------------------- Update Project - to index / to ProjectsPage
updateProject(data: IProject) {
    console.warn("PM - updateProject invoked")
    if (data.name.length < 6){
        throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    }
    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
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

    // const projectCard = document.getElementById(data.id)
    // if (!projectCard) {return}
    // const id = projectCard.querySelector("[data-project-info='id']")
    // if (id) {id.textContent = data.id}
    // const description = projectCard.querySelector("[data-project-info='description']")
    // if (description) {description.textContent = data.description}
    // const name = projectCard.querySelector("[data-project-info='name']")
    // if (name) {name.textContent = data.name}
    // const status = projectCard.querySelector("[data-project-info='status']")
    // if (status) {status.textContent = data.status}
    // const cost = projectCard.querySelector("[data-project-info='cost']")
    // const costAsString = data.cost.toString(10)
    // if (cost && costAsString) { cost.textContent = costAsString}
    // const userRole = projectCard.querySelector("[data-project-info='userRole']")
    // if (userRole) { userRole.textContent = data.userRole}
    // const finishDate = projectCard.querySelector("[data-project-info='finishDate']")
    // const finishDateAsString = data.finishDate.toString()
    // if (finishDate) { finishDate.textContent = finishDateAsString}
    // const shortFinishDate = projectCard.querySelector("[data-project-info='shortFinishDate']")
    // console.warn(this.getProject(data.id).shortFinishDate)
    // if (shortFinishDate) { shortFinishDate.textContent = new Date (data.finishDate).toLocaleDateString("es-ES")}
    // let progress = projectCard.querySelector("[data-project-info='progress']")
    // const progressAsString = data.progress.toString()
    // if (progress) { progress.textContent = progressAsString }
}

// New Todo

// Update ToDo -----------------------------------------------------------------------------
newToDo(data: ToDo) {
    console.warn("PM - newToDo invoked, data: ", data)

    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
    // console.log(data)
    // console.log(this.list)

    for (const oldproject of this.list) {
        if (oldproject.id !== data.relatedProject) {
            newList.push(oldproject)
        } else {
            const projectTodoIds = oldproject.todoList.map((todo) => {return (todo.id)})
            console.log("projectTodoIds: ", projectTodoIds)
            if (data.id in projectTodoIds) {
                for (let oldtodo of oldproject.todoList) {
                    if (oldtodo.id !== data.id) {
                        console.log("-> old todo to list: ", oldtodo.id)
                        newToDoList.push(oldtodo)
                    } else {
                        for (let key in oldtodo) {
                            oldtodo[key] = data[key]
                        }
                        console.log("-> updated todo to list: ", oldtodo.id)
                        newToDoList.push(oldtodo)
                        console.log("newToDoList: ", newToDoList)
                        this.onTodoUpdated(oldtodo)
                    }
                }
            } else {
                const newTodo = new ToDo(data)
                newToDoList.push(newTodo)
                this.onTodoCreated(newTodo)
            }
            oldproject.todoList = newToDoList
            newList.push(oldproject)
            this.onProjectUpdated(oldproject)
        }
        // this.list = newList
        // this.onTodoUpdated

    }
    this.list = newList

    console.warn("New ToDo List: ", newToDoList)
    console.warn("PM - this.list after updating: ", this.list)

    // const todoCard = document.getElementById(data.id)
    // if (!todoCard) {return}
    // const id = todoCard.querySelector("[data-todo-info='id']")
    // if (id) {id.textContent = data.id}
    // const relatedProject = todoCard.querySelector("[data-todo-info='relatedProject']")
    // if (relatedProject) {relatedProject.textContent = data.relatedProject}
    // const name = todoCard.querySelector("[data-todo-info='name']")
    // if (name) {name.textContent = data.name}
    // const description = todoCard.querySelector("[data-todo-info='description']")
    // if (description) {description.textContent = data.description}
    // const status = todoCard.querySelector("[data-todo-info='status']")
    // if (status) {status.textContent = data.status}
    // const deadline = todoCard.querySelector("[data-todo-info='deadline']")
    // const finishDateAsString = data.deadline.toString()
    // if (deadline) { deadline.textContent = finishDateAsString}
}

// Update ToDo -----------------------------------------------------------------------------
updateToDo(data: ToDo) {
    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
    for (const oldproject of this.list) {
        const todosInOldproject = oldproject.todoList.map((item) => { return(item.id)})
        let pcount = 0
        let tdcount = 0

        if (oldproject.id !== data.relatedProject) { // No es el proyecto
            newList.push(oldproject)
            pcount = pcount +1
            console.log("pcount: ",pcount," tdcount: ",tdcount)
        } else if (!(todosInOldproject.includes(data.id))) {
                console.log("--------------------------------")
                console.log("data.id: ",data.id)
                console.log("todosInOldproject: ",todosInOldproject)
                console.log("newToDoList: ",newToDoList)

                console.log(data.id," is not in todosInOldProject")
                oldproject.todoList.push(data)
                tdcount = tdcount +1
                newList.push(oldproject)
                pcount = pcount +1
                console.log("pcount: ",pcount," tdcount: ",tdcount)
                this.onTodoCreated(data)
                this.onProjectUpdated(oldproject)
        } else {
            console.log(data.id,"is in todosInOldProject", todosInOldproject)
            for (let oldtodo of oldproject.todoList) {
                if (oldtodo.id === data.id) {
                    // for (let key in oldtodo) {
                    //     oldtodo[key] = data[key]
                    // }
                    newToDoList.push(data)
                    tdcount = tdcount +1
                    console.log("pcount: ",pcount," tdcount: ",tdcount)
                    this.onTodoUpdated(oldtodo)
                } else {
                    newToDoList.push(oldtodo)
                    tdcount = tdcount +1
                    console.log("pcount: ",pcount," tdcount: ",tdcount)
                } 
            }
            console.log("--------------------------------")
            console.log("oldproject.todoList: ",oldproject.todoList)
            console.log("newToDoList: ",newToDoList)
            oldproject.todoList = newToDoList
            console.log("oldproject.todoList: ",oldproject.todoList)
            this.onProjectUpdated(oldproject)
            newList.push(oldproject)
            pcount = pcount +1
            console.log("pcount: ",pcount," tdcount: ",tdcount)
        }
    }
    this.list = newList
    console.warn("PM - this.list after updating: ", this.list)
}



// Update ToDo -----------------------------------------------------------------------------
updateToDo2(data: ToDo) { // backup for update ToDo
    // console.warn("PM - updateToDo invoked")
    // console.warn("data: ",data)

    let newList: Project[] = []
    let newToDoList: ToDo[] = [] 
    // console.log(data)
    // console.log(this.list)
    // console.log("empty newList: ",newList)
    // console.log("newToDoList: ", newToDoList)
    for (let oldproject of this.list) {
        console.log("oldproject id: ",oldproject.id)
        if (oldproject.id !== data.relatedProject) {
            newList.push(oldproject)
            console.log("1 - newList: ", newList)
            // console.log("newList: ",newList)
        // } else {
            // console.log(oldproject.todoList.length)
    //         const index = oldproject.todoList.findIndex((t) => t.id === todo.id);
    // //         console.log(index)
    // //         if (index > -1) {
    // //             console.log("index > -1")
        } else if (!(data.id in oldproject.todoList)) {
                newToDoList.push(data)
        } else {
            const count = 0
            for (let oldtodo of oldproject.todoList) {
                const forloops = count + 1
                console.log(forloops)
                if (oldtodo.id === data.id) {
                    for (let key in oldtodo) {
                        oldtodo[key] = data[key]
                    }
                    newToDoList.push(oldtodo)
                } else {
                    newToDoList.push(oldtodo)
                } 
            console.log(newToDoList)
            }
        }
            oldproject.todoList = newToDoList
            newList.push(oldproject)

            // if (oldproject.todoList.length == 0) {
            //     newToDoList.push(data)
            //     // oldproject.todoList=newToDoList
            //     console.log("2 - newToDoList: ",newToDoList)
            //     // oldproject.todoList = newToDoList
            //     console.warn(">>>>>>>>: ",newToDoList)
            //     console.log("2 - oldproject.todoList: ", oldproject.todoList)
            //     // newList.push(oldproject)
            // } else {
            //     for (var oldtodo of oldproject.todoList) {
            //         if (oldtodo.id !== data.id) {
            //             newToDoList.push(oldtodo)
            //             console.log("3 - newToDoList", newToDoList)
            //         } else if (oldtodo.id === data.id ) {
            //             for (const key in oldtodo) {
            //             oldtodo[key] = data[key]
            //             // newToDoList.push(data)
            //             newToDoList.push(oldtodo)
            //             console.log("4 - newTodOList:", newToDoList)
            //             }
            //         } else {
            //             newToDoList.push(data)
            //             console.log("5 - newToDoList: ", newToDoList)
            //         }

            //             // for (let key in oldtodo) {
            //             //     oldtodo[key] = data[key]
            //             //     console.log(oldtodo)
            //             // }
            //             // newToDoList.push(oldtodo)

            //             // for (const key of oldtodo) {
            //             //     oldtodo[key] = data[key]
            //             //     console.log("oldtodo & data keys: ",oldtodo[key], data[key])
            //             //     newToDoList.push(oldtodo)
            //     }
            //         // oldproject.todoList = newToDoList
            // }
            // oldproject.todoList = newToDoList
            // console.log("3/4/5 - oldproject.todoList: ", oldproject.todoList)
            // newList.push(oldproject)
            // oldproject.todoList = newToDoList
        console.log("2/3/4/5 newList: ",newList)
    }
    

    console.log("1/2/3/4/5 newList: ", newList)
    console.log("1/2/3/4/5 newTodoList: ", newToDoList)
    this.list = newList
    this.onTodoUpdated(data)
    console.warn("1/2/3/4 PM - this.list after updating: ", this.list)

    // const todoCard = document.getElementById(data.id)
    // if (!todoCard) {return}
    // const id = todoCard.querySelector("[data-todo-info='id']")
    // if (id) {id.textContent = data.id}
    // const relatedProject = todoCard.querySelector("[data-todo-info='relatedProject']")
    // if (relatedProject) {relatedProject.textContent = data.relatedProject}
    // const name = todoCard.querySelector("[data-todo-info='name']")
    // if (name) {name.textContent = data.name}
    // const description = todoCard.querySelector("[data-todo-info='description']")
    // if (description) {description.textContent = data.description}
    // const status = todoCard.querySelector("[data-todo-info='status']")
    // if (status) {status.textContent = data.status}
    // const deadline = todoCard.querySelector("[data-todo-info='deadline']")
    // const finishDateAsString = data.deadline.toString()
    // if (deadline) { deadline.textContent = finishDateAsString}
}

// -----------------------------------------------------------------------------Get Project By Id
getProject(id: string) {
    console.warn("PM - getProject invoked")
    const project = this.list.find((project) => {
        return project.id as string === id as string
    })
    if (project)
    console.log(project as Project)
    return project as Project
}
// ----------------------------------------------------------------------------- Get Project By Name 
getProjectbyName(name: string) {
    const project = this.list.find((project) => {
        return project.name === name
    })
    return project
}
// ----------------------------------------------------------------------------- Delete Project From List
deleteProjectFromList(id: string) {
    console.warn("PM - deleteProjectFromList invoked")
    const project = this.getProject(id) as Project
    if (project) {
        const remaining = this.list.filter((project) => {
            return project.id !== id
        })
        this.list = remaining
        this.onProjectDeleted()
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
}
