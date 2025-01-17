import { Link } from "react-router-dom";

/* 
  TODO - convert to tsx whenever settings route is ready
*/

export function Footer({ isChecker }) {
  return (
    <>
      {!isChecker && (
        <nav>
          <ul>
            <li>
              <Link to="/checkminder/">
                <span className="icon icon-nav icon-list"></span>
              </Link>
            </li>
            <li>
              <Link to="/checkminder/settings">
                <span className="icon icon-nav icon-gear"></span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}