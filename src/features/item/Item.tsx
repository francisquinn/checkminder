import { Link } from "react-router-dom";
import { 
  List, 
  updateList, 
  updateItem,
  createList, 
  createItem, 
  deleteList, 
  deleteItem,
  isCreatingList 
} from "../core/coreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { generateId } from "../../utils";
import { RootState } from "../../app/store";

type ItemProps = {
  item?: List
};

export function Item({ item }: ItemProps) {
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();
  const isListItem = !!core.currentListId;
  const itemRef = useRef<HTMLInputElement>(null);
  const [isCreating, setIsCreating] = useState<boolean>(core.isCreating);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [itemValue, setItemValue] = useState<string | undefined>(item?.name);

  function renderItemLink() {
    return (!isCreating && !isEditing) && (
      <>
        {renderItemLinkText()}
        <div className="list-actions">
          <span onClick={() => {
            setIsEditing(true);
          }}>edit</span>
          |
          <span onClick={() => {
            if (isListItem) {
              dispatch(deleteItem(item))
            } else {
              dispatch(deleteList(item));
            }
          }}>delete</span>
        </div>
      </>
    );
  }

  function renderItemCreate() {
    return (isCreating && !isEditing) && (
      <>
        <input type="text" autoFocus ref={itemRef} />
        <div className="list-actions">
          <button className="btn btn-primary" onClick={() => {
            setIsCreating(false);

            if (isListItem) {
              console.log('create item')
              dispatch(createItem({ id: generateId(), name: itemRef.current?.value, list_id: core.currentListId }));
            } else {
              dispatch(createList({ id: generateId(), name: itemRef.current?.value }));
            }

            dispatch(isCreatingList(false));
          }}>Create</button>
        </div>
      </>
    )
  }

  function renderItemEdit() {
    return isEditing && (
      <>
        <input type="text" autoFocus ref={itemRef} defaultValue={itemValue} />
        <div className="list-actions">
          <button className="btn btn-primary" onClick={() => {
            setItemValue(itemRef.current?.value);
            setIsEditing(false);
            if (isListItem) {
              dispatch(updateItem({ id: item?.id, name: itemRef.current?.value, list_id: core.currentListId }));
            } else {
              dispatch(updateList({ id: item?.id, name: itemRef.current?.value }));
            }
          }}>Done</button>
        </div>
      </>
    );
  }

  function renderItemLinkText() {
    return !isListItem ? <Link to={`/checkminder/${item?.id}`}>{itemValue}</Link> : <span>{itemValue}</span>
  }

  return (
    <>
      <li className="list-item">
        {renderItemLink()}
        {renderItemCreate()}
        {renderItemEdit()}
      </li>
    </>
  )
}