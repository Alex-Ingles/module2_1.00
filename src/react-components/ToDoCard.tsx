import * as React from "react"
import { Project } from "../classes/Project"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"

interface Props {
    todo: ToDo
}

export function TodoCard(props: Props) {

    const [newToDo, setNewTodo] = React.useState<IToDo>({
        id: "default-id",
        name: "Default Project",
        description: "Project sample",
        status: "pending" as ToDoStatus,
        deadline: new Date(3-7-2024),
        relatedProject: "default-related-id"
    })

    const [todo, SetTodo] = React.useState<ToDo>(props.todo)
    // todo.onTodoCreated = () => { SetTodo(todo) }
    // todo.onTodoDeleted = () => { SetTodo(todo) }

    const onClickUI = () => {
        const editToDoForm = document.getElementById("edit-todo-modal")
        if(editToDoForm instanceof HTMLFormElement) {
            editToDoForm.display = {true: true}
        }
    }
        
    return (
        <div className="todo-card">
            <div onClick={ onClickUI } className="todo-card" key={"todo-card-" + props.todo.id}>
                <button hidden id={ props.todo.id + "-btn" }><span className="material-icons-round">edit</span></button>
                <span className="material-icons-round" 
                style={{ 
                    width: "30px", 
                    height:"30px",
                    // display:"flex"; 
                    // justify-content:"center"; 
                    // align-items:"center" 
                }}>
                    check_circle_outline
                </span>
                <div hidden={true}><h5 className="todo-id">{ props.todo.id }</h5></div>
                <div style={{ width: "50%" }}>
                    <h5  className="todo-description">{ props.todo.description }</h5></div>

                <div style={{width: "15%" }}><h5 className="todo-status">{ props.todo.status}</h5></div>
                <div hidden={true}><h5 className="todo-relatedProject">{ props.todo.relatedProject }</h5></div>
                <div style={{display: "none"}}><h5 className="todo-deadline">{ props.todo.deadline.toString() }</h5></div>
                <div><h5 className="todo-shortDeadline">{ props.todo.shortdeadline }</h5></div>
            </div>
        </div>
    )
}
