import * as React from "react"
// import { Project } from "../classes/Project"
// import { ToDo } from "../classes/ToDo"
// import { ProjectsManager } from "../classes/ProjectsManager"

// interface Props {
//     project: Project
// }

// export function ErrorBoundary(props: Props) {

export function ErrorModal({ message, onClose }) {
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <h2>❌ Something went wrong</h2>
          <p>{message}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }


// ------------------------------------------------------------------

// import React, { Component, ReactNode } from 'react'  

// type ErrorBoundaryProps = {
//     children: ReactNode;
// }

// type ErrorBoundaryState = {
//     hasError: boolean;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

//     constructor (props: ErrorBoundaryProps) {    
//         super(props)    
//         this.state = { hasError: false }  
//     }

//     componentDidCatch (error: Error, info: React.ErrorInfo) {
//         this.setState({ hasError: true })
//     }

//     render () {
//         if (this.state.hasError) {
//             return <h1>Something went wrong.</h1>
//         }

//         return this.props.children  
// }
// }

// export default ErrorBoundary

// ---------------------------------------------------


    // return (
    //     <div className="error-card">
    //         <p>New error</p>
    //     </div>
    // )


            // <div className="card">
            //     <div className="card-header">
            //         <p
            //         data-project-info="initials"
            //         style={{
            //             // backgroundColor: "${this.initialsColor}",
            //             backgroundColor:`${ props.project.initialsColor }` ,
            //             padding: 10,
            //             borderRadius: 8,
            //             aspectRatio: 1
            //         }}
            //         >
            //             {props.project.initials}
            //         </p>
            //         <div>
            //             <h5
            //                 data-project-info="name"
            //                 className="name"
            //             >                        
            //                 { props.project.name } 
            //             </h5>
            //             {/* { props.project.name }  */}
            //             {/* <h5 data-project-info="name">{ props.project.name }</h5> */}
            //             {/* <input data-project-info="name">{ props.project.name }</input> */}
            //             <h5 
            //                 data-project-info="description" 
            //                 className="description"
            //             >
            //                     { props.project.description }
            //             </h5>
            //             <h6>
            //                 {props.project.id}
            //             </h6>
            //         </div>
            //     </div>
            //     <div className="card-content">
            //         <div style={{ display: "none" }} className="card-property">
            //             <p style={{ color: "#969696" }}>Id</p>
            //             <p data-project-info="id">
            //                 { props.project.id }
            //             </p>
            //         </div>
            //         <div className="card-property">
            //             <p style={{ color: "#969696" }}>Status</p>
            //             <p data-project-info="status">{ props.project.status || "N/A"}</p>
            //         </div>
            //         <div className="card-property">
            //             <p style={{ color: "#969696" }}>Role</p>
            //             <p data-project-info="userRole">{ props.project.userRole || "N/A" }</p>
            //         </div>
            //         <div className="card-property">
            //             <p style={{ color: "#969696" }}>Cost</p>
            //             <p data-project-info="cost">{ props.project.cost ? `$${props.project.cost}` : "N/A" }</p>
            //         </div>
            //         <div style={{ display: "none" }} className="card-property">
            //             <p style={{ color: "#969696" }}>
            //                 Finish Date
            //             </p>
            //             <p data-project-info="finishDate">
            //                 { props.project.shortFinishDate || "N/A"}
            //             </p>
            //         </div>
            //         <div className="card-property">
            //             <p style={{ color: "#969696" }}>Finish Date</p>
            //             <p data-project-info="shortFinishDate">
            //                 { props.project.shortFinishDate || "N/A" }
            //             </p>
            //         </div>
            //         <div className="card-property">
            //             <p style={{ color: "#969696" }}>Estimated Progress</p>
            //             <p data-project-info="progress">
            //                 { props.project.progress !== undefined ? `${props.project.progress}` : "N/A" }%
            //             </p>
            //         </div>
            //         <div className="card-property">
            //             <p style={{ color: "#969696" }}>Initials</p>
            //             <p 
            //                 data-project-info="initials" 
            //                 style={{ textTransform: "uppercase" }}
            //             >
            //                 { props.project.initials || "N/A" }
            //             </p>
            //         </div>
            //     </div>
            // </div>
        // </div>

