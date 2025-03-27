import { Project, IProject, UserRole, ProjectStatus } from "./Project"
import { ToDo, IToDo, ToDoStatus } from "./ToDo"
import * as Firestore from "firebase/firestore"
import { doc, deleteDoc, Timestamp} from "firebase/firestore"
import { firebaseDB } from "../firebase"
import { ReferenceNode } from "three/examples/jsm/nodes/Nodes.js"


export class ProjectsManager {
    list: Project[] = []
    todoList: ToDo[] = []
    onProjectCreated = (project: Project) => {}
    onProjectUpdated = (project: Project) => {}

    onProjectDeleted = () => {}
    onTodoCreated = (todo: ToDo) => {}
    onTodoUpdated = (todo: ToDo) => {}
    onTodoDeleted = () => {}

// -----------------------------------------------------------------------------
constructor() {
    this.getProjectsFromFirestore();
    this.getToDosFromFirestore()
    // this.getToDos();
    // console.log("firebaseProjects: ",firebaseProjects)
    console.log("PM this.list: ", this.list)
}
// -----------------------------------------------------------------------------
async getProjectsFromFirestore() {
    console.warn("getting all projects from Firestore...")
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const firebaseProjects = await Firestore.getDocs(projectsCollection)
        for (const doc of firebaseProjects.docs) {
            const data = doc.data()
            const project: IProject = {
                ...data,
                finishDate: (data.finishDate as unknown as Firestore.Timestamp).toDate()
            }
            console.log("doc.id: ",doc.id,"data.id: ",data.id)

            project.firebaseId = doc.id
            console.log("doc.id: ",doc.id,"data.id: ",data.id)
            try {
                this.newProjectToList(project)
            } catch (error) {
                console.log("Error creating ProjectFromFirebase. project.id: ",project.id," doc.id: ", doc.id)
                throw(error)
            }
        }
        console.log("firebaseProjects: ",firebaseProjects)
        console.log("PM this.list: ", this.list)
    } catch (error) {
        console.error("Error loading projects from Firestore: ", error)
    }
}
// -----------------------------------------------------------------------------
async getFirebaseId(id: string) {
    console.warn("syncing FirebaseId...")
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const firebaseProjects = await Firestore.getDocs(projectsCollection)
        console.log("firebaseProjects: ",firebaseProjects)
        for (const doc of firebaseProjects.docs) {
            // if (doc.id === id) {
                const data = doc.data()
                if (data.id !== id) {break}
                else {
                    console.warn("firebaseId: ",doc.id)
                    return doc.id
                }
    //                 const project: IProject = {
    //                     ...data,
    //                     finishDate: (data.finishDate as unknown as Firestore.Timestamp).toDate(),
    //                 }
    //                 project.firebaseId = doc.id
    //                 return [project]
    //         } 

    //         console.log("doc.id: ",doc.id,"data.id: ",data.id)

    //         project.firebaseId = doc.id
    //         console.log("doc.id: ",doc.id,"data.id: ",data.id)
    //         try {
    //             this.newProjectToList(project, doc.id)
    //         } catch (error) {
    //             console.log("Error creating ProjectFromFirebase. project.id: ",project.id," doc.id: ", doc.id)
    //             throw(error)
    //         }
    //     }
    //     console.log("firebaseProjects: ",firebaseProjects)
    //     console.log("PM this.list: ", this.list)
    // } catch (error) {
    //     console.error("Error loading projects from Firestore: ", error)
        }
    } catch (error) {
        console.warn("unable to reach ProjectsCollection")
        console.log(error)
    }
}

// -----------------------------------------------------------------------------
async getToDosFromFirestore() {
    console.warn("getting todos from Firestore...")
    try {
        // const getFirestoreProjects = async () => {
            const todosCollection = Firestore.collection(firebaseDB, "/todos") as Firestore.CollectionReference<IToDo>
            const firebaseToDos = await Firestore.getDocs(todosCollection)
            for (const doc of firebaseToDos.docs) {
                const data = doc.data()
                const todo: IToDo = {
                    ...data,
                    deadline: (data.deadline as unknown as Firestore.Timestamp).toDate()
                }
                try {
                    const newToDo = new ToDo(todo)
                    this.newToDoToList(newToDo)
                } catch (error) {
                    console.log(error)
                    // this.updateProject(project)
                }
            }
            console.log("firebaseToDos: ",firebaseToDos)
            console.log("PM this.todoList: ", this.todoList)
        } catch (error) {
            console.error("Error loading todos from Firestore: ", error)
            // return getFirestoreProjects
        }
}

// -----------------------------------------------------------------------------
filterProjects(value: string) {
    console.warn("filtering projects by name...")
    const filteredProjects = this.list.filter((project) => {
        return project.name.includes(value)
    })
    return filteredProjects
}

// -----------------------------------------------------------------------------
async newProjectFromForm(data: IProject) {
    console.warn("Processing Project From Form...")
    if (this.idInUse(data.id)) {
        console.log("id found in List -> updating project")
        this.updateProjectInList(data)
        const updatedProject = new Project(data)
        await this.updateProjectInFirestore(updatedProject)
    } else {
        console.warn("id not found in List -> creating new project")
        const newProject = new Project(data)
        await this.newProjectToFirestore(newProject)
        const firebaseId = await this.getFirebaseId(newProject.id)
        // console.log("firebaseId: ",firebaseId)
        if (firebaseId) {
            newProject.firebaseId = firebaseId
            this.newProjectToList(newProject)
        } else {
            console.warn("ireBaseId doesn't exists: "!)
        }
        // this.list.push(newProject)
        // this.storeProjectInFirestore(newProject)
        // this.onProjectCreated(newProject)
        // this.storeProjectInFirestore(newProject)
    }
}

// -----------------------------------------------------------------------------
newProjectToList(data: IProject) {
    console.warn("creating project in List...")
    const newProject = new Project(data)
    this.list.push(newProject)
    this.onProjectCreated(newProject)
}

// -----------------------------------------------------------------------------
async newProjectToFirestore(project: Project): Promise<void> {
    console.log("projectToFirestoreToCheckFinishDate", project)
    const parsedDate = new Date(project.finishDate)
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference
        // const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const projectToFirestore = {
            id: project.id as string,
            name: project.name as string,
            description: project.description as string,
            status: project.status as string,
            userRole: project.userRole.valueOf() as string,
            finishDate: Firestore.Timestamp.fromDate(parsedDate) as Timestamp,
            cost: project.cost as number,
            progress: project.progress as number,
            todoList: project.todoList as [],
            initials: project.initials as string,
            initialsColor: project.initialsColor as string,
            shortFinishDate: project.shortFinishDate as string,
            firebaseId: project.firebaseId as string,
        }
        await Firestore.addDoc(projectsCollection, projectToFirestore)

    } catch (error) {
        console.error("Error adding projects to Firestore: ", error)
        console.log(project)
    }
}
// -----------------------------------------------------------------------------
async updateProjectInFirestore(project: Project): Promise<void> {
    console.warn("updating project in Firestore...")
    try {
        // const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference
        // const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const projectToFirestore = {
            id: project.id as string,
            name: project.name as string,
            description: project.description as string,
            status: project.status as string,
            userRole: project.userRole.valueOf() as string,
            finishDate: Firestore.Timestamp.fromDate(project.finishDate) as Timestamp,
            cost: project.cost as number,
            progress: project.progress as number,
            todoList: project.todoList as [],
            initials: project.initials as string,
            initialsColor: project.initialsColor as string,
            shortFinishDate: project.shortFinishDate as string,
            firebaseId: project.firebaseId as string,
        }
        const docRef = doc(firebaseDB, "projects", project.firebaseId)
        await Firestore.updateDoc(docRef, projectToFirestore)

    } catch (error) {
        console.error("Error adding projects to Firestore: ", error)
        console.log(project)
    }

}
// -----------------------------------------------------------------------------
async storeTodoInFirestore(todo: ToDo): Promise<void> {
    try {
        const todosCollection = Firestore.collection(firebaseDB, "/todos") as Firestore.CollectionReference
        // const todosCollection = Firestore.collection(firebaseDB, "/todos") as Firestore.CollectionReference<IToDo>
        const todoToFirestore = {
            id: todo.id as string,
            name: todo.name as string,
            description: todo.description as string,
            status: todo.status as string,
            deadline: Firestore.Timestamp.fromDate(todo.deadline) as Timestamp,
            relatedProject: todo.relatedProject as string,
            todoCardColor: todo.todocardcolor as string,
            shortdeadline: todo.shortdeadline as string,
        }
        await Firestore.addDoc(todosCollection, todoToFirestore)

    } catch (error) {
        console.error("Error adding todo to Firestore: ", error)
        console.log(todo)
    }
}
// -----------------------------------------------------------------------------
async deleteTodoFromFirestore(todo: ToDo): Promise<void> {
    try {
        if (!todo.id) {
            throw new Error("El todo no tiene un ID válido");
        }
        const docRef = doc(firebaseDB, "todos", todo.id)
        await Firestore.deleteDoc(docRef)
        this.onTodoUpdated(todo)
    } catch (error) {
        console.error("Error deleting todos from Firestore: ", error)
        // console.log(todo)
        // this.onTodoUpdated(todo)
    }
}

// -----------------------------------------------

deleteProject(project: Project) {
    // this.deleteProjectFromList(project.id)
    this.deleteProjectFromFirestore(project)
    this.deleteProjectFromList(project.id)

    console.log(this.list)
}

// -----------------------------------------------

async deleteProjectFromFirestore(project: Project): Promise<void> {
    console.warn("deleting project from Firestore...")
    try {
        if (!project.id) {
            throw new Error("El proyecto no tiene un ID válido");
        }
        // const firebaseRef = "" as string

        const docRef = doc(firebaseDB, "projects", project.firebaseId)
        console.log("Firebase docRef: ",docRef)
        // const docRef: Firestore.DocumentReference = project.id as 
        await Firestore.deleteDoc(docRef)

        // const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>

    } catch (error) {
        console.error("Error deleting projects to Firestore: ", error)
        console.log(project)
        // this.onProjectUpdated(project)
    }
}

// ----------------------------------------------------------------------------- Delete Project From List
deleteProjectFromList(id: string) {
    console.warn("deleting project from List...")
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
updateProjectInList(data: IProject) {
    console.warn("updating project from List...")
    if (data.name.length < 6){
        throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    }
    const newList: Project[] = []
    // const newToDoList: ToDo[] = [] 
    for (const oldproject of this.list) {
        if (oldproject.id !== data.id) {
            newList.push(oldproject)
        } else {
            // for (const item of oldproject.todoList) {
            //     newToDoList.push(item)
            // }
            for (const key in oldproject) {
                oldproject[key] = data[key]
            }
            // oldproject.todoList = newToDoList
            newList.push(oldproject)
            // this.onProjectUpdated(oldproject)
        }
    }
    this.list = newList
    const projectUpdated = this.getProject(data.id)
    if (projectUpdated) {
        this.onProjectUpdated(projectUpdated)
    } else {
        console.log("projectUpdated.id not found. Cannot complete the onProjectUpdated")
    }
    console.log("PM this.list after update: ", this.list)
    console.log("onProjectUpdated(",projectUpdated,")")
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
newToDoToList(data: ToDo) {

    // const todoIds = this.todoList.map((todo) => {return todo.id})
    // if (todoIds.includes(data.id)) {
    //     this.updateToDo2(data)
    // } else {
        this.todoList.push(data)
        // this.storeTodoInFirestore(data)
        this.onTodoCreated(data)
    }
    // console.warn("PM - newToDo2 invoked, data: ", data)
    // const newTodo = new ToDo(data)
    // this.todoList.push(newTodo)

    // console.warn("New ToDo created, this.todoList: ",this.todoList)
    // this.onTodoCreated(newTodo)

newToDoFromForm(data: ToDo) {

    const todoIds = this.todoList.map((todo) => {return todo.id})
    if (todoIds.includes(data.id)) {
        this.updateToDo2(data)
    } else {
        this.todoList.push(data)
        // this.storeTodoInFirestore(data)
        this.onTodoCreated(data)
    }
    // console.warn("PM - newToDo2 invoked, data: ", data)
    // const newTodo = new ToDo(data)
    // this.todoList.push(newTodo)

    // console.warn("New ToDo created, this.todoList: ",this.todoList)
    // this.onTodoCreated(newTodo)
}
// Update ToDo -----------------------------------------------------------------------------
updateToDo2(data: ToDo) {
    const newToDoList: ToDo[] = [] 
    for (const oldtodo of this.todoList) {
        if (oldtodo.id !== data.id) { // No es el proyecto
            newToDoList.push(oldtodo)
            // pcount = pcount +1
            // console.log("pcount: ",pcount," tdcount: ",tdcount)
        } else {
            // this.deleteTodoFromFirestore(oldtodo)
            for (const key in oldtodo) {
                oldtodo[key] = data[key]
                newToDoList.push(oldtodo)
            }
            // this.storeTodoInFirestore(oldtodo)
        }}
    this.todoList = newToDoList
    const todoUpdated = this.getToDo(data.id)
    if (todoUpdated) {
        this.onTodoUpdated(todoUpdated)
    }
}



    //     const todosInOldproject = oldproject.todoList.map((item) => { return(item.id)})
    // for (const todo of this.todoList) {
    //     const projectIds = this.list.map((project) => {
    //         return project.id
    //     })
    //     if (projectIds.includes(id)) {
    //         console.warn("idInUse: id already exists")
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // }


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
    if (project) {
        console.log(project as Project)
        return project as Project
    }
}

getToDo(id: string) {
    const todo = this.todoList.find((todo) => {
        return todo.id as string === id as string
    })
    if (todo) {
        console.log(todo as ToDo)
        return todo
    }
}

// ----------------------------------------------------------------------------- Get Project By Name 
getProjectbyName(name: string) {
    const project = this.list.find((project) => {
        return project.name === name
    })
    return project
}
// -----------------------------------------------------------------------------
totalCost() {
    const total = this.list.reduce((total, project) => total + project.cost, 0)
    console.log(total)
    return total
}
}

// Deprecated Functions

// -----------------------------------------------------------------------------
// deleteDefaultProjectUI() {
//     console.warn("PM - deleteDefaultProjectUI invoked")
//     const child = document.getElementById("defaultId")
//     const parent = document.getElementById("projects-list")
//     if (child && parent) {
//         // parent.removeChild(child)
//         this.list.shift()
//         // return(document)
//     }
// }

// ---------------------------------------------------------------- New Project - to index / to ProjectsPage
// newProject2(data: IProject, id?: string) {
//     console.warn("PM - newProject is invoked")
//     const projectNames = this.list.map((project) => {
//         return project.name
//     })
//     const nameInUse = projectNames.includes(data.name)
//     if (data.name.length < 6) { throw new Error(`Project name "${data.name}" must contain at least 6 characters`) }
//     if (this.idInUse(data.id)) {
//         this.updateProject(data)
//     } else {
//         const newTodoList = [] as ToDo[]
//             for (const toDo of data.todoList) {
//                 try { 
//                     const newTodo = new ToDo(toDo) // no entiendo por que no hace push directamente.
//                     newTodoList.push(newTodo)
//                     // this.onTodoCreated(newTodo)
//                 } catch (error) {
//                         alert (error)
//                 }
//             }
//             data.todoList = newTodoList
//             const project = new Project(data)
//             // const projectsCollection2 = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<Project>

//             // Firestore.addDoc(projectsCollection2, project)

//             this.list.push(project)
//             this.onProjectCreated(project)
//             console.warn("newProject2 I reach this point")
//             this.onProjectUpdated(project)
//             console.warn("newProject2 and this one")
//             console.log(project)
//             this.storeProjectInFirestore(project)
//             // return project
//     }
// }
