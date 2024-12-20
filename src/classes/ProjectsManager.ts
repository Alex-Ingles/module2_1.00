import { Project, IProject, UserRole, ProjectStatus } from "./Project"
import { ToDo, IToDo, ToDoStatus } from "./ToDo"
import * as Firestore from "firebase/firestore"
import { firebaseDB } from "../firebase"


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
    this.getProjects();
    // console.log("firebaseProjects: ",firebaseProjects)
    console.log("PM this.list: ", this.list)
}

async getProjects() {
    try {
    // const getFirestoreProjects = async () => {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const firebaseProjects = await Firestore.getDocs(projectsCollection)
        for (const doc of firebaseProjects.docs) {
            const data = doc.data()
            const project: IProject = {
                ...data,
                finishDate: (data.finishDate as unknown as Firestore.Timestamp).toDate()
            }
            try {
                this.newProject2(project, doc.id)
            } catch (error) {
                this.updateProject(project)
            }
        }
        console.log("firebaseProjects: ",firebaseProjects)
        console.log("PM this.list: ", this.list)
    } catch (error) {
        console.error("Error loading projects from Firestore: ", error)
        // return getFirestoreProjects

    }
}


filterProjects(value: string) {
    const filteredProjects = this.list.filter((project) => {
        return project.name.includes(value)
    })
    return filteredProjects
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

newProject(data: Project) {
    console.log("PM New Project launched")
}

// ---------------------------------------------------------------- New Project - to index / to ProjectsPage
newProject2(data: IProject, id?: string) {
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
            const project = new Project(data, id)
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
    console.log("PM updateProject upcoming data: ", data)
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
    this.onProjectUpdated(this.getProject(data.id))
    console.log("PM this.list after update: ", this.list)
}

// Update ToDo -----------------------------------------------------------------------------
newToDo(data: ToDo) {
    console.warn("PM - newToDo invoked, data: ", data)

    const newList: Project[] = []
    const newToDoList: ToDo[] = [] 

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
    }
    this.list = newList

    console.warn("New ToDo List: ", newToDoList)
    console.warn("PM - this.list after updating: ", this.list)
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
                //---------------------------------------------
                console.log("--------------------------------")
                console.log("data.id: ",data.id)
                console.log("todosInOldproject: ",todosInOldproject)
                console.log("newToDoList: ",newToDoList)
                console.log(data.id," is not in todosInOldProject")
                //---------------------------------------------
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
            //----------------------------------------------------
            console.log("--------------------------------")
            console.log("oldproject.todoList: ",oldproject.todoList)
            console.log("newToDoList: ",newToDoList)
            //----------------------------------------------------
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
