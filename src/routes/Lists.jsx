import { useState } from "react";
import { List } from "../components/List";

export function Lists() {
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')) ?? []);

    function updateListStorage(list) {
        localStorage.setItem('lists', JSON.stringify([...lists, list]));
        setLists([...lists, list]);
    }

    return (
        <>
            <h1>Checklists</h1>
            <List 
                items={lists} 
                onCreate={updateListStorage} />
        </>
    );
}