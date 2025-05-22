import * as React from "react"
import * as Router from "react-router-dom"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo" 
import { TodoCard } from "./ToDoCard"
import { TodoForm } from "./TodoForm"
import { SearchBox } from "./SearchBox"
import * as BUI from "@thatopen/ui"

interface Props {
    projectsManager: ProjectsManager,
}

export function ProjectTodos3(props: Props) {
    console.warn("mounting ProjectTodos3 component...")

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


const todosTable = BUI.Component.create<BUI.Table>(() => {
    const onTableCreated = (element?: Element) => {
        const table = element as BUI.Table
        for (const todo of toDos) {
            const todoData = {
                data: {
                    name: todo.name,
                    description: todo.description,
                    status: todo.status,
                    deadline: todo.deadline.toString(),
                    id: todo.id,
                    relatedProject: todo.relatedProject,
                    firebaseId: todo.firebaseId,
                    priority: todo.priority,
                 }} as BUI.TableGroupData
           
            table.data.push(todoData)
        }
        console.warn("TableData: ",table.data)
    }
    return BUI.html `
        <bim-table ${BUI.ref(onTableCreated)}></bim-table>
    `
}
)

const content = BUI.Component.create<BUI.Panel>(() => {
    return BUI.html `
                <bim-panel style="border-radius: 0px">
                <bim-panel-section label="Tasks">
                    ${todosTable}
                </bim-panel-section>
            </bim-panel>
    `
})

    const gridLayout: BUI.Layouts = {
        primary: {
            template:`
                "content" 10%
                "content" 1fr
                "content" 10%
                / 1fr
            `,
            elements: {
                
                content,
            }
        }
    }

    React.useEffect (() => {
        const grid  = document.getElementById("todosGrid") as BUI.Grid
        grid.layouts = gridLayout
        grid.layout = "primary"
    }, [toDos, ])

    return (
        // <div>
            // {/* Hi! */}
            <bim-grid id="todosGrid"></bim-grid>
        // </div>
    )
}



//             let data = [] as BUI.TableGroupData[]
//             let todoData = {} as BUI.TableRowData
//             // data[key] = todo[key]
//             // data = {...todo}
//             todoData = {
                
//                     name: todo.name,
//                     description: todo.description,
//                     status: todo.status,
//                     deadline: todo.deadline.toString(),
//                     id: todo.id,
//                     relatedProject: todo.relatedProject,
//                     firebaseId: todo.firebaseId,
//                     priority: todo.priority,
//             }
//             // todoData = {...todo}
//             // data = {data: todo}
//             const todoDataToGroup = {
//                 data: {
//                     todoData
//                 }
//             }
//             data.push(todoDataToGroup)
//             table.data = data
            

//             }}
//         }
//             const data = {data: 
             
//     }
// })


    // ------------------------------------------------------------------------- 
//     return (
//         <div className="todo-list" id="project-todos2" key="project-todos-2">
//             <dialog hidden id={"todo-modal-"+todoInForm.id}>
//                 <TodoForm projectsManager={props.projectsManager} project={project} todo={todoInForm} key={"todo-form-"+todoInForm.id}/>
//             </dialog>
//             <div className="dashboard-card-header">
//                 <h3 className="dashboard-card-header-title">To-Do List</h3>
//                 <div className="dashboard-card-header-searchbox" style={{width: "65%"}}>
//                     <span className="material-icons-round" style={{width: "10%"}}>search</span>
//                     <SearchBox onChange={(value) => onToDoSearch(value)}/>
//                 </div>
//                 <div className="dashboard-card-header-buttons" style={{width: "10%"}}>
//                     <button onClick={(e) => {onNewToDoClick(e)}} style={{width: "100%"}} id="new-todo-btn">
//                         <span className="material-icons-round">add</span>
//                     </button>
//                 </div>
//             </div>
//             <div className="todo-list" id="todo-list">
//                 { toDosCards }
//             </div>
//         </div>

//     )
// }
