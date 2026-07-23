import { CSSProperties, KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { useEditableRow } from "./useEditableRow";
import { DragHandleProps } from "./SortableRow";

const MIN_NAME_LENGTH = 3;

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
};

export function Row({ name: initialName, isCreateMode, renderLabel, onCreate, onUpdate, onDelete, onEditingChange, onCancelCreate, sortableRef, sortableStyle, dragHandleProps, isDragging }: RowProps) {
  const { inputRef, isEditing, setIsEditing, name, setName } = useEditableRow(initialName);
  const isInputActive = isEditing || isCreateMode;
  const [isValid, setIsValid] = useState(!isCreateMode);

  useEffect(() => {
    onEditingChange?.(isEditing);
  }, [isEditing]);

  useEffect(() => {
    if (isInputActive) {
      setIsValid((inputRef.current?.value.trim().length ?? 0) >= MIN_NAME_LENGTH);
    }
  }, [isInputActive]);

  function handleInputChange(): void {
    setIsValid((inputRef.current?.value.trim().length ?? 0) >= MIN_NAME_LENGTH);
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key !== 'Escape') return;
    if (isCreateMode) {
      onCancelCreate?.();
    } else {
      setIsEditing(false);
    }
  }

  function renderActions(): ReactNode {
    if (isCreateMode) {
      return (
        <>
          <button className="btn btn-primary" disabled={!isValid} onClick={() => {
            const value = inputRef.current?.value.trim() ?? '';
            if (value.length < MIN_NAME_LENGTH) return;
            onCreate(value);
          }}>Create</button>
          <button className="btn btn-icon-only" onClick={() => onCancelCreate?.()}>
            <span className="icon icon-close"></span>
          </button>
        </>
      );
    }

    if (isEditing) {
      return (
        <>
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
        </>
      );
    }

    return (
      <>
        <button className="btn btn-icon-only" onClick={() => setIsEditing(true)}>
          <span className="icon icon-edit"></span>
        </button>
        <button className="btn btn-icon-only" onClick={() => {
          if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
          onDelete();
        }}>
          <span className="icon icon-trash"></span>
        </button>
      </>
    );
  }

  return (
    <li className={`list-item${isDragging ? ' is-dragging' : ''}`} ref={sortableRef} style={sortableStyle}>
      {!isInputActive && dragHandleProps && (
        <button
          type="button"
          className="btn btn-icon-only drag-handle"
          ref={dragHandleProps.ref}
          {...dragHandleProps.attributes}
          {...dragHandleProps.listeners}
          aria-label="Reorder"
        >
          <span className="icon icon-grip"></span>
        </button>
      )}
      {!isInputActive && renderLabel(name)}
      {isInputActive && <input type="text" autoFocus ref={inputRef} defaultValue={isEditing ? name : ''} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />}
      <div className="list-actions">
        {renderActions()}
      </div>
    </li>
  );
}
