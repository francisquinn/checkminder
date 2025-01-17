import { useDispatch, useSelector } from "react-redux";
import { isCreatingList } from "../core/coreSlice";
import { RootState } from "../../app/store";
import { Item } from "./Item";
import { ReactNode } from "react";
import { selectIsCreating } from "../core/coreSlice";

export function Create() {
  const isCreating = useSelector(selectIsCreating);
  const dispatch = useDispatch();

  function renderCreateButton(): ReactNode {
    return !isCreating && (
      <button className="btn btn-secondary btn-create" onClick={() => dispatch(isCreatingList(true))}>
        <span className="icon icon-plus"></span>
        Create item
      </button>
    );
  }

  function renderItemInput(): ReactNode {
    return isCreating && <Item></Item>;
  }

  return (
    <>
      {renderCreateButton()}
      {renderItemInput()}
    </>
  );
}