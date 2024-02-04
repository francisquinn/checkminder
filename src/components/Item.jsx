import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

export function Item({ item, onEdit, onDelete, onCreate }) {
    const card = useRef();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isCreating, setIsCreating ] = useState(false);
    const [ itemToEdit, setItemToEdit ] = useState(item)

    function renderItem() {
        if (itemToEdit.name.length == 0 && !isCreating) {
            setIsCreating(true);
        }

        if (isEditing || isCreating) {
            return <input type="text" defaultValue={itemToEdit.name} autoFocus onChange={handleItemToEdit} />
        }

        if (itemToEdit.list_id) {
            return <span>{itemToEdit.name}</span>
        }

        return <Link to={`/lists/${itemToEdit.id}`} state={itemToEdit}>{itemToEdit.name}</Link>
    }

    function handleItemToEdit(e) {
        setItemToEdit({
            ...itemToEdit,
            name: e.target.value
        });
    }

    function renderActions() {
        const actions = () => {
            return (
                <>
                    <button type="button" onClick={editItem}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button type="button" onClick={deleteItem}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </>
            );
        }

        if (isEditing) {
            return <button type="button" onClick={done}>
                <FontAwesomeIcon icon={faCheck} />
            </button>
        }

        if (isCreating) {
            return <button type="button" onClick={doneCreate}>create</button>
        }

        return actions();
    }

    function editItem() {
        setIsEditing(true);
    }

    function deleteItem() {
        onDelete(itemToEdit);
        card.current.remove();
    }

    function done() {
        onEdit(itemToEdit);
        setIsEditing(false);
    }

    function doneCreate() {
        onCreate(itemToEdit);
        setIsCreating(false);
    }

    return(
        <>
            <article ref={card}>
                <div className="list-item">
                    { renderItem() }
                </div>
                <div className="list-actions">
                    { renderActions() }
                </div>
            </article>
        </>
    )
}