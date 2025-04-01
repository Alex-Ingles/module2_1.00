import * as React from "react"
import { Project } from "../classes/Project"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"
import { TodoForm } from "./TodoForm"
import { ProjectsManager } from "../classes/ProjectsManager"

interface Props {
    projectsManager: ProjectsManager;
    project: Project;
    todo: ToDo
}

export function TodoCard(props: Props) {
    console.warn("Mounting ToDoCard component...")
    const [todotoset, SetTodo] = React.useState<ToDo>(props.todo)
    React.useEffect(()=>{SetTodo(props.todo)})

    const onClickUI = () => {
        console.log("I listen onClickUI")
        const modal = document.getElementById("todo-card-modal-"+todotoset.id)
        if (!(modal && modal instanceof HTMLDialogElement)) {return}
        modal.showModal()

        console.warn("props.todo: ",props.todo, "todotoset: ",todotoset)
    }
    // ---------------------------------------------------------------- UI
    return (
        <div className="todo-card" onClick={ onClickUI } id={todotoset.id} key={todotoset.id+"-card"}>
            <dialog hidden id={"todo-card-modal-"+todotoset.id}>
                <TodoForm projectsManager={props.projectsManager} project={props.project} todo={ todotoset } key={"todo-card-form"+todotoset.id}/>
            </dialog>
            <div className="todo-card" key={"todo-card-" + todotoset.id}>
                <button  id={ todotoset.id + "-btn" }><span className="material-icons-round">edit</span></button>
                <span className="material-icons-round" 
                    style={{ 
                        width: "30px", 
                        height:"30px",
                    }}>
                    check_circle_outline
                </span>
                <div hidden={true}><h5 className="todo-id">{ todotoset.id }</h5></div>
                <div style={{ width: "50%" }}>
                    <h5  className="todo-description">{ todotoset.description }</h5></div>
                <div style={{width: "15%", backgroundColor: `${ todotoset.todocardcolor }` }}><h5 className="todo-status">{ todotoset.status}</h5></div>
                <div style={{width: "15%", backgroundColor: `${ todotoset.prioritycardcolor }`  }}><h5 className="todo-priority">{ todotoset.priority }</h5></div>
                <div hidden={true}><h5 className="todo-relatedProject">{ todotoset.relatedProject }</h5></div>
                <div style={{display: "none"}}><h5 className="todo-deadline">{ todotoset.shortdeadline }</h5></div>
                <div><h5 className="todo-shortDeadline">{ todotoset.shortdeadline }</h5></div>
            </div>
        </div>
    )
}
