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
    onError = () => {}

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
    console.warn("Getting all projects from Firestore...")
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const firebaseProjects = await Firestore.getDocs(projectsCollection)
        for (const doc of firebaseProjects.docs) {
            const data = doc.data()
            const project: IProject = {
                ...data,
                finishDate: (data.finishDate as unknown as Firestore.Timestamp).toDate(),
                status: (data.status as ProjectStatus),
                userRole: (data.userRole as UserRole)
            }
            // console.log("doc.id: ",doc.id,"data.id: ",data.id)

            project.firebaseId = doc.id
            // console.log("Creating doc.id: ",doc.id,"data.id: ",data.id)
            try {
                console.log("Triggering  newProjecToList doc.id: ", doc.id, "project.id: ", data.id)
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
async updateFirebaseId(id: string) {
    console.warn("syncing FirebaseId...")
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
        const firebaseProjects = await Firestore.getDocs(projectsCollection)
        console.log("firebaseProjects: ",firebaseProjects)
        for (const doc of firebaseProjects.docs) {
            // if (doc.id === id) {
                const data = doc.data()
                if (data.id === id) {
                    console.warn("firebaseId: ",doc.id)
                    const project: IProject = {
                        ...data,
                        finishDate: (data.finishDate as unknown as Firestore.Timestamp).toDate(),
                        status: (data.status as ProjectStatus),
                        userRole: (data.userRole as UserRole)
                    }
                    project.firebaseId = doc.id
                    try {
                        this.updateProjectInList(project)
                    } catch (error) {
                        console.log("Error creating ProjectFromFirebase. project.id: ",project.id," doc.id: ", doc.id)
                        throw(error)
                    }
                    // return doc.id
                } else {
                    console.error("Project with id: ", id, " not found in Firebase docs")
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
    console.warn("Getting all todos from Firestore...")
    try {
        // const getFirestoreProjects = async () => {
            const todosCollection = Firestore.collection(firebaseDB, "/todos") as Firestore.CollectionReference<IToDo>
            const firebaseToDos = await Firestore.getDocs(todosCollection)
            for (const doc of firebaseToDos.docs) {
                const data = doc.data()
                const todo: IToDo = {
                    ...data,
                    deadline: (data.deadline as unknown as Firestore.Timestamp).toDate(),
                    firebaseId: (doc.id)
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
    console.warn("Filtering projects by name...")
    const filteredProjects = this.list.filter((project) => {
        return project.name.includes(value)
    })
    return filteredProjects
}
// -----------------------------------------------------------------------------
filterToDos(value: string) {
    console.warn("Filtering todos by name...")
    const filteredToDos = this.todoList.filter((todo) => {
        return todo.name.includes(value)
    })
    return filteredToDos
}

// -----------------------------------------------------------------------------
async newProjectFromForm(data: IProject) {
    console.warn("Processing Project From Form...")
    if (this.idInUse(data.id)) {
        console.log("id found in List -> updating project")
        // data.finishDate= new Date (data.shortFinishDate)
        this.updateProjectInList(data)
        const updatedProject = new Project(data)
        await this.updateProjectInFirestore(updatedProject)
    } else {
        console.warn("id not found in List -> creating new project")
        const newProject = new Project(data)
        this.newProjectToList(newProject)
        await this.newProjectToFirestore(newProject)
        await this.updateFirebaseId(newProject.id)
    }
}
// -----------------------------------------------------------------------------
newProjectToList(data: IProject) {
    // if (data.name.length < 6){
    //     throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    // }

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
//  ----------------------------------------------------------- Update Project - to index / to ProjectsPage
updateProjectInList(data: IProject) {
    console.warn("updating project from List...")
    if (data.name.length < 6){
        // this.onError()
        // const modal = document.getElementById("project-form-error")
        // if (modal && modal instanceof HTMLDialogElement) { modal.show() }
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
                // finishDate: (data.shortFinishDate as unknown as Firestore.Timestamp).toDate()

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
// -----------------------------------------------
deleteProject(project: Project) {
    // this.deleteProjectFromList(project.id)
    this.deleteProjectFromFirestore(project)
    this.deleteProjectFromList(project.id)
    console.log(this.list)
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
// -----------------------------------------------
async deleteProjectFromFirestore(project: Project): Promise<void> {
    console.warn("deleting project from Firestore...")
    try {
        if (!project.id) {
            throw new Error("El proyecto no tiene un ID válido");
        }
        const docRef = doc(firebaseDB, "projects", project.firebaseId)
        console.log("Firebase docRef: ",docRef)
        await Firestore.deleteDoc(docRef)
    } catch (error) {
        console.error("Error deleting projects to Firestore: ", error)
        console.log(project)
    }
}
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

nameInUse(name: string) {
    console.warn("PM - nameInUse invoked")
    const projectNames = this.list.map((project) => {
        return project.name
    })
    if (projectNames.includes(name)) {
        console.warn("nameInUse: project name already exists")
        return true
    }
    else {
        return false
    }
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

// -----------------------------------------------------------------------------
async newToDoFromForm(data: ToDo) {
    console.warn("Processing ToDo from Form...")
    const todoIds = this.todoList.map((todo) => {return todo.id})
    if (todoIds.includes(data.id)) {
        console.warn("ToDoFromForm id found in todoList... Updating...")
        this.updateToDoInList(data)
        this.updateToDoInFirestore(data)
    } else {
        console.warn("TodoFromForm id not found in todoList... Creating...")
        this.newToDoToList(data)
         this.newToDoToFirestore(data)

        await this.updateToDoFirebaseId(data.id)

        // this.todoList.push(data)
        // this.storeTodoInFirestore(data)
        // this.onTodoCreated(data)
    }
    // console.warn("PM - newToDo2 invoked, data: ", data)
    // const newTodo = new ToDo(data)
    // this.todoList.push(newTodo)

    // console.warn("New ToDo created, this.todoList: ",this.todoList)
    // this.onTodoCreated(newTodo)
}
// Update ToDo -----------------------------------------------------------------------------
newToDoToList(data: ToDo) {
    console.warn("Creating ToDo in List...")
    const newToDoList = [...this.todoList, data]
    this.todoList = newToDoList
    this.onTodoCreated(data)
    console.warn("TODO LIST: ", this.todoList)


    // console.warn("This.ToDoList: ", this.todoList)
    // const newToDoList: ToDo[] = []
    // let newToDo = {} as ToDo
    // if (this.todoList.length === 0) {
    //     newToDo = new ToDo({...data})
    //     newToDoList.push(new ToDo(newToDo))
    // } else {
    //     for (const oldtodo of this.todoList) {
    //         if (oldtodo.id !== data.id) {
    //             newToDoList.push(oldtodo)
    //         } else {
    //             newToDo = new ToDo({...data})
    //             newToDoList.push(newToDo)
    //         }
    //     }
    // }
    // this.todoList = newToDoList
    // console.warn("this todoList: ",this.todoList as ToDo[])
    // // this.storeTodoInFirestore(data)
    // this.onTodoCreated(newToDo)
    // console.warn("todo created:", newToDo)
    


    // const todoIds = this.todoList.map((todo) => {return todo.id})
    // if (todoIds.includes(data.id)) {
    //     this.updateToDo2(data)
    // } else {
}
    // console.warn("PM - newToDo2 invoked, data: ", data)
    // const newTodo = new ToDo(data)
    // this.todoList.push(newTodo)

    // console.warn("New ToDo created, this.todoList: ",this.todoList)
    // this.onTodoCreated(newTodo)

// -----------------------------------------------------------------------------
async newToDoToFirestore(todo: ToDo): Promise<void> {
    console.warn("Storing ToDo in Firebase...")
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
            priority: todo.priority as number,
        }
        await Firestore.addDoc(todosCollection, todoToFirestore)
        return

    } catch (error) {
        console.error("Error adding todo to Firestore: ", error)
        console.log(todo)
    }
}

// Update ToDo -----------------------------------------------------------------------------
updateToDoInList(data: ToDo) {
    const newToDoList: ToDo[] = [] 
    for (const oldtodo of this.todoList) {
        if (oldtodo.id !== data.id) { // No es el proyecto
            newToDoList.push(oldtodo)
            // pcount = pcount +1
            // console.log("pcount: ",pcount," tdcount: ",tdcount)
        } else {
            newToDoList.push(new ToDo(data))

            // const todoUpdated = new ToDo({...oldtodo})
            // for (const key in todoUpdated) {
            //     todoUpdated[key] = data[key]
            //     newToDoList.push(todoUpdated)
            // }

            // this.deleteTodoFromFirestore(oldtodo)
            // for (const key in oldtodo) {
            //     oldtodo[key] = data[key]
            //     newToDoList.push(oldtodo)
            // }
            // this.storeTodoInFirestore(oldtodo)
        }}
    this.todoList = [...newToDoList]
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

// --------------------------------------------------------------------------
async updateToDoInFirestore(todo: ToDo): Promise<void> {
        console.warn("Updating ToDo in Firestore...")
        try {
            // const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference
            // const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference<IProject>
            const todoToFirestore = {
                id: todo.id as string,
                name: todo.name as string,
                description: todo.description as string,
                status: todo.status as string,
                deadline: Firestore.Timestamp.fromDate(todo.deadline) as Timestamp,
                relatedProject: todo.relatedProject as string,
                shortdeadline: todo.shortdeadline as string,
                todocardcolor: todo.todocardcolor as string,
                firebaseId: todo.firebaseId as string,
                priority: todo.priority as number,
            }
            const docRef = doc(firebaseDB, "todos", todo.firebaseId)
            await Firestore.updateDoc(docRef, todoToFirestore)
        } catch (error) {
            console.error("Error adding ToDo to Firestore: ", error)
            console.log(todo)
        }
    }

// -----------------------------------------------------------------------------
async updateToDoFirebaseId(id: string) {
    console.warn("syncing ToDo FirebaseId...")
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/todos") as Firestore.CollectionReference<IToDo>
        const firebaseToDos = await Firestore.getDocs(projectsCollection)
        console.log("firebaseToDos: ",firebaseToDos)
        const newToDoList = [] as ToDo[]
        for (const existingTodo of this.todoList) {
            if (existingTodo.id !== id) {
                newToDoList.push(existingTodo)
            } else {
                let getFirebaseId = "" as string
                for (const doc of firebaseToDos.docs) {
                    // if (doc.id === id) {
                        const data = doc.data()
                        if (data.id === id) {
                            getFirebaseId = doc.id
                        }
                    }
                existingTodo.firebaseId = getFirebaseId
                console.log("firebaseId: ",existingTodo.firebaseId)
                newToDoList.push(existingTodo)
            }
        }
        this.todoList = newToDoList

        //                     console.warn("ToDo firebaseId: ",doc.id)
        //                     const todo: IToDo = {
        //                         ...data,
        //                         deadline: (data.deadline as unknown as Firestore.Timestamp).toDate()
        //                     }
        //                     todo.firebaseId = doc.id
        //                     try {
        //                         this.updateToDoInList(new ToDo(todo))


        //     }    
        // }    
    } catch (error) {
        console.log("Something went wrong updating firebaseId")
        // console.log("Error creating ToDo From Firebase. project.id: ",todo.id," doc.id: ", doc.id)
        throw(error)
    }
}
        // return
        //             // return doc.id
        //         } else {
        //             console.error("ToDo with id: ", id, " not found in Firebase docs")
        //         }
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
        // }
//     } catch (error) {
//         console.warn("unable to reach ProjectsCollection")
//         console.log(error)
//     }
// }



// Update ToDo ------------------------------------------------------------------ Deprecated
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

// -----------------------------------------------
deleteToDo(todo: ToDo) {
    this.deleteTodoFromList(todo.id)
    this.deleteTodoFromFirestore(todo)
    console.log(this.todoList)
}

// ----------------------------------------------------------------------------- Delete Project From List
deleteTodoFromList(id: string) {
    console.warn("deleting todo from List...")
    const todo = this.getToDo(id) as ToDo
    if (todo) {
        const remaining = this.todoList.filter((todo) => {
            return todo.id !== id
        })
        this.todoList = remaining
        console.log("remaining: ",remaining)
        console.log("this.todoList: ", this.todoList)
        this.onTodoDeleted()
    } else { 
        console.log("Id provided does'nt match with any id of projectsList")
        return
    }
}

// -----------------------------------------------------------------------------
async deleteTodoFromFirestore(todo: ToDo): Promise<void> {
    console.warn("Deleting ToDo From Firestore...")
    try {
        if (!todo.id) {
            throw new Error("El todo no tiene un ID válido");
        }
        const docRef = doc(firebaseDB, "todos", todo.firebaseId)
        await Firestore.deleteDoc(docRef)
        // this.onTodoUpdated(todo)
    } catch (error) {
        console.error("Error deleting todos from Firestore: ", error)
        // console.log(todo)
        // this.onTodoUpdated(todo)
    }
}


// -----------------------------------------------------------------------------Get Project By Id
getProject(id: string) {
    console.warn("Getting Project From List...")
    const project = this.list.find((project) => {
        return project.id as string === id as string
    })
    if (project) {
        console.log(project as Project)
        return project as Project
    }
}
// -----------------------------------------------------------------------------Get Project By Id
getToDo(id: string) {
    const todo = this.todoList.find((todo) => {
        return todo.id as string === id as string
    })
    if (todo) {
        console.log(todo as ToDo)
        return todo as ToDo
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
