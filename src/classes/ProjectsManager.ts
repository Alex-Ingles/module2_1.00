import { Project, IProject, UserRole, ProjectStatus } from "./Project"
import { ToDo, IToDo, ToDoStatus } from "./ToDo"

export class ProjectsManager {
    list: Project[] = []
    onProjectCreated = (project: Project) => {}
    onProjectDeleted = () => {}
    onTodoCreated = (todo: ToDo) => {}
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
        parent.removeChild(child)
        this.list.shift()
        return(document)
    }
}
// ----------------------------------------------------------------------------- New Project
newProject(data: IProject) {
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
                this.onTodoCreated(newTodo)
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
//  ----------------------------------------------------------------------------- Id In Use
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
// Update Project -----------------------------------------------------------------------------
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
    const costAsString = data.cost.toString(10)
    if (cost && costAsString) { cost.textContent = costAsString}
    const userRole = projectCard.querySelector("[data-project-info='userRole']")
    if (userRole) { userRole.textContent = data.userRole}
    const finishDate = projectCard.querySelector("[data-project-info='finishDate']")
    const finishDateAsString = data.finishDate.toString()
    if (finishDate) { finishDate.textContent = finishDateAsString}
    const shortFinishDate = projectCard.querySelector("[data-project-info='shortFinishDate']")
    console.warn(this.getProject(data.id).shortFinishDate)
    if (shortFinishDate) { shortFinishDate.textContent = new Date (data.finishDate).toLocaleDateString("es-ES")}
    let progress = projectCard.querySelector("[data-project-info='progress']")
    const progressAsString = data.progress.toString()
    if (progress) { progress.textContent = progressAsString }
}

// New Todo

// Update ToDo -----------------------------------------------------------------------------
newToDo(data: ToDo) {
    console.warn("PM - newToDo invoked")

    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
    console.log(data)
    console.log(this.list)

    for (const oldproject of this.list) {
        if (oldproject.id !== data.relatedProject) {
            newList.push(oldproject)
        } else {
            const projectTodoIds = oldproject.todoList.map((todo) => {return (todo.id)})
            if (data.id in projectTodoIds) {
                for (let oldtodo of oldproject.todoList) {
                    if (oldtodo.id !== data.id) {
                        newToDoList.push(oldtodo)
                    } else {
                        for (let key in oldtodo) {
                            oldtodo[key] = data[key]
                        }
                        newToDoList.push(oldtodo)
                    }
                }
            } else {
                const newTodo = new ToDo(data)
                newToDoList.push(newTodo)
                this.onTodoCreated(newTodo)
            }
            oldproject.todoList = newToDoList
            newList.push(oldproject)
            this.list = newList
        }
    }
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
    console.warn("PM - updateToDo invoked")

    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 
    console.log(data)
    console.log(this.list)

    for (const oldproject of this.list) {
        if (oldproject.id !== data.relatedProject) {
            newList.push(oldproject)
        } else {
            for (let oldtodo of oldproject.todoList) {
                if (oldtodo.id !== data.id) {
                    newToDoList.push(oldtodo)
                } else {
                    for (let key in oldtodo) {
                        oldtodo[key] = data[key]
                    }
                    newToDoList.push(oldtodo)
                }
            }
            oldproject.todoList = newToDoList
            newList.push(oldproject)
        }
    }
    console.warn("PM - this.list after updating: ", this.list)

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
