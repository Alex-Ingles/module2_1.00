import * as React from "react"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"
import { Project, IProject } from "../classes/Project"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectTodos } from "./ProjectTodos"

// import { TodoCard } from "./ToDoCard"

interface Props {
    projectsManager: ProjectsManager; // In order to invoke onToDoCreated, onToDoDeleted...
    project: Project;
    todo: ToDo;
}
//---------------------------------------------------------------------------------
export function TodoForm (props: Props) {
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
                            // requiredx
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

// --------------------------------------------------- All commentend after GPT proposal ---------
// --------------------------------------------------- All commentend after GPT proposal ---------



    //     setNewTodo((prevToDo) => ({...prevToDo, [name]: value}));
    // };


        // props.todo)

    // const [newToDo, setNewTodo] = React.useState<IToDo>({
    //     id: "",
    //     name: "",
    //     description: "",
    //     status: "pending",
    //     deadline: new Date(),
    //     relatedProject: "",
    //     todocardcolor: ""
    // })
// ------------------------------------------------------------- from GPT?
    // const onFormSubmit = () => {
    // }
    // ------------------------------------------------------------- from GPT?
    // const onFormCancel = () => {
    //     const modal = document.getElementById("todo-form")
    //     if (modal && modal instanceof HTMLFormElement)
    //         modal.reset(),
    //         modal.close()
    // }
// ------------------------------------------------------------- from GPT?
    // const handleFormSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Create new ToDo and update the state
    //     const updatedToDos = [...toDos, new ToDo(newToDo)];
    //     setToDos(updatedToDos);
    //     project.todoList = updatedToDos; // Update the project's to-do list
    //     if (routeParams.id) {
    //     setNewTodo({
    //     id: "",
    //     name: "",
    //     description: "",
    //     status: "pending",
    //     deadline: new Date(),
    //     relatedProject: routeParams.id
    //     todocardcolor: ""
    //     })};
    // };

// INPUTS, SETINPUTS 

    // const [inputs, setInputs] = React.useState<ToDo>({
    //     name: todo?.name || "",
    //     description: todo?.description || "",
    //     status: todo?.status || "pending",
    //     deadline: todo?.deadline || new Date(),
    //     relatedProject: project.id || "",
    //     todocardcolor: todo?.todocardcolor || "",
    //     id: todo?.id || "",
    //     shortdeadline: todo?.shortdeadline || "",
    //     setTodoCardColor(){},
    //     setShortDeadline(){}
            
    //     }
    // )

    // ------------------------------------------------------------- from GPT?
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //         const { name, value } = e.target;
    //         setInputs((prevInput) => ({...prevInput, [name]: value}));

    //         // setInput((todo) => ({...todo, [name]: value}));
    //         setNewTodo((prevToDo) => ({...prevToDo, [name]: value}));
    //     };

// --------------------
// CODE BEFORE THE COMMIT ------------------
//------------------



    // interface Props {
    //     // project: Project
    //     todo: ToDo
    // }
    
    // export function TodoForm (props: Props) {
    
    //     const [newInput, setInput] = React.useState<ToDo>(
    //     )
    
    
    //     const onFormSubmit = () => {
    
    //     }
    
    //     const handleFormSubmit = (e: React.FormEvent) => {
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
    
    
    //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //         const { name, value } = e.target;
    
    //         setNewTodo((prevToDo) => ({...prevToDo, [name]: value}));
    //     };
    
    
    //     return (
    
