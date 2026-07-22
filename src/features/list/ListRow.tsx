import { Link } from "react-router-dom";
import { Checklist, createList, updateList, deleteList } from "../core/coreSlice";
import { useDispatch } from "react-redux";
import { generateId } from "../../utils";
import { Row } from "./Row";

type ListRowProps = {
  item?: Checklist;
  onCreated?: () => void;
  onCancelCreate?: () => void;
  onEditingChange?: (isEditing: boolean) => void;
};

export function ListRow({ item, onCreated, onCancelCreate, onEditingChange }: ListRowProps) {
  const dispatch = useDispatch();

  return (
    <Row
      name={item?.name}
      isCreateMode={!item}
      renderLabel={(name) => <Link to={`/checkminder/${item!.id}`}>{name}</Link>}
      onCreate={(name) => {
        dispatch(createList({ id: generateId(), name }));
        onCreated?.();
      }}
      onUpdate={(name) => dispatch(updateList({ id: item!.id, name }))}
      onDelete={() => dispatch(deleteList(item))}
      onEditingChange={onEditingChange}
      onCancelCreate={onCancelCreate}
    />
  );
}
