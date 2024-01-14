import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";

export function List() {
    const { list_id } = useParams();
    const createInput = useRef();
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')));
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        if (items) {
            const newItems = items.filter(item => item.list_id == list_id);
            setListItems(newItems)
        }
    }, []);

    function addItem(event) {
        event.preventDefault();
        const listName = createInput.current.value;

        if (listName.length == 0) {
            console.error('name must have letters!')
            return;
        }

        const item = {
            id: generateListId(),
            list_id: list_id,
            name: listName,
        }

        if (!items) {
            updateListStorage([item]);
            updateItemsStorage([item])
        }
        else {
            updateListStorage([...items, item]);
            updateItemsStorage([...listItems, item])
        }
        
        createInput.current.value = '';
    }

    function updateListStorage(l) {
        localStorage.setItem('items', JSON.stringify(l));
        setItems(l);
    }

    function updateItemsStorage(l) {
        setListItems(l);
    }

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    return (
        <>
            <h1>List page { list_id }</h1>
            { listItems.length == 0 ? (
                <p>no items in storage</p>
            ) : (
                <ul>
                    {listItems.map(item => 
                        <li key={item.id}>
                            {item.name}
                        </li>
                    )}
                </ul>
            )}
            <form action="/" onSubmit={addItem}>
                <input type="text" ref={createInput} />
                <Button text="add" type="submit"></Button>
            </form>
            <Link to='run' state={listItems}><Button text="start"></Button></Link>
        </>
    )
}