import { List } from '../features/list/List';
import { useSelector } from 'react-redux';
import { selectLists } from '../features/core/coreSlice';

export function Home() {
  const lists = useSelector(selectLists);
  return (
    <>
      <div className="list-header">
        <h1>Checklists</h1>
      </div>
      <List items={lists}></List>
    </>
  );
}