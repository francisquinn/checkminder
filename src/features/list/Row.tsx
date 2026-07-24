import { CSSProperties, KeyboardEvent, MouseEvent, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useEditableRow } from "./useEditableRow";
import { DragHandleProps } from "./SortableRow";

const MIN_NAME_LENGTH = 3;
const SWIPE_OPEN_THRESHOLD = 0.4;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

type RowProps = {
  name?: string;
  isCreateMode: boolean;
  renderLabel: (name?: string) => ReactNode;
  onCreate: (name: string) => void;
  onUpdate: (name: string) => void;
  onDelete: () => void;
  onEditingChange?: (isEditing: boolean) => void;
  onCancelCreate?: () => void;
  sortableRef?: (node: HTMLElement | null) => void;
  sortableStyle?: CSSProperties;
  dragHandleProps?: DragHandleProps;
  isDragging?: boolean;
  isSwipeOpen?: boolean;
  onSwipeOpenChange?: (isOpen: boolean) => void;
  isEntering?: boolean;
  onEnterAnimationEnd?: () => void;
};

export function Row({ name: initialName, isCreateMode, renderLabel, onCreate, onUpdate, onDelete, onEditingChange, onCancelCreate, sortableRef, sortableStyle, dragHandleProps, isDragging, isSwipeOpen, onSwipeOpenChange, isEntering, onEnterAnimationEnd }: RowProps) {
  const { inputRef, isEditing, setIsEditing, name, setName } = useEditableRow(initialName);
  const [isValid, setIsValid] = useState(!isCreateMode);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [actionsWidth, setActionsWidth] = useState(0);
  const [dragX, setDragX] = useState<number | null>(null);
  const suppressNextClickRef = useRef(false);
  const [isCreateLeaving, setIsCreateLeaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const pendingCloseActionRef = useRef<(() => void) | null>(null);

  function closeCreate(action: () => void): void {
    pendingCloseActionRef.current = action;
    setIsCreateLeaving(true);
  }

  function handleCreateRowAnimationEnd(): void {
    if (!isCreateLeaving) return;
    setIsCreateLeaving(false);
    pendingCloseActionRef.current?.();
    pendingCloseActionRef.current = null;
  }

  useEffect(() => {
    onEditingChange?.(isEditing);
  }, [isEditing]);

  useLayoutEffect(() => {
    setActionsWidth(actionsRef.current?.offsetWidth ?? 0);
  }, []);

  useLayoutEffect(() => {
    if (!isEditing || !inputRef.current) return;
    inputRef.current.value = name ?? '';
    inputRef.current.focus();
    inputRef.current.select();
    setIsValid((name?.trim().length ?? 0) >= MIN_NAME_LENGTH);
  }, [isEditing]);

  const restX = isSwipeOpen ? -actionsWidth : 0;
  const displayX = dragX ?? restX;

  const bindSwipe = useDrag(({ active, last, movement: [mx], cancel }) => {
    if (isEditing || !actionsWidth) {
      cancel();
      return;
    }
    const next = clamp(restX + mx, -actionsWidth, 0);
    if (last) {
      if (mx !== 0) suppressNextClickRef.current = true;
      onSwipeOpenChange?.(next <= -actionsWidth * SWIPE_OPEN_THRESHOLD);
      setDragX(null);
    } else if (active) {
      setDragX(next);
    }
  }, { axis: 'x', filterTaps: true });

  function handleContentClick(e: MouseEvent): void {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!isSwipeOpen) return;
    e.preventDefault();
    e.stopPropagation();
    onSwipeOpenChange?.(false);
  }

  function handleInputChange(): void {
    setIsValid((inputRef.current?.value.trim().length ?? 0) >= MIN_NAME_LENGTH);
  }

  function handleRowAnimationEnd(): void {
    onEnterAnimationEnd?.();
    if (isDeleting) {
      onDelete();
    }
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key !== 'Escape') return;
    if (isCreateMode) {
      closeCreate(() => onCancelCreate?.());
    } else {
      setIsEditing(false);
    }
  }

  if (isCreateMode) {
    return (
      <li
        className={`list-item is-create-row${isCreateLeaving ? ' is-leaving' : ''}`}
        ref={sortableRef}
        style={sortableStyle}
        onAnimationEnd={handleCreateRowAnimationEnd}
      >
        <input type="text" autoFocus ref={inputRef} defaultValue="" onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
        <div className="list-actions">
          <button className="btn btn-primary" disabled={!isValid} onClick={() => {
            const value = inputRef.current?.value.trim() ?? '';
            if (value.length < MIN_NAME_LENGTH) return;
            closeCreate(() => onCreate(value));
          }}>Create</button>
          <button className="btn btn-icon-only" onClick={() => closeCreate(() => onCancelCreate?.())}>
            <span className="icon icon-close"></span>
          </button>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`list-item is-swipeable${isDragging ? ' is-dragging' : ''}${isEditing ? ' is-editing' : ''}${isEntering ? ' is-entering' : ''}${isDeleting ? ' is-leaving' : ''}`}
      ref={sortableRef}
      style={sortableStyle}
      onAnimationEnd={handleRowAnimationEnd}
    >
      <div className="list-item-edit">
        <input type="text" ref={inputRef} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
        <div className="list-actions">
          <button className="btn btn-primary" disabled={!isValid} onClick={() => {
            const value = inputRef.current?.value.trim() ?? '';
            if (value.length < MIN_NAME_LENGTH) return;
            setName(value);
            setIsEditing(false);
            onUpdate(value);
          }}>Done</button>
          <button className="btn btn-icon-only" onClick={() => setIsEditing(false)}>
            <span className="icon icon-close"></span>
          </button>
        </div>
      </div>
      <div className="list-actions" ref={actionsRef}>
        <button className="btn btn-default btn-compact" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger btn-compact" onClick={() => {
          if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
          setIsDeleting(true);
        }}>
          Delete
        </button>
      </div>
      <div
        className="list-item-content"
        {...bindSwipe()}
        onClickCapture={handleContentClick}
        style={{ transform: `translateX(${displayX}px)`, transition: dragX === null ? 'transform 0.2s ease-out' : 'none' }}
      >
        {dragHandleProps && (
          <button
            type="button"
            className="btn btn-icon-only drag-handle"
            ref={dragHandleProps.ref}
            {...dragHandleProps.attributes}
            {...dragHandleProps.listeners}
            onPointerDownCapture={(e) => e.stopPropagation()}
            aria-label="Reorder"
          >
            <span className="icon icon-grip"></span>
          </button>
        )}
        {renderLabel(name)}
      </div>
    </li>
  );
}
