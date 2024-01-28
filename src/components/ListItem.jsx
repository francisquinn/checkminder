import { useRef, useState } from "react"
import { Link } from "react-router-dom"

export function ListItem({ item, onEdit }) {
    const card = useRef();
    const [ isEditing, setIsEditing ] = useState(false);
    const [i, setI ] = useState(item)

    function edit() {
        setIsEditing(true);
    }

    function done(e) {
        e.preventDefault()
        onEdit(i);
        setIsEditing(false);
    }

    function renderActions() {
        const actions = () => {
            return (
                <>
                    <button type="button" onClick={edit}>edit</button>
                    <button type="button">delete</button>
                </>
            );
        }

        if (isEditing) {
            return <button type="submit" onClick={done}>done</button>
        }

        return actions();
    }

    function renderItem() {
        if (isEditing) {
            return <input type="text" name="edit" defaultValue={item.name} onChange={handleI} />
        }

        return <Link to={`lists/${item.id}`} state={item}>{item.name}</Link>
    }

    function handleI(e) {
        setI({
            ...i,
            name: e.target.value
        })
    }

    return(
        <>
            <article data-item-id={item.id} ref={card}>
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