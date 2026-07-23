import { CSSProperties, ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type DragHandleProps = {
  ref: (node: HTMLElement | null) => void;
  attributes: ReturnType<typeof useSortable>['attributes'];
  listeners: ReturnType<typeof useSortable>['listeners'];
};

export type SortableRenderProps = {
  sortableRef: (node: HTMLElement | null) => void;
  sortableStyle: CSSProperties;
  dragHandleProps: DragHandleProps;
  isDragging: boolean;
};

type SortableRowProps = {
  id: string;
  disabled: boolean;
  children: (props: SortableRenderProps) => ReactNode;
};

export function SortableRow({ id, disabled, children }: SortableRowProps) {
  const { setNodeRef, setActivatorNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id, disabled });

  return children({
    sortableRef: setNodeRef,
    sortableStyle: { transform: CSS.Transform.toString(transform), transition },
    dragHandleProps: { ref: setActivatorNodeRef, attributes, listeners },
    isDragging,
  });
}
