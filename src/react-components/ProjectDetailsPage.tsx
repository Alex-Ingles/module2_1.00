import * as React from "react"
import * as Router from "react-router-dom"

import { ProjectsManager } from "../classes/ProjectsManager"
import { ProjectTodos } from "./ProjectTodos"
import { ProjectTodos2 } from "./ProjectTodos2"

import { Project } from "../classes/Project"
import { ProjectForm } from "./ProjectForm"
import { ThreeViewer } from "./ThreeViewer"

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectDetailsPage(props: Props) {

    const routeParams = Router.useParams<{id: string}>()
    console.log("I`m the ID ma boys: ", routeParams.id)

    if (!routeParams.id) { return (<p>Project ID is needed to see this page</p>)}

    let projectFromParams = props.projectsManager.getProject(routeParams.id)
    if (!projectFromParams) { return (<p>The project with ID: {routeParams.id} wasn't found. </p>)}

    const [projectDetails, setProjectDetails] = React.useState<Project>(projectFromParams)
    console.warn(" 0000-0000 : projectDetails: ",projectDetails)

    props.projectsManager.onProjectUpdated = (project: Project) => {
        console.log("-------  projectUpdate Detected! ---------")
        const projectUpdated = props.projectsManager.getProject(project.id)
        if (projectUpdated) {
        setProjectDetails(projectUpdated)
        console.log("Project Is Updated")
        }
    }

    // onProjectUpdated dentro de UseEffect -> Propuesta GPT, no mejora
    // React.useEffect(() => {
    //     props.projectsManager.onProjectUpdated = (project) => {
    //         console.log("onProjectUpdated triggered:", project);
    //         const projectUpdated = props.projectsManager.getProject(project.id);
    //         if (projectUpdated) {
    //             setProjectDetails(projectUpdated);
    //         }
    //     };
    // }, []); // Se ejecuta solo una vez al montar el componente




    const onEditProjectClick = ((e) => {
        // showDialog = true
        e.preventDefault()
        const modal = document.getElementById("edit-project-modal")
        if (modal && modal instanceof HTMLDialogElement) { modal.showModal() }
    })

    const onDeleteProjectClick = ((e) => {
        // showDialog = true
        e.preventDefault()
        // const modal = document.getElementById("edit-project-modal")
        console.log("projectsManager.deleteProject invoked")
        props.projectsManager.deleteProject(projectFromParams)

    })
// onDeleteProjectClick de GPT, propone enviar a setProjectDetails un null para que no quede perdido si se elimina. Da error.
    // const onDeleteProjectClick = (e) => {
    //     e.preventDefault();
    //     console.log("projectsManager.deleteProject invoked");
    //     props.projectsManager.deleteProject(projectFromParams);
    //     setProjectDetails(null); // Esto forzará la actualización de la UI
    // };

    if (!projectDetails) { return <p>Project Details doesn't found</p> }

    return (
        <div className="page" id="project-details" key={"details-"+projectDetails.id}>
        {/* <div className="page" id="project-details"> */}

            <dialog id="edit-project-modal" >
                <ProjectForm projectsManager= { props.projectsManager } project={ projectDetails } key={"project-form"+projectDetails.id}/>
            </dialog>
            {/* <ProjectForm projectsManager= { props.projectsManager } project={ projectDetails } key={"project-form"+projectDetails.id}/> */}

            <header className="page-header" id="project-details-page-header" style={{ 
                height: "9%" 
                }}>
                <h2 data-project-info="name">{ projectDetails.name }</h2>
                <div id="page-title">
                    <h5 data-project-info="description" style={{ color: "#969696" }}>{ projectDetails.description }</h5>
                    <h5 data-project-info="id">{ projectDetails.id }</h5>
                    <h5 data-project-info="fireBaseId">{ projectDetails.firebaseId }</h5>
                </div>
                <div className="page-header-buttons" style={{
                    display: "none" 
                    }}>
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
                    // display="flex"
                }}>
                <div id="project-details-container" style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 10,
                    height: "100%"
                }}>
                {/* dashboard card 1 ProjectDetails---------------------*/}
                    <div className="dashboard-card" id="project-information">
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center",
                            height: 30
                            }}>
                            <p data-project-info="initials" style={{
                                fontSize: 12,
                                backgroundColor: "#969696",
                                // backgroundColor: `${projectDetails.initialsColor}`,
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                padding: 7
                                }}>
                                { projectDetails.initials }
                            </p>
                            <p data-project-info="id"  style={{
                                fontSize: 8, 
                                width: 200, 
                                height: 30, 
                                display: "none" }}>
                                { projectDetails.id }
                            </p>
                            <div>
                                <button 
                                    id="edit-project-btn" 
                                    type="button" 
                                    className="btn-secondary" 
                                    style={{
                                        height: 30 
                                    }}
                                    onClick={(e) => onEditProjectClick(e)}
                                >
                                    <p style={{ width: 40, fontSize: "small" }}
                                    >
                                        Edit
                                    </p>
                                </button>
                                <button 
                                    id="delete-project-btn2" 
                                    className="btn-secondary" 
                                    onClick = {(e) => onDeleteProjectClick(e)}
                                    style={{
                                        height: 30 
                                    }}
                                >
                                    <p style={{ width: 40, fontSize: "small" }}>Delete</p>
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
                                    <h5 data-project-info="status">{ projectDetails.status }</h5>
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
                                    <h5 style={{ color: "#969696" }}>Short Finish Date</h5>
                                    <h5
                                        data-project-info="shortFinishDate"
                                        style={{ color: "white" }}
                                    >
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
                                    width: `${projectDetails.progress * 100}%"`,
                                }}>
                                    <h5 data-project-info="progress">{ projectDetails.progress .valueOf() }%</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="project-todos" className="dashboard-card">
                        <ProjectTodos2 projectsManager = {props.projectsManager}/>
                    </div>
                </div>
                <div
                    id="viewer-container-section"
                    className="dashboard-card"
                    // display="flex"
                    style={{ minWidth: 0, display: "flex" }}
                    >
                    <div
                        id="viewer-container-header"
                        className="dashboard-card-header"
                        style={{
                        height: "9%"
                        }}
                        // height="9%"
                    >
                        Title
                    </div>
                    <ThreeViewer />
                </div>
            </div>
        </div>

    )
}


    // if (!props.projectsManager.onProjectUpdated) {
    //     props.projectsManager.onProjectUpdated = (projectUpdated) => {
    //         // const projectToSet = props.projectsManager.getProject(projectUpdated.id)
    //         if (projectUpdated) {
    //             setProjectDetails(projectUpdated)
    //             console.log("onProjectUpdate -> ",projectUpdated," -> ",projectDetails)
    //         } else {
    //             console.log("DetailsPage, onProjectUpdated -> projectToSet(",project.id,") not found")
    //         }
    //     }
    // }

    // Manejar actualizaciones del proyecto
    // React.useEffect(() => {
    //     const handleProjectUpdated = (updatedProject: Project) => {
    //         console.warn("onProjectUpdated: ", updatedProject);

    //         // Actualizar los detalles del proyecto si coincide el ID
    //         if (updatedProject.id === projectDetails.id) {
    //             setProjectDetails(updatedProject);
    //         }
    //     };
    //     // Asignar el método a onProjectUpdated
    //     props.projectsManager.onProjectUpdated = handleProjectUpdated;

    //     // Limpiar al desmontar el componente
    //     return () => {
    //         // props.projectsManager.onProjectUpdated = undefined;
            
    //         // Asigno una función vacía para que no haya problemas de tipo
    //         props.projectsManager.onProjectUpdated = () => {};

    //     };
    // }, [props.projectsManager, projectDetails]);

    // if (!projectDetails) {
    //     return <p>Loading project details...</p>;
    // }






        // Antiguo onProjectUpdated

    // props.projectsManager.onProjectUpdated = (updatedProject: Project) => {
    //     console.warn("onProjectUpdated: ", updatedProject)
    //     setProjectDetails(props.projectsManager.filterProjects(projectDetails.id)[0])
    // }



    // React.useEffect(( ) => {
    //     console.log("Applying the useEffect on DetailsPage")
    //     // return (<p>{ projectDetails.description }</p>)
    // }, [projectDetails])

    // let showDialog = true


    

            // setProjectDetails([...props.projectsManager.list])





    // function showForm(visible: boolean) {
    //     if (visible) {
    //         return <ProjectForm projectsManager= { props.projectsManager } project={ projectDetails } key={"project-form"+projectDetails.id}/>
    //     }
    //     return <p>Cannot open the form</p>
    // }

    // const onFormSubmit = ((e) => {
    //     showDialog = false
    // })

    //-------------------------------------------
    // const idFromTodos = (todoId) => {
    // projectId = todoId
    // }
    //-------------------------------------------



                // props.projectsManager.deleteProjectFromList(project.id)
            // props.projectsManager.deleteProjectFromFirestore(project)

            // if (modal && modal instanceof HTMLDialogElement) { modal.showModal() }

