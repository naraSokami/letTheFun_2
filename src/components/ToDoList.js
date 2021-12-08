import React, { useState, useEffect } from 'react';
import List from './List';
import Trash from './Trash'



// UTIL FN //

function _item(str){return parseInt(str.replace('item_', ''))}

let itemsCount = 6;



function ToDoList() {

    const [items, setItems] = useState([{id: 'item_0', currentList: 1, name: 'item 0'}, 
                                        {id: 'item_1', currentList: 1, name: 'item 1'},
                                        {id: 'item_2', currentList: 2, name: 'item 2'},
                                        {id: 'item_3', currentList: 2, name: 'item 3'},
                                        {id: 'item_4', currentList: 3, name: 'item 4'},
                                        {id: 'item_5', currentList: 3, name: 'item 5'}])

    const important = {name: 'important', list: [items[0], items[1]], id: 1}
    const toDo = {name: 'to do...', list: [items[2], items[3]], id: 2}
    const done = {name: 'done !', list: [items[4], items[5]], id: 3}

    const [rectList, setRectList] = useState([]);
    const [beingTransfered, setBeingTransfered] = useState({from: 1, item: null});
    const [importantList, setImportantList] = useState(important);
    const [toDoList, setToDoList] = useState(toDo);
    const [doneList, setDoneList] = useState(done);
    const [trash, setTrash] = useState({id: 0})
    const [lists, setLists] = useState([trash ,importantList, toDoList, doneList]);

    const listSetters = [setTrash, setImportantList, setToDoList, setDoneList]

    useEffect(() => {
        setRectList(lists.map((list) => {
            return {id: list.id, rect: document.getElementById(list.id).getBoundingClientRect()}
        }))
    }, [trash, importantList, toDoList, doneList])

    const [onElement, setOnElement] = useState(document.getElementById('root')) 

    useEffect(() => {
        lists.forEach(list => {
            let element = document.getElementById(list.id)
            element.addEventListener('mouseenter', ({target}) => {
                setOnElement(target);
            })
        });

        return () => {
            lists.forEach(list => {
                let element = document.getElementById(list.id)
                element.removeEventListener('mouseenter', ({target}) => {setOnElement(target)})
            });
        }
    }, []);

    useEffect(() => {
        onElement.classList.add('active')
        return () => {
            onElement.classList.remove('active')
        }
    }, [onElement])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setRectList(lists.map((list) => {
                return {id: list.id, rect: document.getElementById(list.id).getBoundingClientRect()}
            }))
        })
        return () => {
            window.removeEventListener('resize', () => {
                setRectList(lists.map((list) => {
                    return {id: list.id, rect: document.getElementById(list.id).getBoundingClientRect()}
                }))
            })
        }
    }, [])

    const handleDragStart = (event) => {

        const itemId = _item(event.target.id)
        const listId = parseInt(onElement.id)
        console.log(`item ID --> ${itemId}`)
        console.log(`list ID --> ${listId}`)

        console.log('bigBug')
        console.log(onElement)
        console.log('bigBug')

        setBeingTransfered({ from: listId, item: itemId});
        console.log(`TEST --> ${listSetters[listId]}`)
        event.target.classList.add('dropping')
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        // console.log('bigBug')
        // console.log(rectList[0])
        // console.log('bigBug')
        setOnElement(event.target)
    }

    const handleDrop = (event) => {
        console.log(event.clientX, event.clientY);
        rectList.forEach(({rect}, index) => {

            console.log('index')
            console.log(beingTransfered.from)
            console.log('index')

            if (event.clientX >= rect.x && event.clientX <= rect.x + rect.width) {
                if (event.clientY >= rect.y && event.clientY <= rect.y + rect.height) {
                    
                    console.log('ON ELEMENT')
                    console.log(parseInt(event.currentTarget.id))
                    console.log('ON ELEMENT')

                    listSetters[beingTransfered.from](prev => {
                        const newList = prev.list.filter(item => {  
                            return _item(item.id) != beingTransfered.item
                        })
                            return { ...prev, list: newList }
                    })

                    if (parseInt(event.currentTarget.id) == 0) 
                    {                        
                        items.filter(item => {
                            console.log('ON ELEMENT')
                            console.log(_item(item.id) != beingTransfered.item)
                            console.log('ON ELEMENT')
                            return _item(item.id) != beingTransfered.item})  
                    } 
                    else 
                    {
                        listSetters[parseInt(event.currentTarget.id)](prev => {
                            const newList = [...prev.list, items[beingTransfered.item]];
                            return { ...prev, list: newList }
                        })
                    }  
                }
            }
        });
    }

    const handleAddItemToList = (itemName, listId) => {
        listSetters[listId](prev => {
            items.push({id: 'item_' + itemsCount, currentList: listId, name: itemName})
            const newList = [...prev.list, items[itemsCount]];
                return { ...prev, list: newList }
        })
        itemsCount++
    }

    return (
        <div className="ToDoList">
            <Trash id={lists[0].id} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver}/>
            <List name={importantList.name} list={importantList.list} id={lists[1].id} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver} AddItemtoList={handleAddItemToList}/>
            <List name={toDoList.name} list={toDoList.list} id={lists[2].id} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver} AddItemtoList={handleAddItemToList}/>
            <List name={doneList.name} list={doneList.list} id={lists[3].id} onDragStart={handleDragStart} onDrop={handleDrop} onDragOver={handleDragOver} AddItemtoList={handleAddItemToList}/>
        </div>
    );
}

export default ToDoList;