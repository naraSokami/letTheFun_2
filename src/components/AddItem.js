import React from 'react'

function AddItem(props) {
    return (  
        <form className="AddItem">
            <input onChange={props.onChange} type="text" value={props.inputValue}/>
            <button onClick={props.onClick}>+</button>
        </form>
    );
}

export default AddItem;