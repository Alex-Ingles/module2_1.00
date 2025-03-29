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
//---------------------------------------------------------------------------------
export function TodoForm2 (props: Props) {
    console.log("TodoForm - NewTodo: ", props.todo)

    const modal = document.getElementById("todo-modal");
    const form = document.getElementById("new-todo-form")
    const todoWip = props.todo

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        console.log(name,": ", value)
        todoWip[name] = value
    }
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("I listen the submit click")
        console.warn ("updatedTodo: ", todoWip)
        props.projectsManager.updateToDo(todoWip)
        if (modal && modal instanceof HTMLDialogElement) { modal.close }
    }        
    const onCancel = (e: React.FormEvent) => {
        e.preventDefault()
        if (modal && modal instanceof HTMLDialogElement) { modal.close }
        if (form && form instanceof HTMLFormElement) { form.reset }

    }
// ------------------------------------------------------------- from GPT?
    return (
        <div className="todo-form" id="todo-form" key={`${props.todo?.id}`+"-form"}>
            <form id="new-todo-form" onSubmit={(e) => {onFormSubmit(e)}}>
                <h2>{props.todo ? "Edit Todo" : " New Todo"}</h2>
                <div className="input-list">
                    <div className="form-field-container">
                        <input 
                            data-todo-info="id" 
                            name="id" 
                            // type="hidden"
                            defaultValue={ props.todo.id }
                            // onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="name"><span className="material-icons-round">apartment</span>Name</label>
                        <input 
                            data-todo-info="name" 
                            name="name" 
                            type="text" 
                            placeholder="Enter To-Do name" 
                            // required
                            // {...project.todoList("name")}
                            defaultValue={ props.todo.name }
                            // onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="description"><span className="material-icons-round">notes</span>Description</label>
                        <textarea 
                            data-todo-info="description" 
                            name="description" 
                            rows={3} 
                            placeholder="Give your description here" 
                            // required 
                            defaultValue={ props.todo.description }
                            // onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="status"><span className="material-icons-round">account_circle</span>Status</label>
                        <select 
                            data-todo-info="status" 
                            name="status"
                            defaultValue={ props.todo.status }
                            // onChange={ onInputChange }
                        >
                            <option>pending</option>
                            <option>on going</option>
                            <option>solved</option>
                        </select>
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
                            defaultValue={ props.todo.shortdeadline }
                            // onChange={ onInputChange }
                        />
                    </div>
                </div>
                <div className="submit-buttons">
                    <button type="button" onClick = {(e) => { onCancel(e) }} id="new-todo-form-cancel-btn">Cancel</button>
                    <button type="submit" style={{ backgroundColor: "green" }} id="new-todo-form-submit-btn">Accept</button>
                    <button id="new-todo-form-delete-btn" type="button" style={{ backgroundColor: "red" }}>Delete</button>
                </div>
            </form>
        </div>

    )

}

