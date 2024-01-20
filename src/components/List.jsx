import { useRef, useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

/**
 * TODO
 * [x] - edit list item
 * [x] - refactor deleteItem function
 * [] - create input on button click
 */

export function List({ items, listId, onDelete, onCreate, onEdit }) {
    const [itemToEdit, setItemToEdit] = useState(null);
    const createInput = useRef();
    const editBtn = useRef();
    const deleteBtn = useRef();

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

    function editItem(item) {
        setItemToEdit(item);
    }

    function deleteItem(e, item) {
        const card = e.target.closest('article');
        onDelete(item);
        card.remove();
    }

    function renderItems(item) {
        if (itemToEdit == item) {
            return renderEditForm();
        }
        return <Link to={`lists/${item.id}`} state={item}>{item.name}</Link>
    }

    function renderActions(item) {

        const actions = () => {
            return (
                <>
                    <button type="button" onClick={() => editItem(item)}>edit</button>
                    <button type="button" onClick={(e) => deleteItem(e, item)}>delete</button>
                </>
            );
        }

        if (itemToEdit == item) {
            return <input type="submit" value="done" />
        }

        return actions();
    }

    function renderEditForm() {
        let newVal = null;

        const changed = (e) => {
            newVal = e.target.value;
            itemToEdit.name = newVal;
        };

        return (
            <input type="text" name="edit" defaultValue={itemToEdit.name} onChange={changed} />
        );
    }

    function handleSubmition(e) {
        e.preventDefault();

        const handleEditSubmit = () => {
            onEdit(itemToEdit);
            setItemToEdit(null);
        };
        
        handleEditSubmit();
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
                                <article data-item-id={item.id}>
                                    <div className="list-item">
                                        { renderItems(item) }
                                    </div>
                                    <div className="list-actions">
                                        { renderActions(item) }
                                    </div>
                                </article>
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