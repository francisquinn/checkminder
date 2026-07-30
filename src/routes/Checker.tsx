import { ReactNode, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { ChecklistItem } from "../features/core/coreSlice";

type ItemTransition = 'none' | 'leave-left' | 'leave-right' | 'enter-left' | 'enter-right';

export function Checker() {
  const location = useLocation();
  const { listId } = useParams();
  const items: ChecklistItem[] = location.state;
  const hasItems = Array.isArray(items) && items.length > 0;
  const [index, setIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<ChecklistItem[]>([]);
  const [skippedItems, setSkippedItems] = useState<ChecklistItem[]>([]);
  const [itemTransition, setItemTransition] = useState<ItemTransition>('none');
  const [pendingResult, setPendingResult] = useState<'check' | 'skip' | null>(null);

  if (!hasItems) {
    return <Navigate to={listId ? `/checkminder/${listId}` : "/checkminder/"} replace />;
  }

  function checkItem(): void {
    if (itemTransition !== 'none') return;
    setPendingResult('check');
    setItemTransition('leave-right');
  }

  function skipItem(): void {
    if (itemTransition !== 'none') return;
    setPendingResult('skip');
    setItemTransition('leave-left');
  }

  function handleItemAnimationEnd(e: React.AnimationEvent<HTMLHeadingElement>): void {
    e.stopPropagation();

    if (itemTransition === 'leave-left' || itemTransition === 'leave-right') {
      if (pendingResult === 'check') {
        setCheckedItems(prev => [...prev, items[index]]);
      } else if (pendingResult === 'skip') {
        setSkippedItems(prev => [...prev, items[index]]);
      }

      const enterFrom = itemTransition === 'leave-right' ? 'enter-left' : 'enter-right';
      setPendingResult(null);

      if (index < items.length - 1) {
        setIndex(prev => prev + 1);
        setItemTransition(enterFrom);
      } else {
        setIsFinished(true);
        setItemTransition('none');
      }
    } else {
      setItemTransition('none');
    }
  }

  function renderProgress(): ReactNode {
    return !isFinished && (
      <div className="checker-progress">{index + 1} / {items.length}</div>
    );
  }

  function renderItem(): ReactNode {
    return !isFinished && (
      <h2
        key={index}
        className={`checker-item${itemTransition !== 'none' ? ' ' + itemTransition : ''}`}
        onAnimationEnd={handleItemAnimationEnd}
      >
        {items[index].name}
      </h2>
    );
  }

  function renderActions(): ReactNode {
    return !isFinished && (
      <>
        <button className="btn btn-primary btn-checker" onClick={skipItem}>Skip</button>
        <button className="btn btn-secondary btn-checker" onClick={checkItem}>Check</button>
      </>
    )
  }

  function renderResult(): ReactNode {
    const hasCheckedItems = checkedItems.length > 0;
    const hasSkippedItems = skippedItems.length > 0;

    return isFinished && (
      <div className="checker-result fade-in">
        {hasCheckedItems && (
          <>
            <h3>Checked</h3>
            <ul>
              {checkedItems.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </>
        )}
  
        {hasSkippedItems && (
          <>
            <h3>Skipped</h3>
            <ul>
              {skippedItems.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  function renderBackLink(): ReactNode {
    return isFinished && <button className="btn btn-secondary" onClick={() => history.back()}>Back to list</button>;
  }

  return (
    <div className="checker-container">
      {renderProgress()}
      <div className="checker-items">
        {renderItem()}
        {renderResult()}
      </div>
      <div className="checker-actions">
        {renderActions()}
        {renderBackLink()}
      </div>
    </div>
  );
}