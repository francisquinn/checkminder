import { useState } from "react";
import { List } from "../components/List";

export function Lists() {
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) ?? []);
    const [items] = useState(JSON.parse(localStorage.getItem('items')) ?? []);

    function updateListStorage(list) {
        localStorage.setItem('lists', JSON.stringify([...lists, list]));
        setLists([...lists, list]);
    }

    function removeList(list) {
        const updatedList = lists.filter(l => l.id != list.id);
        const updatedItems = items.filter(i => i.list_id != list.id);

        localStorage.setItem('lists', JSON.stringify(updatedList));
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }

    return (
        <>
            <h1>Checklists</h1>
            <List 
                items={lists} 
                onCreate={updateListStorage}
                onDelete={removeList} />
        </>
    );
}