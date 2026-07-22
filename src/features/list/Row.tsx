import { KeyboardEvent, ReactNode, useEffect, useState } from "react";
import { useEditableRow } from "./useEditableRow";

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
};

export function Row({ name: initialName, isCreateMode, renderLabel, onCreate, onUpdate, onDelete, onEditingChange, onCancelCreate }: RowProps) {
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
    if (e.key === 'Escape' && isCreateMode) {
      onCancelCreate?.();
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
        <button className="btn btn-primary" disabled={!isValid} onClick={() => {
          const value = inputRef.current?.value.trim() ?? '';
          if (value.length < MIN_NAME_LENGTH) return;
          setName(value);
          setIsEditing(false);
          onUpdate(value);
        }}>Done</button>
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
    <li className="list-item">
      {!isInputActive && renderLabel(name)}
      {isInputActive && <input type="text" autoFocus ref={inputRef} defaultValue={isEditing ? name : ''} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />}
      <div className="list-actions">
        {renderActions()}
      </div>
    </li>
  );
}
