import { ListRow } from "./ListRow";
import { ItemRow } from "./ItemRow";
import { ReactNode, useEffect, useRef } from "react";

type CreateProps = {
  type: 'list' | 'item';
  isCreating: boolean;
  onToggle: (val: boolean) => void;
};

export function Create({ type, isCreating, onToggle }: CreateProps) {
  const wasCreatingRef = useRef(isCreating);
  const justClosed = wasCreatingRef.current && !isCreating;

  useEffect(() => {
    wasCreatingRef.current = isCreating;
  }, [isCreating]);

  function renderCreateButton(): ReactNode {
    return !isCreating && (
      <button className={`btn btn-secondary btn-create${justClosed ? ' is-entering' : ''}`} onClick={() => onToggle(true)}>
        <span className="icon icon-plus"></span>
        Add item
      </button>
    );
  }

  function renderCreateForm(): ReactNode {
    if (!isCreating) return null;
    return type === 'list'
      ? <ListRow onCreated={() => onToggle(false)} onCancelCreate={() => onToggle(false)} />
      : <ItemRow onCreated={() => onToggle(false)} onCancelCreate={() => onToggle(false)} />;
  }

  return (
    <>
      {renderCreateButton()}
      {renderCreateForm()}
    </>
  );
}
