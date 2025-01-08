import { Item } from "../item/Item";
import { Create } from "../item/Creare";

export function List({ items }) {
  return (
    <>
      <ul className="list">
        {items.map((item) =>
          <Item key={item.id} item={item}></Item>
        )}
      </ul>
      <Create></Create> 
    </>
  );
}