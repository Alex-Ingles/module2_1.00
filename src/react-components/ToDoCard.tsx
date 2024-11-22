import * as React from "react"
import { Project } from "../classes/Project"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"
import { TodoForm } from "./TodoForm"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectTodos } from "./ProjectTodos"

interface Props {
    projectsManager: ProjectsManager;
    project: Project;
    todo: ToDo
}

export function TodoCard(props: Props) {

    // const [newToDo, setNewTodo] = React.useState<IToDo>({
    //     id: "default-id",
    //     name: "Default Project",
    //     description: "Project sample",
    //     status: "pending" as ToDoStatus,
    //     deadline: new Date(3-7-2024),
    //     relatedProject: "default-related-id",
    //     todocardcolor: ""
    // })

    const [todotoset, SetTodo] = React.useState<ToDo>(props.todo)
    React.useEffect(()=>{SetTodo(props.todo)})
    // React.useEffect(() => {SetTodo(props.todo)})
    // todo.onTodoCreated = () => { SetTodo(todo) }
    // todo.onTodoDeleted = () => { SetTodo(todo) }

    // const todoForm = {
    //         <dialog id="todo-modal">
    //             <TodoForm projectsManager={props.projectsManager} project={props.project} todo={ todotoset } key={"todo-form"+todotoset.id}/>
    //         </dialog>

    //         }    


    // -------------------------------------------------------------- Todo UI click
    const onClickUI = () => {
        console.log("I listen onClickUI")
        // console.warn(todotoset)
        const modal = document.getElementById("todo-modal-"+todotoset.id)
        if (!(modal && modal instanceof HTMLDialogElement)) {return}
        modal.showModal()
        console.warn("props.todo: ",props.todo, "todotoset: ",todotoset)

        // const todoForm = (() => {
        //     return (
        //         <dialog id={"todo-modal-"+todotoset.id}>
        //             <TodoForm projectsManager={props.projectsManager} project={props.project} todo={ todotoset } key={"todo-form"+todotoset.id}/>
        //         </dialog>
    
        //     )
        // })
    
        // if (todo) {
        //     console.log("todo: ",todo, "props.todo: ",props.todo)
        // return (
        //     <TodoForm projectsManager={props.projectsManager} project={props.project} todo={todotoset}/>
        // )
        // } else {
        // return (
        //     <TodoForm projectsManager={props.projectsManager} project={props.project}/>
        // )}


        // const editToDoForm = document.getElementById("edit-todo-modal")
        // if(editToDoForm instanceof HTMLFormElement) {
        //     editToDoForm.display = {true: true}
        // }
    }

    // console.log("todo.backgroundcolor: ", props.todo.todocardcolor)
       
    // ------------------------------------------------------------------------- on New Todo Click
    // const onToDoCardClick = () => {
    //     const modal = document.getElementById("todo-modal")
    //     if (!(modal && modal instanceof HTMLDialogElement)) {return}
    //     modal.showModal()
    // }

    // ---------------------------------------------------------------- UI

    return (
        <div className="todo-card" onClick={ onClickUI } id={todotoset.id} key={todotoset.id+"-card"}>
            {/* {todoForm} */}
            <dialog id={"todo-modal-"+todotoset.id}>
                <p className="todo-card" style={{color: "white"}}>{"todo-modal-"+todotoset.id}</p>
                {/* {todoForm} */}
                <TodoForm projectsManager={props.projectsManager} project={props.project} todo={ todotoset } key={"todo-form"+todotoset.id}/>
            </dialog>
            <div className="todo-card" key={"todo-card-" + todotoset.id} style={{ backgroundColor: `${ todotoset.todocardcolor }`}}>
            {/* <div onClick={ onClickUI } className="todo-card" key={"todo-card-" + props.todo.id} style={{ backgroundColor: `${ props.todo.todocardcolor }`}}> */}
                <button hidden id={ todotoset.id + "-btn" }><span className="material-icons-round">edit</span></button>
                <span className="material-icons-round" 
                style={{ 
                    width: "30px", 
                    height:"30px",
                    // backgroundColor: 
                    // backgroundColor: `"${ props.todo.todocardcolor }"`,
                    // display:"flex"; 
                    // justify-content:"center"; 
                    // align-items:"center" 
                }}>
                    check_circle_outline
                </span>
                <div hidden={true}><h5 className="todo-id">{ todotoset.id }</h5></div>
                <div style={{ width: "50%" }}>
                    <h5  className="todo-description">{ todotoset.description }</h5></div>

                <div style={{width: "15%" }}><h5 className="todo-status">{ todotoset.status}</h5></div>
                <div hidden={true}><h5 className="todo-relatedProject">{ todotoset.relatedProject }</h5></div>
                <div style={{display: "none"}}><h5 className="todo-deadline">{ todotoset.deadline.toString() }</h5></div>
                <div><h5 className="todo-shortDeadline">{ todotoset.shortdeadline }</h5></div>
            </div>
        </div>
    )
}
