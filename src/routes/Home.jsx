import { useState } from "react";
import { List } from "../components/List";

export function Home() {
    const [ lists, setLists ] = useState(JSON.parse(localStorage.getItem('lists')) ?? []);
    const [ items, setItems ] = useState(JSON.parse(localStorage.getItem('items')) ?? []);

    function updateListStorage(list) {
        localStorage.setItem('lists', JSON.stringify([...lists, list]));
        setLists([...lists, list]);
    }

    function removeList(list) {
        const updatedList = lists.filter(l => l.id != list.id);
        const updatedItems = items.filter(i => i.list_id != list.id);

        localStorage.setItem('lists', JSON.stringify(updatedList));
        localStorage.setItem('items', JSON.stringify(updatedItems));

        setLists(updatedList);
        setItems(updatedItems)
    }

    function editList(list) {
        const updatedList = lists.map(l => {
            if (l.id == list.id) {
                l.name = list.name
            }
            return l;
        });

        localStorage.setItem('lists', JSON.stringify(updatedList));
    }

    return (
        <>
            <div className="list-header">
                <h1>Checklists</h1>
            </div>
            <List 
                items={lists}
                onCreate={updateListStorage}
                onDelete={removeList}
                onEdit={editList} />
        </>
    );
}