import { useRef } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

/**
 * TODO
 * [] - edit list item
 */

export function List({ items, listId, onDelete, onCreate }) {
    const createInput = useRef();
    const listItem = useRef();
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
        };

        if (listId) {
            item['list_id'] = listId;
        }
        
        onCreate(item);
        createInput.current.value = '';
    }

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    function editList() {
        console.log('edit value!');
        const link = listItem.current;
        console.log(listItem.current)

        const input = document.createElement('input');
        input.value = link.textContent

        listItem.current.parentNode.replaceChild(input, link)
    }

    function deleteList() {
        const li = deleteBtn.current.parentNode;
        const itemToDelete = items.find(item => item.id == li.dataset.itemId);
        onDelete(itemToDelete);
        li.remove();
    }

    return (
        <>
            { items.length == 0 ? (
                <p>no lists in storage :(</p>
            ) : (
                <ul className="list">
                    {items.map(list => 
                        <li key={list.id} data-item-id={list.id}>
                            <article>
                                <div className="list-item">
                                    <Link to={`lists/${list.id}`} ref={listItem} state={list}>{list.name}</Link>
                                </div>
                                <div className="list-actions">
                                    <button onClick={editList} ref={editBtn}>edit</button>
                                    <button onClick={deleteList} ref={deleteBtn}>delete</button>
                                </div>
                            </article>
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