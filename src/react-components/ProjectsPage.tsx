import * as React from "react"
import { IProject, Project, ProjectStatus, UserRole} from "../classes/Project"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectCard } from "./ProjectCard"

export function ProjectsPage() {
    const [projectsManager] = React.useState(new ProjectsManager())
    const [projects, setProjects] = React.useState<Project[]>(projectsManager.list)
    projectsManager.onProjectCreated = () => {setProjects([...projectsManager.list])}
    projectsManager.onProjectDeleted = () => {setProjects([...projectsManager.list])}

    const projectCards = projects.map((project) => {
        return <ProjectCard project={project} key={project.id}/>
    })
    
    React.useEffect(() => {
        console.log("Projects state updated", projects)
    })

    const onNewProjectClick = () => {
        const modal = document.getElementById("new-project-modal")
        if (!(modal && modal instanceof HTMLDialogElement)) {return}
        modal.showModal()
    }
    const onFormSubmit = (e: React.FormEvent) => {
        // let submitter = e.submitter as HTMLElement
        // let handler = submitter.id
        // if(handler == "new-project-form-submit-btn") {
        const projectForm = document.getElementById("new-project-form")
        if (!(projectForm && projectForm instanceof HTMLFormElement)) {return}
            e.preventDefault()
            const formData = new FormData(projectForm)
            const projectData: IProject = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                status: formData.get("status") as ProjectStatus,
                userRole: formData.get("userRole") as UserRole,
                finishDate: new Date (formData.get("finishDate") as string),
                cost: new Number(formData.get("cost")) as number,
                progress: new Number(formData.get("progress")) as number,
                todoList: [],
                id: formData.get("id") as string,
                initials: "" as string
            }
            console.warn(projectData)
            console.warn("PM - NewProjectSubmit projectData.finishDate - projectData.progress: ", projectData.finishDate, projectData.progress)

            try {
                new Date(projectData.finishDate)
                if (isNaN(projectData.finishDate.valueOf())) {
                    console.warn("PM - NewProjectSubmit projectData.finishDate: isNan")
                    console.warn("XXXXXXXXX:  finishDate valueOf is not a number")
                    const defDate = new Date(1979, 7, 3, 12)
                    projectData.finishDate = defDate
                    console.warn("PM - NewProjectSubmit finishDate after function: ", projectData.finishDate)
                } else {
                    console.warn("XXXXXXXXX:  finishDate valueOf is a number")
                } 
            } catch (err) {
                alert(err)
            }

            console.log("index.ts when form submit: ", projectData.finishDate, typeof projectData.finishDate)
            console.log(projectData.finishDate.valueOf())
            console.log(projectData.finishDate.valueOf.length)

            if (projectsManager && projectsManager.idInUse(projectData.id)) {
                console.warn("id provided is already in use, existing Project will be updated")
                projectsManager.updateProject(projectData)
                projectForm.reset()

                const modal = document.getElementById("new-project-modal")
                if (!(modal && modal instanceof HTMLDialogElement)) {return}
                modal.close()
        


                // toggleModal("new-project-modal", "close")

                console.warn("submit is fired!")
                console.log(projectData)
                console.log(projectsManager.list)

                projectsManager.totalCost()
            } else {
                try {
                    projectsManager.newProject(projectData)
                    projectsManager.deleteDefaultProjectUI()
                    projectForm.reset()
                    const modal = document.getElementById("new-project-modal")
                    if (!(modal && modal instanceof HTMLDialogElement)) {return}
                    modal.close()
    
                    // toggleModal("new-project-modal", "close")
                    projectsManager.totalCost()

                    console.warn("submit is fired!")
                    console.log(projectData)
                    console.log(projectsManager.list)

                } catch (err) {
                    alert(err)
                }
            }
    }

    const onImportClick = () => {
        console.log("I listen the onImportClick")
        const importProjectsBtn = document.getElementById("import-projects-btn")
        if (!(importProjectsBtn)) { return }
        // importProjectsBtn.addEventListener("click", () => {
    //     importFromJSON()
    // }

    // const importFromJSON = () => {
        const input = document.createElement('input')
        console.log("imput created: ",input)
        input.type = 'file'
        input.accept = 'application/json'
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            const json = reader.result
            if (!json) { return }
            const projects: IProject[] = JSON.parse(json as string)
            for (const project of projects) {
                const count = 0
                try {
                    projectsManager.newProject(project)
                    console.log(count+1)
                }
                catch (error) {
                    alert(error)
                }
            }
    
        })
        input.addEventListener('change', () => {
            const filesList = input.files
            if (!filesList) { return }
            reader.readAsText(filesList[0])
        })
        input.click()
    }

    const onExportClick = () => {
        // exportToJSON(fileName: string = "projects") {
            const fileName = "projects"
            const json = JSON.stringify(projectsManager.list, null, 2)
            const blob = new Blob([json], {type: 'application/json'})
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = fileName
            a.click()
            URL.revokeObjectURL(url)
    }
        
    // }
    

    // const submitBtnStyle: React.CSSProperties = {
    //     background-color: "green";
    // }
    return(
        <div className="page" id="projects-page" style={{ display: "block" }}>
        {/* dialog New -------------------------------------------------------*/}
        <dialog id="new-project-modal">
            <form onSubmit={(e) => {onFormSubmit(e)}} id="new-project-form">
            <h2>New Project</h2>
            <div className="input-list">
                <div className="form-field-container">
                <input
                    data-project-info="id"
                    name="id"
                    type="hidden"
                    placeholder="auto-id"
                />
                <div className="form-field-container">
                    <label>
                    <span className="material-icons-round">apartment</span>Name
                    </label>
                    <input
                    data-project-info="name"
                    name="name"
                    type="string"
                    placeholder="Enter your project name"
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
                    defaultValue={""}
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
                    />
                </div>
                <div className="form-field-container">
                    <label>
                    <span className="material-icons-round">account_circle</span>Role
                    </label>
                    <select data-project-info="userRole" name="userRole">
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
                    <select data-project-info="status" name="status">
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
                    />
                </div>
                </div>
                <div className="submit-buttons">
                <button id="new-project-form-cancel-btn" type="button">
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
        </dialog>
        {/* dialog Edit -------------------------------------------------------*/}
        <dialog id="edit-project-modal">
            <form id="edit-project-form">
            <h2>Edit Project</h2>
            <div className="input-list">
                <div className="form-field-container">
                <input
                    data-project-info="id"
                    name="id"
                    type="hidden"
                    placeholder="auto-id"
                />
                <div className="form-field-container">
                    <label>
                    <span className="material-icons-round">apartment</span>Name
                    </label>
                    <input
                    data-project-info="name"
                    name="name"
                    type="string"
                    placeholder="Enter your project name"
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
                    defaultValue={""}
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
                    />
                </div>
                <div className="form-field-container">
                    <label>
                    <span className="material-icons-round">time</span>Progress
                    </label>
                    <input
                    data-project-info="progress"
                    name="progress"
                    type="string"
                    placeholder="Give the project progress here"
                    />
                </div>
                <div className="form-field-container">
                    <label>
                    <span className="material-icons-round">account_circle</span>Role
                    </label>
                    <select data-project-info="userRole" name="userRole">
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
                    <select data-project-info="status" name="status">
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
                    />
                </div>
                </div>
                <div className="submit-buttons">
                <button id="edit-project-form-cancel-btn" type="button">
                    Cancel
                </button>
                <button
                    id="edit-project-form-submit-btn"
                    type="submit"
                    style={{ backgroundColor: "green" }}
                >
                    Accept
                </button>
                </div>
            </div>
            </form>
        </dialog>
        {/* header -------------------------------------------------------*/}
        <header
            className="page-header"
            id="projects-page-header"
            style={{ height: "9%" }}
        >
            <h2>Projects</h2>
            <div className="page-header-buttons">
            <button id="export-projects-btn">
                <span onClick= { onExportClick } className="material-icons-round action-icon">file_download</span>
            </button>
            <button id="import-projects-btn">
                <span onClick= { onImportClick } className="material-icons-round action-icon">file_upload</span>
            </button>
            <button onClick= { onNewProjectClick } id="new-project-btn">
                <span className="material-icons-round">add_circle_outline</span>New
                Project
            </button>
            </div>
        </header>
        {/* project list -------------------------------------------------------*/}
        <div
            id="projects-list"
            style={{
            padding: "15px 20px",
            alignItems: "center",
            justifyItems: "center",
            overflowY: "auto",
            maxHeight: "95vh"
            }}
        >{ projectCards }
        </div>
        </div>
        )
}