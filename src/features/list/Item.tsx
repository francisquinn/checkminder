import { Link } from "react-router-dom";
import {
  Entry,
  updateList,
  updateItem,
  createList,
  createItem,
  deleteList,
  deleteItem,
  isCreatingList,
  selectCore
} from "../core/coreSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactNode, useRef, useState } from "react";
import { generateId } from "../../utils";

type ItemProps = {
  item?: Entry
};

export function Item({ item }: ItemProps) {
  const core = useSelector(selectCore);
  const dispatch = useDispatch();
  const isListItem = !!core.currentListId;
  const itemRef = useRef<HTMLInputElement>(null);
  const [isCreating, setIsCreating] = useState<boolean>(core.isCreating);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [itemValue, setItemValue] = useState<string | undefined>(item?.name);

  function renderEditRemove() {
    return (!isEditing && !isCreating) && (
      <>
        <button className="btn btn-icon-only" onClick={() => {
          setIsEditing(true);
        }}>
          <span className="icon icon-edit"></span>
        </button>
        <button className="btn btn-icon-only" onClick={() => {
          if (!window.confirm(`Are you sure you want to delete ${item?.name}?`)) return;

          if (isListItem) {
            dispatch(deleteItem(item))
          } else {
            dispatch(deleteList(item));
          }
        }}>
          <span className="icon icon-trash"></span>
        </button>
      </>
    )
  }

  function renderCreateButton() {
    return isCreating && (
      <button className="btn btn-primary" onClick={() => {
        setIsCreating(false);
        dispatch(isCreatingList(false));

        if (isListItem) {
          dispatch(createItem({ id: generateId(), name: itemRef.current?.value, list_id: core.currentListId }));
        } else {
          dispatch(createList({ id: generateId(), name: itemRef.current?.value }));
        }
      }}>Create</button>
    )
  }

  function renderItemEdit() {
    return isEditing && (
      <button className="btn btn-primary" onClick={() => {
        setItemValue(itemRef.current?.value);
        setIsEditing(false);

        if (isListItem) {
          dispatch(updateItem({ id: item?.id, name: itemRef.current?.value, list_id: core.currentListId }));
        } else {
          dispatch(updateList({ id: item?.id, name: itemRef.current?.value }));
        }
      }}>Done</button>
    );
  }

  function renderInput(): ReactNode {
    return isInputActive() && <input type="text" autoFocus ref={itemRef} defaultValue={isEditing ? itemValue : ''} />;
  }

  function renderItemLinkText(): ReactNode {
    if (!isInputActive()) {
      return !isListItem ? <Link to={`/checkminder/${item?.id}`}>{itemValue}</Link> : <span>{itemValue}</span>
    }
  }

  function isInputActive(): boolean {
    return isEditing || isCreating;
  }

  return (
    <>
      <li className="list-item">
        {renderItemLinkText()}
        {renderInput()}

        <div className="list-actions">
          {renderEditRemove()}
          {renderCreateButton()}
          {renderItemEdit()}
        </div>
      </li>
    </>
  )
}