import * as React from "react"

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
