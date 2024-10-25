import * as React from "react"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"
import { Project, IProject } from "../classes/Project"
import { TodoCard } from "./ToDoCard"

interface Props {
    // project: Project
    todo: ToDo
}

export function TodoForm (props: Props) {

    const [newInput, setInput] = React.useState<ToDo>(
    )


    const onFormSubmit = () => {

    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Create new ToDo and update the state
        const updatedToDos = [...toDos, new ToDo(newToDo)];
        setToDos(updatedToDos);
        project.todoList = updatedToDos; // Update the project's to-do list
        if (routeParams.id) {
        setNewTodo({
        id: "",
        name: "",
        description: "",
        status: "pending",
        deadline: new Date(),
        relatedProject: routeParams.id
        })};
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewTodo((prevToDo) => ({...prevToDo, [name]: value}));
    };


    return (
        <div className="todo-form" key="todo-form" id="todo-form">
            <dialog id="new-todo-modal">
            <form id="new-todo-form" onSubmit={onFormSubmit}>
                <h2>New To-Do</h2>
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
                        <input data-todo-info="deadline" name="deadline" type="date" value={newToDo.deadline.toISOString().split("T")[0]} onChange={handleInputChange} />
                    </div>
                </div>
                    <div className="submit-buttons">
                    <Router.Link to={`/project/${project.id}`} key={project.id}>

                        <button
                            onClick = { onFormCancel }
                            id="new-todo-form-cancel-btn"
                        >
                            Cancel
                        </button>
                    </Router.Link>
                    <Router.Link to={`/project/${project.id}`} key={project.id}>
                        <button
                            onClick= { onFormSubmit }
                            id="new-todo-form-submit-btn"
                            type="submit"
                            style={{ backgroundColor: "green" }}
                        >
                            Accept
                        </button>
                    </Router.Link>
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
        </dialog>
    </div>

    )
}
