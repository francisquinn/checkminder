import { ListRow } from "./ListRow";
import { ItemRow } from "./ItemRow";
import { Create } from "./Create";
import { Checklist, ChecklistItem } from "../core/coreSlice";
import { ReactNode, useEffect, useState } from "react";

type ListProps = {
  items: Checklist[] | ChecklistItem[];
  type: 'list' | 'item';
  onBusyChange?: (isBusy: boolean) => void;
};

export function List({ items, type, onBusyChange }: ListProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    onBusyChange?.(isCreating || editingIds.size > 0);
  }, [isCreating, editingIds]);

  function handleEditingChange(id: string, isEditing: boolean): void {
    setEditingIds(prev => {
      const next = new Set(prev);
      isEditing ? next.add(id) : next.delete(id);
      return next;
    });
  }

  function renderItems(): ReactNode {
    if (items.length === 0) {
      return isCreating ? null : <p>This list has no items :(</p>;
    }
    return (
      <ul className="list">
        {type === 'list'
          ? (items as Checklist[]).map(item => <ListRow key={item.id} item={item} onEditingChange={(isEditing) => handleEditingChange(item.id, isEditing)} />)
          : (items as ChecklistItem[]).map(item => <ItemRow key={item.id} item={item} onEditingChange={(isEditing) => handleEditingChange(item.id, isEditing)} />)
        }
      </ul>
    );
  }

  return (
    <>
      {renderItems()}
      <Create type={type} isCreating={isCreating} onToggle={setIsCreating} />
    </>
  );
}
