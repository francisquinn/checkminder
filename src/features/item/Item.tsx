import { Link } from "react-router-dom";
import { List } from "../list/listSlice";
import { create } from "../list/listSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { generateId } from "../../utils";

type ItemRdxProps = {
  item?: List,
  isCreating?: boolean
};

export function ItemRdx({ item, isCreating = false }: ItemRdxProps) {
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLInputElement>(null);

  function renderItemLink() {
    return !isCreating && <Link to={`/checkminder/${item?.id}`}>{item?.name}</Link>;
  }

  function renderItemCreate() {
    return isCreating && (
      <>
        <input type="text" autoFocus ref={itemRef} />
        <div className="list-actions">
          <button className="btn btn-primary" onClick={() => dispatch(create({ id: generateId(), name: itemRef.current?.value }))}>Create</button>
        </div>
      </>
    )
  }

 

  return (
    <>
      <li className="list-item">
        {renderItemLink()}
        {renderItemCreate()}
      </li>
    </>
  )
}