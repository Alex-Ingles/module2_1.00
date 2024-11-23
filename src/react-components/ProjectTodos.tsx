import * as React from "react"
import * as Router from "react-router-dom"
import { ProjectsManager } from "../classes/ProjectsManager"
import { Project } from "../classes/Project" 
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo" 
import { TodoCard } from "./ToDoCard"
import { ProjectDetailsPage } from "./ProjectDetailsPage"
import { TodoForm } from "./TodoForm"

interface Props {
    projectsManager: ProjectsManager,
}

export function ProjectTodos(props: Props) {

    const routeParams = Router.useParams<{id: string}>() // getting id parameter from the Route
    // console.log("I`m the ID ma boys: ", routeParams.id)
    if (!routeParams.id) { return (<p>Project ID is needed to see this page</p>)} 
    const project = props.projectsManager.getProject(routeParams.id) // getting the project by id from projectsManager
    if (!project) { return (<p>The project with ID: {routeParams.id} wasnn't found. </p>)}

    const [toDos, setToDos] = React.useState<ToDo[]>( project.todoList )
    // const [todo, setTodo] = React.useState<ToDo>()
    props.projectsManager.onProjectUpdated = () => {setToDos([...project.todoList])}
    props.projectsManager.onTodoCreated = () => {setToDos([...project.todoList])}
    props.projectsManager.onTodoUpdated = () => {setToDos([...project.todoList])}
    props.projectsManager.onTodoDeleted = () => {setToDos([...project.todoList])}

    const [newIToDo, setNewTodo] = React.useState<IToDo>({
        id: "",
        name: "New ToDo",
        description: "new ToDo",
        status: "pending",
        deadline: new Date(),
        relatedProject: project.id,
        // todocardcolor: ""
    })

    const [showForm, setShowForm] = React.useState(false)

    const toDosCards =  // Creating an array iterator to get all the TodoCards from each Todo in the todolist.
        toDos.map((todo) => {
            console.log("toDos: ",toDos)
            console.log("todo: ", todo)
            return (
                <TodoCard projectsManager={props.projectsManager} project={project} todo={todo} key={todo.id}/>
            )
        })

    // const todoToPass = new ToDo({
    //     id: "",
    //     name: "New ToDo",
    //     description: "new ToDo",
    //     status: "pending",
    //     deadline: new Date(),
    //     relatedProject: project.id
    // })
    // const todoToPass = new ToDo({
    //     id: "",
    //     name: "New ToDo",
    //     description: "new ToDo",
    //     status: "pending",
    //     deadline: new Date(),
    //     relatedProject: project.id
    // })
    const [todoInForm, setTodoInForm] = React.useState<ToDo>(new ToDo(newIToDo))


// -----------------------------------------------------------------from <GPT>
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setNewTodo((prevToDo) => ({...prevToDo, [name]: value}));
    // };
// -----------------------------------------------------------------------------------from <GPT>
    // const toDosCards = Array.isArray(toDos) && toDos.length > 0 ? (
    //  : (
    //     <p>No to-dos available</p>
    // )

    // ------------------------------------------------------------------

    // const onFormSubmit = () => {


    // const todoForm = document.getElementById("new-todo-form")
    // const projectDetails = document.getElementById("project-details")
    // if (projectDetails) {
    // const projectIdElement = projectDetails.querySelector("[data-project-info='id']")
    //     if (projectIdElement) {
    //     const projectId = projectIdElement.innerHTML as string
    //     }
    //     if (todoForm && todoForm instanceof HTMLFormElement) {

    //         todoForm.addEventListener("submit", (e) => {

// ------------------------------------------------------------------------ on Form Cancel
//     const onFormCancel = (e) => {
//         const modal = document.getElementById("new-todo-modal")
//         if (!(modal && modal instanceof HTMLDialogElement)) { return <p>New To-do form doesnt exists</p> }
//         e.preventDefault()
//         // modal.reset()
//         modal.close()
// }
// // ------------------------------------------------------------------------ on Form Cancel
//     const onFormDelete = (e) => {
//         const modal = document.getElementById("new-todo-modal")
//         if (!(modal && modal instanceof HTMLDialogElement)) { return <p>New To-do form doesnt exists</p> }
//         e.preventDefault()
//         modal.close()
//     }
    // ------------------------------------------------------------------------- on New Todo Click
    const onNewToDoClick = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("I listen onNewToDoClick")
        // setTodoInForm(new ToDo(newIToDo))
        console.log("todo to pass: ", todoInForm)
        // setTodoInForm(todoToPass)
        props.projectsManager.updateToDo(todoInForm)
        const modal = document.getElementById("todo-modal-"+todoInForm.id)
        if (!(modal && modal instanceof HTMLDialogElement)) {return}
        console.warn(project.id, project.todoList)

        // props.projectsManager.newToDo(todoToPass)
        // const todoToPass = setNewTodo(newToDo)

        // props.projectsManager.newToDo(todoToPass)
        // setNewTodo(todoToPass)
        // setTodo(todoToPass)


        // const todoToPass = setNewTodo(({
        //     id: "",
        //     name: "",
        //     description: "",
        //     status: "pending",
        //     deadline: new Date(),
        //     relatedProject: project.id,
        //     todocardcolor: ""
        // }))
        modal.showModal()
        // setShowForm(false)


        // return (
        //     <TodoForm projectsManager={props.projectsManager} project={project} todo={todoToPass}/>
        // )
    }

    function setTodoForm(todo) {
        console.log("setTodoForm function called from TodoForm")
    }
    // if (!todo) {return (<p>Todo doesn't exist</p>)}
    // ------------------------------------------------------------------------- return UI
    return (
        <div className="dashboard-card" id="project-todos">
            <dialog id={"todo-modal-"+todoInForm.id}>
                <p className="todo-card" style={{color: "white"}}>{"todo-modal-"+todoInForm.id}</p>
                <TodoForm projectsManager={props.projectsManager} project={project} todo={todoInForm} key={"todo-form"+todoInForm.id}/>
            </dialog>
            <div className="dashboard-card-header">
                <h4>To-do</h4>
                <div className="dashboard-card-buttons">
                    <span className="material-icons-round">search</span>
                    <input className="search-box" type="text" placeholder="Search by name"/>
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


// ------------------------------------------------------------------------- on Todo Created
    // const onToDoCreated = () => {
    //     const newToDoBtn = document.getElementById("new-todo-btn")
    //     const modal = document.getElementById("new-todo-modal")
    //     if (newToDoBtn && modal instanceof HTMLFormElement) {
    //     newToDoBtn.addEventListener("click", () => {modal.display="true"})
    //     console.warn("toggle on newToDoButton is working !!")
    //     } else {
    //         console.warn("New Projects Button was not found")
    //     }
    // }
    // ------------------------------------------------------------------------- on Todo Deleted
    // const onToDoDeleted = () => {
    //     console.log("onToDoCreated")
    // }

    //-------------- Recall DetailsProjectsPage

    // const recallDetails = (id) => {
    //     // id = routeParams.id
    // }

    // ------------------------------------------------------------------------- on New Todo Click
    // const onToDoCardClick = () => {
    //     const modal = document.getElementById("todo-modal")
    //     if (!(modal && modal instanceof HTMLDialogElement)) {return}
    //     modal.showModal()
    // }


            {/* <dialog id="new-todo-modal">
                <form id="new-todo-form" onSubmit={ onFormSubmit }>
                    <h2>New To-Do in ProjectTodos</h2>
                    <div className="input-list">
                        <div className="form-field-container">
                            <input data-todo-info="id" name="id" type="hidden" onChange={handleInputChange}/>
                        <div className="form-field-container">
                            <label><span className="material-icons-round">apartment</span>Name</label>
                            <input data-todo-info="name" name="name" type="string" placeholder="Enter your project name" onChange={handleInputChange}/>
                        </div>
                        <div className="form-field-container">
                            <label><span className="material-icons-round">notes</span>Description</label>
                            <textarea data-todo-info="description" name="description" cols={30} rows={5} placeholder="Give your description here" defaultValue={""} onChange={handleInputChange}/>
                        </div>
                        <div className="form-field-container">
                            <label><span className="material-icons-round">account_circle</span>Status</label>
                            <select data-todo-info="status" name="status" onChange={handleInputChange}>
                                <option>pending</option>
                                <option>on going</option>
                                <option>solved</option>
                            </select>
                        </div>
                        <div className="form-field-container">
                            <label>
                            <span className="material-icons-round">calendar_month</span>Finish
                            Date
                            </label>
                            <input data-todo-info="deadline" name="deadline" type="date" onChange={ handleInputChange } />
                        </div>
                    </div>
                        <div className="submit-buttons">

                        <button
                            onClick = { onFormCancel }
                            id="new-todo-form-cancel-btn"
                        >
                            Cancel
                        </button>
                        <button
                            onClick= { onFormSubmit }
                            id="new-todo-form-submit-btn"
                            type="submit"
                            style={{ backgroundColor: "green" }}
                        >
                            Accept
                        </button>
                        <button
                            id="new-todo-form-delete-btn"
                            type="button"
                            style={{ backgroundColor: "red" }}
                        >
                            Delete
                        </button>
                        </div>
                </div>
                </form>
            </dialog> */}
            
// -------------------------------------------------------------------------------------------------- 
// ONFORMSUBMIT OLD
// -----------------------------------------------------------------------  on form submit
// const onFormSubmit = (e: React.FormEvent) => {
//     const newTodoModal = document.getElementById("new-todo-modal")
//     const newTodoForm = document.getElementById("new-todo-form")
//     if (!(newTodoForm && newTodoForm instanceof HTMLFormElement)) { return <p>New To-do form doesn't exists</p> }
//         e.preventDefault()
//         const formData = new FormData(newTodoForm)
//         // console.warn(formData)
//         const todoData: IToDo = {
//             name: formData.get("name") as string,
//             description: formData.get("description") as string,
//             status: formData.get("status") as ToDoStatus,
//             deadline: new Date (formData.get("deadline") as string),
//             id: formData.get("id") as string,
//             // relatedProject: formData.get("relatedProject") as string,
//             relatedProject: routeParams.id as string,
//             todocardcolor: ""

//         }
//         // const projectDetails = document.getElementById("project-details")
//         // if (projectDetails) {
//         //     const projectIdElement = projectDetails.querySelector("[data-project-info='id']")
//         //     if (projectIdElement) {
//         //         const projectId = projectIdElement.innerHTML as string
//         //         if (projectId) {
//         //             todoData.relatedProject = projectId
//         //         }
//         //     }
//         // }
//         console.warn("relatedProjectId: ",todoData.relatedProject)
//         console.warn("todoData: ", todoData)
//         console.warn("todoData.id: ", todoData.id)
//         console.warn(todoData.deadline)
//         try {
//             new Date(todoData.deadline)
//             if (isNaN(todoData.deadline.valueOf())) {
//                 console.warn("XXXXXXXXX:  deadline valueOf is not a number")
//                 const defDate = new Date(1979, 7, 3, 12)
//                 todoData.deadline = defDate
//                 console.warn(todoData.deadline)
//             } else {
//                 console.warn("XXXXXXXXX:  deadline valueOf is a number")
//             } 
//         } catch (err) {
//             alert(err)
//         }
//         try {
//             const project = props.projectsManager.getProject(todoData.relatedProject)
//             if (!project) {return <p>Project not found</p>}
//             const todoCreated = new ToDo(todoData)
//             project.todoList.push(todoCreated)
//             newTodoForm.reset()
//             if (!newTodoModal) {return(<p>newTodoModal does'nt exists</p>)}
//             if (newTodoModal instanceof HTMLDialogElement) {
//                 newTodoModal.close()
//             }
//             console.log(project.todoList)
//             props.projectsManager.onTodoCreated(todoCreated)
//         } catch {
//             console.log("cannot execute push and toggle")
//         }
//         console.log("index.ts - when form submit: ", todoData.deadline, typeof todoData.deadline )
//         console.log(todoData.deadline.valueOf())
//         console.log(todoData.deadline.valueOf.length)
//         // recallDetails(routeParams)
//     }

// -------------------------------------------------------------------------------------------------- 
// GPT SUGGESTIONS
// -------------------------------------------------------------------------------------------------- 


    // ---------------------------------------------------------GPT suggestion
    // const [newToDo, setNewTodo] = React.useState<IToDo>({
    //     props.projectsManager.newTodo()
    // })



// ----------------------------------------------------------------from <GPT>
    // const handleFormSubmit = (e: React.FormEvent) => {
    //         e.preventDefault();
    //         // Create new ToDo and update the state
    //         const updatedToDos = [...toDos, new ToDo(newToDo)];
    //         setToDos(updatedToDos);
    //         project.todoList = updatedToDos; // Update the project's to-do list
    //         if (routeParams.id) {
    //         setNewTodo({
    //         id: "",
    //         name: "",
    //         description: "",
    //         status: "pending",
    //         deadline: new Date(),
    //         relatedProject: routeParams.id
    //         })};
    //     };

