import { useDispatch, useSelector } from "react-redux";
import { isCreatingList } from "../core/coreSlice";
import { RootState } from "../../app/store";
import { Item } from "./Item";

export function Create() {
  const listState = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  function renderCreateButton() {
    return !listState.isCreating && (
      <button className="btn btn-secondary btn-create" onClick={() => dispatch(isCreatingList(true))}>
        <span className="icon icon-plus"></span>
        Create item
      </button>
    );
  }

  function renderItemInput() {
    return listState.isCreating && <Item></Item>;
  }

  return (
    <>
      {renderCreateButton()}
      {renderItemInput()}
    </>
  );
}