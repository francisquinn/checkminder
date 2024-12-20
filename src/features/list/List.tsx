import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { List } from "./listSlice";
import { ReactElement } from "react";

export function ListRdx() {
  const lists = useSelector((state: RootState) => state.list.lists);

  return (
    <>
      <h2>lists</h2>
      {lists.map((list): ReactElement<List> => 
        <p key={list.id}>{list.name}</p>
      )}
    </>
  );
}