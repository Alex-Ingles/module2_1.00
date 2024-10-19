import * as React from "react"

export function ProjectDetailsPage() {
    return (
        <div className="page" id="project-details">
            <dialog id="new-todo-modal">
                <form id="new-todo-form">
                <h2>New To-Do</h2>
                <div className="input-list">
                    <div className="form-field-container">
                    <input
                        data-todo-info="id"
                        name="id"
                        type="hidden"
                    />
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">apartment</span>Name
                        </label>
                        <input
                        data-todo-info="name"
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
                        data-todo-info="description"
                        name="description"
                        cols={30}
                        rows={5}
                        placeholder="Give your description here"
                        defaultValue={""}
                        />
                    </div>
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">account_circle</span>Status
                        </label>
                        <select data-todo-info="status" name="status">
                        <option>pending</option>
                        <option>on going</option>
                        <option>solved</option>
                        </select>
                    </div>
                    <div className="form-field-container">
                        <label>
                        <span className="material-icons-round">calendar_month</span>Finish
                        Date
                        </label>
                        <input data-todo-info="deadline" name="deadline" type="date" />
                    </div>
                    </div>
                    <div className="submit-buttons">
                    <button id="new-todo-form-cancel-btn" type="submit">
                        Cancel
                    </button>
                    <button
                        id="new-todo-form-submit-btn"
                        type="submit"
                        style={{ backgroundColor: "green" }}
                    >
                        Accept
                    </button>
                    <button
                        id="new-todo-form-delete-btn"
                        type="button"
                        style={{ backgroundColor: "red" }}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                </form>
            </dialog>
            {/* dialog -------------------------------------------------------*/}
            <dialog id="edit-todo-modal">
                <form id="edit-todo-form">
                <h2>Edit To-Do</h2>
                <div className="input-list">
                    <div className="form-field-container">
                    <input
                        data-todo-info="id"
                        name="id"
                        type="hidden"
                    />
                    </div>
                    <div hidden={true} className="form-field-container">
                    <input
                        data-todo-info="relatedProject"
                        name="relatedProject"
                        type="hidden"
                    />
                    </div>
                    <div className="form-field-container">
                    <label>
                        <span className="material-icons-round">apartment</span>Name
                    </label>
                    <input
                        data-todo-info="name"
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
                        id="edit-todo-form-description"
                        data-todo-info="description"
                        name="description"
                        cols={30}
                        rows={5}
                        placeholder="Give your description here"
                        defaultValue={'""'}
                    />
                    </div>
                    <div className="form-field-container">
                    <label>
                        <span className="material-icons-round">account_circle</span>Status
                    </label>
                    <select data-todo-info="status" name="status">
                        <option>pending</option>
                        <option>on going</option>
                        <option>solved</option>
                    </select>
                    </div>
                    <div className="form-field-container">
                    <label>
                        <span className="material-icons-round">calendar_month</span>deadline
                    </label>
                    <input data-todo-info="deadline" name="deadline" type="date" />
                    </div>
                </div>
                <div className="submit-buttons">
                    <button id="edit-todo-form-cancel-btn" type="submit">
                    Cancel
                    </button>
                    <button
                    id="edit-todo-form-submit-btn"
                    type="submit"
                    style={{ backgroundColor: "green" }}
                    >
                    Accept
                    </button>
                    <button
                    id="edit-todo-form-delete-btn"
                    type="button"
                    style={{ backgroundColor: "red" }}
                    >
                    Delete
                    </button>
                </div>
                </form>
            </dialog>
            {/* header -------------------------------------------------------*/}
            <header
                className="page-header"
                id="project-details-page-header"
                style={{ height: "9%" }}
            >
                <div id="page-title">
                <h2 data-project-info="name">Hospital Center</h2>
                <h5 data-project-info="description" style={{ color: "#969696" }}>
                    Community hospital located at downtown
                </h5>
                </div>
                <div style={{ display: "none" }} className="page-header-buttons">
                <button hidden={true}>
                    <span className="material-icons-round">file_download</span>Download
                </button>
                <button hidden={true} id="new-project-btn">
                    <span className="material-icons-round">add_circle_outline</span>New
                    Project
                </button>
                </div>
            </header>
            {/* project details -------------------------------------------------------*/}
            <div
                className="main-page-content"
                // display="flex"
                flex-direction="row"
                style={{
                height: "91%",
                width: "100%",
                display: "grid",
                gap: 20,
                gridTemplateColumns: "30% 70%",
                gridTemplateRows: "100%",
                padding: "20px 30px"
                }}
            >
                <div
                id="project-details-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 10,
                    height: "100%"
                }}
                >
                {/* dashboard card 1 ProjectDetails---------------------*/}
                <div className="dashboard-card" id="project-information">
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        height: 30
                    }}
                    >
                    <p
                        data-project-info="initials"
                        style={{
                        fontSize: 12,
                        backgroundColor: "#969696",
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        padding: 7
                        }}
                    >
                        HC
                    </p>
                    <p
                        data-project-info="id"
                        style={{ fontSize: 8, width: 200, height: 30, display: "none" }}
                    >
                        Id
                    </p>
                    <div>
                        <button
                        id="edit-project-btn"
                        type="button"
                        className="btn-secondary"
                        style={{ height: 30 }}
                        >
                        <p style={{ width: 40, fontSize: "small" }}>Edit</p>
                        </button>
                        <button
                        id="delete-project-btn"
                        className="btn-secondary"
                        style={{ height: 30 }}
                        >
                        <p style={{ width: 40, fontSize: "small" }}>Delete</p>
                        </button>
                    </div>
                    </div>
                    <div style={{ padding: "30 0px" }}>
                    <div style={{ left: 0 }}>
                        <h5 data-project-info="name2">Hospital Center</h5>
                        <p
                        data-project-info="description2"
                        style={{ fontSize: "small", fontWeight: "lighter" }}
                        >
                        Community hospital located at downtown
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
                        <h5 data-project-info="status">Active</h5>
                        </div>
                        <div>
                        <h5 style={{ color: "#969696" }}>Cost</h5>
                        <h5 data-project-info="cost" style={{ color: "white" }}>
                            €2.400.000
                        </h5>
                        </div>
                        <div>
                        <h5 style={{ color: "#969696" }}>Role</h5>
                        <h5 data-project-info="userRole" style={{ color: "white" }}>
                            Engineer
                        </h5>
                        </div>
                        <div hidden={true}>
                        <h5 style={{ color: "#969696" }}>Finish Date</h5>
                        <h5 data-project-info="finishDate" style={{ color: "white" }}>
                            2025-05-01
                        </h5>
                        </div>
                        <div>
                        <h5 style={{ color: "#969696" }}>Finish Date</h5>
                        <h5
                            data-project-info="shortFinishDate"
                            style={{ color: "white" }}
                        >
                            2025-05-01
                        </h5>
                        </div>
                    </div>
                    </div>
                    <div>
                    <div className="progress-bar">
                        <div
                        id="project-progress-bar"
                        className="progress-bar-done"
                        style={{
                            backgroundColor: "rgb(158, 195, 158)",
                            borderRadius: "10px 0 0 10px"
                        }}
                        >
                        <h5 data-project-info="progress">80%</h5>
                        </div>
                    </div>
                    </div>
                </div>
                {/* dashboard card 2 - ToDos -----------------------*/}
                <div className="dashboard-card">
                    <div className="dashboard-card-header">
                    <h4>To-do</h4>
                    <div className="dashboard-card-buttons">
                        <span className="material-icons-round">search</span>
                        <input
                        className="search-box"
                        type="text"
                        placeholder="Search by name"
                        />
                        <button id="new-todo-btn">
                        <span className="material-icons-round">add_circle_outline</span>
                        </button>
                    </div>
                    </div>
                    <div className="todo-list" id="todo-list">
                    {/* todo card */}
                    <div id="id1" className="todo-card">
                        <span
                        className="material-icons-round"
                        style={{
                            width: 30,
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        >
                        check_circle_outline
                        </span>
                        <div className="todo-description">
                        <p>
                            Pending to finish the todo list dashboard, giving format and
                            check buttons.
                        </p>
                        </div>
                        <div className="todo-deadline">25-2-2024</div>
                    </div>
                    {/* todo card */}
                    <div id="id2" className="todo-card">
                        <span
                        className="material-icons-round"
                        style={{
                            width: 30,
                            height: 30,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        >
                        check_circle_outline
                        </span>
                        <div className="todo-description">
                        <p>DM Juan attaching my solution!</p>
                        </div>
                        <div className="todo-deadline">25-2-2024</div>
                    </div>
                    </div>
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
                <div
                    id="viewer-container"
                    style={{
                    minWidth: 0,
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    display: "flex"
                    }}
                    // display="flex"
                />
                </div>
            </div>
        </div>

    )
}