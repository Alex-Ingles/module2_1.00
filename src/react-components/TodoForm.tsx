import * as React from "react"
import { ToDo, IToDo, ToDoStatus } from "../classes/ToDo"
import { Project, IProject } from "../classes/Project"
import { ProjectsManager } from "../classes/ProjectsManager"

import { TodoCard } from "./ToDoCard"

interface Props {
    projectsManager: ProjectsManager; // In order to invoke onToDoCreated, onToDoDeleted...
    project: Project;
    todo: ToDo;
}

export function TodoForm ({projectsManager, project, todo}: Props) {

    var [project, setProject] = React.useState<Project>(project)
    const [todos, setTodos] = React.useState<ToDo[]>(project.todoList)
    // var [todo, setTodo] = React.useState<ToDo>(todo)
    var [inputs, setInputs] = React.useState<ToDo>(todo)

    projectsManager.onTodoCreated = () => {
        
    }
    // var [inputs, setInputs] = React.useState<ToDo>({
    //     name: todo.name,
    //     description: todo.description,
    //     status: todo.status,
    //     deadline: todo.deadline,
    //     relatedProject: todo.relatedProject,
    //     todocardcolor: todo.todocardcolor,
    //     id: todo.id || "",
    //     shortdeadline: todo.shortdeadline,
    //     setTodoCardColor(){},
    //     setShortDeadline(){}
    //     })
    
// LAST
    // console.log("TodoForm -> inputs: ", inputs)


    
    const [formData, setFormData] = React.useState<IToDo>({
        id: inputs.id || "Name passed by setFormData",
        name: inputs.name || "",
        description: inputs.description || "Description passed by setFormData",
        status: inputs.status || "pending",
        deadline: inputs.deadline || new Date(),
        relatedProject: inputs.relatedProject,
        todocardcolor: inputs.todocardcolor || "",
    });



    const modal = document.getElementById("todo-modal");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        console.log("something to change: ",e.target)
        let { name, value } = e.target;
        setFormData((inputs) => ({...inputs, [name]: value}));
        const newTodo = new ToDo (inputs)
        setInputs(newTodo)

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
        console.log("I listen thee click")
        // e.preventDefault();
        if (todo) {
            console.log("todo exists")
            const index = project.todoList.findIndex((t) => t.id === todo.id);
            console.log(index)
            if (index > -1) {
                console.log("index > -1")
                project.todoList[index] = new ToDo(inputs);
                // setTodos(project.todoList)
                // setProject(project)

                // project.todoList[index] = new ToDo(inputs);
                console.log("handleFormSubmit Project todoList [index]: ", project.todoList[index])
                projectsManager.onTodoUpdated(inputs)
                // setFormData(formData)
//LAST
                // setInputs(inputs)
                // setProject(project)
                // projectsManager.updateProject(project)
                if (modal && modal instanceof HTMLDialogElement) { modal.close() }
        } else {
            console.log("index !> -1")
            const newToDo = new ToDo(formData);
// LAST
            // const newToDo = new ToDo(inputs);
            project.todoList.push(newToDo);
            projectsManager.onTodoCreated(newToDo)
            console.warn("YOUR PM: ", projectsManager)

            if (modal && modal instanceof HTMLDialogElement) { modal.close() }
        }
        }
        console.log("project.todolist: ", project.todoList)
    };

    //---------------------------------------------------------------------------------
    const onCancel = () => {
        if (modal && modal instanceof HTMLDialogElement) { modal.close() }
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
        <div className="todo-form" id="todo-form" key={`${todo?.id}`+"-form"}>
            <form id="new-todo-form" onSubmit={ onFormSubmit }>
                <h2>{todo ? "Edit Todo" : " New Todo"}</h2>
                <div className="input-list">
                    <div className="form-field-container">
                        {/* <input data-todo-info="id" name="id" type="hidden" value={ todo? todo.id : formData.id }/> */}
                        {/* <input data-todo-info="id" name="id" type="hidden" value={ todo? todo.id : formData.id } onChange={ handleInputChange }/> */}
                        <input 
                            data-todo-info="id" 
                            name="id" 
                            type="hidden"
                            defaultValue={ todo.id }
                            onChange={ handleInputChange }
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
                            // required
                            // {...project.todoList("name")}
                            defaultValue={ todo.name }
                            onChange={ handleInputChange }
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
                            defaultValue={ todo.description }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="status"><span className="material-icons-round">account_circle</span>Status</label>
                        {/* <select data-todo-info="status" name="status" value= { todo? todo.status : formData.status }> */}
                        {/* <select data-todo-info="status" name="status" value= { todo? todo.status : formData.status } onChange={handleInputChange}> */}
                        <select 
                            data-todo-info="status" 
                            name="status"
                            defaultValue={ todo.status }
                            onChange={ handleInputChange }
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
                            defaultValue={ todo.shortdeadline }
                            onChange={ handleInputChange }
                        />
                    </div>
                </div>
                <div className="submit-buttons">
                    <button type="button" onClick = { onCancel } id="new-todo-form-cancel-btn">Cancel</button>
                    <button type="submit" onClick = { onFormSubmit } style={{ backgroundColor: "green" }} id="new-todo-form-submit-btn">Accept</button>
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
    
