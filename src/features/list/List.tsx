import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { List } from "./listSlice";
import { ReactElement } from "react";
import { ItemRdx } from "../item/Item";
import { Create } from "../item/Creare";

export function ListRdx() {
  const listState = useSelector((state: RootState) => state.list);

  return (
    <>
      <ul className="list">
        {listState.lists.map((list: List): ReactElement =>
          <ItemRdx key={list.id} item={list}></ItemRdx>
        )}
      </ul>     

      <Create></Create> 
    </>
  );
}