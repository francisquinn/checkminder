import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectListById, selectListItems, setCurrentListId } from "../features/core/coreSlice";
import { List } from "../features/list/List";
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { RootState } from "../app/store";
import { setTransitionOrigin } from "../features/transitionOrigin";

export function Checklist() {
  const { listId } = useParams();
  const items = useSelector((state: RootState) => selectListItems(state, listId || ''));
  const list = useSelector((state: RootState) => selectListById(state, listId || ''));
  const dispatch = useDispatch();
  const [isListBusy, setIsListBusy] = useState(false);
  const [isPlayLeaving, setIsPlayLeaving] = useState(false);
  const wasPlayVisibleRef = useRef(false);
  const canPlay = items.length > 0 && !isListBusy;

  useLayoutEffect(() => {
    dispatch(setCurrentListId(listId));

    return () => {
      dispatch(setCurrentListId(''));
    }
  }, [listId])

  useEffect(() => {
    if (canPlay) {
      wasPlayVisibleRef.current = true;
      setIsPlayLeaving(false);
    } else if (wasPlayVisibleRef.current) {
      wasPlayVisibleRef.current = false;
      setIsPlayLeaving(true);
    }
  }, [canPlay]);

  function handlePlayClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    const buttonRect = e.currentTarget.getBoundingClientRect();

    setTransitionOrigin({
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2,
      radius: Math.hypot(window.innerWidth, window.innerHeight),
    });
  }

  function renderPlay(): ReactNode {
    if (!canPlay && !isPlayLeaving) return null;
    return (
      <Link
        className={`btn btn-primary btn-icon-only-l ${isPlayLeaving ? 'fade-out' : 'fade-in'}`}
        to="checker"
        state={items}
        onClick={handlePlayClick}
        onAnimationEnd={() => setIsPlayLeaving(false)}
      >
        <span className="icon icon-play"></span>
      </Link>
    );
  }

  return (
    <>
      <div className="list-header">
        <h1>{list?.name}</h1>
        {renderPlay()}
      </div>
      <List items={items} type="item" onBusyChange={setIsListBusy} />
    </>
  );
}