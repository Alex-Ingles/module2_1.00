import * as React from "react"
import { Project } from "../classes/Project"

interface Props {
    project: Project
}

export function ProjectCard(props: Props) {
    return (
        <div className="project-card">
                <div className="card">
                    <div className="card-header">
                        <p
                        data-project-info="initials"
                        style={{
                            // backgroundColor: "${this.initialsColor}",
                            backgroundColor: props.project.initialsColor ,
                            padding: 10,
                            borderRadius: 8,
                            aspectRatio: 1
                        }}
                        >P1</p>
                        <div>
                            <h5 data-project-info="name">{ props.project.name }</h5>
                            <h5 data-project-info="description" className="description">{ props.project.description }</h5>
                        </div>
                    </div>
                    <div className="card-content">
                        <div style={{ display: "none" }} className="card-property">
                            <p style={{ color: "#969696" }}>Id</p>
                            <p data-project-info="id">{ props.project.id }</p>
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
                            <p data-project-info="cost">{ props.project.cost ? `$${props.project.cost}` : "N/A" }</p>
                        </div>
                        <div style={{ display: "none" }} className="card-property">
                            <p style={{ color: "#969696" }}>Finish Date</p>
                            <p data-project-info="finishDate">{ props.project.shortFinishDate || "N/A"}</p>
                        </div>
                        <div className="card-property">
                            <p style={{ color: "#969696" }}>Finish Date</p>
                            <p data-project-info="shortFinishDate">{ props.project.shortFinishDate || "N/A" }</p>
                        </div>
                        <div className="card-property">
                            <p style={{ color: "#969696" }}>Estimated Progress</p>
                            <p data-project-info="progress">{ props.project.progress !== undefined ? `${props.project.progress}` : "N/A" }%</p>
                        </div>
                        <div className="card-property">
                            <p style={{ color: "#969696" }}>Initials</p>
                            <p data-project-info="initials" style={{ textTransform: "uppercase" }}>{ props.project.initials || "N/A" }</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}
