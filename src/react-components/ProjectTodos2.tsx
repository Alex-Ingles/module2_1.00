import * as React from "react"
import * as Router from "react-router-dom"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo" 
import { TodoCard } from "./ToDoCard"
import { TodoForm } from "./TodoForm"
import { SearchBox } from "./SearchBox"

interface Props {
    projectsManager: ProjectsManager,
}

export function ProjectTodos2(props: Props) {
    console.warn("mounting ProjectTodos2 component...")

    const routeParams = Router.useParams<{id: string}>()
    console.log("I`m the ID ma boys: ", routeParams.id)
    if (!routeParams.id) { return (<p>Project ID is needed to see this page</p>)} 
    const project = props.projectsManager.getProject(routeParams.id)
    if (!project) { return (<p>The project with ID: {routeParams.id} wasnn't found. </p>)}

    const [toDos, setToDos] = React.useState<ToDo[]>( props.projectsManager.todoList.filter((todo) => todo.relatedProject === project.id))
    console.log("ProjectTodos2, toDos: ",toDos)

    props.projectsManager.onTodoCreated = () => {setToDos([...props.projectsManager.todoList.filter((todo) => todo.relatedProject === project.id)])}
    props.projectsManager.onTodoUpdated = () => {setToDos([...props.projectsManager.todoList.filter((todo) => todo.relatedProject === project.id)])}
    props.projectsManager.onTodoDeleted = () => {setToDos([...props.projectsManager.todoList.filter((todo) => todo.relatedProject === project.id)])}

    const [newIToDo, setNewITodo] = React.useState<IToDo>({
        id: "",
        name: "New ToDo",
        description: "new ToDo",
        status: "pending",
        deadline: new Date(),
        relatedProject: project.id,
        firebaseId: "",
        priority: 1,
        // todocardcolor: ""
    })

    const newIToDo2 = {
        id: "",
        name: "New ToDo",
        description: "new ToDo",
        status: "pending",
        deadline: new Date(),
        relatedProject: project.id,
        firebaseId: "",
        priority: 1,
        // todocardcolor: ""
    } as IToDo

    console.warn("Generating todoInForm...")

    const todoInForm = new ToDo(newIToDo2)

// --------------------------------
    console.warn("Creating all ToDo cards...")
    console.log("toDos: ",toDos)

    const toDosCards = toDos.map((todo: ToDo) => {
        console.warn("Creating ToDo card...")
        console.log("todo: ", todo)
        return (
            <TodoCard projectsManager={props.projectsManager} project={project} todo={todo} key={todo.id}/>
        )
    })
    // ------------------------------------------------------------------------- 
    const onNewToDoClick = (e: React.FormEvent) => {
        console.warn("Processing new ToDo click...")
        const modal = document.getElementById("todo-modal-"+todoInForm.id)
        if (!(modal && modal instanceof HTMLDialogElement)) {return}
        modal.showModal()
    }
    // ------------------------------------------------------------------------- 
    const onToDoSearch = (value: string) => {
        setToDos([...(props.projectsManager.filterToDos(value)).filter((todo) => todo.relatedProject === project.id)])
    }
    // ------------------------------------------------------------------------- 
    return (
        <div className="dashboard-card" id="project-todos2" key="project-todos-2">
            <dialog hidden id={"todo-modal-"+todoInForm.id}>
                <TodoForm projectsManager={props.projectsManager} project={project} todo={todoInForm} key={"todo-form-"+todoInForm.id}/>
            </dialog>
            <div className="dashboard-card-header">
                <div className="dashboard-card-buttons">
                    <h4 className="dashboard-card-title">To-Do List</h4>
                    <span className="material-icons-round">search</span>
                    <SearchBox onChange={(value) => onToDoSearch(value)}/>
                    <button onClick={(e) => {onNewToDoClick(e)}} id="new-todo-btn">
                        <span className="material-icons-round">add_circle_outline</span>
                    </button>
                </div>
            </div>
            <div className="todo-list" id="todo-list">
                { toDosCards }
            </div>
        </div>

    )
}
