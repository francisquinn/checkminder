import { useEffect, useState } from "react";
import { Item } from "./Item";

export function List({ items, listId, onDelete, onCreate, onEdit }) {
    const [ listItems, setListItems ] = useState(items);

    useEffect(() => setListItems(items), [items]);

    function generateListId() {
        return Math.random().toString(36).substring(2, 7);
    }

    function create() {
        const item = {
            id: generateListId(),
            name: ''
        };

        if (listId) {
            item['list_id'] = listId;
        }

        setListItems([...listItems, item]);
    }

    return (
        <>
            { listItems.length == 0 ? (
                <p>no lists in storage :(</p>
            ) : (
                <ul className="list">
                    {listItems.map(item => 
                        <li key={item.id}>
                            <Item 
                                item={item} 
                                onEdit={onEdit} 
                                onDelete={onDelete} 
                                onCreate={onCreate} />
                        </li>
                    )}
                </ul>
            )}
            <button type="button" className="btn btn-create" onClick={create}>
                <span className="icon icon-plus"></span>
                Create item
            </button>
        </>
    );
}