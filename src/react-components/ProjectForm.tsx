import * as React from "react"
import { Project, IProject } from "../classes/Project"
import { ToDo } from "../classes/ToDo"
import { ProjectsManager } from "../classes/ProjectsManager"
import { firebaseDB } from "../firebase"


interface Props {
    project: Project
    projectsManager: ProjectsManager
}

// export function ProjectForm (props: Props) {
export function ProjectForm (props: Props) {
    console.log("showing the new Form")

    const [newProject, setNewProject] = React.useState<Project>(props.project)
    const modal = document.getElementById("new-new-project-modal")

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

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        console.log("something to change: ",name,": ", value)
        const projectWip = newProject
        projectWip[name] = value
        setNewProject(projectWip);
    };

    const onProjectFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("I listen the submit")
        props.projectsManager.updateProject(newProject)
        if (modal && modal instanceof HTMLDialogElement) {
            modal.close()
        }
    }

    const onProjectFormCancel = (e: React.FormEvent) => {
        e.preventDefault()
        if (modal && modal instanceof HTMLDialogElement) {
            modal.close()
        }
    }

    return (
        // <dialog id="new-project-modal"> {/* New Project Modal ---------------------------------------  */}
        // <form onSubmit={(e) => {onFormSubmit(e)}} id="new-project-form">
        <form id="new-new-project-form" onSubmit={(e) =>  onProjectFormSubmit(e) }>
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
                        defaultValue= {newProject.shortFinishDate }
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
                <button
                    id="new-project-form-submit-btn"
                    type="submit"
                    style={{ backgroundColor: "green" }}
                >
                    Accept
                </button>
                </div>
            </div>
        </form>
        // </dialog>

    )
}