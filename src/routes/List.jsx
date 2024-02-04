import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { Button } from "../components/Button";

export function List() {
    const { list_id } = useParams();
    const [ items, setItems ] = useState(JSON.parse(localStorage.getItem('items')) ?? []);
    const [ listItems, setListItems ] = useState([]);

    useEffect(() => {
        const currentItems = items.filter(item => item.list_id == list_id);
        setListItems(currentItems);
    }, []);

    function updateItemStorage(item) {
        localStorage.setItem('items', JSON.stringify([...items, item]));
        setListItems([...listItems, item]);
        setItems([...items, item])
    }

    function removeItem(item) {
        const updatedItems = items.filter(i => i.id != item.id);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        setItems(updatedItems)
    }

    function editItem(list) {
        const newLists = items.map(l => {
            if (l.id == list.id) {
                l.name = list.name
            }
            return l;
        });

        localStorage.setItem('items', JSON.stringify(newLists));
    }

    return (
        <>
            <h1>List page { list_id }</h1>
            <Table
                items={listItems}
                listId={list_id}
                onDelete={removeItem}
                onCreate={updateItemStorage} 
                onEdit={editItem}/>

            <button type="button">
                <Link to="run" state={listItems}>start</Link>
            </button>
        </>
    );
}