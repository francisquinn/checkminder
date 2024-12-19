import { useRef, useState } from "react"
import { Link } from "react-router-dom"

export function Item({ item, onEdit, onDelete, onCreate, handleCreate }) {
  const card = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(item)

  function renderItem() {
    if (itemToEdit.name.length == 0 && !isCreating && !isEditing) {
      setIsCreating(true);
    }

    if (isEditing || isCreating) {
      return <input type="text" defaultValue={itemToEdit.name} autoFocus onChange={handleItemToEdit} />
    }

    if (itemToEdit.list_id) {
      return <span>{itemToEdit.name}</span>
    }

    return <Link to={`/checkminder/${itemToEdit.id}`} state={itemToEdit}>{itemToEdit.name}</Link>
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
          <button className="icon icon-item-wrapper icon-edit" onClick={() => setIsEditing(true)}></button>
          <button className="icon icon-item-wrapper icon-trash" onClick={() => {
            if (!window.confirm(`Are you sure you want to delete ${itemToEdit.name}?`)) return;

            onDelete(itemToEdit);
            card.current.remove();
          }}></button>
        </>
      );
    }

    if (isEditing) {
      return <button className="btn btn-primary" disabled={itemToEdit.name.length == 0 ? true : false} onClick={() => {
        onEdit(itemToEdit);
        setIsEditing(false);
      }}>Done</button>
    }

    if (isCreating) {
      return <button className="btn btn-primary" disabled={itemToEdit.name.length == 0 ? true : false} onClick={() => {
        onCreate(itemToEdit);
        handleCreate(false);
        setIsCreating(false);
      }}>Create</button>
    }

    return actions();
  }

  return (
    <>
      <article ref={card}>
        <div className="list-item">
          {renderItem()}
        </div>
        <div className="list-actions">
          {renderActions()}
        </div>
      </article>
    </>
  )
}