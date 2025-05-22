import * as React from "react"
import { Project } from "../classes/Project"

interface Props {
    project: Project
}

export function ProjectCard(props: Props) {

    // --background: #202124;
    // --background-100: #26282b;
    // --background-200: #3b3c3f;


    const projectCardStyle = {
        backgroundColor: "#26282b",
        borderRadius: "8px",
        cursor: "pointer",
        width: "90%",
        height: "90%",
    }

    return (
        <div className="project-card" id={ `"project-card-"${props.project.id}` }>
            {/* <div className="card"> */}
                <div className="project-card-header">
                    <bim-label
                        className= "project-card-header-initials"
                        data-project-info="initials"
                        style={{
                            backgroundColor:`${ props.project.initialsColor }`
                            }}
                        >
                        { props.project.initials }
                    </bim-label>
                    <div className= "project-card-header-title">
                        <bim-label
                            style={{ 
                                fontSize: "16px", 
                                color: "#fff", 
                                fontWeight: "bold" 
                            }}> 
                            { props.project.name } 
                        </bim-label>
                        <bim-label style={{ color: "#fff" }}>{ props.project.description }</bim-label>
                    </div>
                </div>
                <div className="project-card-content">
                    <div style={{ display: "none" }} className="card-property">
                        <bim-label>Id</bim-label>
                        <bim-label style={{ color: "#fff" }}> { props.project.id } </bim-label>
                    </div>
                    <div className="card-property">
                        <bim-label>Status</bim-label>
                        <bim-label style={{ color: "#fff" }}> { props.project.status || "N/A" } </bim-label>
                    </div>
                    <div className="card-property">
                        <bim-label>Role</bim-label>
                        <bim-label style={{ color: "#fff" }}>{ props.project.userRole || "N/A" }</bim-label>
                    </div>
                    <div className="card-property">
                        <bim-label>Cost</bim-label>
                        <bim-label style={{ color: "#fff" }}>{ props.project.cost ? `${props.project.cost}` : "N/A" }</bim-label>
                    </div>
                    <div style={{ display: "none" }} className="card-property">
                        <bim-label>
                            Finish Date
                        </bim-label>
                        <bim-label style={{ color: "#fff" }}> { props.project.shortFinishDate || "N/A"} </bim-label>
                    </div>
                    <div className="card-property">
                        <bim-label>Finish Date</bim-label>
                        <bim-label style={{ color: "#fff" }}>
                            { props.project.shortFinishDate || "N/A" }
                        </bim-label>
                    </div>
                    <div className="card-property">
                        <bim-label>Estimated Progress</bim-label>
                        <bim-label style={{ color: "#fff" }}>
                            { props.project.progress !== undefined ? `${props.project.progress}` : "N/A" }%
                        </bim-label>
                    </div>
                    <div className="card-property">
                        <bim-label>Initials</bim-label>
                        <bim-label style={{ color: "#fff" }}>
                            { props.project.initials || "N/A" }
                        </bim-label>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}
