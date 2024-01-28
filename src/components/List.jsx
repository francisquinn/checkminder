import { useRef, useState } from "react";
import { Button } from "./Button";
import { ListItem } from "./ListItem";

/**
 * TODO
 * [] - edit list item updating original list
 * [x] - refactor deleteItem function
 * [] - create input on button click    
 */

export function List({ items, listId, onDelete, onCreate, onEdit }) {
    const createInput = useRef();

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

        if (listId) {
            item['list_id'] = listId;
        }
        
        onCreate(item);
        createInput.current.value = '';
    }

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    function handleSubmition(e) {
        e.preventDefault();
    }

    return (
        <>
            { items.length == 0 ? (
                <p>no lists in storage :(</p>
            ) : (
                <ul className="list">
                    {items.map(item => 
                        <li key={item.id}>
                            <form action="/" onSubmit={handleSubmition}>
                                <ListItem item={item} onEdit={onEdit} />
                            </form>
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