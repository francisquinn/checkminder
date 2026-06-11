import { Item } from "./Item";
import { Create } from "./Create";
import { Checklist, ChecklistItem } from "../core/coreSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectIsCreating } from "../core/coreSlice";

type ListProps = {
  items: Checklist[] | ChecklistItem[]
};

export function List({ items }: ListProps) {
  const isCreating = useSelector(selectIsCreating);

  function renderItems(): ReactNode {
    return items.length > 0 ? (
      <ul className="list">
        {items.map((item) =>
          <Item key={item.id} item={item}></Item>
        )}
      </ul>
    ) : (
      renderEmptyList()
    );
  }

  function renderEmptyList(): ReactNode {
    if (!isCreating) {
      return <p>This list has no items :(</p>;
    }
  }

  return (
    <>
      {renderItems()}
      <Create></Create>
    </>
  );
}