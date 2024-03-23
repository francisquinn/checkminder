import { Link } from "react-router-dom";

export function Footer({ isChecker }) {
    return (
        <>
            {!isChecker && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/checklist">
                                <span className="icon icon-nav icon-list"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/checklist/settings">
                                <span className="icon icon-nav icon-gear"></span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}