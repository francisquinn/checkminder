import { ListRow } from "./ListRow";
import { ItemRow } from "./ItemRow";
import { Create } from "./Create";
import { SortableRow } from "./SortableRow";
import { Checklist, ChecklistItem, reorderItems, reorderLists } from "../core/coreSlice";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type ListProps = {
  items: Checklist[] | ChecklistItem[];
  type: 'list' | 'item';
  onBusyChange?: (isBusy: boolean) => void;
};

const MOUSE_ACTIVATION_CONSTRAINT = { distance: 8 };
const TOUCH_ACTIVATION_CONSTRAINT = { delay: 250, tolerance: 5 };

export function List({ items, type, onBusyChange }: ListProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set());
  const isBusy = isCreating || editingIds.size > 0;
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: MOUSE_ACTIVATION_CONSTRAINT }),
    useSensor(TouchSensor, { activationConstraint: TOUCH_ACTIVATION_CONSTRAINT }),
  );

  useEffect(() => {
    onBusyChange?.(isBusy);
  }, [isCreating, editingIds]);

  function handleEditingChange(id: string, isEditing: boolean): void {
    setEditingIds(prev => {
      const next = new Set(prev);
      isEditing ? next.add(id) : next.delete(id);
      return next;
    });
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const payload = { activeId: String(active.id), overId: String(over.id) };
    dispatch(type === 'list' ? reorderLists(payload) : reorderItems(payload));
  }

  function renderItems(): ReactNode {
    if (items.length === 0) {
      return isCreating ? null : <p>This list has no items :(</p>;
    }
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <ul className="list">
            {type === 'list'
              ? (items as Checklist[]).map(item => (
                  <SortableRow key={item.id} id={item.id} disabled={isBusy}>
                    {(sortableProps) => <ListRow item={item} onEditingChange={(isEditing) => handleEditingChange(item.id, isEditing)} {...sortableProps} />}
                  </SortableRow>
                ))
              : (items as ChecklistItem[]).map(item => (
                  <SortableRow key={item.id} id={item.id} disabled={isBusy}>
                    {(sortableProps) => <ItemRow item={item} onEditingChange={(isEditing) => handleEditingChange(item.id, isEditing)} {...sortableProps} />}
                  </SortableRow>
                ))
            }
          </ul>
        </SortableContext>
      </DndContext>
    );
  }

  return (
    <>
      {renderItems()}
      <Create type={type} isCreating={isCreating} onToggle={setIsCreating} />
    </>
  );
}
