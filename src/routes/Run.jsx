import { useLocation } from "react-router-dom";


export function Run() {
    const location = useLocation();
    const items = location.state;

    return (
        <>
            <h1>Runner</h1>
            <ul>
                {items.map(item => 
                    <li key={item.id}>{item.name}</li>
                )}
             </ul>
        </>
    );
}