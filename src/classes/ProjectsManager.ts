import * as Firestore from "firebase/firestore"
import { Project, IProject, UserRole, ProjectStatus } from "./Project"
import { ToDo, IToDo, ToDoStatus } from "./ToDo"
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
    console.log("PM this.list: ", this.list)
    console.log("PM this.todoList: ", this.todoList)
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
            project.firebaseId = doc.id
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
            } else {
                console.error("Project with id: ", id, " not found in Firebase docs")
            }
        }
    } catch (error) {
        console.warn("Unable to process ProjectsCollection")
        console.log(error)
    }
}
// -----------------------------------------------------------------------------
async getToDosFromFirestore() {
    console.warn("Getting all todos from Firestore...")
    try {
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
            }
        }
        console.log("firebaseToDos: ",firebaseToDos)
        console.log("PM this.todoList: ", this.todoList)
    } catch (error) {
        console.error("Error loading todos from Firestore: ", error)
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
    console.warn("Creating project in List...")
    const newProject = new Project(data)
    this.list.push(newProject)
    this.onProjectCreated(newProject)
}
// -----------------------------------------------------------------------------
async newProjectToFirestore(project: Project): Promise<void> {
    console.log("Creating project in Firestore...")
    const parsedDate = new Date(project.finishDate)
    try {
        const projectsCollection = Firestore.collection(firebaseDB, "/projects") as Firestore.CollectionReference
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
//  ----------------------------------------------------------------------------- 
updateProjectInList(data: IProject) {
    console.warn("updating project from List...")
    // if (data.name.length < 6){
    //     throw new Error(`Project name "${data.name}" must contain at least 6 characters`)
    // }
    const newList: Project[] = []
    for (const oldproject of this.list) {
        if (oldproject.id !== data.id) {
            newList.push(oldproject)
        } else {
            for (const key in oldproject) {
                oldproject[key] = data[key]
            }
            newList.push(oldproject)
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
    const parsedDate = new Date(project.finishDate)
    try {
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
        const docRef = doc(firebaseDB, "projects", project.firebaseId)
        await Firestore.updateDoc(docRef, projectToFirestore)
    } catch (error) {
        console.error("Error adding projects to Firestore: ", error)
        console.log(project)
    }
}
// -----------------------------------------------
deleteProject(project: Project) {
    this.deleteProjectFromList(project.id)
    this.deleteProjectFromFirestore(project)
    console.log(this.list)
}
// -----------------------------------------------------------------------------
deleteProjectFromList(id: string) {
    console.warn("deleting project from List...")
    const project = this.getProject(id) as Project
    if (project) {
        const remaining = this.list.filter((project) => {
            return project.id !== id
        })
        this.list = remaining
        this.onProjectDeleted()
        console.log("remaining: ",remaining)
    } else { 
        console.log("Id provided does'nt match with any id of projectsList")
        return
    }
}
// -----------------------------------------------
async deleteProjectFromFirestore(project: Project): Promise<void> {
    console.warn("Deleting project from Firestore...")
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
//  --------------------------------------------------------------------
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
//  --------------------------------------------------------------------
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
    }
}
newToDoToList(data: ToDo) {
    console.warn("Creating ToDo in List...")
    const newToDoList = [...this.todoList, data]
    this.todoList = newToDoList
    this.onTodoCreated(data)
    console.warn("TODO LIST: ", this.todoList)
}
// -----------------------------------------------------------------------------
async newToDoToFirestore(todo: ToDo): Promise<void> {
    console.warn("Storing ToDo in Firebase...")
    const parsedDate = new Date(todo.deadline)
    try {
        const todosCollection = Firestore.collection(firebaseDB, "/todos") as Firestore.CollectionReference
        const todoToFirestore = {
            id: todo.id as string,
            name: todo.name as string,
            description: todo.description as string,
            status: todo.status as string,
            deadline: Firestore.Timestamp.fromDate(parsedDate) as Timestamp,
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
// -------------------------------------------------------------------------------------
updateToDoInList(data: ToDo) {
    const newToDoList: ToDo[] = [] 
    for (const oldtodo of this.todoList) {
        if (oldtodo.id !== data.id) {
            newToDoList.push(oldtodo)
        } else {
            newToDoList.push(new ToDo(data))
        }}
    this.todoList = [...newToDoList]
    const todoUpdated = this.getToDo(data.id)
    if (todoUpdated) {
        this.onTodoUpdated(todoUpdated)
    }
}
// --------------------------------------------------------------------------
async updateToDoInFirestore(todo: ToDo): Promise<void> {
        console.warn("Updating ToDo in Firestore...")
        const parsedDate = new Date(todo.deadline)
        try {
            const todoToFirestore = {
                id: todo.id as string,
                name: todo.name as string,
                description: todo.description as string,
                status: todo.status as string,
                deadline: Firestore.Timestamp.fromDate(parsedDate) as Timestamp,
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
    } catch (error) {
        console.log("Something went wrong updating firebaseId")
        throw(error)
    }
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
    } catch (error) {
        console.error("Error deleting todos from Firestore: ", error)
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
