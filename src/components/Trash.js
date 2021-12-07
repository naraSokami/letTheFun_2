import React from 'react'

function Trash(props) {
    return (  
        <div className="Trash" id={props.id} onDragStart={props.onDragStart} onDrop={props.onDrop} onDragOver={props.onDragOver}>
            <i class="fas fa-trash-alt"></i>
        </div>
    );
}

export default Trash;