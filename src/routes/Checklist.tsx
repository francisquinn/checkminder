import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectListById, selectListItems, setCurrentListId } from "../features/core/coreSlice";
import { List } from "../features/list/List";
import { ReactNode, useLayoutEffect } from "react";
import { RootState } from "../app/store";

export function Checklist() {
  const { listId } = useParams();
  const items = useSelector((state: RootState) => selectListItems(state, listId || ''));
  const list = useSelector((state: RootState) => selectListById(state, listId || ''));
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setCurrentListId(listId));

    return () => {
      dispatch(setCurrentListId(''));
    }
  }, [listId])

  function renderPlay(): ReactNode {
    return (items.length > 0) && (
      <Link className="btn btn-primary btn-icon-only-l" to="checker" state={items}> 
        <span className="icon icon-play"></span>
      </Link>
    )
  }

  return (
    <>
      <div className="list-header">
        <h1>{list?.name}</h1>
        {renderPlay()}
      </div>
      <List items={items}></List>
    </>
  );
}