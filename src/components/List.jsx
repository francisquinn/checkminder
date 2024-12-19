import { useLayoutEffect, useState } from "react";
import { Item } from "./Item";

export function List({ items, listId, onDelete, onCreate, onEdit }) {
  const [listItems, setListItems] = useState(items);
  const [isCreating, setIsCreating] = useState(false);

  useLayoutEffect(() => setListItems(items), [items]);

  function generateListId() {
    return Math.random().toString(36).substring(2, 7);
  }

  function createItem() {
    const item = {
      id: generateListId(),
      name: ''
    };

    if (listId) {
      item['list_id'] = listId;
    }

    setIsCreating(true);
    setListItems([...listItems, item]);
  }

  function renderEmptyState() {
    return listItems.length == 0 ? (
      <p>no lists in storage :(</p>
    ) : '';
  }

  function renderList() {
    return listItems.length > 0 ? (
      <ul className="list">
        {listItems.map(item =>
          <li key={item.id}>
            <Item
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onCreate={onCreate}
              handleCreate={setIsCreating} />
          </li>
        )}
      </ul>
    ) : '';
  }

  function renderCreate() {
    return !isCreating ? (
      <button className="btn btn-secondary btn-create" onClick={createItem}>
        <span className="icon icon-plus"></span>
        Create item
      </button>
    ) : '';
  }

  return (
    <>
      {renderEmptyState()}
      {renderList()}
      {renderCreate()}
    </>
  );
}