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

export function TodoForm (props: Props) {
    // var [todotoset, setTodotoset] = React.useState<ToDo>(props.todo)

    const [newTodo, setNewTodo] = React.useState<ToDo>(props.todo)
    // React.useEffect(() => {setNewTodo(props.todo)})
        // id: props.todo.id,
        // name: props.todo.name,
        // description: props.todo.description,
        // status: props.todo.status,
        // deadline: props.todo.deadline,
        // relatedProject: props.todo.relatedProject,
        // todocardcolor: props.todo.todocardcolor,
        // shortdeadline: props.todo.shortdeadline,
        // setTodoCardColor(),
        // setShortDeadline(),
        // todocardcolor: props.todo.todocardcolor,

    // setTodotoset(props.todo)
    // const [inputs, setInputs] = React.useState<IToDo>({
    //     id: todotoset.id,
    //     name: todotoset.name,
    //     description: todotoset.description,
    //     status: todotoset.status,
    //     deadline: todotoset.deadline,
    //     relatedProject: todotoset.relatedProject,
    //     // todocardcolor: props.todo.todocardcolor,
    // })
    // const [formData, setFormData] = React.useState({
    //     id: inputs.id || "Name passed by setFormData",
    //     name: inputs.name || "",
    //     description: inputs.description || "Description passed by setFormData",
    //     status: inputs.status || "pending",
    //     deadline: inputs.deadline || new Date(),
    //     relatedProject: inputs.relatedProject,
    // })

    console.log("TodoForm - NewTodo: ", newTodo)

    const modal = document.getElementById("todo-modal-"+newTodo.id);
    const form = document.getElementById("new-todo-form")

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        // console.log("something to change: ",e.target)
        let { name, value } = e.target;
        console.log(name,": ", value)
        // newTodo[name] = value
        
        const todoWip = newTodo
        todoWip[name] = value
        setNewTodo(todoWip);

// setTodotoset(new ToDo (inputs))
        // const newTodo = new ToDo (todotoset)
        // setTodotoset(newTodo)

// LAST
        // console.log("new Inputs after handleInputChange: ", inputs)
        // console.log("new ToDo afrer handleInputChange: ",newTodo)
        // console.log("projectManager")
    

        // setInputs((inputs) => ({...inputs, [name]: value}));
    };



    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setInputs((prevData) => ({...prevData, [name]: value}));
    // };
    //---------------------------------------------------------------------------------
    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("I listen the submit click")
        console.warn ("updatedTodo: ", newTodo)
        props.projectsManager.updateToDo(newTodo)
        if (modal && modal instanceof HTMLDialogElement) { modal.close }
        // if (form && form instanceof HTMLFormElement) { form.reset }

    }
        // setTodotoset(new ToDo(inputs))
        // if (form && form instanceof HTMLFormElement) {
        //     const formData = new FormData(form)
        //     console.log("formData: ",formData.get("name"))
        //     for (const key in inputs) {
        //         inputs[key] = formData.get[key]
        //         console.log(inputs, "onFormSubmit")
        //     }
        // setTodotoset(new ToDo(inputs))
        // console.log("TodoToSet: ", todotoset)
    
        
    //     const todoidmap = props.project.todoList.map((t) => {return(t.id)})
    //     console.warn(todoidmap)
    //     console.warn(todotoset.id)
    //     console.warn(props.project.todoList)

    //     if (todotoset.id in todoidmap) {
    //         console.warn("todo.id IS in project.todoList")
    //         // setTodotoset(new ToDo(inputs))
    //         props.projectsManager.updateToDo(new ToDo(inputs))
    //         console.log("PMList + editd after onFormSubmit: ", props.projectsManager.list)
    //         // setTodotoset(todotoset)
    //     } else {
    //         console.warn("todo.id IS NOT in project.todoList")
    //         props.projectsManager.newToDo(new ToDo(inputs))
    //         console.log("PMList + new after onFormSubmit: ", props.projectsManager.list)

    //     }
    //     // const modal = document.getElementById("todo-modal");
    //     if (modal && modal instanceof HTMLDialogElement) {modal.close()}
    //     // form.reset
    // }
        




    //     if (todotoset) {
    //         console.log("todotoset exists")
    //         const index = project.todoList.findIndex((t) => t.id === todo.id);
    //         console.log(index)
    //         if (index > -1) {
    //             console.log("index > -1")
    //             project.todoList[index] = new ToDo(todotoset);
    //             console.log("handleFormSubmit Project todoList [index]: ", project.todoList[index])
    //             projectsManager.onTodoUpdated(todotoset)
    //             if (modal && modal instanceof HTMLDialogElement) { modal.close() }
    //         } else {
    //             console.log("index !> -1")
    //             const newToDo = new ToDo(formData);
    //             project.todoList.push(newToDo);
    //             projectsManager.onTodoCreated(newToDo)
    //             console.warn("YOUR PM: ", projectsManager)

    //             if (modal && modal instanceof HTMLDialogElement) { modal.close() }
    //     }
    //     }
    //     console.log("project.todolist: ", project.todoList)
    // };

    //---------------------------------------------------------------------------------
    const onCancel = (e: React.FormEvent) => {
        e.preventDefault()
        if (!(modal && modal instanceof HTMLDialogElement)) {
            console.warn("todo-modal-",props.todo.id,": doesn't exist")
        } else { modal.close }
        if (form && form instanceof HTMLFormElement) { form.reset }

    }
// -----------------------------------------------------------------------  on form submit
    // const onFormSubmit = (e: React.FormEvent) => {
    //     console.log("To Do Form Submit Fired")
    //     const todoModal = document.getElementById("todo-modal")
    //     const todoForm = document.getElementById("todo-form")
    //     if (!(todoForm && todoForm instanceof HTMLFormElement)) { return <p>New To-do form doesn't exists</p> }
    //         e.preventDefault()

    //         // const formData = new FormData(todoForm)

    //         // const todoData: IToDo = {
    //         //     name: formData.get("name") as string,
    //         //     description: formData.get("description") as string,
    //         //     status: formData.get("status") as ToDoStatus,
    //         //     deadline: new Date (formData.get("deadline") as string),
    //         //     id: formData.get("id") as string,
    //         //     // relatedProject: formData.get("relatedProject") as string,
    //         //     relatedProject: project.id as string,
    //         //     todocardcolor: ""
    //         // }
    //         console.warn("relatedProjectId: ",formData.relatedProject)
    //         console.warn("todoData: ", formData)
    //         console.warn("todoData.id: ", formData.id)
    //         console.warn(formData.deadline)
    //         try {
    //             new Date(formData.deadline)
    //             if (isNaN(formData.deadline.valueOf())) {
    //                 console.warn("XXXXXXXXX:  deadline valueOf is not a number")
    //                 const defDate = new Date(1979, 7, 3, 12)
    //                 formData.deadline = defDate
    //                 console.warn(formData.deadline)
    //             } else {
    //                 console.warn("XXXXXXXXX:  deadline valueOf is a number")
    //             } 
    //         } catch (err) {
    //             alert(err)
    //         }
    //         try {
    //             const project = projectsManager.getProject(formData.relatedProject)
    //             if (!project) {return <p>Project not found</p>}
    //             const todoCreated = new ToDo(formData)
    //             project.todoList.push(todoCreated)
    //             todoForm.reset()
    //             if (!todoModal) {return(<p>newTodoModal does'nt exists</p>)}
    //             if (todoModal instanceof HTMLDialogElement) {
    //                 todoModal.close()
    //             }
    //             console.log(project.todoList)
    //             projectsManager.onTodoCreated(todoCreated)
    //         } catch {
    //             console.log("cannot execute push and toggle")
    //         }
    //         console.log("index.ts - when form submit: ", formData.deadline, typeof formData.deadline )
    //         console.log(formData.deadline.valueOf())
    //         console.log(formData.deadline.valueOf.length)
    //         console.warn(projectsManager)
    //         // recallDetails(routeParams)
    //     }


// ------------------------------------------------------------- from GPT?
    return (
        <div className="todo-form" id="todo-form" key={`${props.todo?.id}`+"-form"}>
            <form id="new-todo-form" onSubmit={(e) => {onFormSubmit(e)}}>
                <h2>{props.todo ? "Edit Todo" : " New Todo"}</h2>
                <div className="input-list">
                    <div className="form-field-container">
                        {/* <input data-todo-info="id" name="id" type="hidden" value={ todo? todo.id : formData.id }/> */}
                        {/* <input data-todo-info="id" name="id" type="hidden" value={ todo? todo.id : formData.id } onChange={ handleInputChange }/> */}
                        <input 
                            data-todo-info="id" 
                            name="id" 
                            // type="hidden"
                            defaultValue={ newTodo.id }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="name"><span className="material-icons-round">apartment</span>Name</label>
                        {/* <input data-todo-info="name" name="name" type="text" placeholder="Enter To-Do name" value={ todo? todo.name : formData.name }/> */}
                        {/* <input data-todo-info="name" name="name" type="text" placeholder="Enter To-Do name" value={ todo? todo.name : formData.name } required onChange={handleInputChange}/> */}
                        <input 
                            data-todo-info="relatedProject" 
                            name="relatedProject" 
                            type="text" 
                            placeholder="Enter To-Do name" 
                            // requiredx
                            // {...project.todoList("name")}
                            defaultValue={ newTodo.relatedProject }
                            onChange={ onInputChange }
                        />
                    </div>

                    <div className="form-field-container">
                        <label htmlFor="name"><span className="material-icons-round">apartment</span>Name</label>
                        {/* <input data-todo-info="name" name="name" type="text" placeholder="Enter To-Do name" value={ todo? todo.name : formData.name }/> */}
                        {/* <input data-todo-info="name" name="name" type="text" placeholder="Enter To-Do name" value={ todo? todo.name : formData.name } required onChange={handleInputChange}/> */}
                        <input 
                            data-todo-info="name" 
                            name="name" 
                            type="text" 
                            placeholder="Enter To-Do name" 
                            // requiredx
                            // {...project.todoList("name")}
                            defaultValue={ newTodo.name }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="description"><span className="material-icons-round">notes</span>Description</label>
                        {/* <textarea data-todo-info="description" name="description" rows={3} placeholder="Give your description here" value={ todo? todo.description : formData.description}/> */}
                        {/* <textarea data-todo-info="description" name="description" rows={3} placeholder="Give your description here" value={ todo? todo.description : formData.description} required onChange={handleInputChange}/> */}
                        <textarea 
                            data-todo-info="description" 
                            name="description" 
                            rows={3} 
                            placeholder="Give your description here" 
                            // required 
                            defaultValue={ newTodo.description }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="status"><span className="material-icons-round">account_circle</span>Status</label>
                        {/* <select data-todo-info="status" name="status" value= { todo? todo.status : formData.status }> */}
                        {/* <select data-todo-info="status" name="status" value= { todo? todo.status : formData.status } onChange={handleInputChange}> */}
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
                        <label htmlFor="deadline">
                            <span 
                                className="material-icons-round">
                                calendar_month
                            </span>
                            Finish Date
                        </label>
                        {/* <input data-todo-info="deadline" name="deadline" type="date" value={ todo? todo.deadline.toISOString().split("T")[0] : formData.deadline.toISOString().split("T")[0] }/> */}
                        {/* <input data-todo-info="deadline" name="deadline" type="date" value={ todo? todo.deadline.toISOString().split("T")[0] : formData.deadline.toISOString().split("T")[0] } onChange={(e) => handleInputChange(e)} /> */}
                        {/* <input data-todo-info="deadline" name="deadline" type="date" value={ formData.deadline.toISOString().split("T")[0] } onChange={(e) => handleInputChange(e)} /> */}
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
    
