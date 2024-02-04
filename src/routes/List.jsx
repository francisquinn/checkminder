import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { Button } from "../components/Button";

export function List() {
    const { list_id } = useParams();
    const [ items, setItems ] = useState(JSON.parse(localStorage.getItem('items')) ?? []);
    const [ list, setList ] = useState(JSON.parse(localStorage.getItem('lists')) ?? []);
    const [ listItems, setListItems ] = useState([]);
    const [ item, setItem ] = useState({});

    useEffect(() => {
        const currentItems = items.filter(item => item.list_id == list_id);
        setListItems(currentItems);
        setList(() => list.find(list => list.id == list_id))
    }, []);

    function updateItemStorage(item) {
        localStorage.setItem('items', JSON.stringify([...items, item]));
        setListItems([...listItems, item]);
        setItems([...items, item]);
    }

    function removeItem(item) {
        const updatedItems = items.filter(i => i.id != item.id);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        setItems(updatedItems)
    }

    function editItem(item) {
        const newLists = items.map(i => {
            if (i.id == item.id) {
                i.name = item.name
            }
            return i;
        });

        localStorage.setItem('items', JSON.stringify(newLists));
    }

    return (
        <>
            <h1>{ list.name }</h1>
            <Table
                items={listItems}
                listId={list_id}
                onDelete={removeItem}
                onCreate={updateItemStorage} 
                onEdit={editItem}/>

            <button type="button">
                <Link to="checker" state={listItems}>start</Link>
            </button>
        </>
    );
}