import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { List } from "../components/List";

export function Item() {
    const { list_id } = useParams();
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) ?? []);
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        const newItems = items.filter(item => item.list_id == list_id);
        setListItems(newItems);
    }, []);

    function updateItemStorage(items) {
        localStorage.setItem('items', JSON.stringify(items));
        setItems(items);
    }

    // function updateItemsStorage(l) {
    //     setListItems(l);
    // }

    return (
        <>
            <h1>List page { list_id }</h1>
            <List
                items={listItems}
                onCreate={updateItemStorage}/>
            {/* { listItems.length == 0 ? (
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
            <Link to='run' state={listItems}><Button text="start"></Button></Link> */}
        </>
    )
}