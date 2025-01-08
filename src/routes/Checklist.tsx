import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectListById, selectListItems, setCurrentListId } from "../features/core/coreSlice";
import { List } from "../features/list/List";
import { useEffect } from "react";

export function Checklist() {
  const { listId } = useParams();
  const items = useSelector(state => selectListItems(state, listId));
  const list = useSelector(state => selectListById(state, listId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentListId(listId));

    return () => {
      dispatch(setCurrentListId(''));
    }
  }, [listId])

  function renderPlay() {
    // state={listItems}
    return (items.length > 0) && (
      <Link to="checker"> 
        <span className="icon icon-play"></span>
      </Link>
    )
  }

  return (
    <>
      <div className="list-header">
        <h1>{list.name}</h1>
        {renderPlay()}
      </div>
      <List items={items}></List>
    </>
  );
}