import * as React from "react"
import * as Router from "react-router-dom"
import { ProjectsManager } from "../classes/ProjectsManager"
import { Project } from "../classes/Project"
import { ProjectTodos2 } from "./ProjectTodos2"
import { ProjectForm } from "./ProjectForm"
import { ThreeViewer } from "./ThreeViewer"

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectDetailsPage(props: Props) {
    console.warn("Mounting ProjectDetailsPage component...")

    const routeParams = Router.useParams<{id: string}>()
    console.log("I`m the ID ma boys: ", routeParams.id)

    if (!routeParams.id) { return (<p>Project ID is needed to see this page</p>)}

    const [projectDetails, setProjectDetails] = React.useState<Project>(props.projectsManager.getProject(routeParams.id) as Project)
    console.log("this are the projectDetails: ", projectDetails)

    props.projectsManager.onProjectUpdated = (project: Project) => {
        console.log("-------  projectUpdate Detected! ---------")
        if (project.id === routeParams.id) {

            const clonedProject = { ...project };
            setProjectDetails(new Project(clonedProject));

            console.log("Project Is Updated")
            console.log("projectDetails after onProjectUpdated: ", projectDetails)
        }
    }

    const onEditProjectClick = ((e) => {
        e.preventDefault()
        const modal = document.getElementById("edit-project-modal")
        if (modal && modal instanceof HTMLDialogElement) { modal.showModal() }
    })

    const onDeleteProjectClick = ((e) => {
        e.preventDefault()
        console.log("projectsManager.deleteProject invoked")
        props.projectsManager.deleteProject(projectDetails)
    })

    if (!projectDetails) { return <p>Project Details doesn't found</p> }

    return (
        <div className="page" id="project-details" key={"details-"+projectDetails.id}>
            <dialog id="edit-project-modal" >
                <ProjectForm projectsManager= { props.projectsManager } project={ projectDetails } key={"project-form"+projectDetails.id}/>
            </dialog>
            <header className="page-header" id="project-details-page-header" style={{ 
                height: "9%" 
                }}>
                <h2 data-project-info="name">{ projectDetails.name }</h2>
                <div id="page-title">
                    <h5 data-project-info="description" style={{ color: "#969696" }}>{ projectDetails.description }</h5>
                    <h5 data-project-info="id">{ projectDetails.id }</h5>
                    <h5 data-project-info="fireBaseId">{ projectDetails.firebaseId }</h5>
                </div>
                <div 
                    className="page-header-buttons" 
                    style={{
                        display: "none" 
                        }}
                    >
                    <button hidden={true}>
                        <span className="material-icons-round">
                            file_download
                        </span>
                        Download
                    </button>
                    <button hidden={true} id="new-project-btn">
                        <span className="material-icons-round">add_circle_outline</span>
                        New Project
                    </button>
                </div>
            </header>
            {/* project details -------------------------------------------------------*/}
            <div className="main-page-content" flex-direction="row" style={{
                    height: "91%",
                    width: "100%",
                    display: "grid",
                    gap: 20,
                    gridTemplateColumns: "50% 50%",
                    gridTemplateRows: "100%",
                    padding: "20px 30px"
                }}>
                <div id="project-details-container" style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 10,
                    height: "100%"
                    }}>
                {/* dashboard card 1 ProjectDetails---------------------*/}
                    <div className="dashboard-card" id="project-information" style={{height: "30%"}}>
                        <div className="dashboard-card-header" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center",
                            height: "30%",
                            }}>
                            <div 
                                className="dashboard-card-header-initials"
                                style={{
                                    backgroundColor: `${projectDetails.initialsColor}`,
                                    width: 40,
                                    height: 40,
                                    aspectRatio: 1,
                                    borderRadius: 5,
                                }}>
                                <p data-project-info="initials" style={{
                                    fontSize: "1.5em",
                                    padding: 7,
                                    }}>
                                    { projectDetails.initials }
                                </p>
                            </div>
                            <p data-project-info="id"  style={{
                                fontSize: 8, 
                                width: 200, 
                                height: 30, 
                                display: "none" }}>
                                { projectDetails.id }
                            </p>
                            <div className="dashboard-card-buttons">
                                <button 
                                    id="edit-project-btn" 
                                    type="button" 
                                    className="btn-secondary" 
                                    style={{
                                        height: 30 
                                    }}
                                    onClick={(e) => onEditProjectClick(e)}
                                >
                                    <p style={{ width: 40, fontSize: "small" }}>
                                        Edit
                                        </p>
                                </button>
                                <button 
                                    id="delete-project-btn2" 
                                    className="btn-secondary" 
                                    onClick = {(e) => onDeleteProjectClick(e)}
                                    style={{
                                        height: 30,
                                        backgroundColor: "indianred"
                                    }}
                                >
                                    <Router.Link to="/">
                                        <p title="Delete Project" style={{ width: 40, fontSize: "small" }}>
                                            X
                                            </p>
                                    </Router.Link>
                                </button>

                            </div>
                        </div>
                        <div style={{ padding: "30 0px" }}>
                            <div style={{ left: 0 }}>
                                <h5 data-project-info="name2">{ projectDetails.name }</h5>
                                <p data-project-info="description2" style={{
                                    fontSize: "small", 
                                    fontWeight: "lighter" 
                                    }}>
                                { projectDetails.description }
                                </p>
                            </div>
                            <div
                                style={{
                                display: "flex",
                                columnGap: 30,
                                justifyContent: "space-between",
                                padding: "10px 0",
                                fontSize: "smaller"
                                }}
                            >
                                <div>
                                    <h5 style={{ color: "#969696" }}>Status</h5>
                                    <h5 data-project-info="status">
                                        { projectDetails.status }
                                    </h5>
                                </div>
                                <div>
                                    <h5 style={{ color: "#969696" }}>Cost</h5>
                                    <h5 data-project-info="cost" style={{ color: "white" }}>
                                        { projectDetails.cost.valueOf() }
                                    </h5>
                                </div>
                                <div>
                                    <h5 style={{ color: "#969696" }}>User Role</h5>
                                    <h5 data-project-info="userRole" style={{ color: "white" }}>
                                        { projectDetails.userRole }
                                    </h5>
                                </div>
                                <div hidden={true}>
                                    <h5 style={{ color: "#969696" }}>Finish Date</h5>
                                    <h5 data-project-info="finishDate" style={{ color: "white" }}>
                                        { projectDetails.finishDate.toString() }
                                    </h5>
                                </div>
                                <div>
                                    <h5 style={{ color: "#969696" }}>
                                        Short Finish Date
                                    </h5>
                                    <h5 data-project-info="shortFinishDate" style={{ color: "white" }}>
                                        { projectDetails.shortFinishDate.toString() }
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="progress-bar">
                                <div id="project-progress-bar" className="progress-bar-done" style={{
                                    backgroundColor: "rgb(158, 195, 158)",
                                    borderRadius: "10px 0 0 10px",
                                    width: `${projectDetails.progress}%`,
                                    }}>
                                    <h5 data-project-info="progress">
                                        { projectDetails.progress .valueOf() }%
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-card" id="todo-list" style={{height: "75%"}}>
                        <ProjectTodos2 projectsManager = {props.projectsManager}/>
                    </div>
                </div>
                <div
                    id="viewer-container-section"
                    className="dashboard-card"
                    style={{ minWidth: 0, display: "flex" }}
                    >
                    <div
                        id="viewer-container-header"
                        className="dashboard-card-header"
                        style={{
                        height: "9%"
                        }}
                        >
                        Title
                    </div>
                    <ThreeViewer />
                </div>
            </div>
        </div>

    )
}
