import React, { useState } from 'react';
import AddItem from './AddItem.js'

function List(props) {

    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (input !== '') {
            props.AddItemtoList(input, props.id)
            setInput('')
        } 
  }

    return (
        <div className="List" id={props.id} onDrop={props.onDrop} onDragOver={props.onDragOver}>
            <h3>{props.name}</h3>
            <ul>
                {
                    props.list.map(({ id, currentList, name }, index) => {
                        return <li id={id} currentList={currentList} onDragStart={props.onDragStart} draggable="true">{name}</li>
                    })
                }
            </ul>
            <AddItem onClick={handleClick} onChange={handleChange} inputValue={input}/>
        </div>
    );
}

export default List;