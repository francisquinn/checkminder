import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Checklist, createList, updateList, deleteList } from "../core/coreSlice";
import { useDispatch } from "react-redux";
import { generateId } from "../../utils";
import { Row } from "./Row";
import { DragHandleProps } from "./SortableRow";

type ListRowProps = {
  item?: Checklist;
  onCreated?: () => void;
  onCancelCreate?: () => void;
  onEditingChange?: (isEditing: boolean) => void;
  sortableRef?: (node: HTMLElement | null) => void;
  sortableStyle?: CSSProperties;
  dragHandleProps?: DragHandleProps;
  isDragging?: boolean;
  isSwipeOpen?: boolean;
  onSwipeOpenChange?: (isOpen: boolean) => void;
  isEntering?: boolean;
  onEnterAnimationEnd?: () => void;
};

export function ListRow({ item, onCreated, onCancelCreate, onEditingChange, sortableRef, sortableStyle, dragHandleProps, isDragging, isSwipeOpen, onSwipeOpenChange, isEntering, onEnterAnimationEnd }: ListRowProps) {
  const dispatch = useDispatch();

  return (
    <Row
      name={item?.name}
      isCreateMode={!item}
      renderLabel={(name) => <Link className="list-item-label" to={`/checkminder/${item!.id}`} draggable={false}>{name}</Link>}
      onCreate={(name) => {
        dispatch(createList({ id: generateId(), name }));
        onCreated?.();
      }}
      onUpdate={(name) => dispatch(updateList({ id: item!.id, name }))}
      onDelete={() => dispatch(deleteList(item))}
      onEditingChange={onEditingChange}
      onCancelCreate={onCancelCreate}
      sortableRef={sortableRef}
      sortableStyle={sortableStyle}
      dragHandleProps={dragHandleProps}
      isDragging={isDragging}
      isSwipeOpen={isSwipeOpen}
      onSwipeOpenChange={onSwipeOpenChange}
      isEntering={isEntering}
      onEnterAnimationEnd={onEnterAnimationEnd}
    />
  );
}
