import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { List } from "../components/List";

export function Item() {
    const { list_id } = useParams();
    const [ items ] = useState(JSON.parse(localStorage.getItem('items')) ?? []);
    const [ listItems, setListItems ] = useState([]);

    useEffect(() => {
        const currentItems = items.filter(item => item.list_id == list_id);
        setListItems(currentItems);
    }, []);

    function updateItemStorage(item) {
        localStorage.setItem('items', JSON.stringify([...items, item]));
        setListItems([...listItems, item]);
    }

    function removeItem(item) {
        const nits = items.filter(i => i.id != item.id);
        localStorage.setItem('items', JSON.stringify(nits));
    }

    function editItem(list) {
        localStorage.setItem('items', JSON.stringify(items));
    }

    return (
        <>
            <h1>List page { list_id }</h1>
            <List
                items={listItems}
                listId={list_id}
                onDelete={removeItem}
                onCreate={updateItemStorage} 
                onEdit={editItem}/>
        </>
    );
}