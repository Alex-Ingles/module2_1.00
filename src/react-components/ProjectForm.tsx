import * as React from "react"
import { useEffect } from "react"
import * as Router from "react-router-dom"
import { Project, IProject } from "../classes/Project"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectDetailsPage } from "./ProjectDetailsPage"
import { ErrorModal } from "./ErrorModal"

interface Props {
    project: Project
    projectsManager: ProjectsManager
}

export function ProjectForm (props: Props) {
    console.warn("Mounting ProjectForm...")

    const [newProject, setNewProject] = React.useState<Project>(props.project)
    const [formError, setFormError] = React.useState<null | string>(null);

    let projectWip: Project = {} as Project

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        console.log("something to change: ",name,": ", value)
        projectWip = newProject
        projectWip[name] = value
        projectWip.setShortFinishDate()
        // if (name === "shortfinishDate") {
        //     console.log("shortFinishDate: ",projectWip.shortFinishDate)
        //     projectWip.finishDate = new Date(projectWip.shortFinishDate)
        // }
        setNewProject(projectWip)
        console.log("newProject after change: ", newProject)
    }

    function getInputDateFormat(date: Date | string): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

    const onProjectFormSubmit = async (e: React.FormEvent) => {
        console.warn("processing projectForm submit...")
        e.preventDefault()
        if (newProject.name.length < 6 ){
            setFormError("Something went wrong");
            return
        }
        if (props.projectsManager.nameInUse(newProject.name) && !props.projectsManager.idInUse(newProject.id)) {
            setFormError("Name is already in use")
            return
        }
        try {
            await props.projectsManager.newProjectFromForm(newProject)
        } catch (error) {
            console.error("Error creando el proyecto", error);
            setFormError(error.message || "Something went wrong");
        }

        console.log("I listen the submit")
        console.log("newProjectFromForm is invoked: newProject: ",newProject,"newProject.id: ",newProject.id)

        const modalNew = document.getElementById("new-new-project-modal")
        const modalEdit = document.getElementById("edit-project-modal")

        if (modalNew && modalNew instanceof HTMLDialogElement) {
            console.log("I check this")
            modalNew.close()
        }

        if (modalEdit && modalEdit instanceof HTMLDialogElement) {
            console.log("I reach this point too")
            modalEdit.close()
        }

        return (
            <Router.Link to={`/project/${newProject.id}`} key={newProject.id}>
                <ProjectDetailsPage projectsManager={props.projectsManager}/>
            </Router.Link>
        )
    }

    const onProjectFormCancel = (e: React.FormEvent) => {
        e.preventDefault()

        const modalNew = document.getElementById("new-new-project-modal")
        const modalEdit = document.getElementById("edit-project-modal")
        
        if (modalNew && modalNew instanceof HTMLDialogElement) {
            modalNew.close()
        } else if (modalEdit && modalEdit instanceof HTMLDialogElement) {
            modalEdit.close()
        }
    }

    useEffect(() => { // Solución GPT para que la tecla Scape no minimice la ventana de Safari
        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            event.preventDefault(); // Evita que Safari salga de pantalla completa
            onProjectFormCancel(event); // Cierra el formulario
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }, [onProjectFormCancel]);

    return (
            <form 
                id="new-new-project-form"
                key={"new-new-project-form-"+newProject.id}
                onSubmit={(e) =>  onProjectFormSubmit(e)}
            >
                {formError && (<ErrorModal message={formError} onClose={() => setFormError(null)}/>)}

                <h2>New Project - ProjectForm</h2>
                <div className="input-list">
                    <div className="form-field-container">
                    <input
                        data-project-info="id"
                        name="id"
                        // type="hidden"
                        placeholder="auto-id"
                        defaultValue= { newProject.id }
                    />
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">apartment</span>Name
                        </label>
                        <input
                            data-project-info="name"
                            name="name"
                            type="string"
                            placeholder="Enter your project name here"
                            defaultValue= { newProject.name }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">notes</span>Description
                        </label>
                        <textarea 
                            data-project-info="description"
                            name="description"
                            cols={30}
                            rows={5}
                            placeholder="Give your description here"
                            defaultValue= { newProject.description }
                            onChange={ onInputChange }
                            onFocus={(e) => { // Solución GPT para seleccionar contenido del textarea
                                setTimeout(() => {
                                  e.target.select();
                                }, 0);
                              }}
                        />
                    </div>
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">euro</span>Cost
                        </label>
                        <input
                            data-project-info="cost"
                            name="cost"
                            type="string"
                            placeholder="Give the project cost here"
                            defaultValue= { newProject.cost }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">clock</span>Progress
                        </label>
                        <input
                            data-project-info="progress"
                            name="progress"
                            type="string"
                            placeholder="Give the progression %"
                            defaultValue= { newProject.progress }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">account_circle</span>Role
                        </label>
                        <select 
                            data-project-info="userRole" 
                            name="userRole"
                            defaultValue= {newProject.userRole }
                            onChange={ onInputChange }
                        >
                            <option>Architect</option>
                            <option>Engineer</option>
                            <option>Developer</option>
                        </select>
                    </div>
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">not_listed_location</span>
                            Status
                        </label>
                        <select 
                            data-project-info="status" 
                            name="status"
                            defaultValue= { newProject.status }
                            onChange={ onInputChange }
                        >
                            <option>Pending</option>
                            <option>Active</option>
                            <option>Finished</option>
                        </select>
                    </div>
                    <div className="form-field-container">
                        <label>
                            <span className="material-icons-round">calendar_month</span>Finish
                            Date
                            </label>
                        <input
                            data-project-info="finishDate"
                            name="finishDate"
                            type="date"
                            defaultValue= { getInputDateFormat(newProject.finishDate) }
                            onChange={ onInputChange }
                        />
                    </div>
                </div>
                <div className="submit-buttons">
                        <button 
                            id="new-project-form-cancel-btn" 
                            type="button"
                            onClick={(e) => onProjectFormCancel(e) }
                        >
                            Cancel
                        </button>
                        <Router.Link to={`/project/${newProject.id}`} key={newProject.id}>
                            <button
                                id="new-project-form-submit-btn"
                                type="submit"
                                style={{ backgroundColor: "green" }}
                                onClick={(e) => onProjectFormSubmit(e) }
                            >
                                Accept
                            </button>
                        </Router.Link>
                        <button
                            id="new-project-form-submit-btn"
                            type="submit"
                            style={{ backgroundColor: "green" }}
                            onClick={(e) => onProjectFormCancel(e) }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
    )
}

// import { ToDo } from "../classes/ToDo"
// import { firebaseDB } from "../firebase"
// import { Route } from "react-router-dom"
// import ErrorBoundary from "./ErrorBoundary"


    // const modalNew = document.getElementById("new-project-modal")

    // const modalNew = document.getElementById("new-new-project-modal")
    // const modalEdit = document.getElementById("edit-project-modal")

    // const [newIProject, setNewIProject] = React.useState<IProject>({
    //     name: "name",
    //     description: "description",
    //     status: "active",
    //     userRole: "developer",
    //     finishDate: new Date,
    //     cost: 0,
    //     initials: "",
    //     progress: 0,
    //     id: "",
    //     todoList: [],
    // })

    // props.projectsManager.onError = () => {
    //    return  (
    //         <div>
    //             <Error project={ newProject }/>
    //         </div>
    //    )
    // }

        // const onProjectFormSubmit = (e: React.FormEvent<FormData>) => {

            // const FormSubmitBtn = () => {
    //     // const projectCards = projects.map((project) => {
    //         return (
    //             <Router.Link to={`/project/${newProject.id}`} key={newProject.id}>
    //                 <button
    //                     id="new-project-form-submit-btn"
    //                     type="submit"
    //                     style={{ backgroundColor: "green" }}
    //                     onClick={(e) => onProjectFormSubmit(e) }
    //                 >
    //                     Accept
    //                 </button>
    //             </Router.Link>
    //         )
    //     }
    

