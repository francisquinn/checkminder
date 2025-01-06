import { useDispatch, useSelector } from "react-redux";
import { isCreating } from "../list/listSlice";
import { RootState } from "../../app/store";
import { ItemRdx } from "./Item";

export function Create () {
  const listState = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();

  function renderCreateButton() {
    return !listState.isCreating && (      
        <button className="btn btn-secondary btn-create" onClick={() => dispatch(isCreating())}>
          <span className="icon icon-plus"></span>
          Create item
        </button>
    );
  }

  function renderItemInput() {
    return listState.isCreating && <ItemRdx isCreating={listState.isCreating}></ItemRdx>;
  }

  return (
    <>
      {renderCreateButton()}
      {renderItemInput()}
    </>
  );
}