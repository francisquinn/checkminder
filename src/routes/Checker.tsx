import { ReactNode, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Entry, isCheckingItems } from "../features/core/coreSlice";
import { useDispatch } from "react-redux";

export function Checker() {
  const location = useLocation();
  const dispatch = useDispatch();
  const items: Entry[] = location.state;
  const [index, setIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Entry[]>([]);
  const [skippedItems, setSkippedItems] = useState<Entry[]>([]);

  useLayoutEffect(() => {
    dispatch(isCheckingItems(true));

    return () => {
      dispatch(isCheckingItems(false));
    }
  }, [])

  function checkItem(): void {
    shuffleItems(() => setCheckedItems([...checkedItems, items[index]]));
  }

  function skipItem(): void {
    shuffleItems(() => setSkippedItems([...skippedItems, items[index]]));
  }

  function shuffleItems(setItems: Function): void {
    setItems();

    if (index < items.length - 1) {
      setIndex(index + 1)
    }
    else {
      setIsFinished(true);
    }
  }

  function renderItem(): ReactNode {
    return !isFinished && <h2>{items[index].name}</h2>
  }

  function renderActions(): ReactNode {
    return !isFinished && (
      <>
        <button className="btn btn-secondary btn-checker" onClick={skipItem}>Skip</button>
        <button className="btn btn-primary btn-checker" onClick={checkItem}>Check</button>
      </>
    )
  }

  function renderResult(): ReactNode {
    const hasCheckedItems = checkedItems.length > 0;
    const hasSkippedItems = skippedItems.length > 0;

    return isFinished && (
      <>
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
      </>
    );
  }

  function renderBackLink(): ReactNode {
    return isFinished && <button className="btn btn-secondary" onClick={() => history.back()}>Back to list</button>;
  }

  return (
    <div className="checker-container">
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