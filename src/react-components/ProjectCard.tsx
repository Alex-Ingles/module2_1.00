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
                    <p
                        className= "project-card-header-initials"
                        data-project-info="initials"
                        style={{
                            backgroundColor:`${ props.project.initialsColor }`
                            }}
                        >
                        { props.project.initials }
                    </p>
                    <div className= "project-card-header-title">
                        <h4
                            data-project-info="name"
                            className="name"
                            >                        
                            { props.project.name } 
                        </h4>
                        <h6 
                            data-project-info="description" 
                            className="description"
                            >
                            { props.project.description }
                        </h6>
                        <h6 hidden>
                            { props.project.id }
                        </h6>
                    </div>
                </div>
                <div className="project-card-content">
                    <div style={{ display: "none" }} className="card-property">
                        <p style={{ color: "#969696" }}>Id</p>
                        <p data-project-info="id">
                            { props.project.id }
                        </p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: "#969696" }}>Status</p>
                        <p data-project-info="status">{ props.project.status || "N/A"}</p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: "#969696" }}>Role</p>
                        <p data-project-info="userRole">{ props.project.userRole || "N/A" }</p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: "#969696" }}>Cost</p>
                        <p data-project-info="cost">{ props.project.cost ? `${props.project.cost}` : "N/A" }</p>
                    </div>
                    <div style={{ display: "none" }} className="card-property">
                        <p style={{ color: "#969696" }}>
                            Finish Date
                        </p>
                        <p data-project-info="finishDate">
                            { props.project.shortFinishDate || "N/A"}
                        </p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: "#969696" }}>Finish Date</p>
                        <p data-project-info="shortFinishDate">
                            { props.project.shortFinishDate || "N/A" }
                        </p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: "#969696" }}>Estimated Progress</p>
                        <p data-project-info="progress">
                            { props.project.progress !== undefined ? `${props.project.progress}` : "N/A" }%
                        </p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: "#969696" }}>Initials</p>
                        <p 
                            data-project-info="initials" 
                            style={{ textTransform: "uppercase" }}
                        >
                            { props.project.initials || "N/A" }
                        </p>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}
