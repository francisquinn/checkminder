import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { useRef, useState } from "react";

export function Lists() {
    const createInput = useRef();
    const [lists, setLists] = useState(JSON.parse(localStorage.getItem('lists')));

    function createListItem(event) {
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

        if (!lists) {
            updateListStorage([item]);
        }
        else {
            updateListStorage([...lists, item]);
        }

        createInput.current.value = '';
    }

    function updateListStorage(list) {
        localStorage.setItem('lists', JSON.stringify(list));
        setLists(list);
    }

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    // TODO remove after dev
    function clearStorage() {
        localStorage.removeItem('lists');
        setLists(null);
    }

    return (
        <>
            <h1>Checklists</h1>
            { !lists ? (
                <p>no lists in storage</p>
            ) : (
                <ul>
                    {lists.map(list => 
                        <li key={list.id}>
                            <Link to={`lists/${list.id}`}>{list.name}</Link>
                        </li>
                    )}
                </ul>
            )}
            <form action="/" onSubmit={createListItem}>
                <input type="text" ref={createInput} />
                <Button text="create" type="submit"></Button>
            </form>
            <Button text="clear storage" onClick={clearStorage}></Button>
        </>
    );
}