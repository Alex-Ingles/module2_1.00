import * as React from "react"
import * as Router from "react-router-dom"
import { ProjectsManager } from "../classes/ProjectsManager"
import { Project } from "../classes/Project"
import { ProjectTodos2 } from "./ProjectTodos2"
import { ProjectForm } from "./ProjectForm"
import { ThreeViewer } from "./ThreeViewer"
import { ProjectTodos3 } from "./ProjectTodos3"
import * as BUI from "@thatopen/ui"
import "iconify-icon"

interface Props {
    projectsManager: ProjectsManager
}

export function ProjectDetailsPage2(props: Props) {
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

const detailsTable = BUI.Component.create<BUI.Table>(() => {
    const onTableCreated = (element?: Element) => {
        const table = element as BUI.Table

        table.data = [
            { data: { Key: "Key", Value: "Value",}},
            { data: { Key: "Name", Value: projectDetails.name,}},
            { data: { Key: "Description", Value: projectDetails.description,}},
            { data: { Key: "Status", Value: projectDetails.status,}},
            { data: { Key: "User Role", Value: projectDetails.userRole,}},
            { data: { Key: "Cost", Value: projectDetails.cost,}},
            { data: { Key: "Initials", Value: projectDetails.initials,}},
            { data: { Key: "Progress", Value: projectDetails.progress,}},
            { data: { Key: "Initials Color", Value: projectDetails.initialsColor,}},
            { data: { Key: "Short Finish Date", Value: projectDetails.shortFinishDate,}},
            { data: { Key: "Id", Value: projectDetails.id,}},
            { data: { Key: "firebaseId", Value: projectDetails.firebaseId,}},
        ]
    }
    return BUI.html `
        <bim-table ${BUI.ref(onTableCreated)}></bim-table>
    `
})

const details2 = BUI.Component.create<BUI.Panel>(() => {
    return BUI.html`
        <div 
            style="
                display: flex;
                flex-direction: column;
                overflow-y: scroll;
            ">
            <header style="height: 10%">
                <p>Hello!</p>
            </header>
            <bim-tabs style="height: 90%">
                <bim-header>
                    <bim-label>Project Details</bim-label>
                </bim-header>
                <bim-tab label="Details">
                    <bim-panel style="border-radius: 0px">
                        <bim-panel-section label="Details">
                            ${detailsTable}
                        <bim-panel-section>
                    </bim-panel>
                </bim-tab>
                <bim-tab label="Otros">
                    <bim-panel style="border-radius: 0px">
                        <bim-panel-section label="Otros">
                            <bim-label>Hola!</bim-label>
                        </bim-panel-section>
                    </bim-panel>
                <bim-tab>
            </bim-tabs>
        </div>
    `;
})


const header = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`
        <bim-label>${ projectDetails.name }</bim-label>
        <div id="page-title>
            <bim-label style="color: #969696"> ${ projectDetails.description } ></bim-label>
            <bim-label style="color: #969696"> ${ projectDetails.id } ></bim-label>
            <bim-label style="color: #969696"> ${ projectDetails.firebaseId } ></bim-label>
        </div>
    `;
})
 
const three = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`
        <div
            id="viewer-container-section"
            class="dashboard-card"
            style="min-width: 0; display: flex"
            >
            <div
                id="viewer-container-header"
                class="dashboard-card-header"
                style="
                    height: 9%"
                >
                Title
            </div>
            <ThreeViewer />
        </div>
        `;
})

const details = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`
        <div class="dashboard-card" id="project-information">
            <div class="dashboard-card-header" 
                style="
                    display: flex;
                    height: 10%;
                    justify-content: space-between;
                    align-content: center;
                ">
                <bim-label 
                    style="
                        height: 100%;
                        width: 10%;
                        background-color: ${projectDetails.initialsColor};
                        border-radius: 8px;
                        font-size: 1.5em;
                        padding: 7;
                    ">
                    ${ projectDetails.initials }
                </bim-label>
                <bim-label 
                    style="
                        font-size: 8;
                        width: 200;
                        height: 30;
                        // display: none
                        ">
                        ${ projectDetails.id }
                </bim-label>
                <div class="dashboard-card-buttons"
                    style="
                        display: flex;
                        flex-direction: row
                    ">
                    <bim-button 
                        class="btn-secondary" 
                        id="edit-project-btn" 
                        type="button" 
                        style="
                            height: 100% 
                        "
                        @Click=${(e) => {
                            onEditProjectClick(e)}
                        } 
                    >
                        <p style="width: 10%; fontSize: small">
                            Edit
                        </p>
                    </bim-button>
                    <bim-button 
                        class="btn-secondary" 
                        id="delete-project-btn2" 
                        style="
                        height: 100%;
                        background-color: indianred;
                        "
                        @Click = ${(e) => { 
                            onDeleteProjectClick(e)
                        }}
                    >
                        <Router.Link to="/">
                            <bim-button title="Delete Project" style=" width: 40; fontSize: small">
                                X
                                </bim-button>
                        </Router.Link>
                    </bim-button>

                </div>
            </div>
            <div style="padding: 30 0px">
                <div style="left: 0">
                    <bim-label>${ projectDetails.name }</bim-label>
                    <bim-label style="
                        font-size: small; 
                        font-weight: lighter;
                        " 
                    >
                    ${ projectDetails.description }
                    </bim-label>
                </div>
                <div
                    style="
                    display: flex;
                    column-gap: 30;
                    justify-content: space-between;
                    padding: 10px 0;
                    font-size: smaller;
                    "
                >
                    <div>
                        <bim-label style="color: #969696">Status</bim-label>
                        <bim-label> ${ projectDetails.status }</bim-label>
                    </div>
                    <div>
                        <bim-label style="color: #969696">Cost</bim-label>
                        <bim-label style="color: white">
                            ${ projectDetails.cost.valueOf() }
                        </bim-label>
                    </div>
                    <div>
                        <bim-label style="color: #969696">User Role</bim-label>
                        <bim-label style="color: white">
                           ${ projectDetails.userRole }
                        </bim-label>
                    </div>
                    <div hidden={true}>
                        <bim-label style="color: #969696">Finish Date</bim-label>
                        <bim-label style="color: white">
                            ${ projectDetails.finishDate.toString() }
                        </bim-label>
                    </div>
                    <div>
                        <bim-label style="color: #969696">
                            Short Finish Date
                        </bim-label>
                        <bim-label style="color: white">
                            ${ projectDetails.shortFinishDate.toString() }
                        </bim-label>
                    </div>
                </div>
            </div>
            <div>
                <div className="progress-bar">
                    <div id="project-progress-bar" class="progress-bar-done" style="
                        background-color: rgb(158, 195, 158);
                        border-radius: 10px 0 0 10px;
                        width: ${projectDetails.progress}%;
                        ">
                        <bim-label>
                            ${ projectDetails.progress .valueOf() }%
                        </bim-label>
                    </div>
                </div>
            </div>
        </div>
    `
})

const todos = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`
        <bim-label>These are the todos</bim-label>   
    `
})
const todos2 = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`
        <div>
            <ProjectTodos2/ projectsManager={props.projectsManager}>
        </div>
    `
})
const todos3 = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`

            <ProjectTodos3 projectsManager = ${props.projectsManager}/>

    `
})

const todos4 = BUI.Component.create<BUI.Component>(() => {
    return BUI.html`
        <ProjectTodos3 projectsManager = ${props.projectsManager}/>
        // <p>Hola!</p>
        // <bim-panel>
        //     <bim-panel-secion>
        //         <ProjectTodos3 projectsManager = ${props.projectsManager}/>
        //     </bim-panel-section>
        // </bim-panel>
    `
})


// const todos4 = <ProjectTodos3 projectsmanager = props={.projectsManager}/>

// const dropdown = BUI.Component.create<BUI.Dropdown>(() => {
//     return BUI.html`
//         <div>These is the dropdown</div>   
//     `
// })




    const gridLayout: BUI.Layouts = {
        primary: {
            template: `
                "header header header header" 10%
                "details2 details2 three three" 45%
                "todos4 todos4 three three" 45%
                / 1fr 1fr 1fr 1fr
            `,
            elements: {
                header, details2, todos4, three, 

            }
        },
        secondary: {
            template:`
                "header header header dropdown" 10%
                "details2 three three three" 45%
                "todos three three three" 45%
                / 1fr 1fr 1fr 1fr
            `,
            elements: {
                header, details2, todos, three,
            }
        }
}

    const headerButtons = BUI.Component.create<BUI.Component>(() => {
        return BUI.html `
        <div 
            className="page-header-buttons" 
            >
            <bim-button 
                style = {{height: "50px"}}
                icon = "material-symbols:print-outline-sharp"
            >
            </bim-button>
            <bim-button
                id = "new-project-btn"
                icon = "cil:healing"
                label = "New Project"
                @click = ${() => {
                    console.log("what?")
                }}
                    >
            </bim-button>
    //             </div>
        `;
    })

    React.useEffect (() => {
        const grid = document.getElementById("details-grid") as BUI.Grid
        grid.layouts = gridLayout
        grid.layout = "primary"
    }, [])

    return (
        <div className="page" id="project-details" key={"details-"+projectDetails.id}>
            <dialog id="edit-project-modal" >
                <ProjectForm projectsManager= { props.projectsManager } project={ projectDetails } key={"project-form"+projectDetails.id}/>
            </dialog>
            <header 
                className="page-header" 
                id="project-details-page-header" 
                style={{ 
                    backgroundColor: "grey",
                    height: "9%" 
                }}>
                <bim-label data-project-info="name">{ projectDetails.name }</bim-label>
                    <div id="page-title">
                        <bim-label style={{ color: "#969696" }}>
                            { projectDetails.description }
                        </bim-label>
                        <bim-label> { projectDetails.id } </bim-label>
                        <bim-label> { projectDetails.firebaseId } </bim-label>
                    </div>
                    ${headerButtons}
    //         </header>

            <bim-grid id="details-grid"></bim-grid>
            <ProjectTodos3 projectsManager={props.projectsManager}/>
        </div>
    )


    // --------------------------------------------------


    // return (
    //     <div className="page" id="project-details" key={"details-"+projectDetails.id}>
    //         <dialog id="edit-project-modal" >
    //             <ProjectForm projectsManager= { props.projectsManager } project={ projectDetails } key={"project-form"+projectDetails.id}/>
    //         </dialog>
    //         <header className="page-header" id="project-details-page-header" style={{ 
    //             height: "9%" 
    //             }}>
    //             <h2 data-project-info="name">{ projectDetails.name }</h2>
    //             <div id="page-title">
    //                 <h5 data-project-info="description" style={{ color: "#969696" }}>{ projectDetails.description }</h5>
    //                 <h5 data-project-info="id">{ projectDetails.id }</h5>
    //                 <h5 data-project-info="fireBaseId">{ projectDetails.firebaseId }</h5>
    //             </div>
    //             <div 
    //                 className="page-header-buttons" 
    //                 style={{
    //                     display: "none" 
    //                     }}
    //                 >
    //                 <button hidden={true}>
    //                     <span className="material-icons-round">
    //                         file_download
    //                     </span>
    //                     Download
    //                 </button>
    //                 <button hidden={true} id="new-project-btn">
    //                     <span className="material-icons-round">add_circle_outline</span>
    //                     New Project
    //                 </button>
    //             </div>
    //         </header>
    //         {/* project details -------------------------------------------------------*/}
    //         <div className="main-page-content" flex-direction="row" style={{
    //                 height: "91%",
    //                 width: "100%",
    //                 display: "grid",
    //                 gap: 20,
    //                 gridTemplateColumns: "50% 50%",
    //                 gridTemplateRows: "100%",
    //                 padding: "20px 30px"
    //             }}>
    //             <div id="project-details-container" style={{
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 rowGap: 10,
    //                 height: "100%"
    //                 }}>
    //             {/* dashboard card 1 ProjectDetails---------------------*/}
    //                 <div className="dashboard-card" id="project-information" style={{height: "30%"}}>
    //                     <div className="dashboard-card-header" style={{
    //                         display: "flex",
    //                         justifyContent: "space-between",
    //                         alignContent: "center",
    //                         height: "30%",
    //                         }}>
    //                         <div 
    //                             className="dashboard-card-header-initials"
    //                             style={{
    //                                 backgroundColor: `${projectDetails.initialsColor}`,
    //                                 width: 40,
    //                                 height: 40,
    //                                 aspectRatio: 1,
    //                                 borderRadius: 5,
    //                             }}>
    //                             <p data-project-info="initials" style={{
    //                                 fontSize: "1.5em",
    //                                 padding: 7,
    //                                 }}>
    //                                 { projectDetails.initials }
    //                             </p>
    //                         </div>
    //                         <p data-project-info="id"  style={{
    //                             fontSize: 8, 
    //                             width: 200, 
    //                             height: 30, 
    //                             display: "none" }}>
    //                             { projectDetails.id }
    //                         </p>
    //                         <div className="dashboard-card-buttons">
    //                             <button 
    //                                 id="edit-project-btn" 
    //                                 type="button" 
    //                                 className="btn-secondary" 
    //                                 style={{
    //                                     height: 30 
    //                                 }}
    //                                 onClick={(e) => onEditProjectClick(e)}
    //                             >
    //                                 <p style={{ width: 40, fontSize: "small" }}>
    //                                     Edit
    //                                     </p>
    //                             </button>
    //                             <button 
    //                                 id="delete-project-btn2" 
    //                                 className="btn-secondary" 
    //                                 onClick = {(e) => onDeleteProjectClick(e)}
    //                                 style={{
    //                                     height: 30,
    //                                     backgroundColor: "indianred"
    //                                 }}
    //                             >
    //                                 <Router.Link to="/">
    //                                     <p title="Delete Project" style={{ width: 40, fontSize: "small" }}>
    //                                         X
    //                                         </p>
    //                                 </Router.Link>
    //                             </button>

    //                         </div>
    //                     </div>
    //                     <div style={{ padding: "30 0px" }}>
    //                         <div style={{ left: 0 }}>
    //                             <h5 data-project-info="name2">{ projectDetails.name }</h5>
    //                             <p data-project-info="description2" style={{
    //                                 fontSize: "small", 
    //                                 fontWeight: "lighter" 
    //                                 }}>
    //                             { projectDetails.description }
    //                             </p>
    //                         </div>
    //                         <div
    //                             style={{
    //                             display: "flex",
    //                             columnGap: 30,
    //                             justifyContent: "space-between",
    //                             padding: "10px 0",
    //                             fontSize: "smaller"
    //                             }}
    //                         >
    //                             <div>
    //                                 <h5 style={{ color: "#969696" }}>Status</h5>
    //                                 <h5 data-project-info="status">
    //                                     { projectDetails.status }
    //                                 </h5>
    //                             </div>
    //                             <div>
    //                                 <h5 style={{ color: "#969696" }}>Cost</h5>
    //                                 <h5 data-project-info="cost" style={{ color: "white" }}>
    //                                     { projectDetails.cost.valueOf() }
    //                                 </h5>
    //                             </div>
    //                             <div>
    //                                 <h5 style={{ color: "#969696" }}>User Role</h5>
    //                                 <h5 data-project-info="userRole" style={{ color: "white" }}>
    //                                     { projectDetails.userRole }
    //                                 </h5>
    //                             </div>
    //                             <div hidden={true}>
    //                                 <h5 style={{ color: "#969696" }}>Finish Date</h5>
    //                                 <h5 data-project-info="finishDate" style={{ color: "white" }}>
    //                                     { projectDetails.finishDate.toString() }
    //                                 </h5>
    //                             </div>
    //                             <div>
    //                                 <h5 style={{ color: "#969696" }}>
    //                                     Short Finish Date
    //                                 </h5>
    //                                 <h5 data-project-info="shortFinishDate" style={{ color: "white" }}>
    //                                     { projectDetails.shortFinishDate.toString() }
    //                                 </h5>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div>
    //                         <div className="progress-bar">
    //                             <div id="project-progress-bar" className="progress-bar-done" style={{
    //                                 backgroundColor: "rgb(158, 195, 158)",
    //                                 borderRadius: "10px 0 0 10px",
    //                                 width: `${projectDetails.progress}%`,
    //                                 }}>
    //                                 <h5 data-project-info="progress">
    //                                     { projectDetails.progress .valueOf() }%
    //                                 </h5>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="dashboard-card" id="todo-list" style={{height: "75%"}}>
    //                     <ProjectTodos2 projectsManager = {props.projectsManager}/>
    //                 </div>
    //             </div>
    //             <div
    //                 id="viewer-container-section"
    //                 className="dashboard-card"
    //                 style={{ minWidth: 0, display: "flex" }}
    //                 >
    //                 <div
    //                     id="viewer-container-header"
    //                     className="dashboard-card-header"
    //                     style={{
    //                     height: "9%"
    //                     }}
    //                     >
    //                     Title
    //                 </div>
    //                 <ThreeViewer />
    //             </div>
    //         </div>
    //     </div>

    // )
}
