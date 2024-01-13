import { useParams } from "react-router-dom";
import { Item } from "../components/Item";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";

export function List() {
    const { id } = useParams();
    const createInput = useRef();
    const [items, setItems] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem('lists'));
        const currentList = lists.find(list => list.id == id);
        setItems(currentList.items)
        setList(currentList)
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
            name: listName,
            items: []
        }
        
        updateListStorage([...items, item]);

        createInput.current.value = '';
    }

    function updateListStorage(l) {
        
        setItems(l);
    }

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    return (
        <>
            <h1>List page { id }</h1>
            { items.length == 0 ? (
                <p>no items in storage</p>
            ) : (
                <ul>
                    {items.map(item => 
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
        </>
    )
}