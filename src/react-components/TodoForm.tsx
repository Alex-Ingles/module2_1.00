import * as React from "react"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"
import { Project, IProject } from "../classes/Project"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectTodos } from "./ProjectTodos_nv"

interface Props {
    projectsManager: ProjectsManager; // In order to invoke onToDoCreated, onToDoDeleted...
    project: Project;
    todo: ToDo;
}

export function TodoForm (props: Props) {
    console.warn("Mounting ToDoForm component...")
    // const [newTodo, setNewTodo] = React.useState<ToDo>(new ToDo({...props.todo}))
    const [newTodo, setNewTodo] = React.useState<ToDo>(props.todo)

    // const modal = document.getElementById("todo-modal-"+newTodo.id);
    console.warn("newToDo id: ", newTodo.id)
    // const form = document.getElementById("new-todo-form")
    // --------------------------------------------
    // console.log("props.todo.id: ",props.todo.id)
    // console.log("newTodo.id: ",newTodo.id)
    // console.log("TodoForm - NewTodo: ", newTodo)
    // --------------------------------------------
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        console.log("something to change: ",name,": ", value)
        const todoWip = newTodo
        todoWip[name] = value

        todoWip.deadline = new Date(todoWip.shortdeadline)
        console.log("deadline: ", todoWip.deadline)
        setNewTodo(todoWip);
    };
    //-------------------------------------------------------------------------- on Form Submit
    const onFormSubmit = (e: React.FormEvent) => {
        e.stopPropagation()
        e.preventDefault()
        console.warn("Submitting Form...")
        const modal = document.getElementById("todo-modal-"+newTodo.id);
        const modal2 = document.getElementById("todo-card-modal-"+newTodo.id)


        // console.log("I listen the submit click")
        // console.warn ("updatedTodo: ", newTodo)
        // if (!modal) {
        //     console.warn("todo-modal-"+newTodo.id, "doesn't exist")
        // }
        // if (modal instanceof HTMLDialogElement) {
        //     console.warn("todo-modal is not an HTMLDialogElement")
        // }

        // if (!(modal && modal instanceof HTMLDialogElement)) {
        //     console.warn("todo-modal-",newTodo.id,": doesn't exist")
        //     console.warn("newTodo id: ",newTodo.id)
        //     console.warn(modal)

        // } 
        if (modal && modal instanceof HTMLDialogElement) { modal.close() }
        if (modal2 && modal2 instanceof HTMLDialogElement) { modal2.close() }

        // props.projectsManager.newToDoFromForm(new ToDo({...newTodo}))
        props.projectsManager.newToDoFromForm(newTodo)

        // props.projectsManager.newToDo2(newTodo)
    }
    //-------------------------------------------------------------------------- on Form Cancel
    const onCancel = (e: React.FormEvent) => {
        e.stopPropagation()
        e.preventDefault()
        console.warn("Cancelling Form...")
        const modal = document.getElementById("todo-modal-"+newTodo.id);
        const modal2 = document.getElementById("todo-card-modal-"+newTodo.id)

        // if (!(modal && modal instanceof HTMLDialogElement)) {
        //     console.warn("todo-modal-",newTodo.id,": doesn't exist")
        // } 
        if (modal && modal instanceof HTMLDialogElement) { modal.close() }
        if (modal2 && modal2 instanceof HTMLDialogElement) { modal2.close() }

    }
    // ------------------------------------------------------------------------ on Form Delete
    const onFormDelete = (e) => {
        e.stopPropagation()
        e.preventDefault()
        console.warn("Deleting in Form...")
        // if (!(modal && modal instanceof HTMLDialogElement)) { return <p>New To-do form doesnt exists</p> }
        const modal = document.getElementById("todo-modal-"+newTodo.id)
        const modal2 = document.getElementById("todo-card-modal-"+newTodo.id)

        if (modal && modal instanceof HTMLDialogElement) { modal.close() }
        if (modal2 && modal2 instanceof HTMLDialogElement) { modal2.close() }

        // modal.close()
        // props.projectsManager.deleteToDo(new ToDo({...newTodo}))
        props.projectsManager.deleteToDo(newTodo)
    }
    // ------------------------------------------------------------- UI
    return (
        // <dialog className={"todo-modal-"+newTodo.id}>
            <div className="todo-form" id="todo-form" key={newTodo.id+"-form"}>
                <form id="new-todo-form" onSubmit={(e) => {onFormSubmit(e)}}>
                    <h2>{props.todo ? "Edit Todo" : " New Todo"}</h2>
                    <div className="input-list">
                        <div className="form-field-container">
                            <label htmlFor="todoId"><span className="material-icons-round">apartment</span>TodoId</label>
                            <input 
                                data-todo-info="id" 
                                name="id" 
                                // type="hidden"
                                defaultValue={ newTodo.id }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="relatedProject"><span className="material-icons-round">apartment</span>RelatedProject</label>
                            <input 
                                data-todo-info="relatedProject" 
                                name="relatedProject" 
                                type="text" 
                                placeholder="Enter To-Do name" 
                                defaultValue={ newTodo.relatedProject }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="name"><span className="material-icons-round">apartment</span>Name</label>
                            <input 
                                data-todo-info="name" 
                                name="name" 
                                type="text" 
                                placeholder="Enter To-Do name" 
                                defaultValue={ newTodo.name }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-field-container">
                            <label 
                                htmlFor="description">
                                    <span className="material-icons-round">
                                        notes
                                    </span>Description
                            </label>
                                <textarea 
                                    data-todo-info="description" 
                                    name="description" 
                                    rows={3} 
                                    placeholder="Give your description here" 
                                    defaultValue={ newTodo.description }
                                    onChange={ onInputChange }
                                />
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="status">
                                <span
                                    className="material-icons-round"
                                >
                                    account_circle
                                </span>
                                Status
                            </label>
                            <select 
                                data-todo-info="status" 
                                name="status"
                                defaultValue={ newTodo.status }
                                onChange={ onInputChange }
                            >
                                <option>pending</option>
                                <option>on going</option>
                                <option>solved</option>
                            </select>
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="priority"><span className="material-icons-round">apartment</span>Priority</label>
                            <input 
                                data-todo-info="priority" 
                                name="priority" 
                                type="number" 
                                placeholder="Enter 1-10 priority" 
                                defaultValue={ newTodo.priority }
                                onChange={ onInputChange }
                            />
                        </div>

                        <div className="form-field-container">
                            <label htmlFor="deadline">
                                <span 
                                    className="material-icons-round">
                                    calendar_month
                                </span>
                                Finish Date
                            </label>
                            <input 
                                data-todo-info="deadline" 
                                name="shortdeadline" 
                                type="date"
                                defaultValue={ newTodo.shortdeadline }
                                onChange={ onInputChange }
                            />
                        </div>
                    </div>
                    <div className="submit-buttons">
                        <button type="button" onClick = {(e) => { onCancel(e) }} id="new-todo-form-cancel-btn">Cancel</button>
                        <button type="submit" style={{ backgroundColor: "green" }} id="new-todo-form-submit-btn">Accept</button>
                        {/* <button type="submit" onClick = { onFormSubmit } style={{ backgroundColor: "green" }} id="new-todo-form-submit-btn">Accept</button> */}
                        <button type="button" onClick = {(e) => { onFormDelete(e) }} id="new-todo-form-delete-btn" style={{ backgroundColor: "red" }}>Delete</button>
                    </div>
                </form>
            </div>
        // </dialog>

    )
}