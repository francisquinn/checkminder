import { useState } from "react";
import { useLocation } from "react-router-dom";

export function Checker() {
    const location = useLocation();
    const items = location.state;
    const [ index, setIndex ] = useState(0);
    const [ isDone, setIsDone ] = useState(false);
    const [ checkedItems, setCheckedItems ] = useState([]);
    const [ skippedItems, setSkippedItems ] = useState([]);

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

    return (
        <>
            <h1>Checker</h1>
            { isDone ? (
                <>
                    <h2>done</h2>
                    <h3>Checked items</h3>
                    <ul>
                        {checkedItems.map(item => 
                            <li key={item.id}>{item.name}</li>    
                        )}
                    </ul>
                    <h3>Skipped items</h3>
                    <ul>
                        {skippedItems.map(item => 
                            <li key={item.id}>{item.name}</li>    
                        )}
                    </ul>

                    <button className="btn" onClick={() => history.back()}>return to list</button>
                </>
            ) : (
                <>
                    <ul>
                        <li>{items[index].name}</li>
                    </ul>
                    <div>
                        <button className="btn" onClick={check}>check</button>
                        <button className="btn" onClick={skip}>skip</button>
                    </div>
                </>
            )}
        </>
    );
}