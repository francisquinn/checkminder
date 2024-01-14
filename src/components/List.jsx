import { useRef } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export function List({ items, onCreate }) {
    const createInput = useRef();
    const editBtn = useRef();
    const deleteBtn = useRef()

    function createListItem(event) {
        event.preventDefault();
        const value = createInput.current.value;

        if (value.length == 0) {
            console.error('name must have letters!')
            return;
        }

        const item = {
            id: generateListId(),
            name: value
        }
        
        onCreate([...items, item]);
        createInput.current.value = '';
    }

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    function editList() {
        console.log('edit value!');
    }

    function deleteList() {
        console.log('delete list!');
    }

    return (
        <>
            { items.length == 0 ? (
                <p>no lists in storage :(</p>
            ) : (
                <ul>
                    {items.map(list => 
                        <li key={list.id}>
                            <Link to={`lists/${list.id}`} state={list}>{list.name}</Link>
                            <button onClick={editList} ref={editBtn}>edit</button>
                            <button onClick={deleteList} ref={deleteBtn}>delete</button>
                        </li>
                    )}
                </ul>
            )}
            <form action="/" onSubmit={createListItem}>
                <input type="text" ref={createInput}/>
                <Button text="create" type="submit"></Button>
            </form>
        </>
    );
}