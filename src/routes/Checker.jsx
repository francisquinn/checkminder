import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function Checker({ handleFooterActions }) {
    const location = useLocation();
    const items = location.state;
    const [ index, setIndex ] = useState(0);
    const [ isDone, setIsDone ] = useState(false);
    const [ checkedItems, setCheckedItems ] = useState([]);
    const [ skippedItems, setSkippedItems ] = useState([]);

    useLayoutEffect(() => {
        handleFooterActions();
        return handleFooterActions;
    }, []);

    function check() {
        changeItem(() => setCheckedItems([...checkedItems, items[index]]));
    }

    function skip() {
        changeItem(() => setSkippedItems([...skippedItems, items[index]]));
    }

    function changeItem(setItems) {
        setItems();

        if (index != items.length - 1) {
            setIndex(index + 1)
        }
        else {
            setIsDone(true);
        }
    }

    function renderItem() {
        return <h2>{items[index].name}</h2>
    }

    function renderCheckedItems() {
        return (
            <>
                <h3>Checked</h3>
                <ul>
                    {checkedItems.map(item => 
                        <li key={item.id}>{item.name}</li>    
                    )}
                </ul>
            </>
        )
    }

    function renderSkippedItems() {
        return (
            <>
                <h3>Skipped</h3>
                <ul>
                    {skippedItems.map(item => 
                        <li key={item.id}>{item.name}</li>    
                    )}
                </ul>
            </>
        )
    }

    function renderActions() {
        return (
            <>
                <button className="btn btn-secondary btn-checker" onClick={skip}>Skip</button>
                <button className="btn btn-primary btn-checker" onClick={check}>Check</button>
            </>
        )
    }

    return (
        <article className="checker-container">
            <div className="checker-items">
                { !isDone && renderItem() }
                {( isDone && checkedItems.length > 0 ) && renderCheckedItems() }
                {( isDone && skippedItems.length > 0 ) && renderSkippedItems() }
            </div>
            <div className="checker-actions">
                { !isDone && renderActions() }
                { isDone && <button className="btn btn-secondary" onClick={() => history.back()}>Back to list</button> }
            </div>
        </article>
    );
}