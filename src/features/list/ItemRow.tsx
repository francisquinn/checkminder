import { ChecklistItem, createItem, updateItem, deleteItem, selectCore } from "../core/coreSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateId } from "../../utils";
import { Row } from "./Row";

type ItemRowProps = {
  item?: ChecklistItem;
  onCreated?: () => void;
  onCancelCreate?: () => void;
  onEditingChange?: (isEditing: boolean) => void;
};

export function ItemRow({ item, onCreated, onCancelCreate, onEditingChange }: ItemRowProps) {
  const core = useSelector(selectCore);
  const dispatch = useDispatch();

  return (
    <Row
      name={item?.name}
      isCreateMode={!item}
      renderLabel={(name) => <span>{name}</span>}
      onCreate={(name) => {
        dispatch(createItem({ id: generateId(), name, list_id: core.currentListId }));
        onCreated?.();
      }}
      onUpdate={(name) => dispatch(updateItem({ id: item!.id, name, list_id: item!.list_id }))}
      onDelete={() => dispatch(deleteItem(item))}
      onEditingChange={onEditingChange}
      onCancelCreate={onCancelCreate}
    />
  );
}
