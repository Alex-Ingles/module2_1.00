import * as React from "react"

export function SearchBox() {
    return(
        <div style= {{ display: "flex", alignItems: "center", columnGap: 10, width: "40%" }} >
            <input
                type="text"
                placeholder="Search Projects by name..."
                style={{ width: "100%", height: "40px", backgroundColor: "var(--background-100)" }}
            />
        </div>
    )
}