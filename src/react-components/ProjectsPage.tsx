import * as React from "react"
import * as Router from "react-router-dom"
import { IProject, Project, ProjectStatus, UserRole} from "../classes/Project"
import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectCard } from "./ProjectCard"
import { ProjectForm } from "./ProjectForm"
import { SearchBox } from "./SearchBox"

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectsPage(props: Props) {

    const [projects, setProjects] = React.useState<Project[]>(props.projectsManager.list)

    props.projectsManager.onProjectCreated = () => {
        setProjects([...props.projectsManager.list])
        console.log("New Project Is Created")
    }
    props.projectsManager.onProjectDeleted = () => {
        setProjects([...props.projectsManager.list])}

    const projectCards = projects.map((project) => {
        return (
            <Router.Link className= "project-card-place" to={`/project/${project.id}`} key={project.id}>
                <ProjectCard project={project}/>
            </Router.Link>
        )
    })

    React.useEffect(() => {
        console.log("Projects state updated", projects)
    })

    const [newIProject, setNewIProject] = React.useState<IProject>({
        name: "new Project",
        description: "Project description",
        status: "active",
        userRole: "developer",
        finishDate: new Date,
        cost: 0,
        initials: "",
        progress: 0,
        id: "",
        todoList: [],
        firebaseId: ""
    })

    const newIProject2: IProject = {
        name: "new Project",
        description: "Project description",
        status: "active",
        userRole: "developer",
        finishDate: new Date,
        cost: 0,
        initials: "",
        progress: 0,
        id: "",
        todoList: [],
        firebaseId: ""
    } as IProject

    let projectInForm = new Project(newIProject2)

    // ----------------------------------------------------------------
    const onNewProjectClick = (e) => {
        setNewIProject(newIProject2)
        
        const modal = document.getElementById("new-new-project-modal")
        if (!(modal && modal instanceof HTMLDialogElement)) {return}
        modal.showModal()
    }
    // ----------------------------------------------------------------
    const onImportClick = () => {
        console.log("I listen the onImportClick")
        const importProjectsBtn = document.getElementById("import-projects-btn")
        if (!(importProjectsBtn)) { return }
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
                    props.projectsManager.newProjectFromForm(new Project(project))
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
    // ----------------------------------------------------------------
    const onExportClick = () => {
        // exportToJSON(fileName: string = "projects") {
            const fileName = "projects"
            const json = JSON.stringify(props.projectsManager.list, null, 2)
            const blob = new Blob([json], {type: 'application/json'})
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = fileName
            a.click()
            URL.revokeObjectURL(url)
    }
    // ----------------------------------------------------------------
    const onProjectSearch = (value: string) => {
        setProjects(props.projectsManager.filterProjects(value))
    }
    // ----------------------------------------------------------------
    return (
        <div className="page" id="projects-page" style={{ display: "block" }}>
            <dialog id="new-new-project-modal">
                <ProjectForm projectsManager= { props.projectsManager } project= { projectInForm } key={"projet-form"+projectInForm.id}/> 
            </dialog>
            <header
                className="page-header"
                id="projects-page-header"
                style={{ height: "9%" }}
            >
                <div style={{width: "63.2%", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                    <h2 style={{width: "31%", minWidth: "160px"}}>Projects</h2>
                    <div className="page-header-searchbox" style={{width: "65.55%"}}>
                        <SearchBox onChange={(value) => onProjectSearch(value)}/>
                    </div>
                </div>
                <div className="page-header-buttons" style={{width: "20.4%", minWidth: "180px"}}>
                    <button id="upload-projects-btn">
                        <span onClick= { onExportClick } className="material-icons-round action-icon">cloud_upload</span>
                    </button>
                    <button id="download-projects-btn">
                        <span onClick= { onExportClick } className="material-icons-round action-icon">cloud_download</span>
                    </button>
                    <button id="export-projects-btn">
                        <span onClick= { onExportClick } className="material-icons-round action-icon">file_download</span>
                    </button>
                    <button id="import-projects-btn">
                        <span onClick= { onImportClick } className="material-icons-round action-icon">file_upload</span>
                    </button>
                    <button onClick= { onNewProjectClick } id="new-project-btn">
                        <span className="material-icons-round">add_circle_outline</span>
                    </button>
                </div>
            </header>
            {/* projectS list -------------------------------------------------------*/}
                {projects.length > 0? 
                    <div className="projects-grid" id="projects-grid">
                        {/* New Project Card HIDDEN --------------------------------------------*/}
                        <div hidden>
                            <div className= "project-card-place">
                                <div className="project-card">
                                    <div className="card">
                                        <div className="project-card-header">
                                            <p
                                            data-project-info="initials"
                                            style={{
                                                backgroundColor:`transparent` ,
                                                padding: 10,
                                                border: "1px solid white", 
                                                borderRadius: 8,
                                                aspectRatio: 1,
                                                fontSize: "1rem",
                                            }}
                                            >+</p>
                                            <div>
                                                <h5 data-project-info="name">Nuevo Proyecto</h5>
                                                <h5 
                                                    data-project-info="description" 
                                                    className="description"
                                                >
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="card-content-center">
                                            <button id="new-project-btn">
                                                <span  onClick= { onNewProjectClick } className="material-icons-round action-icon">add</span>
                                            </button>
                                            <h5
                                                data-project-info="initials"
                                                style={{
                                                    backgroundColor:`transparent` ,
                                                    padding: 10,
                                                    aspectRatio: 1
                                                }}
                                                >
                                                Crear un nuevo proyecto
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { projectCards }
                    </div>
                :
                    <p>No projects found</p>
            }
        </div>
    )
}
